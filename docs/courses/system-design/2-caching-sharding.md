---
title: Caching & Sharding
---

# Scaling & Data: Caching & Sharding

As data and traffic grow, two core techniques keep systems fast: **caching** serves hot data from a faster layer, and **sharding** partitions data across multiple nodes. Both improve scale, but both introduce correctness, operability, and failure-mode complexity.

## What You Will Learn

- How cache-aside, write-through, write-behind, and read-through caching differ.
- Why cache invalidation is hard: stale reads, race conditions, stampedes, and hot keys.
- How sharding changes query patterns, transactions, rebalancing, and operational risk.
- How to choose shard keys, design for hot tenants, and migrate without downtime.
- How to reason about consistency, availability, latency, and cost.

## Prerequisites

- Basic HTTP/API and database concepts.
- SQL or document database fundamentals.
- Hashing, load balancing, and basic distributed-system failure thinking.

## Mental Model

Caching is a bet that recently or frequently used data will be used again soon. Sharding is a bet that no single node should own all data or traffic.

Both are forms of controlled duplication:

- A **cache** duplicates data into a faster, usually less durable layer.
- A **sharded database** distributes ownership of data across multiple storage nodes.

The expert skill is not knowing that caches and shards exist. The expert skill is knowing what breaks when the system is under load, when data changes, or when nodes fail.

## Cache Patterns

| Pattern | How It Works | Strength | Risk |
| --- | --- | --- | --- |
| Cache-aside | App reads cache, misses to DB, then stores result | Simple and common | Stale data, duplicate miss traffic |
| Read-through | Cache layer loads from DB automatically | Cleaner app code | Cache becomes more complex |
| Write-through | Writes update cache and DB together | Cache stays warm and fresh | Higher write latency |
| Write-behind | Writes hit cache first, DB later | Low write latency | Data loss or ordering bugs if cache fails |
| Refresh-ahead | Cache refreshes hot keys before expiry | Smooth latency | Harder prediction and wasted refresh work |

<ExampleBox title="Cache-aside with stampede protection" lang="python">

```python
import json
import random
import redis
from contextlib import contextmanager

cache = redis.Redis()

@contextmanager
def redis_lock(name, ttl_seconds=5):
    token = str(random.random())
    acquired = cache.set(name, token, nx=True, ex=ttl_seconds)
    try:
        yield bool(acquired)
    finally:
        if acquired and cache.get(name) == token.encode():
            cache.delete(name)

def get_user(user_id):
    key = f"user:{user_id}"
    cached = cache.get(key)
    if cached:
        return json.loads(cached)

    with redis_lock(f"lock:{key}") as acquired:
        if not acquired:
            # Another request is rebuilding the value.
            # Short sleep/retry/backoff is typical in real services.
            cached = cache.get(key)
            if cached:
                return json.loads(cached)

        user = db_query_user(user_id)
        ttl = 300 + random.randint(0, 30)  # jitter avoids synchronized expiry
        cache.setex(key, ttl, json.dumps(user))
        return user
```

</ExampleBox>

## Cache Failure Modes

| Failure | What Happens | Mitigation |
| --- | --- | --- |
| Stale reads | User sees old data after an update | Invalidate on write, short TTL, versioned keys, event-based invalidation |
| Cache stampede | Many requests rebuild the same expired key | Locks, request coalescing, stale-while-revalidate, TTL jitter |
| Hot key | One key receives extreme traffic | Replicate hot keys, local cache, split key, special-case heavy tenants |
| Thundering herd | Many keys expire at once | TTL jitter, refresh-ahead, staggered prewarming |
| Cache penetration | Repeated misses for nonexistent data hit DB | Cache null results, Bloom filters, input validation |
| Cache poisoning | Bad or malicious value enters cache | Validate before write, namespace keys, sign sensitive values |
| Cache outage | App overloads DB after cache failure | Circuit breakers, rate limits, fallback mode, capacity planning |

## Invalidation Strategies

| Strategy | Use When | Tradeoff |
| --- | --- | --- |
| TTL only | Slight staleness is acceptable | Simple but stale until expiry |
| Delete on write | App controls all writes | Race conditions if writes and reads overlap |
| Versioned keys | Object versions are available | More storage; needs cleanup |
| Event-driven invalidation | Multiple services update data | Requires reliable event delivery |
| Write-through | Fresh cache matters | Adds write latency and coupling |

Professional rule: define **freshness requirements** before choosing a strategy. "Fast but sometimes stale for 5 minutes" is a product decision, not just an engineering detail.

## Sharding Patterns

| Pattern | How It Works | Strength | Risk |
| --- | --- | --- | --- |
| Hash sharding | `hash(key) % shard_count` | Even distribution | Painful when shard count changes |
| Consistent hashing | Hash ring minimizes movement | Easier rebalancing | More operational complexity |
| Range sharding | Key ranges map to shards | Efficient range queries | Hot ranges and uneven growth |
| Directory-based | Lookup service maps key to shard | Flexible migrations | Directory becomes critical dependency |
| Tenant-based | Each tenant maps to a shard | Good isolation | Large tenants become hot shards |

<ExampleBox title="Rendezvous hashing for stable shard choice" lang="python">

```python
import hashlib

def score(key, shard):
    digest = hashlib.sha256(f"{key}:{shard}".encode()).hexdigest()
    return int(digest, 16)

def choose_shard(key, shards):
    return max(shards, key=lambda shard: score(key, shard))

print(choose_shard("tenant-42", ["shard-a", "shard-b", "shard-c"]))
```

</ExampleBox>

Rendezvous hashing helps reduce key movement when shards are added or removed. It is not magic: you still need migration tooling, verification, monitoring, and rollback.

## Shard Key Design

A good shard key should:

- Spread traffic and storage evenly.
- Match the most common query path.
- Avoid single hot tenants or hot time ranges.
- Minimize cross-shard joins and transactions.
- Allow future rebalancing.

Bad shard keys often look good during early development. For example, `created_at` is easy for range queries but can send all new writes to one shard. `tenant_id` gives clean isolation but fails when one tenant becomes 90% of traffic.

## Cross-Shard Complexity

| Operation | Why It Gets Hard |
| --- | --- |
| Joins | Related records may live on different shards. |
| Transactions | Atomic commits across shards require distributed transactions or redesign. |
| Unique constraints | Global uniqueness needs a coordinator or globally unique IDs. |
| Secondary indexes | Indexes must be local, duplicated globally, or served by a search/indexing system. |
| Analytics | Queries may scatter-gather across all shards. |
| Rebalancing | Moving data while serving traffic needs dual writes, backfills, or routing indirection. |

## Rebalancing Without Downtime

One safe migration pattern:

1. Add a routing layer or shard directory.
2. Mark a tenant/key-range as `migrating`.
3. Copy historical data to the target shard.
4. Dual-write new changes to old and new shards.
5. Verify row counts, checksums, and business invariants.
6. Switch reads to the new shard.
7. Stop dual writes after confidence window.
8. Keep rollback metadata until the migration is proven.

This is why sharding should usually come after simpler scaling options: better indexes, query tuning, read replicas, caching, vertical scaling, and workload isolation.

## Consistency and Tradeoffs

| Decision | Lower Complexity | Higher Scale |
| --- | --- | --- |
| Reads | Read from primary | Read replicas and caches |
| Writes | Single database | Partitioned writes |
| Transactions | Local ACID transaction | Saga, outbox, idempotency, compensation |
| Freshness | Strong consistency | Bounded staleness |
| Queries | Local joins | Denormalization, search index, materialized views |

Expert design starts with requirements:

- Required p50/p95/p99 latency.
- Read/write ratio.
- Allowed staleness.
- Data size and growth rate.
- Hot-key or hot-tenant risk.
- Disaster recovery target: RPO and RTO.
- Operational team maturity.

## Observability

Track these before and after adding cache or shards:

| Metric | Why It Matters |
| --- | --- |
| Cache hit ratio | Shows whether cache is actually reducing load. |
| Cache latency | A slow cache can become a new bottleneck. |
| Evictions | Indicates memory pressure or bad TTL/key design. |
| DB QPS after cache miss | Reveals stampedes and penetration. |
| Per-shard CPU/storage/QPS | Finds skew and hot shards. |
| Cross-shard query count | Shows design pressure and hidden coupling. |
| Migration lag | Detects unsafe shard moves. |

## Decision Guide

- Add caching when repeated reads dominate, data can tolerate defined staleness, and DB load/latency is a bottleneck.
- Avoid caching when correctness requires fresh reads and the uncached system is already fast enough.
- Add sharding when a single database cannot handle storage, write throughput, tenant isolation, or operational boundaries.
- Avoid sharding too early; it makes almost every future feature harder.
- Prefer read replicas before sharding for read-heavy systems.
- Prefer partitioned tables before application-level sharding if one database engine can still manage the workload.

## Exercises

<ExerciseBox title="Cache invalidation" difficulty="Medium">
Implement cache-aside for a `get_product` function with TTL jitter. Add invalidation on product update, then describe what stale-read race can still happen.
</ExerciseBox>

<ExerciseBox title="Stampede simulation" difficulty="Hard">
Simulate 1,000 concurrent requests for one expired key. Compare no lock, lock, stale-while-revalidate, and TTL jitter. Report DB query count and p95 latency.
</ExerciseBox>

<ExerciseBox title="Shard design" difficulty="Hard">
Design a sharding scheme for a multi-tenant app where tenants vary wildly in size. Explain hot-tenant handling, cross-shard queries, rebalancing, observability, and rollback.
</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Compared cache patterns', 'Explained invalidation strategies', 'Designed stampede protection', 'Compared shard strategies', 'Planned zero-downtime rebalancing', 'Defined cache and shard metrics']" storageKey="system-design/2-caching-sharding" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-2-caching-sharding" :cards="[
  { q: 'What is cache-aside?', a: 'The app reads from cache, falls back to DB on miss, then populates the cache.' },
  { q: 'Why is cache invalidation hard?', a: 'Because reads, writes, TTL expiry, replication lag, and concurrent rebuilds can create stale or inconsistent results.' },
  { q: 'What is a cache stampede?', a: 'Many requests miss the same key at once and overload the backing database while rebuilding it.' },
  { q: 'Why can hash(key) % shard_count be painful?', a: 'Changing shard count remaps many keys, causing large data movement.' },
  { q: 'Why are cross-shard transactions hard?', a: 'They require coordination across independent nodes, increasing latency and failure complexity.' },
  { q: 'What metrics reveal shard imbalance?', a: 'Per-shard QPS, CPU, storage, latency, error rate, and hot-key/tenant distribution.' }
]" />

## Resources

<ResourceTable title="Caching & Sharding Resources" :resources="[
  { label: 'Designing Data-Intensive Applications', platform: 'Book', type: 'Book', url: 'https://dataintensive.net/' },
  { label: 'Redis documentation', platform: 'Official', type: 'Docs', url: 'https://redis.io/docs/latest/' },
  { label: 'PostgreSQL partitioning docs', platform: 'Official', type: 'Docs', url: 'https://www.postgresql.org/docs/current/ddl-partitioning.html' },
  { label: 'Dynamo paper', platform: 'Amazon', type: 'Paper', url: 'https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf' },
  { label: 'Consistent Hashing and Random Trees', platform: 'Research', type: 'Paper', url: 'https://www.cs.princeton.edu/courses/archive/fall09/cos518/papers/chash.pdf' },
  { label: 'Google SRE Book', platform: 'Google', type: 'Book', url: 'https://sre.google/sre-book/table-of-contents/' },
  { label: 'System Design Primer', platform: 'GitHub', type: 'Guide', url: 'https://github.com/donnemartin/system-design-primer' }
]" />

---
title: Caching & Sharding
---

# Scaling & Data: Caching & Sharding

As data and traffic grow, two core techniques keep systems fast: **caching** to serve hot data from memory, and **sharding** to split a dataset across multiple nodes. Both reduce load on the primary database.

<ExampleBox title="Cache-aside and sharding" lang="python">

```python
import redis, hashlib

cache = redis.Redis()

def get_user(user_id):
    key = f"user:{user_id}"
    data = cache.get(key)
    if data:
        return data                       # cache hit
    data = db_query(user_id)             # cache miss
    cache.setex(key, 300, data)         # cache-aside, TTL 300s
    return data

def shard_for(key, shards):
    # consistent-ish sharding by hash
    h = int(hashlib.md5(key.encode()).hexdigest(), 16)
    return h % len(shards)
```
</ExampleBox>

Key points:
- **Cache-aside**: read from cache, fall back to DB, then populate cache.
- **TTL** (time-to-live) bounds staleness; invalidation is the hard part.
- Stateless services let you add replicas behind a load balancer.
- **Sharding** partitions data by a shard key (e.g. user id hash).
- Choose a shard key with even distribution to avoid hot shards.

<ExerciseBox title="Cache invalidation" difficulty="Medium">

Implement cache-aside for a `get_product` function with a TTL. Describe a strategy to invalidate the cache when the product is updated.

</ExerciseBox>

<ExerciseBox title="Shard design" difficulty="Hard">

Design a sharding scheme for a multi-tenant app where tenants vary wildly in size. Explain how you'd rebalance a hot tenant without downtime.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Explained cache invalidation', 'Explained sharding']" storageKey="system-design/2-caching-sharding" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-2-caching-sharding" :cards="[
{ q: 'What is cache-aside?', a: 'Read from cache, fall back to DB, then populate the cache.' }, { q: 'What bounds cache staleness?', a: 'A <b>TTL</b> (time-to-live).' }, { q: 'What is sharding?', a: 'Partitioning data across nodes by a shard key.' }, { q: 'Why choose a shard key carefully?', a: 'Even distribution avoids hot shards.' }
]" />

## Resources

<ResourceTable title="Caching & Sharding Resources" :resources="[
  { label: 'System Design Primer', platform: 'GitHub', type: 'Book', url: 'https://github.com/donnemartin/system-design-primer' },
  { label: 'Caching (GeeksforGeeks)', platform: 'GeeksforGeeks', type: 'Tutorial', url: 'https://www.geeksforgeeks.org/system-design-cache-its-types-and-need/' },
  { label: 'Sharding Explained', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=UzLMhqg3_Wc' },
  { label: 'Redis Docs', platform: 'Official', type: 'Docs', url: 'https://redis.io/docs/' }
]" />

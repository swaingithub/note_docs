---
title: 'Lesson 9 — Caching Deep (Redis)'
---

# Lesson 9 — Caching Deep (Redis)

> **Module 2 · Core Building Blocks · Lesson 9 of 15**

Caching is the highest-leverage performance technique. Done wrong, it introduces staleness and bugs.

## 1. Cache placement

```
request → app
  → cache HIT  → return
  → cache MISS → DB → store in cache → return
```

## 2. Patterns

- **Cache-aside (lazy):** app checks cache; on miss, loads from DB and fills cache. Most common.
- **Write-through:** write to cache + DB together (consistent, slower writes).
- **Write-back:** write to cache only, flush to DB later (fast, risk of loss).

## 3. Invalidation

- **TTL** (time-based) — simplest, tolerates staleness.
- **Event-based** — purge on write (e.g. user updates profile → delete key).
- **Cache stampede / thundering herd:** many requests miss at once → slam DB. Mitigate with **request coalescing / singleflight** and **jitter** on TTL.

## 4. Redis specifics

- In-memory, sub-ms; data structures (string, hash, list, set, sorted set, stream).
- **Eviction:** LRU, LFU, TTL, allkeys/volatile.
- **Persistence:** RDB snapshot, AOF log — but Redis is primarily a cache, not source of truth.

## 5. Exercises

<ExerciseBox title="Pick a pattern" difficulty="Easy">
A product catalog changes a few times a day but is read millions of times. Recommend a pattern + invalidation strategy.
</ExerciseBox>

<ExerciseBox title="Stampede" difficulty="Medium">
At midnight a popular cache key with TTL=24h all expire; traffic spikes. Describe the stampede and two mitigations (jitter, singleflight).
</ExerciseBox>

## 6. Self-Test (Flashcards)

<Quiz storageKey="quiz-sd-9" :cards="[
  { q: 'Cache-aside vs write-through?', a: 'Cache-aside loads on miss; write-through writes to cache+DB together (consistent, slower).' },
  { q: 'What is a cache stampede?', a: 'Many simultaneous misses hammer the DB; mitigate with coalescing/singleflight + TTL jitter.' },
  { q: 'Redis eviction policies?', a: 'LRU, LFU, TTL, allkeys/volatile — what to drop when full.' },
  { q: 'Should Redis be source of truth?', a: 'Generally no — it is a cache; use DB as source of truth.' }
]" />

## 7. Resources

<ResourceTable title="Lesson 9 — further reading" :resources="[
  { label: 'Redis docs', platform: 'Official', type: 'Docs', url: 'https://redis.io/docs/' },
  { label: 'Caching patterns (Microsoft)', platform: 'Official', type: 'Docs', url: 'https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside' },
  { label: 'DDIA — Cache', platform: 'Book', type: 'Book', url: 'https://dataintensive.net/' }
]" />

## 8. Checklist

<ProgressChecklist :items="['Explained cache-aside', 'Know invalidation (TTL/event)', 'Mitigated stampede', 'Know Redis eviction']" storageKey="system-design/9-caching-redis" />

> Use the [Live Editor](/editor) to take notes as you learn.

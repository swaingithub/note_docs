---
title: 'Lesson 12 — Scaling & Sharding Deep'
---

# Lesson 12 — Scaling & Sharding Deep

> **Module 3 · Architecture Patterns · Lesson 12 of 15**

Horizontal scaling + sharding let a system grow beyond one machine. This extends Lesson 2.

## 1. Vertical vs horizontal

- **Vertical**: bigger machine (limited ceiling, downtime to resize).
- **Horizontal**: more machines behind a load balancer (no ceiling, resilient).

## 2. Sharding (partitioning)

Split data across nodes by a **shard key**.

- **Hash**: `shard = hash(key) % N` — even spread, but resharding is painful.
- **Range**: by value ranges — easy range queries, risk of hot shards.
- **Directory/lookup**: a service maps key → shard (flexible, extra hop).

## 3. Resharding

Adding nodes with naive `hash % N` moves most data. Use **consistent hashing** (rings) so only `1/N` of keys move.

## 4. Hot partitions

One popular key (celebrity user) overloads a shard. Mitigate: **write-through cache**, **key splitting** (append random suffix), **rate limit** the hot key.

<ExampleBox title="Consistent hashing" lang="text">

```
      hash ring
   [n0]--[n1]--[n2]--[n0]   (add n3 → only ~1/N keys remap)
```

</ExampleBox>

## 5. Exercises

<ExerciseBox title="Choose a key" difficulty="Easy">
Shard a multi-tenant app. Would you shard by `user_id` or `tenant_id`? Trade off per-tenant isolation vs spread.
</ExerciseBox>

<ExerciseBox title="Hot shard" difficulty="Medium">
A viral post's comments all hit one shard key. Propose two fixes to avoid overloading that shard.
</ExerciseBox>

## 6. Self-Test (Flashcards)

<Quiz storageKey="quiz-sd-12" :cards="[
  { q: 'Vertical vs horizontal scaling?', a: 'Vertical = bigger box (capped); horizontal = more boxes (elastic, resilient).' },
  { q: 'Hash vs range sharding?', a: 'Hash = even spread, hard reshard; Range = good range scans, hot-shard risk.' },
  { q: 'Why consistent hashing for resharding?', a: 'Only ~1/N of keys remap when a node is added/removed.' },
  { q: 'Hot partition fix?', a: 'Cache, split the key (suffix), rate-limit the hot key.' }
]" />

## 7. Resources

<ResourceTable title="Lesson 12 — further reading" :resources="[
  { label: 'Sharding (highscalability)', platform: 'Official', type: 'Docs', url: 'https://highscalability.com/' },
  { label: 'DynamoDB partitioning', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Partitioning.html' },
  { label: 'Consistent hashing', platform: 'Official', type: 'Docs', url: 'https://en.wikipedia.org/wiki/Consistent_hashing' }
]" />

## 8. Checklist

<ProgressChecklist :items="['Vertical vs horizontal', 'Hash/range/directory sharding', 'Consistent hashing reshard', 'Hot-partition mitigation']" storageKey="system-design/12-scaling-sharding-deep" />

> Use the [Live Editor](/editor) to take notes as you learn.

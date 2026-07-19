---
title: 'Lesson 7 — Databases & Replication'
---

# Lesson 7 — Databases & Replication

> **Module 2 · Core Building Blocks · Lesson 7 of 15**

Choosing and replicating the right database is the most consequential design decision.

## 1. SQL vs NoSQL

| | SQL (relational) | NoSQL |
|---|------------------|-------|
| Schema | fixed | flexible |
| Scaling | vertical + read replicas | horizontal |
| Strength | JOINs, ACID, consistency | scale, speed, variety |
| Examples | Postgres, MySQL | DynamoDB, Mongo, Cassandra |

## 2. Replication

- **Primary-replica (read replicas):** writes → primary; reads → replicas (async). Scales reads, gives failover.
- **Synchronous** vs **asynchronous**: sync = no data loss but slower/blocks; async = fast but possible lag/replica lag.

<ExampleBox title="Diagram" lang="text">

```
   writes        reads
     |             |
  [ Primary ] --> [ Replica 1 ]
     |   (async) -> [ Replica 2 ]
```

</ExampleBox>

## 3. Replication lag problems

- Read-after-write inconsistency (read from replica before propagation).
- Fix: read critical data from primary; or use **read-from-primary-until-catch-up**; or session pinning.

## 4. When to shard vs replica

- **Read-heavy** → add replicas.
- **Write/store-heavy** → shard (partition data across nodes).

## 5. Exercises

<ExerciseBox title="Read-after-write" difficulty="Easy">
A user updates their profile then immediately refreshes; they see the old value. Diagnosis + fix using primary/replica model.
</ExerciseBox>

<ExerciseBox title="Choose a store" difficulty="Medium">
A shopping cart needs flexible schema + single-digit ms at any scale, no JOINs. Recommend SQL or NoSQL and why.
</ExerciseBox>

## 6. Self-Test (Flashcards)

<Quiz storageKey="quiz-sd-7" :cards="[
  { q: 'Primary-replica purpose?', a: 'Scale reads + provide failover; writes go to primary, replicated async to replicas.' },
  { q: 'Sync vs async replication?', a: 'Sync = no loss but blocks/slower; async = fast but lag + possible loss.' },
  { q: 'Read-after-write inconsistency?', a: 'Reading from a replica before the write propagated; fix by reading critical data from primary.' },
  { q: 'SQL vs NoSQL tradeoff?', a: 'SQL = ACID/JOINs/consistency; NoSQL = horizontal scale/flexible schema.' }
]" />

## 7. Resources

<ResourceTable title="Lesson 7 — further reading" :resources="[
  { label: 'DDIA — Replication', platform: 'Book', type: 'Book', url: 'https://dataintensive.net/' },
  { label: 'RDS Read Replicas', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html' },
  { label: 'NoSQL explained', platform: 'Official', type: 'Docs', url: 'https://www.mongodb.com/nosql-explained' }
]" />

## 8. Checklist

<ProgressChecklist :items="['Compared SQL vs NoSQL', 'Explained primary-replica', 'Know sync vs async', 'Handled read-after-write']" storageKey="system-design/7-databases-replication" />

> Use the [Live Editor](/editor) to take notes as you learn.

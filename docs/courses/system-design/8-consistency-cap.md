---
title: 'Lesson 8 — Consistency & CAP'
---

# Lesson 8 — Consistency & CAP

> **Module 2 · Core Building Blocks · Lesson 8 of 15**

Consistency models decide *when* a reader sees a writer's write. This is where distributed systems get subtle.

## 1. CAP theorem

A network partition (P) is unavoidable in distributed systems, so you choose between:
- **CP** — consistency over availability during a partition (e.g. etcd, ZooKeeper).
- **AP** — availability over consistency (e.g. DynamoDB, Cassandra) — eventually consistent.

You never get all three; you get **CA only when no partition**.

## 2. Consistency models (strong → weak)

- **Linearizable / Strong**: read sees the latest write (e.g. a bank balance).
- **Causal**: causally related writes ordered (e.g. comments after a post).
- **Eventual**: given time, all replicas converge (e.g. DNS, timelines).
- **Read-your-writes**: you always see your own writes.

## 3. PACELC

Extends CAP: even **without** partition, you trade **L**atency vs **C**onsistency. Choosing AP usually means favoring low latency (L) over strong consistency (C).

## 4. Choosing

- Money, inventory counts → **strong/CP**.
- Likes, views, feeds → **eventual/AP** is fine.

<ExampleBox title="Trade-off" lang="text">

```
strong consistency  →  slower, simpler reasoning, less available under partition
eventual consistency →  faster, available, but temporary divergence
```

</ExampleBox>

## 5. Exercises

<ExerciseBox title="Classify" difficulty="Easy">
Label each: (a) bank transfer, (b) tweet like count, (c) DNS. Which needs strong vs eventual?
</ExerciseBox>

<ExerciseBox title="Partition scenario" difficulty="Medium">
Your CP store partitions: one side can't reach the primary. What does the system do, and why is that safer than an AP store here?
</ExerciseBox>

## 6. Self-Test (Flashcards)

<Quiz storageKey="quiz-sd-8" :cards="[
  { q: 'What does CAP say?', a: 'Under a network partition you choose Consistency or Availability; you cannot have both + partition tolerance.' },
  { q: 'Strong vs eventual consistency?', a: 'Strong = read sees latest write; eventual = replicas converge over time.' },
  { q: 'What is PACELC?', a: 'Even without partitions, you trade Latency vs Consistency.' },
  { q: 'etcd vs DynamoDB?', a: 'etcd = CP (strong); DynamoDB = AP (eventually consistent, tunable).' }
]" />

## 7. Resources

<ResourceTable title="Lesson 8 — further reading" :resources="[
  { label: 'CAP theorem (Brewer)', platform: 'Official', type: 'Docs', url: 'https://www.ibm.com/cloud/blog/the-cap-theorem' },
  { label: 'DDIA — Consistency', platform: 'Book', type: 'Book', url: 'https://dataintensive.net/' },
  { label: 'Amazon DynamoDB consistency', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadConsistency.html' }
]" />

## 8. Checklist

<ProgressChecklist :items="['Explained CAP', 'Ranked consistency models', 'Used PACELC', 'Chose model per use case']" storageKey="system-design/8-consistency-cap" />

> Use the [Live Editor](/editor) to take notes as you learn.

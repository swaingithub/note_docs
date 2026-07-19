---
title: Indexes & EXPLAIN
---

# Indexing & Tuning: Indexes & EXPLAIN

Indexes are data structures (usually B-trees) that speed up lookups by column, at the cost of write overhead and storage. `EXPLAIN ANALYZE` shows the query planner's chosen plan and real timings, so you can confirm an index is actually used.

<ExampleBox title="Creating and verifying an index" lang="sql">

```sql
-- speed up customer lookups
CREATE INDEX idx_orders_customer ON orders(customer_id);

-- see the plan and real timings
EXPLAIN ANALYZE
SELECT * FROM orders WHERE customer_id = 5;

-- composite index for multi-column filters
CREATE INDEX idx_orders_cust_created
  ON orders(customer_id, created_at);
```
</ExampleBox>

Key points:
- Indexes accelerate `WHERE`, `JOIN`, and `ORDER BY` on indexed columns.
- `EXPLAIN ANALYZE` reveals seq scans vs index scans and actual cost.
- Composite indexes help multi-column filters; column order matters.
- Too many indexes slow `INSERT`/`UPDATE`/`DELETE`.
- Rebuild or `ANALYZE` periodically so statistics stay accurate.

<ExerciseBox title="Index a slow query" difficulty="Medium">

Identify a slow query on a large table, add an appropriate index, and use `EXPLAIN ANALYZE` to confirm the planner switches from a sequential scan to an index scan.

</ExerciseBox>

<ExerciseBox title="Composite index" difficulty="Easy">

Given a query filtering by `status` and ordering by `created_at`, design a composite index. Explain why column order affects its usefulness.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Added an index', 'Verified with EXPLAIN']" storageKey="databases/3-indexes-explain" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-3-indexes-explain" :cards="[
{ q: 'What data structure backs most indexes?', a: 'A B-tree.' }, { q: 'How do you confirm an index is used?', a: 'Run <code>EXPLAIN ANALYZE</code> to see index vs seq scan.' }, { q: 'Why does column order matter in composite indexes?', a: 'The leftmost columns are used first for filtering.' }, { q: 'What is the cost of many indexes?', a: 'Slower INSERT/UPDATE/DELETE and more storage.' }
]" />

## Resources

<ResourceTable title="Indexes & EXPLAIN Resources" :resources="[
  { label: 'PostgreSQL Indexes', platform: 'Official', type: 'Docs', url: 'https://www.postgresql.org/docs/current/indexes.html' },
  { label: 'EXPLAIN', platform: 'Official', type: 'Docs', url: 'https://www.postgresql.org/docs/current/using-explain.html' },
  { label: 'SQL Index Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/sql/sql_create_index.asp' },
  { label: 'Indexing Explained', platform: 'GeeksforGeeks', type: 'Tutorial', url: 'https://www.geeksforgeeks.org/sql/sql-index/' },
  { label: 'Query Tuning', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=Q2WTjiZAaFc' }
]" />

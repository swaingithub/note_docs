---
title: Joins & Window Functions
---

# SQL Mastery: Joins & Window Functions

**Joins** combine rows from multiple tables by a related column. **Window functions** compute aggregates (like running totals or rankings) across a set of rows related to the current row, without collapsing rows the way `GROUP BY` does.

<ExampleBox title="Joins and window functions" lang="sql">

```sql
-- INNER JOIN: customers with their orders
SELECT c.name, o.total
FROM customers c
JOIN orders o ON o.customer_id = c.id;

-- Window: running total per customer, all rows kept
SELECT name,
       SUM(total) OVER (PARTITION BY customer_id ORDER BY created_at) AS running_total
FROM orders;

-- Rank products by price within each category
SELECT category, name, price,
       RANK() OVER (PARTITION BY category ORDER BY price DESC) AS rnk
FROM products;
```
</ExampleBox>

Key points:
- `JOIN` (inner) keeps only matched rows; `LEFT JOIN` keeps unmatched left rows.
- `PARTITION BY` defines the window; `ORDER BY` sets row order within it.
- Window functions (`SUM`, `RANK`, `ROW_NUMBER`) don't group rows away.
- `GROUP BY` aggregates (one row per group); windows preserve detail.
- Use window functions for running totals, rankings, and moving averages.

<ExerciseBox title="Write joins" difficulty="Easy">

Write a query joining `authors` and `posts` to list each post title with its author name, including authors with no posts (use a LEFT JOIN).

</ExerciseBox>

<ExerciseBox title="Window practice" difficulty="Medium">

For an `orders` table, compute each customer's total spend and their rank by spend using window functions, returning one row per customer.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Wrote a JOIN query', 'Used a window function']" storageKey="databases/2-joins-window-functions" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-2-joins-window-functions" :cards="[
{ q: 'What does an INNER JOIN keep?', a: 'Only rows matched on the join column.' }, { q: 'What does a LEFT JOIN keep?', a: 'All left rows, with nulls where no match exists.' }, { q: 'What does PARTITION BY define?', a: 'The window of rows for a window function.' }, { q: 'How do window functions differ from GROUP BY?', a: 'They keep all rows instead of collapsing them.' }
]" />

## Resources

<ResourceTable title="Joins & Window Functions Resources" :resources="[
  { label: 'SQL Joins', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/sql/sql_join.asp' },
  { label: 'Window Functions', platform: 'Official', type: 'Docs', url: 'https://www.postgresql.org/docs/current/tutorial-window.html' },
  { label: 'SQL Practice', platform: 'GeeksforGeeks', type: 'Practice', url: 'https://www.geeksforgeeks.org/sql/' },
  { label: 'SQLBolt', platform: 'Official', type: 'Practice', url: 'https://sqlbolt.com/' },
  { label: 'Window Functions Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=Zne5Z4rnt_0' }
]" />

---
title: Schema & Queries
---

# Databases (SQL): Schema & Queries

Relational databases store data in tables with typed columns and constraints. A good schema uses primary keys, foreign keys, and `NOT NULL`/`UNIQUE` constraints. SQL (Structured Query Language) reads and writes that data with `SELECT`, `INSERT`, `UPDATE`, and `DELETE`.

<ExampleBox title="Schema and queries" lang="sql">

```sql
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL
);

CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO customers (email) VALUES ('ada@example.com');
INSERT INTO notes (customer_id, content) VALUES (1, 'First note');

SELECT id, content FROM notes ORDER BY id DESC;
```
</ExampleBox>

Key points:
- `SERIAL PRIMARY KEY` gives each row a unique auto-incrementing id.
- `REFERENCES` creates a foreign key enforcing referential integrity.
- `UNIQUE` and `NOT NULL` guard data quality at the database level.
- `ORDER BY column DESC` returns newest rows first.
- `DEFAULT now()` stamps rows automatically on insert.

<ExerciseBox title="Design a blog schema" difficulty="Medium">

Write `CREATE TABLE` statements for `authors`, `posts`, and `comments` with appropriate primary/foreign keys and constraints. Then insert sample rows and query the latest 5 posts by an author.

</ExerciseBox>

<ExerciseBox title="Filtering" difficulty="Easy">

Write a `SELECT` that returns notes containing the word "todo" (use `ILIKE` or `LIKE`), ordered by `created_at` descending.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Created a table', 'Wrote a SELECT with ORDER BY']" storageKey="web-development/4-schema-queries" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-4-schema-queries" :cards="[
{ q: 'What gives a unique auto-incrementing id?', a: '<code>SERIAL PRIMARY KEY</code>.' }, { q: 'What enforces a foreign key?', a: 'The <code>REFERENCES</code> clause on a column.' }, { q: 'How do you return newest rows first?', a: '<code>ORDER BY created_at DESC</code>.' }, { q: 'What stamps a row automatically on insert?', a: '<code>DEFAULT now()</code>.' }
]" />

## Resources

<ResourceTable title="SQL Resources" :resources="[
  { label: 'SQL Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/sql/' },
  { label: 'PostgreSQL Docs', platform: 'Official', type: 'Docs', url: 'https://www.postgresql.org/docs/' },
  { label: 'SQLBolt', platform: 'Official', type: 'Practice', url: 'https://sqlbolt.com/' },
  { label: 'SQL Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY' }
]" />

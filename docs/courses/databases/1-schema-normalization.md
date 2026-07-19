---
title: Schema & Normalization
---

# Relational Model: Schema & Normalization

A relational schema defines tables, columns, types, and constraints. **Normalization** reduces redundancy and prevents update anomalies by organizing data into well-structured tables — typically up to Third Normal Form (3NF), where every non-key column depends only on the key.

<ExampleBox title="Normalizing to 3NF" lang="sql">

```sql
-- Before: redundant (author email repeats per book)
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL
);

-- After: authors separate (3NF)
CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
);
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author_id INTEGER REFERENCES authors(id)
);
```
</ExampleBox>

Key points:
- **1NF**: atomic values, no repeating groups.
- **2NF**: no partial dependency on a composite key.
- **3NF**: no transitive dependency on a non-key attribute.
- Foreign keys enforce relationships and referential integrity.
- Normalization trades some join cost for consistency and less duplication.

<ExerciseBox title="Design a blog schema" difficulty="Medium">

Model `authors`, `posts`, and `tags` with a many-to-many join table. Normalize to 3NF with primary/foreign keys and `NOT NULL` where appropriate.

</ExerciseBox>

<ExerciseBox title="Spot the anomaly" difficulty="Easy">

Given a denormalized `orders` table that stores customer address on every row, describe the update anomaly and show the normalized alternative.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Designed a blog schema', 'Normalized to 3NF']" storageKey="databases/1-schema-normalization" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-1-schema-normalization" :cards="[
{ q: 'What does 1NF require?', a: 'Atomic values and no repeating groups.' }, { q: 'What does 3NF forbid?', a: 'Transitive dependencies on non-key attributes.' }, { q: 'How do you enforce relationships?', a: 'Foreign keys referencing another table primary key.' }, { q: 'What does normalization reduce?', a: 'Redundancy and update anomalies.' }
]" />

## Resources

<ResourceTable title="Schema & Normalization Resources" :resources="[
  { label: 'SQL Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/sql/' },
  { label: 'PostgreSQL Docs', platform: 'Official', type: 'Docs', url: 'https://www.postgresql.org/docs/' },
  { label: 'Normalization', platform: 'GeeksforGeeks', type: 'Tutorial', url: 'https://www.geeksforgeeks.org/sql/sql-normalization/' },
  { label: 'SQLBolt', platform: 'Official', type: 'Practice', url: 'https://sqlbolt.com/' }
]" />

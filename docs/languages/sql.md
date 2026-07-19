---
title: SQL
---

# SQL

SQL (Structured Query Language) is the **declarative** language for querying and managing relational databases. You describe *what* data you want; the database engine figures out *how* to retrieve it. It is essential for nearly every backend, analytics, and data engineering role.

> **Paradigms:** Declarative · Set-based &nbsp;•&nbsp; **Extension:** `.sql` &nbsp;•&nbsp; **Run:** `psql -f file.sql` (or any DB client / playground)
> **Difficulty:** Beginner-friendly &nbsp;•&nbsp; **Created:** 1974 (IBM, Chamberlin & Boyce) &nbsp;•&nbsp; **Standard:** ANSI SQL (dialects: PostgreSQL, MySQL, SQLite, SQL Server)

## Table of Contents

- [1. Introduction](#1-introduction)
- [2. SELECT](#2-select)
- [3. WHERE & Filtering](#3-where--filtering)
- [4. ORDER BY & LIMIT](#4-order-by--limit)
- [5. JOINs](#5-joins)
- [6. GROUP BY & Aggregation](#6-group-by--aggregation)
- [7. INSERT, UPDATE & DELETE](#7-insert-update--delete)
- [8. Constraints & Indexes](#8-constraints--indexes)
- [9. Subqueries & Views](#9-subqueries--views)
- [10. Exercises](#10-exercises)
- [11. Resources](#11-resources)

---

## 1. Introduction

A relational database stores data in **tables** made of rows and columns. SQL is used both for defining structure (DDL) and manipulating data (DML). We'll use a simple `employees` and `departments` schema in the examples below.

<ExampleBox title="Create tables" lang="sql">

```sql
CREATE TABLE departments (
    id   INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE employees (
    id       INTEGER PRIMARY KEY,
    name     TEXT NOT NULL,
    salary   REAL,
    dept_id  INTEGER REFERENCES departments(id)
);

-- Try it: run with an SQL playground such as
-- https://www.w3schools.com/sql/trysql.asp or https://sqliteonline.com
```

</ExampleBox>

**Key rules:**
- SQL is case-insensitive for keywords, but convention uses UPPERCASE.
- Statements usually end with `;` (required in many clients).

---

## 2. SELECT

`SELECT` retrieves columns from a table. `*` selects all columns; list specific columns for clarity and performance. `AS` aliases output columns.

<ExampleBox title="Basic SELECT" lang="sql">

```sql
-- All columns
SELECT * FROM employees;

-- Specific columns with alias
SELECT name, salary AS monthly_pay
FROM employees;

-- Distinct values
SELECT DISTINCT dept_id FROM employees;
```

</ExampleBox>

**Key rules:**
- Select only the columns you need — it's faster and clearer.
- Use `AS` to rename columns in the result set.

---

## 3. WHERE & Filtering

`WHERE` filters rows using comparison (`=`, `<>`, `>`, `<`), logical (`AND`, `OR`, `NOT`), and `LIKE` / `IN` / `BETWEEN`. `NULL` is tested with `IS NULL` / `IS NOT NULL`, never `= NULL`.

<ExampleBox title="Filtering rows" lang="sql">

```sql
SELECT name, salary
FROM employees
WHERE salary > 50000
  AND dept_id = 2;

-- Pattern matching
SELECT name FROM employees
WHERE name LIKE 'A%';   -- starts with A

-- Set membership
SELECT name FROM employees
WHERE dept_id IN (1, 2, 3);

-- NULL check
SELECT name FROM employees
WHERE salary IS NULL;
```

</ExampleBox>

**Key rules:**
- Use `IS NULL`, not `= NULL` (NULL is not equal to anything, even itself).
- `LIKE` with `%` matches any sequence; `_` matches a single character.

---

## 4. ORDER BY & LIMIT

`ORDER BY` sorts results (ascending by default; add `DESC` for descending). `LIMIT` restricts the number of returned rows — useful for "top N" queries.

<ExampleBox title="Sorting & limiting" lang="sql">

```sql
SELECT name, salary
FROM employees
ORDER BY salary DESC
LIMIT 5;

-- Multi-column sort
SELECT name, dept_id, salary
FROM employees
ORDER BY dept_id ASC, salary DESC;
```

</ExampleBox>

**Key rules:**
- `ORDER BY` defaults to `ASC`; specify `DESC` explicitly for descending.
- `LIMIT n` is widely supported; SQL Server uses `TOP` or `OFFSET/FETCH`.

---

## 5. JOINs

`JOIN` combines rows from two tables using a related column. `INNER JOIN` returns matches; `LEFT JOIN` keeps all left rows (NULLs for unmatched right rows).

<ExampleBox title="Inner & left joins" lang="sql">

```sql
-- Employees with their department name
SELECT e.name, d.name AS department
FROM employees e
INNER JOIN departments d
  ON e.dept_id = d.id;

-- All employees, even those without a department
SELECT e.name, d.name AS department
FROM employees e
LEFT JOIN departments d
  ON e.dept_id = d.id;
```

</ExampleBox>

**Key rules:**
- Always specify the join condition in `ON` to avoid Cartesian products.
- `LEFT JOIN` is the typical way to detect "missing" related rows.

---

## 6. GROUP BY & Aggregation

`GROUP BY` collapses rows that share column values, enabling aggregate functions: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`. Filter grouped results with `HAVING` (not `WHERE`).

<ExampleBox title="Aggregating" lang="sql">

```sql
SELECT dept_id,
       COUNT(*)      AS headcount,
       AVG(salary)   AS avg_salary
FROM employees
GROUP BY dept_id
HAVING AVG(salary) > 60000
ORDER BY avg_salary DESC;
```

</ExampleBox>

**Key rules:**
- `WHERE` filters before grouping; `HAVING` filters after grouping.
- Every non-aggregated column in the `SELECT` must appear in `GROUP BY`.

---

## 7. INSERT, UPDATE & DELETE

These **DML** statements modify data. `INSERT` adds rows, `UPDATE` modifies existing rows (always use `WHERE` to avoid updating all), and `DELETE` removes rows.

<ExampleBox title="Modifying data" lang="sql">

```sql
-- Insert
INSERT INTO employees (id, name, salary, dept_id)
VALUES (10, 'Lin', 72000, 2);

-- Update (scoped!)
UPDATE employees
SET salary = salary * 1.10
WHERE dept_id = 2;

-- Delete (scoped!)
DELETE FROM employees
WHERE id = 10;
```

</ExampleBox>

**Key rules:**
- Always add a `WHERE` clause to `UPDATE`/`DELETE` unless you mean *all* rows.
- `INSERT` can omit columns that have defaults or are nullable.

---

## 8. Constraints & Indexes

**Constraints** enforce data integrity: `PRIMARY KEY`, `FOREIGN KEY`, `UNIQUE`, `NOT NULL`, `CHECK`. **Indexes** speed up lookups on columns at the cost of slower writes and extra storage.

<ExampleBox title="Constraints & an index" lang="sql">

```sql
CREATE TABLE accounts (
    id      INTEGER PRIMARY KEY,
    email   TEXT UNIQUE NOT NULL,
    balance REAL NOT NULL CHECK (balance >= 0)
);

CREATE INDEX idx_employees_salary
ON employees (salary);
```

</ExampleBox>

**Key rules:**
- Foreign keys keep references valid (enable them: `PRAGMA foreign_keys=ON` in SQLite).
- Index columns you frequently filter or join on, but not every column.

---

## 9. Subqueries & Views

A **subquery** is a query nested inside another. A **view** is a saved, named query that behaves like a virtual table. Views simplify complex queries and encapsulate logic.

<ExampleBox title="Subquery & view" lang="sql">

```sql
-- Employees earning above the company average
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Reusable view
CREATE VIEW high_earners AS
SELECT name, salary, dept_id
FROM employees
WHERE salary > 70000;

SELECT * FROM high_earners;
```

</ExampleBox>

**Key rules:**
- A subquery in `WHERE` must return a single value for `>`/`=` comparisons.
- Views don't store data; they're computed when queried (materialized views vary by dialect).

---

## 10. Exercises

<ExerciseBox title="Exercise 1 — Simple filter" difficulty="Easy">

Write a query to list the `name` and `salary` of all employees in department 1 who earn more than 50000, ordered by salary descending.
</ExerciseBox>

<ExerciseBox title="Exercise 2 — Join & aggregate" difficulty="Medium">

Write a query that returns each department's `name` and the number of employees in it, including departments with zero employees. Order by employee count descending.
</ExerciseBox>

<ExerciseBox title="Exercise 3 — Subquery" difficulty="Hard">

Write a query to find the `name` and `salary` of employees whose salary is above the average salary of their own department (use a correlated subquery or a join with a grouped derived table).
</ExerciseBox>

---

## 11. Self-Test (Flashcards)

<Quiz storageKey="quiz-sql" :cards="[
  { q: 'Why must you use <code>IS NULL</code> instead of <code>= NULL</code>?', a: 'NULL represents unknown, and comparing anything with NULL yields NULL (not true). <code>IS NULL</code> / <code>IS NOT NULL</code> are the correct predicates for testing nullness.' },
  { q: 'What is the difference between <code>WHERE</code> and <code>HAVING</code>?', a: '<code>WHERE</code> filters individual rows before grouping; <code>HAVING</code> filters the aggregated groups after <code>GROUP BY</code> has been applied.' },
  { q: 'What is the difference between INNER JOIN and LEFT JOIN?', a: 'INNER JOIN returns only matching rows from both tables; LEFT JOIN returns all left-table rows, filling unmatched right-table columns with NULL.' },
  { q: 'What does a view represent?', a: 'A view is a saved, named query that behaves like a virtual table; it does not store data, but is computed when queried.' }
]" />

## 12. Resources

<ResourceTable title="SQL learning paths" :resources="[
  { label: 'SQL Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/sql/' },
  { label: 'SQL Guide', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/sql/' },
  { label: 'SQL Tutorial', platform: 'Programiz', type: 'Tutorial', url: 'https://www.programiz.com/sql' },
  { label: 'SQL Full Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY' },
  { label: 'Mode SQL Tutorial', platform: 'Mode', type: 'Tutorial', url: 'https://mode.com/sql-tutorial/' },
  { label: 'Learn SQL', platform: 'SQLTeaching', type: 'Practice', url: 'https://www.sqlteaching.com/' },
  { label: 'PostgreSQL Docs', platform: 'Official', type: 'Docs', url: 'https://www.postgresql.org/docs/' },
  { label: 'SQLBolt', platform: 'SQLBolt', type: 'Practice', url: 'https://sqlbolt.com/' }
]" />

> 📝 Draft anything in the [Live Editor](/editor), then paste it here to keep your docs current.

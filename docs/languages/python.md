---
title: Python
---

# Python

Python is a high-level, interpreted, dynamically typed language prized for readability. It dominates data science, automation, web backends (Django, FastAPI), and scripting. Its "batteries-included" standard library and clean syntax make it a favorite for beginners and experts alike.

> **Paradigms:** Object-oriented · Procedural · Functional &nbsp;•&nbsp; **Extension:** `.py` &nbsp;•&nbsp; **Run:** `python file.py`
> **Difficulty:** Beginner-friendly &nbsp;•&nbsp; **Created:** 1991 (Guido van Rossum) &nbsp;•&nbsp; **Standard:** CPython reference implementation

## Table of Contents

- [1. Getting Started](#1-getting-started)
- [2. Variables & Dynamic Typing](#2-variables--dynamic-typing)
- [3. Data Types](#3-data-types)
- [4. Operators](#4-operators)
- [5. Control Flow](#5-control-flow)
- [6. Functions & Closures](#6-functions--closures)
- [7. Lists, Tuples & Sets](#7-lists-tuples--sets)
- [8. Dictionaries](#8-dictionaries)
- [9. Classes & OOP](#9-classes--oop)
- [10. Modules & Packages](#10-modules--packages)
- [11. Errors & Exceptions](#11-errors--exceptions)
- [12. File I/O](#12-file-io)
- [13. Exercises](#13-exercises)
- [14. Resources](#14-resources)

---

## 1. Getting Started

Python code runs from a `.py` file via the interpreter, or interactively in a REPL (`python` with no arguments).

<ExampleBox title="Hello, World" lang="python">

```python
print('Hello, Python!')
```

</ExampleBox>

> Try it: run with `python` — save the snippet to `hello.py` and execute `python hello.py`.

> 💡 **Tip:** Use `python -i file.py` to drop into an interactive REPL after your script runs, so you can inspect variables.

---

## 2. Variables & Dynamic Typing

Variables are created by assignment; there is no declaration keyword and no type annotation required. Names are bound to objects, not typed slots.

<ExampleBox title="Assignment & reassignment" lang="python">

```python
name = 'Ada'
age = 36
age = 37          # rebinding is fine; Python is dynamically typed
count, total = 0, 0   # tuple unpacking

print(name, age)
print(count, total)
```

</ExampleBox>

**Key rules:**
- Names are case-sensitive (`age` ≠ `Age`).
- Prefer `snake_case` for variables and functions.
- Use `is` to compare identity (same object), `==` to compare values.

> Try it: run with `python` — try `a = [1]; b = a; b.append(2); print(a)` to see shared references.

---

## 3. Data Types

**Built-in scalars:** `int`, `float`, `complex`, `bool`, `str`, `NoneType`.
**Built-in collections:** `list`, `tuple`, `set`, `dict`.

<ExampleBox title="Type checking" lang="python">

```python
print(type('hi'))        # &lt;class 'str'>
print(type(42))          # &lt;class 'int'>
print(type(3.14))        # &lt;class 'float'>
print(type(True))        # &lt;class 'bool'>
print(isinstance(42, int))  # True
```

</ExampleBox>

**Key rules:**
- Integers have arbitrary precision (no overflow).
- Strings are immutable; use `f"..."` f-strings for formatting.
- `None` is the singleton null value (test with `is None`).

---

## 4. Operators

| Category | Operators |
|----------|-----------|
| Arithmetic | `+ - * / // % **` |
| Assignment | `= += -= *= /= //=` |
| Comparison | `== != > < >= <=` |
| Logical | `and or not` |
| Membership | `in`, `not in` |
| Identity | `is`, `is not` |

<ExampleBox title="Floor division vs true division" lang="python">

```python
print(7 / 2)     # 3.5  (true division, always float)
print(7 // 2)    # 3    (floor division, int)
print(2 ** 10)   # 1024 (power)
print(5 in [1, 2, 3, 4, 5])  # True
```

</ExampleBox>

---

## 5. Control Flow

Python uses indentation (4 spaces) to define blocks — there are no braces or `end` keywords.

<ExampleBox title="if / for / while" lang="python">

```python
score = 85
grade = 'A' if score >= 90 else 'B' if score >= 70 else 'C'
print(grade)   # B

for i in range(3):
    print(i)   # 0 1 2

n = 3
while n > 0:
    print(n)
    n -= 1
```

</ExampleBox>

**Key rules:**
- `range(stop)`, `range(start, stop, step)` generate sequences lazily.
- Use `for ... else` to run code when no `break` occurred.
- Avoid mutable default arguments (`def f(x=[])` is a classic trap — use `None`).

---

## 6. Functions & Closures

Functions are **first-class**: pass them as arguments, return them, store them in variables.

<ExampleBox title="Defaults, *args, **kwargs" lang="python">

```python
def add(a, b=0, *args, **kwargs):
    total = a + b + sum(args)
    print(kwargs)
    return total

print(add(2, 3))            # 5
print(add(2, 3, 4, 5))      # 14
print(add(1, debug=True))   # {'debug': True} -> 1
```

</ExampleBox>

**Closures** capture their enclosing scope:

<ExampleBox title="A counter closure" lang="python">

```python
def create_counter():
    count = 0
    def next():
        nonlocal count
        count += 1
        return count
    return next

n = create_counter()
print(n(), n(), n())   # 1 2 3
```

</ExampleBox>

**Key rules:**
- Use `lambda` for small anonymous functions; otherwise use `def`.
- Generators use `yield` to produce values lazily.
- Decorators wrap functions: `@property`, `@staticmethod`, or custom.

---

## 7. Lists, Tuples & Sets

- `list` — ordered, mutable, allows duplicates.
- `tuple` — ordered, immutable.
- `set` — unordered, unique elements, fast membership.

<ExampleBox title="List comprehensions & methods" lang="python">

```python
nums = [1, 2, 3, 4]
squared = [n * n for n in nums if n % 2 == 0]
print(squared)   # [4, 16]

users = [{'name': 'Ada', 'age': 36}, {'name': 'Lin', 'age': 22}]
names = [u['name'].upper() for u in users if u['age'] > 30]
print(names)     # ['ADA']

unique = set([1, 1, 2, 3, 3])
print(unique)    # {1, 2, 3}
```

</ExampleBox>

**Key rules:**
- Prefer list comprehensions over `map`/`filter` for readability.
- Copy lists with `list.copy()` or `[:]`, not by assignment (`b = a` shares).
- `tuple` is hashable (usable as dict keys); `list` is not.

---

## 8. Dictionaries

Dictionaries map keys to values with average O(1) lookup. From Python 3.7 they preserve insertion order.

<ExampleBox title="Dict construction & methods" lang="python">

```python
user = {'name': 'Ada', 'age': 36}
user['role'] = 'admin'

print(user.get('email', 'N/A'))   # N/A (safe default)
print(user.keys())                # dict_keys(['name', 'age', 'role'])

ages = {name: len(name) for name in ['Ada', 'Lin', 'Bo']}
print(ages)   # {'Ada': 3, 'Lin': 3, 'Bo': 2}
```

</ExampleBox>

**Key rules:**
- Use `.get(key, default)` instead of `[]` to avoid `KeyError`.
- Iterate with `.items()` for key/value pairs.
- `defaultdict` (from `collections`) auto-creates missing keys.

---

## 9. Classes & OOP

Everything in Python is an object. Classes use `__init__` for constructors and `__str__`/`__repr__` for display.

<ExampleBox title="Class with inheritance" lang="python">

```python
class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        return f'{self.name} makes a noise'

class Dog(Animal):
    def speak(self):
        return f'{self.name} barks'

print(Dog('Rex').speak())   # Rex barks
```

</ExampleBox>

**Key rules:**
- Use `self` explicitly as the first parameter of instance methods.
- `@property` turns a method into an attribute access.
- `dataclasses` (`from dataclasses import dataclass`) reduce boilerplate for data holders.

---

## 10. Modules & Packages

A `.py` file is a module; a directory with `__init__.py` is a package. Use `import` to reuse code.

```python
# math_utils.py
def sum(a, b):
    return a + b

# app.py
from math_utils import sum
print(sum(2, 3))
```

<ExampleBox title="Standard-library imports" lang="python">

```python
import random
import json

data = {'scores': [random.randint(1, 100) for _ in range(3)]}
print(json.dumps(data))
```

</ExampleBox>

**Key rules:**
- Manage dependencies with `pip` + `venv` (or `uv`); `requirements.txt` pins versions.
- Avoid circular imports; keep packages small.
- Run scripts as modules with `python -m package.module`.

---

## 11. Errors & Exceptions

Python uses exceptions; wrap risky code in `try / except`. Always catch specific exceptions.

<ExampleBox title="Try / except / finally" lang="python">

```python
try:
    value = int(input('Number: '))
    print(10 / value)
except ValueError:
    print('Not a valid integer')
except ZeroDivisionError:
    print('Cannot divide by zero')
else:
    print('No error occurred')
finally:
    print('Cleanup runs regardless')
```

</ExampleBox>

**Key rules:**
- Catch the narrowest exception type, never bare `except:`.
- Use `raise` to re-raise; `raise ... from` to chain causes.
- Create custom exceptions by subclassing `Exception`.

---

## 12. File I/O

Open files with the `with` statement so they close automatically.

<ExampleBox title="Read & write text" lang="python">

```python
with open('notes.txt', 'w') as f:
    f.write('Hello, file!\n')

with open('notes.txt', 'r') as f:
    content = f.read()
    print(content)   # Hello, file!
```

</ExampleBox>

**Key rules:**
- Always use `with open(...)` to guarantee cleanup.
- Use `json.dump`/`json.load` for structured data.
- Specify `encoding='utf-8'` for portable text handling.

---

## 13. Exercises

<ExerciseBox title="Exercise 1 — FizzBuzz" difficulty="Easy">

Print numbers 1–15. For multiples of 3 print `Fizz`, for 5 print `Buzz`, for both print `FizzBuzz`.

```python
for i in range(1, 16):
    # your code here
    pass
```

</ExerciseBox>

<ExerciseBox title="Exercise 2 — Unique values" difficulty="Medium">

Write a function `unique(items)` that returns a list with duplicates removed, without using `set`.

```python
unique([1, 2, 2, 3, 3, 3])  # [1, 2, 3]
```

</ExerciseBox>

<ExerciseBox title="Exercise 3 — Word counter" difficulty="Hard">

Write a function `word_count(path)` that reads a text file and returns a dictionary mapping each word to how many times it appears (case-insensitive, ignoring punctuation).

</ExerciseBox>

---

## 14. Self-Test (Flashcards)

<Quiz storageKey="quiz-python" :cards="[
  { q: 'What does <code>7 // 2</code> evaluate to in Python?', a: 'It performs floor division, returning <code>3</code> (an int). True division <code>7 / 2</code> would give <code>3.5</code>.' },
  { q: 'Why is a mutable default argument like <code>def f(x=[])</code> a trap?', a: 'The default list is created once and shared across calls, so mutations persist between invocations. Use <code>None</code> and initialize inside the function instead.' },
  { q: 'What is the difference between <code>==</code> and <code>is</code>?', a: '<code>==</code> compares values; <code>is</code> compares object identity (whether two names refer to the same object).' },
  { q: 'How do you open a file safely in Python?', a: 'Use <code>with open(path) as f:</code> so the file is closed automatically, even if an error occurs.' }
]" />

## 15. Resources

<ResourceTable title="Python learning paths" :resources="[
  { label: 'Python Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/python/' },
  { label: 'Python Documentation', platform: 'Official', type: 'Docs', url: 'https://docs.python.org/3/' },
  { label: 'Python Guide', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/python/' },
  { label: 'Python Programming', platform: 'Programiz', type: 'Tutorial', url: 'https://www.programiz.com/python-programming' },
  { label: 'Python Full Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=rfscVS0vtbw' },
  { label: 'Scientific Computing with Python', platform: 'freeCodeCamp', type: 'Practice', url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/' },
  { label: 'Python Topic on GitHub', platform: 'GitHub', type: 'Practice', url: 'https://github.com/topics/python' },
  { label: 'Real Python', platform: 'Official', type: 'Tutorial', url: 'https://realpython.com/' }
]" />

> 📝 Draft anything in the [Live Editor](/editor), then paste it here to keep your docs current.

---
title: Syntax & Data
---

# Python Foundations: Syntax & Data

Python's readable syntax and rich built-in data structures make it the default language for ML. This lesson covers variables, lists, dictionaries, and list comprehensions — the everyday tools for loading and shaping data.

<ExampleBox title="Comprehensions and data shapes" lang="python">

```python
numbers = [1, 2, 3, 4]
squares = [n * n for n in numbers if n % 2 == 0]
print(squares)  # [4, 16]

records = [
    {"name": "Ada", "score": 95},
    {"name": "Lin", "score": 82},
]
top = [r["name"] for r in records if r["score"] >= 90]
print(top)  # ['Ada']
```
</ExampleBox>

Key points:
- Lists, tuples, sets, and dicts cover most data-shaping needs.
- **List comprehensions** filter and transform in one readable line.
- Dictionaries map keys to values and model structured records.
- Use `f"{var}"` f-strings for clean string formatting.
- Python is dynamically typed — add type hints for larger ML codebases.

<ExerciseBox title="Wrangle a list" difficulty="Easy">

Given a list of temperatures in Celsius, use a comprehension to produce a list of those above 30C, rounded to one decimal.

</ExerciseBox>

<ExerciseBox title="Aggregate records" difficulty="Medium">

From a list of `{"category": str, "amount": float}` dicts, build a dict that sums amounts per category using a loop or `collections.defaultdict`.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Wrote a list comprehension', 'Filtered evens']" storageKey="machine-learning/1-syntax-data" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-1-syntax-data" :cards="[
{ q: 'What built-in filters and transforms a list?', a: 'A <b>list comprehension</b> in one readable line.' }, { q: 'What models structured records?', a: 'A <b>dictionary</b> mapping keys to values.' }, { q: 'How do you format strings cleanly?', a: 'Use f-strings: <code>f&quot;{var}&quot;</code>.' }, { q: 'What is Python typing status?', a: 'Dynamically typed; add hints for larger codebases.' }
]" />

## Resources

<ResourceTable title="Python Syntax Resources" :resources="[
  { label: 'Python Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/python/' },
  { label: 'Python Docs', platform: 'Official', type: 'Docs', url: 'https://docs.python.org/3/tutorial/' },
  { label: 'CS50P', platform: 'Official', type: 'Video', url: 'https://cs50.harvard.edu/python/' },
  { label: 'Python Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=rfscVS0vtbw' }
]" />

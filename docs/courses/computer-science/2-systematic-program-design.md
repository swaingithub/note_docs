---
title: Systematic Program Design
---

# Core Programming: Systematic Program Design

Systematic Program Design (the HtDP / "How to Design Programs" method) teaches you to write correct programs by following a repeatable recipe: from examples and data definitions, derive signatures, purpose statements, tests, and finally the function body. It scales from beginner scripts to large systems.

<ExampleBox title="The design recipe in Python" lang="python">

```python
# Data definition: a Point is a tuple (x, y) of two numbers
# Signature:   distance(Point, Point) -> float
# Purpose:     return the Euclidean distance between two points
# Examples:
#   distance((0, 0), (3, 4)) == 5.0

import math

def distance(p1, p2):
    return math.hypot(p1[0] - p2[0], p1[1] - p2[1])

# Tests
assert distance((0, 0), (3, 4)) == 5.0
assert distance((1, 1), (1, 1)) == 0.0
```
</ExampleBox>

Key points:
- Start from a **data definition** before writing any logic.
- Write the **signature** and **purpose statement** as a contract.
- Drive the body from **examples and tests**, not from guesswork.
- Handle each case of the data (e.g. empty list, base case) systematically.
- Refactor once the function works; keep the tests as a safety net.

<ExerciseBox title="Follow the recipe" difficulty="Easy">

Use the design recipe to write `average(nums: list[float]) -> float`. Write the data definition, signature, purpose, three example tests, then the body.

</ExerciseBox>

<ExerciseBox title="Design with recursion" difficulty="Medium">

Design a recursive function `tree_sum` that sums all numbers nested arbitrarily deep inside lists (e.g. `[1, [2, [3, 4]], 5]` -> 15). Follow the recipe and include tests for the empty and nested cases.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Used the design recipe', 'Built 3 programs']" storageKey="computer-science/2-systematic-program-design" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-2-systematic-program-design" :cards="[
{ q: 'What is the first step of the design recipe?', a: 'Write a <b>data definition</b> before any logic.' }, { q: 'What is a signature in the recipe?', a: 'It states the function input and output types as a contract.' }, { q: 'What drives the function body?', a: 'Examples and tests, not guesswork.' }, { q: 'Why keep tests after the function works?', a: 'They act as a safety net for later refactoring.' }
]" />

## Resources

<ResourceTable title="Systematic Program Design Resources" :resources="[
  { label: 'How to Design Programs', platform: 'Official', type: 'Book', url: 'https://htdp.org/' },
  { label: 'Python unittest Docs', platform: 'Official', type: 'Docs', url: 'https://docs.python.org/3/library/unittest.html' },
  { label: 'Program Design Notes', platform: 'GeeksforGeeks', type: 'Tutorial', url: 'https://www.geeksforgeeks.org/python-programming-language/' },
  { label: 'Recursion Explained', platform: 'Programiz', type: 'Tutorial', url: 'https://www.programiz.com/python-programming/recursion' },
  { label: 'HtDP Lectures', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=h2KLP0lUw30' }
]" />

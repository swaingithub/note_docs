---
title: Functions & Types
---

# Python Foundations: Functions & Types

Functions package logic into reusable units. Type hints document expected inputs and outputs, enabling static checking with tools like `mypy`. In ML code, clear function contracts make data pipelines and models easier to test and maintain.

<ExampleBox title="Typed functions and annotations" lang="python">

```python
def add(a: int, b: int) -> int:
    return a + b

from typing import List
def mean(xs: List[float]) -> float:
    return sum(xs) / len(xs)

# mypy will flag this at type-check time
reveal_type(add(1, 2))  # int
```
</ExampleBox>

Key points:
- Annotate parameters and return types: `def f(x: int) -> str:`.
- Type hints are ignored at runtime but checked by `mypy`/`pyright`.
- Use `typing` constructs: `List`, `Dict`, `Optional`, `Tuple`.
- Small pure functions are easier to unit test than long scripts.
- Docstrings complement type hints with human-readable intent.

<ExerciseBox title="Type a pipeline" difficulty="Easy">

Write a typed function `normalize(xs: List[float]) -> List[float]` that returns each value min-max scaled to [0, 1]. Add a docstring and three assertions.

</ExerciseBox>

<ExerciseBox title="Static checking" difficulty="Medium">

Install `mypy` and run it on a file with an intentional type error (e.g. passing a string where an int is expected). Fix the error so `mypy` passes.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Added type hints', 'Wrote a typed function']" storageKey="machine-learning/1-functions-types" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-1-functions-types" :cards="[
{ q: 'How do you annotate a return type?', a: '<code>def f(x: int) -> str:</code>.' }, { q: 'Are type hints enforced at runtime?', a: 'No; tools like <code>mypy</code> check them statically.' }, { q: 'What typing construct models optional values?', a: '<code>Optional[T]</code>.' }, { q: 'Why write small pure functions?', a: 'They are easier to unit test than long scripts.' }
]" />

## Resources

<ResourceTable title="Python Functions Resources" :resources="[
  { label: 'Python Functions', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/python/python_functions.asp' },
  { label: 'typing Module', platform: 'Official', type: 'Docs', url: 'https://docs.python.org/3/library/typing.html' },
  { label: 'mypy', platform: 'GitHub', type: 'Docs', url: 'https://mypy-lang.org/' },
  { label: 'Python Functions Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=9Os0o3wzS_I' }
]" />

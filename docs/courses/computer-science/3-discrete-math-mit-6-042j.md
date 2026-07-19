---
title: Discrete Math (MIT 6.042J)
---

# Core Math: Discrete Math (MIT 6.042J)

Discrete mathematics is the language of computer science. MIT 6.042J covers logic, sets, relations, induction, and combinatorics — the tools used to prove correctness, reason about algorithms, and count possibilities.

<ExampleBox title="Proof by induction" lang="python">

```python
# Claim: 1 + 2 + ... + n = n(n+1)/2 for all n >= 1
# Base case n=1: 1 == 1*2/2 == 1  (true)
# Inductive step: assume true for n, prove for n+1
#   1+...+n+(n+1) = n(n+1)/2 + (n+1)
#                 = (n+1)(n/2 + 1) = (n+1)(n+2)/2  (true)

def sum_to(n):
    return n * (n + 1) // 2

# verify for many n
for n in range(1, 1000):
    assert sum_to(n) == sum(range(1, n + 1))
```
</ExampleBox>

Key points:
- **Propositional logic**: truth tables, implications, De Morgan's laws.
- **Sets & relations**: unions, intersections, functions, equivalence relations.
- **Proof by induction**: base case plus inductive step proves a claim for all natural numbers.
- **Combinatorics**: counting with permutations, combinations, and the pigeonhole principle.
- **Graph theory basics**: used later for networks and algorithms.

<ExerciseBox title="Induction practice" difficulty="Medium">

Prove by induction that the sum of the first n odd numbers equals n^2. Then implement a function that returns the n-th odd number and verify the identity with a loop.

</ExerciseBox>

<ExerciseBox title="Counting" difficulty="Easy">

How many 5-character passwords can be formed from 26 lowercase letters if repetition is allowed? Write a one-line Python expression to compute it and explain the reasoning.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Proved 5 induction statements', 'Completed 6.042J']" storageKey="computer-science/3-discrete-math-mit-6-042j" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-3-discrete-math-mit-6-042j" :cards="[
{ q: 'What does proof by induction require?', a: 'A base case plus an inductive step proving the claim for all n.' }, { q: 'What does De Morgan law relate?', a: 'The negation of AND/OR across logical statements.' }, { q: 'What is a foreign-key-like concept in sets?', a: '<b>Relations</b> such as equivalence relations on elements.' }, { q: 'What does combinatorics count?', a: 'Possibilities via permutations, combinations, and the pigeonhole principle.' }
]" />

## Resources

<ResourceTable title="Discrete Math Resources" :resources="[
  { label: 'MIT 6.042J Course', platform: 'Official', type: 'Docs', url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2017/' },
  { label: 'Discrete Mathematics', platform: 'GeeksforGeeks', type: 'Tutorial', url: 'https://www.geeksforgeeks.org/discrete-mathematics/' },
  { label: 'Mathematical Induction', platform: 'Programiz', type: 'Tutorial', url: 'https://www.programiz.com/maths/mathematical-induction' },
  { label: 'Discrete Math Lectures', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=hyeL9ss29W8' },
  { label: 'Book of Proof', platform: 'GitHub', type: 'Book', url: 'https://github.com/rhlabs/bookofproof' }
]" />

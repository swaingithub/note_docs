---
title: Big-O
---

# Complexity: Big-O

Big-O notation describes how an algorithm's runtime or memory grows as the input size `n` increases. It captures the dominant term and ignores constants, so we can compare algorithms at scale.

<ExampleBox title="Measuring growth in Python" lang="python">

```python
def constant(arr):
    return arr[0]            # O(1)

def linear(arr):
    return [x * 2 for x in arr]   # O(n)

def quadratic(arr):
    return [(x, y) for x in arr for y in arr]  # O(n^2)

import math
def loglinear(arr):
    # O(n log n) — like merge sort's divide-and-conquer work
    return sorted(arr)       # O(n log n)
```
</ExampleBox>

Key points:
- Common orders: O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n).
- Constants and lower-order terms are dropped: `3n + 100` is O(n).
- **Best / average / worst case** can differ (e.g. quicksort).
- Space complexity counts extra memory, not just time.
- Pick data structures whose operations match your access pattern.

<ExerciseBox title="Rank the functions" difficulty="Easy">

Order these by growth rate: `n log n`, `n!`, `n^2`, `log n`, `n`. Explain which dominates for large n.

</ExerciseBox>

<ExerciseBox title="Analyze a loop" difficulty="Medium">

Given a nested loop where the inner loop runs `n - i` times for `i` from 0 to n-1, derive its Big-O. Implement it and measure runtime growth for increasing n.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Ranked growth rates', 'Explained best/average/worst case']" storageKey="dsa/1-big-o" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-1-big-o" :cards="[
{ q: 'What does Big-O describe?', a: 'How runtime or memory grows as input size n increases.' }, { q: 'What is dropped in Big-O?', a: 'Constants and lower-order terms, e.g. 3n+100 is O(n).' }, { q: 'Order these: O(n), O(log n), O(n log n).', a: 'O(log n) &lt; O(n) &lt; O(n log n).' }, { q: 'What does space complexity count?', a: 'Extra memory used, not just time.' }
]" />

## Resources

<ResourceTable title="Big-O Resources" :resources="[
  { label: 'Big-O Cheat Sheet', platform: 'GitHub', type: 'Book', url: 'https://github.com/keon/awesome-big-o-notation' },
  { label: 'Asymptotic Analysis', platform: 'GeeksforGeeks', type: 'Tutorial', url: 'https://www.geeksforgeeks.org/analysis-of-algorithms-asymptotic-notations/' },
  { label: 'Time Complexity', platform: 'Programiz', type: 'Tutorial', url: 'https://www.programiz.com/dsa/asymptotic-notation' },
  { label: 'Big-O Explained', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=Mo4veswkLsw' },
  { label: 'LeetCode', platform: 'Official', type: 'Practice', url: 'https://leetcode.com/' }
]" />

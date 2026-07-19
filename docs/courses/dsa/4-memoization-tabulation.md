---
title: Memoization & Tabulation
---

# Dynamic Programming: Memoization & Tabulation

Dynamic programming (DP) solves problems by breaking them into overlapping subproblems and reusing their results. **Memoization** is top-down: cache results of recursive calls. **Tabulation** is bottom-up: fill a table iteratively. Both turn exponential recursion into polynomial time.

<ExampleBox title="Memoization and tabulation of Fibonacci" lang="python">

```python
from functools import lru_cache

# Top-down memoization
@lru_cache(None)
def fib_memo(n):
    return n if n < 2 else fib_memo(n - 1) + fib_memo(n - 2)

# Bottom-up tabulation
def fib_tab(n):
    if n < 2:
        return n
    dp = [0, 1]
    for i in range(2, n + 1):
        dp.append(dp[i - 1] + dp[i - 2])
    return dp[n]

print(fib_memo(50), fib_tab(50))
```
</ExampleBox>

Key points:
- Memoization avoids recomputing the same subproblem via a cache (`lru_cache`).
- Tabulation builds the answer from the smallest subproblems upward.
- Recognize DP when a problem has optimal substructure and overlapping subproblems.
- Space can often be reduced (e.g. keep only the last two values for Fibonacci).
- Classic DP: longest increasing subsequence (LIS), knapsack, edit distance.

<ExerciseBox title="Longest increasing subsequence" difficulty="Hard">

Implement `lis(nums)` returning the length of the longest strictly increasing subsequence using O(n^2) tabulation. Explain the subproblem relation.

</ExerciseBox>

<ExerciseBox title="Memoize a recurrence" difficulty="Medium">

Write a memoized recursive solution for the coin-change problem: minimum coins to make `amount` from a list of denominations.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Solved LIS with DP', 'Solved 100 LeetCode problems']" storageKey="dsa/4-memoization-tabulation" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-4-memoization-tabulation" :cards="[
{ q: 'What is memoization?', a: 'Top-down caching of recursive subproblem results.' }, { q: 'What is tabulation?', a: 'Bottom-up filling of a table iteratively.' }, { q: 'What decorator caches in Python?', a: '<code>@lru_cache</code> from functools.' }, { q: 'What makes a problem solvable by DP?', a: 'Overlapping subproblems and optimal substructure.' }
]" />

## Resources

<ResourceTable title="DP Resources" :resources="[
  { label: 'Dynamic Programming', platform: 'GeeksforGeeks', type: 'Tutorial', url: 'https://www.geeksforgeeks.org/dynamic-programming/' },
  { label: 'DP with MIT 6.006', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=OQ5jsbbEQ1Y' },
  { label: 'LeetCode', platform: 'Official', type: 'Practice', url: 'https://leetcode.com/' },
  { label: 'Python lru_cache', platform: 'Official', type: 'Docs', url: 'https://docs.python.org/3/library/functools.html#functools.lru_cache' }
]" />

---
title: Arrays & Strings
---

# Linear Structures: Arrays & Strings

Arrays (and strings, which are arrays of characters) are the most common linear structures. Two-pointer and sliding-window techniques solve many array/string problems in O(n) time and O(1) extra space.

<ExampleBox title="Two-pointer reverse and a stack" lang="python">

```python
def reverse(s):
    a = list(s)
    l, r = 0, len(a) - 1
    while l < r:
        a[l], a[r] = a[r], a[l]
        l += 1
        r -= 1
    return "".join(a)

from collections import deque
def stack_from_queue(q):
    # pop from back of deque to mimic a stack (LIFO)
    stack = deque()
    for item in q:
        stack.append(item)
    return [stack.pop() for _ in range(len(stack))]

print(reverse("hello"))          # olleh
print(stack_from_queue([1, 2, 3]))  # [3, 2, 1]
```
</ExampleBox>

Key points:
- Strings in Python are immutable; convert to a list to mutate, then `join`.
- The **two-pointer** technique shrinks a window from both ends in O(n).
- A stack is LIFO; a queue (deque) is FIFO.
- Prefer built-in `reversed()`/`[::-1]` in real code; implement manually to learn.
- Watch for off-by-one errors at the boundaries (`l < r`).

<ExerciseBox title="Two-pointer practice" difficulty="Easy">

Implement `is_palindrome(s)` that ignores case and non-alphanumeric characters, using two pointers. Test it on `"A man, a plan, a canal: Panama"`.

</ExerciseBox>

<ExerciseBox title="Sliding window" difficulty="Medium">

Given an array of integers and a target, find the length of the smallest contiguous subarray whose sum is at least the target. Use the sliding-window technique in O(n).

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Implemented two-pointer reverse', 'Built a stack from queues']" storageKey="dsa/2-arrays-strings" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-2-arrays-strings" :cards="[
{ q: 'Are Python strings mutable?', a: 'No; convert to a list to mutate, then <code>join</code>.' }, { q: 'What does the two-pointer technique use?', a: 'Two indices shrinking a window, often in O(n).' }, { q: 'What is the stack discipline?', a: 'LIFO (last in, first out).' }, { q: 'What is the queue discipline?', a: 'FIFO (first in, first out), via a deque.' }
]" />

## Resources

<ResourceTable title="Arrays & Strings Resources" :resources="[
  { label: 'Data Structures', platform: 'GeeksforGeeks', type: 'Tutorial', url: 'https://www.geeksforgeeks.org/data-structures/' },
  { label: 'Two Pointer Technique', platform: 'Programiz', type: 'Tutorial', url: 'https://www.programiz.com/dsa/two-pointer' },
  { label: 'LeetCode', platform: 'Official', type: 'Practice', url: 'https://leetcode.com/' },
  { label: 'Arrays & Strings', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=8hly31xKliM' }
]" />

---
title: Algorithms & Data Structures
---

# Core Theory: Algorithms & Data Structures

Algorithms and data structures are the heart of efficient computing. This lesson covers sorting (merge sort), graph traversal (BFS, Dijkstra), and dynamic programming — the topics that appear constantly in interviews and real systems.

<ExampleBox title="Merge sort and BFS" lang="python">

```python
from collections import deque

def merge_sort(a):
    if len(a) <= 1:
        return a
    mid = len(a) // 2
    left, right = merge_sort(a[:mid]), merge_sort(a[mid:])
    out, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            out.append(left[i]); i += 1
        else:
            out.append(right[j]); j += 1
    return out + left[i:] + right[j:]

def bfs(graph, start):
    seen, q = {start}, deque([start])
    while q:
        node = q.popleft()
        for nxt in graph[node]:
            if nxt not in seen:
                seen.add(nxt); q.append(nxt)
    return seen

print(merge_sort([5, 2, 3, 1]))
print(bfs({"A": ["B", "C"], "B": ["C"], "C": []}, "A"))
```
</ExampleBox>

Key points:
- **Merge sort** runs in O(n log n) by divide-and-conquer.
- **BFS** explores level by level using a queue; great for shortest paths in unweighted graphs.
- **Dijkstra** extends BFS with a priority queue for weighted shortest paths.
- **Big-O** describes how runtime grows with input size (covered in the DSA course).
- Dynamic programming trades memory for time by reusing subproblem results.

<ExerciseBox title="Implement Dijkstra" difficulty="Hard">

Implement Dijkstra's algorithm using a priority queue (`heapq`) to find the shortest path from a source node to all others in a weighted graph represented as an adjacency list.

</ExerciseBox>

<ExerciseBox title="Sorting analysis" difficulty="Medium">

Implement insertion sort and compare its worst-case behavior to merge sort. Explain when insertion sort can actually be faster in practice.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Implemented merge sort', 'Implemented BFS + Dijkstra']" storageKey="computer-science/5-algorithms-data-structures" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-5-algorithms-data-structures" :cards="[
{ q: 'What is the time complexity of merge sort?', a: 'O(n log n) via divide-and-conquer.' }, { q: 'Which data structure does BFS use?', a: 'A <b>queue</b> for level-by-level exploration.' }, { q: 'How does Dijkstra differ from BFS?', a: 'Dijkstra adds a priority queue for weighted shortest paths.' }, { q: 'What is dynamic programming?', a: 'Reusing subproblem results to trade memory for time.' }
]" />

## Resources

<ResourceTable title="Algorithms Resources" :resources="[
  { label: 'Teach Yourself CS — Algorithms', platform: 'Official', type: 'Docs', url: 'https://teachyourselfcs.com/#algorithms-and-data-structures' },
  { label: 'Data Structures', platform: 'GeeksforGeeks', type: 'Tutorial', url: 'https://www.geeksforgeeks.org/data-structures/' },
  { label: 'Python Sorting How-To', platform: 'Official', type: 'Docs', url: 'https://docs.python.org/3/howto/sorting.html' },
  { label: 'Graph Algorithms', platform: 'Programiz', type: 'Tutorial', url: 'https://www.programiz.com/dsa/graph-dijkstra' },
  { label: 'Algorithms Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=8hly31xKliM' }
]" />

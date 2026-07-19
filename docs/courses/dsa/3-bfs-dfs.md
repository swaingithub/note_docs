---
title: BFS & DFS
---

# Trees & Graphs: BFS & DFS

Trees and graphs model hierarchies and networks. Breadth-First Search (BFS) explores level by level using a queue and finds shortest paths in unweighted graphs; Depth-First Search (DFS) goes deep first using recursion or a stack. Dijkstra extends BFS for weighted shortest paths.

<ExampleBox title="BFS, DFS, and Dijkstra" lang="python">

```python
from collections import deque

def bfs(graph, start):
    seen, q = {start}, deque([start])
    order = []
    while q:
        n = q.popleft()
        order.append(n)
        for m in graph[n]:
            if m not in seen:
                seen.add(m)
                q.append(m)
    return order

def dfs(graph, start, seen=None):
    if seen is None:
        seen = set()
    seen.add(start)
    for m in graph[start]:
        if m not in seen:
            dfs(graph, m, seen)
    return seen

import heapq
def dijkstra(graph, start):
    dist = {start: 0}
    pq = [(0, start)]
    while pq:
        d, u = heapq.heappop(pq)
        for v, w in graph[u]:
            if d + w < dist.get(v, float("inf")):
                dist[v] = d + w
                heapq.heappush(pq, (dist[v], v))
    return dist
```
</ExampleBox>

Key points:
- BFS uses a **queue** (FIFO); DFS uses recursion or a **stack** (LIFO).
- Track visited nodes to avoid cycles and infinite loops.
- Dijkstra needs a **priority queue** and only works with non-negative weights.
- BFS gives the shortest number of edges; Dijkstra gives the shortest weighted distance.
- Trees are just connected, acyclic graphs — same traversals apply.

<ExerciseBox title="Traversals" difficulty="Medium">

Build a small graph and print the BFS and DFS visit orders. Explain why they differ for the same graph.

</ExerciseBox>

<ExerciseBox title="Shortest path" difficulty="Hard">

Implement Dijkstra to find the shortest distance from a source to every node in a weighted graph given as an adjacency list of `(neighbor, weight)` pairs.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Implemented BFS', 'Implemented Dijkstra']" storageKey="dsa/3-bfs-dfs" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-3-bfs-dfs" :cards="[
{ q: 'What data structure does BFS use?', a: 'A <b>queue</b> (FIFO) for level-by-level search.' }, { q: 'What data structure does DFS use?', a: 'Recursion or a <b>stack</b> (LIFO).' }, { q: 'Why track visited nodes?', a: 'To avoid cycles and infinite loops.' }, { q: 'What does Dijkstra require?', a: 'A priority queue and non-negative edge weights.' }
]" />

## Resources

<ResourceTable title="BFS & DFS Resources" :resources="[
  { label: 'Graph Algorithms', platform: 'GeeksforGeeks', type: 'Tutorial', url: 'https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/' },
  { label: 'BFS and DFS', platform: 'Programiz', type: 'Tutorial', url: 'https://www.programiz.com/dsa/graph-bfs' },
  { label: 'Dijkstra', platform: 'Programiz', type: 'Tutorial', url: 'https://www.programiz.com/dsa/graph-dijkstra' },
  { label: 'LeetCode', platform: 'Official', type: 'Practice', url: 'https://leetcode.com/' },
  { label: 'Graphs Explained', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=tWVWeAqZ0W0' }
]" />

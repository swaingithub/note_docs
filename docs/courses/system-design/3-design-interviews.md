---
title: Design Interviews
---

# Practice: Design Interviews

Design interviews test structured thinking, not trivia. Follow a repeatable loop: clarify **requirements**, estimate **scale**, propose a **high-level design**, then **deep-dive** into the riskiest component, and finally discuss **trade-offs**.

<ExampleBox title="Interview loop checklist" lang="yaml">

```yaml
steps:
  - clarify: functional + non-functional requirements, constraints
  - estimate: QPS, storage, bandwidth (back-of-envelope)
  - design: high-level components and data flow
  - deep_dive: bottlenecks, consistency, failure modes
  - tradeoffs: why this over alternatives, what you'd revisit
```
</ExampleBox>

Key points:
- Always **clarify scope** before drawing — interviewers reward questions.
- Back-of-the-envelope math validates your design choices.
- Start broad, then go deep on the hardest part (e.g. the data store).
- Discuss **trade-offs** (consistency vs availability, SQL vs NoSQL).
- Know core algorithms like **Raft/Paxos** for distributed coordination.

<ExerciseBox title="Design a system" difficulty="Hard">

Run the full loop for "design a rate limiter": clarify, estimate QPS, sketch the design, deep-dive the algorithm (token bucket vs sliding window), and list trade-offs.

</ExerciseBox>

<ExerciseBox title="Explain Raft" difficulty="Medium">

In your own words, explain how Raft elects a leader and replicates log entries, and why it keeps the system consistent despite failures.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Designed 10 systems', 'Explained Raft']" storageKey="system-design/3-design-interviews" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-3-design-interviews" :cards="[
{ q: 'What is the first interview step?', a: 'Clarify requirements and constraints.' }, { q: 'Why estimate scale?', a: 'Back-of-the-envelope math validates design choices.' }, { q: 'What trade-off pair is common?', a: 'Consistency vs availability (SQL vs NoSQL).' }, { q: 'What algorithms coordinate distributed logs?', a: '<b>Raft</b> or <b>Paxos</b>.' }
]" />

## Resources

<ResourceTable title="Design Interviews Resources" :resources="[
  { label: 'System Design Primer', platform: 'GitHub', type: 'Book', url: 'https://github.com/donnemartin/system-design-primer' },
  { label: 'System Design (GeeksforGeeks)', platform: 'GeeksforGeeks', type: 'Tutorial', url: 'https://www.geeksforgeeks.org/system-design/' },
  { label: 'Raft Visualized', platform: 'Official', type: 'Docs', url: 'https://raft.github.io/' },
  { label: 'Design Interview Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=UzLMhqg3_Wc' }
]" />

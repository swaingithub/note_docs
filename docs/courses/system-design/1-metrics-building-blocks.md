---
title: Metrics & Building Blocks
---

# Fundamentals: Metrics & Building Blocks

System design starts with the language of trade-offs. **Latency** is response time; **throughput** is work per unit time. Building blocks — load balancers, caches, CDNs, and queues — compose into reliable, scalable architectures.

<ExampleBox title="A typical 3-tier architecture" lang="yaml">

```yaml
client:
  -> CDN (static assets)
  -> Load Balancer
application (stateless web servers, auto-scaled):
  -> Cache (Redis) for hot reads
  -> Queue (Kafka) for async work
database (primary + read replicas)
```
</ExampleBox>

Key points:
- **Latency** is per-request time; **throughput** is requests/sec overall.
- Load balancers spread traffic and enable horizontal scaling.
- Caches (Redis) absorb hot reads; CDNs cache static content near users.
- Queues decouple producers and consumers for async, resilient work.
- Stateless services scale horizontally; state belongs in shared stores.

<ExerciseBox title="Draw an architecture" difficulty="Easy">

Sketch a 3-tier architecture for a URL shortener: client, load-balanced app servers, a cache, a queue, and a database. Label where each building block sits.

</ExerciseBox>

<ExerciseBox title="Estimate capacity" difficulty="Medium">

Given 1M daily users each making 10 requests, estimate peak requests/sec (assume 10% of daily traffic in the busiest hour) and the needed throughput.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Drew a 3-tier architecture', 'Explained the building blocks']" storageKey="system-design/1-metrics-building-blocks" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-1-metrics-building-blocks" :cards="[
{ q: 'What is latency?', a: 'The response time of a single request.' }, { q: 'What is throughput?', a: 'The total work (requests/sec) handled overall.' }, { q: 'What do load balancers provide?', a: 'Traffic spreading and horizontal scaling.' }, { q: 'What do queues decouple?', a: 'Producers and consumers for async, resilient work.' }
]" />

## Resources

<ResourceTable title="Metrics & Building Blocks Resources" :resources="[
  { label: 'System Design Primer', platform: 'GitHub', type: 'Book', url: 'https://github.com/donnemartin/system-design-primer' },
  { label: 'System Design (GeeksforGeeks)', platform: 'GeeksforGeeks', type: 'Tutorial', url: 'https://www.geeksforgeeks.org/system-design/' },
  { label: 'Scalability Basics', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=UzLMhqg3_Wc' },
  { label: 'High Scalability', platform: 'Official', type: 'Docs', url: 'http://highscalability.com/' }
]" />

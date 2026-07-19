---
title: 'Lesson 5 — Load Balancing'
---

# Lesson 5 — Load Balancing

> **Module 2 · Core Building Blocks · Lesson 5 of 15**

Load balancers spread traffic across healthy servers and are the front door of almost every scalable system.

## 1. Why

- Distribute load (avoid hot nodes)
- Hide failures (health checks remove bad nodes)
- Enable scaling (add/remove nodes behind one DNS name)
- SSL termination, compression

## 2. L4 vs L7

| | L4 (TCP/UDP) | L7 (HTTP) |
|---|--------------|-----------|
| Routing | IP/port | URL, header, cookie |
| Speed | faster | context-aware |
| Example | NLB | ALB |

## 3. Algorithms

- **Round robin** — cycle through.
- **Least connections** — send to least busy.
- **Consistent hashing** — same client → same node (sticky caches).
- **Weighted** — give stronger nodes more.

## 4. Health checks

Periodic probe (`/healthz`). Unhealthy → drained from pool. Pair with **connection draining** so in-flight requests finish.

<ExampleBox title="Diagram" lang="text">

```
        clients
           |
        [ Load Balancer ]   (health check every 5s)
        /      |      \
   app1(ok)  app2(ok)  app3(DOWN → removed)
```

</ExampleBox>

## 5. Exercises

<ExerciseBox title="Pick the LB" difficulty="Easy">
A service needs `/checkout` to always hit the same node (local cart cache) but `/browse` can go anywhere. Which routing? (Answer: L7 + sticky/consistent-hash for /checkout.)
</ExerciseBox>

<ExerciseBox title="Failure behavior" difficulty="Medium">
Describe what happens when an app node crashes mid-request with vs without connection draining. Why does draining matter for graceful deploys?
</ExerciseBox>

## 6. Self-Test (Flashcards)

<Quiz storageKey="quiz-sd-5" :cards="[
  { q: 'L4 vs L7 load balancing?', a: 'L4 routes by IP/port (fast); L7 routes by HTTP content (URL/header).' },
  { q: 'What does a health check do?', a: 'Probes nodes; unhealthy ones are removed from the pool.' },
  { q: 'When use consistent hashing?', a: 'To pin a client to the same node (sticky caches/sessions).' },
  { q: 'What is connection draining?', a: 'Letting in-flight requests finish before removing a node.' }
]" />

## 7. Resources

<ResourceTable title="Lesson 5 — further reading" :resources="[
  { label: 'ELB User Guide', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/' },
  { label: 'Load balancing (NGINX)', platform: 'Official', type: 'Docs', url: 'https://www.nginx.com/resources/glossary/load-balancing/' }
]" />

## 8. Checklist

<ProgressChecklist :items="['Explained L4 vs L7', 'Knowed routing algorithms', 'Understand health checks + draining']" storageKey="system-design/5-load-balancing" />

> Use the [Live Editor](/editor) to take notes as you learn.

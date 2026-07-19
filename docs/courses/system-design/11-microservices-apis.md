---
title: 'Lesson 11 — Microservices & APIs'
---

# Lesson 11 — Microservices & APIs

> **Module 3 · Architecture Patterns · Lesson 11 of 15**

Microservices split a system into independent, deployable services; APIs define how they talk.

## 1. Monolith vs Microservices

| | Monolith | Microservices |
|---|----------|--------------|
| Deploy | one unit | many |
| Scaling | whole app | per service |
| Coupling | high | low |
| Ops cost | low | high (network, tracing) |

> 🧠 Don't start microservices too early — the distributed cost (latency, debugging, transactions) is real.

## 2. Service communication

- **Synchronous (REST/gRPC):** simple, but creates runtime coupling + cascading failures.
- **Asynchronous (events/queues):** decoupled, resilient, but eventual consistency.

## 3. API design

- **REST**: resource-oriented, stateless, HTTP verbs.
- **gRPC**: binary, contract-first (Protobuf), low latency, streaming.
- **GraphQL**: client picks fields; avoids over/under-fetch.

## 4. Service discovery & gateway

- **Service registry** (Consul, etcd) + **discovery** so services find each other.
- **API Gateway**: single entry, auth, rate limit, routing, aggregation.

<ExampleBox title="Diagram" lang="text">

```
client -> [API Gateway] -> [auth] [users] [orders] -> (events) -> [queue] -> [workers]
```

</ExampleBox>

## 5. Distributed transactions

No easy 2PC; use **Saga** (sequence of local txns with compensating actions) or eventual consistency.

## 6. Exercises

<ExerciseBox title="Sync vs async" difficulty="Easy">
Order service must notify inventory + email. Which calls should be sync vs async, and why?
</ExerciseBox>

<ExerciseBox title="Gateway role" difficulty="Medium">
List 4 responsibilities an API Gateway handles so individual services don't have to.
</ExerciseBox>

## 7. Self-Test (Flashcards)

<Quiz storageKey="quiz-sd-11" :cards="[
  { q: 'When avoid microservices?', a: 'Early-stage/small teams — monolith is simpler; go micro when scaling/org demands it.' },
  { q: 'REST vs gRPC?', a: 'REST = simple HTTP/JSON; gRPC = binary Protobuf, fast, contract-first, streaming.' },
  { q: 'What is a Saga?', a: 'A sequence of local transactions with compensating actions to replace distributed 2PC.' },
  { q: 'API Gateway duties?', a: 'Auth, routing, rate limiting, aggregation, TLS termination.' }
]" />

## 8. Resources

<ResourceTable title="Lesson 11 — further reading" :resources="[
  { label: 'Microservices (Sam Newman)', platform: 'Book', type: 'Book', url: 'https://samnewman.io/books/building_microservices/' },
  { label: 'gRPC docs', platform: 'Official', type: 'Docs', url: 'https://grpc.io/docs/' },
  { label: 'API Gateway (AWS)', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/apigateway/latest/developerguide/' }
]" />

## 9. Checklist

<ProgressChecklist :items="['Compared monolith vs micro', 'Chose sync vs async', 'Know REST/gRPC/GraphQL', 'Explained Saga + gateway']" storageKey="system-design/11-microservices-apis" />

> Use the [Live Editor](/editor) to take notes as you learn.

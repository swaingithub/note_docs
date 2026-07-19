---
title: 'Lesson 10 — Message Queues & Streams'
---

# Lesson 10 — Message Queues & Streams

> **Module 2 · Core Building Blocks · Lesson 10 of 15**

Queues decouple producers from consumers and absorb load spikes; streams replay history.

## 1. Why queues

- **Decoupling:** producer doesn't wait for consumer.
- **Buffering:** absorb traffic bursts.
- **Resilience:** if consumer is down, messages wait.
- **Async work:** emails, image processing, webhooks.

## 2. Queue vs Stream

| | Queue (SQS, RabbitMQ) | Stream (Kafka, Kinesis) |
|---|----------------------|--------------------------|
| Consumption | message deleted after read | replayable, retained |
| Use | task offload | event sourcing, analytics |
| Order | best-effort/fifo | partitioned order |

## 3. Delivery semantics

- **At-least-once:** message may arrive twice → consumers must be **idempotent**.
- **At-most-once:** may be lost.
- **Exactly-once:** hard; usually "at-least-once + idempotent" in practice.

## 4. Dead-letter queue (DLQ)

Failed messages (after N retries) go to a DLQ for inspection/replay.

<ExampleBox title="Diagram" lang="text">

```
[producer] -> [ Queue ] -> [worker1]  (idempotent)
                         -> [worker2]
            failed x3 -> [ DLQ ]
```

</ExampleBox>

## 5. Exercises

<ExerciseBox title="Idempotency" difficulty="Easy">
A payment processor consumes from a queue with at-least-once delivery. How do you avoid double-charging when the same message arrives twice?
</ExerciseBox>

<ExerciseBox title="Queue vs stream" difficulty="Medium">
You must replay the last 24h of user events to rebuild a recommendation model. Which do you pick and why?
</ExerciseBox>

## 6. Self-Test (Flashcards)

<Quiz storageKey="quiz-sd-10" :cards="[
  { q: 'Queue vs stream?', a: 'Queue: message deleted after consume; Stream: retained + replayable (Kafka/Kinesis).' },
  { q: 'Why idempotent consumers?', a: 'At-least-once delivery can duplicate; idempotency prevents double-effects.' },
  { q: 'What is a DLQ?', a: 'Dead-letter queue: messages that fail repeatedly, parked for analysis/replay.' },
  { q: 'Exactly-once reality?', a: 'Usually achieved as at-least-once + idempotent processing, not true exactly-once.' }
]" />

## 7. Resources

<ResourceTable title="Lesson 10 — further reading" :resources="[
  { label: 'Amazon SQS', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/' },
  { label: 'Apache Kafka', platform: 'Official', type: 'Docs', url: 'https://kafka.apache.org/documentation/' },
  { label: 'Message queues (RabbitMQ)', platform: 'Official', type: 'Docs', url: 'https://www.rabbitmq.com/' }
]" />

## 8. Checklist

<ProgressChecklist :items="['Explained queue benefits', 'Queue vs stream', 'Know delivery semantics', 'Used DLQ + idempotency']" storageKey="system-design/10-queues-streams" />

> Use the [Live Editor](/editor) to take notes as you learn.

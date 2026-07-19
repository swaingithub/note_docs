---
title: 'Lesson 7 — Lambda: Serverless (SAA)'
---

# Lesson 7 — Lambda: Serverless

> **Module 3 · Managed Services · Lesson 7 of 10** &nbsp;•&nbsp; **SAA-C03 Domain 2:** Design performant & resilient architectures
> 📌 *Authoritative source:* [Lambda Developer Guide](https://docs.aws.amazon.com/lambda/latest/dg/) — verified against AWS docs.

Lambda runs code without servers. SAA tests **event sources, scaling/concurrency, limits, and integration with other services**.

## 1. Core model

- **Handler** = entry point (`lambda_handler(event, context)` in Python).
- **Runtime** = supported language; **layers** = shared code/libs.
- **Trigger** = event source (API Gateway, S3, DynamoDB Streams, SQS, EventBridge, etc.).
- **Execution role** = IAM role the function assumes (least privilege).

## 2. Limits (memorize key ones)

| Limit | Value |
|-------|-------|
| Memory | 128 MB – 10 GB |
| Timeout | up to 15 min |
| Payload (sync) | 6 MB |
| Payload (async) | 256 KB |
| Ephemeral storage (/tmp) | 512 MB – 10 GB |
| Concurrent executions (acct) | 1000 default (soft) |

CPU scales **with memory** — more memory = more vCPU. A common optimization is raising memory to cut runtime (lower cost).

## 3. Concurrency

- **Reserved concurrency** — guarantees capacity for a function, caps others.
- **Provisioned concurrency** — pre-initialized to avoid **cold starts** (critical for latency).
- **Cold start** = first invoke after idle (runtime + code init). Keep handlers lean; reuse connections outside the handler.

## 4. Async & destinations

- Async invocations (S3, SQS, EventBridge) retry with **dead-letter queue (DLQ)** / **destinations** on failure.
- **Destinations** send success/failure to SQS/SNS/EventBridge/another Lambda.

## 5. Integration & observability

- **API Gateway** → HTTP endpoints (REST/HTTP/WebSocket).
- **DynamoDB Streams / Kinesis** → stream processing (set batch size, parallelization).
- **X-Ray** traces; **CloudWatch Logs/Metrics** for custom; **CloudWatch Logs Insights** for queries.

## 6. Deploy (CLI)

<ExampleBox title="handler.py + deploy" lang="python">

```python
def lambda_handler(event, context):
    name = event.get("name", "world")
    return {"statusCode": 200, "body": f"Hello, {name}!"}
```

</ExampleBox>

<ExampleBox title="Package + create + invoke" lang="bash">

```bash
zip func.zip handler.py
aws lambda create-function --function-name hello \
  --runtime python3.12 --handler handler.lambda_handler \
  --role arn:aws:iam::123456789012:role/lambda-basic \
  --zip-file fileb://func.zip --memory-size 256 --timeout 10
aws lambda invoke --function-name hello --payload '{"name":"Ada"}' out.json
```

</ExampleBox>

## 7. Exercises

<ExerciseBox title="Hello + DLQ" difficulty="Easy">
Create the function, invoke with `{"name":"AWS"}`, confirm output. Add an SQS DLQ for async failures. Delete after.
</ExerciseBox>

<ExerciseBox title="Scheduled + X-Ray" difficulty="Medium">
Create a function writing to CloudWatch Logs; wire an EventBridge `rate(1 minute)` rule; enable **active tracing** (X-Ray) and confirm a trace appears in the X-Ray console/service map.
</ExerciseBox>

## 8. Self-Test (Flashcards)

<Quiz storageKey="quiz-aws-7" :cards="[
  { q: 'How does memory affect performance/cost?', a: 'More memory = more CPU; often lower runtime, so lower total cost.' },
  { q: 'What causes a cold start?', a: 'First invocation after idle — runtime + code init. Mitigate with provisioned concurrency.' },
  { q: 'Reserved vs provisioned concurrency?', a: 'Reserved = guaranteed cap; Provisioned = pre-warmed to avoid cold starts.' },
  { q: 'Where do failed async invokes go?', a: 'DLQ and/or Destinations (SQS/SNS/EventBridge).' },
  { q: 'Max Lambda timeout?', a: '15 minutes.' }
]" />

## 9. SAA Practice Questions

<Quiz storageKey="quiz-aws-7-exam" :cards="[
  { q: 'A latency-sensitive API uses Lambda but users report first-call delays. Fix?', a: 'Enable Provisioned Concurrency to eliminate cold starts.' },
  { q: 'Lambda must process 5 MB S3 upload events synchronously. Issue?', a: 'Sync payload limit is 6 MB, but S3 invokes async; ensure handler fits within timeout/memory.' },
  { q: 'Need guaranteed capacity for a critical function during a traffic spike. Use?', a: 'Reserved concurrency (also caps others from starving it).' },
  { q: 'Function fails intermittently; you must capture failures for reprocessing. Add?', a: 'An on-failure destination / DLQ (SQS) for async invocations.' }
]" />

## 10. Resources (authoritative)

<ResourceTable title="Lesson 7 — official references" :resources="[
  { label: 'Lambda Developer Guide', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/lambda/latest/dg/' },
  { label: 'Lambda limits', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html' },
  { label: 'Lambda concurrency', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/lambda/latest/dg/concurrency.html' },
  { label: 'Lambda destinations', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/lambda/latest/dg/invocation-async.html' },
  { label: 'Lambda with API Gateway', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/apigateway/latest/developerguide/' }
]" />

## 11. Checklist

<ProgressChecklist :items="['Wrote + deployed a function', 'Know limits (mem/timeout/payload)', 'Used a trigger', 'Configured DLQ/destinations', 'Understand cold starts']" storageKey="aws/7-lambda" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

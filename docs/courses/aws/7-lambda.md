---
title: 'Lesson 7 — Lambda: Serverless Functions'
---

# Lesson 7 — Lambda: Serverless Functions

Lambda runs code without provisioning servers. You upload a function; AWS scales it, bills per request, and you never patch an OS.

## Anatomy of a function

- **Handler** — the entry point (`index.handler` for Node, `lambda_handler` for Python).
- **Runtime** — language (Python, Node, Go, Java, …).
- **Trigger** — what invokes it (API Gateway, S3, schedule, etc.).
- **IAM role** — permissions the function assumes.

## Deploy a Python function

<ExampleBox title="handler.py" lang="python">

```python
def lambda_handler(event, context):
    name = event.get("name", "world")
    return {"statusCode": 200, "body": f"Hello, {name}!"}
```

</ExampleBox>

<ExampleBox title="Package + create" lang="bash">

```bash
zip func.zip handler.py
aws lambda create-function --function-name hello \
  --runtime python3.12 --handler handler.lambda_handler \
  --role arn:aws:iam::123456789012:role/lambda-basic \
  --zip-file fileb://func.zip
```

</ExampleBox>

## Invoke

<ExampleBox title="Invoke synchronously" lang="bash">

```bash
aws lambda invoke --function-name hello \
  --payload '{"name":"Ada"}' out.json
cat out.json
# {"statusCode": 200, "body": "Hello, Ada!"}
```

</ExampleBox>

## Triggers

- **API Gateway** — HTTP endpoints
- **S3 / DynamoDB / SQS** — event-driven
- **EventBridge (CloudWatch Events)** — schedules (`cron`)

<ExerciseBox title="Hello function" difficulty="Easy">
Create the Python function above, invoke it with `{"name":"AWS"}`, and confirm the response body says "Hello, AWS!". Then delete it.
</ExerciseBox>

<ExerciseBox title="Scheduled function" difficulty="Medium">
Create a function that writes a timestamp to CloudWatch Logs, then set an EventBridge rule with `schedule-expression "rate(1 minute)"` to invoke it. Confirm log entries appear, then clean up.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-aws-7" :cards="[
  { q: 'What is a Lambda handler?', a: 'The function entry point AWS calls, receiving event + context.' },
  { q: 'How is Lambda billed?', a: 'Per request and per GB-second of compute duration — not for idle time.' },
  { q: 'Name two common Lambda triggers.', a: 'API Gateway (HTTP) and S3/EventBridge (events/schedules).' },
  { q: 'Why does a Lambda need an IAM role?', a: 'So the function can securely call other AWS services (e.g. write to S3 or logs).' }
]" />

## Resources

<ResourceTable title="Lesson 7 — further reading" :resources="[
  { label: 'Lambda Developer Guide', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/lambda/latest/dg/' },
  { label: 'Lambda CLI reference', platform: 'Official', type: 'Docs', url: 'https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/index.html' }
]" />

## Checklist

<ProgressChecklist :items="['Wrote a handler', 'Created a Lambda function', 'Invoked it', 'Deleted it']" storageKey="aws/7-lambda" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

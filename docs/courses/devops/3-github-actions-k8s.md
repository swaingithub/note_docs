---
title: GitHub Actions & K8s
---

# CI/CD & Cloud: GitHub Actions & K8s

CI/CD automates building, testing, and deploying your code on every push. GitHub Actions runs workflows defined in YAML; Kubernetes (K8s) deploys and scales containerized apps via declarative **Deployments** and **Services** that expose them.

<ExampleBox title="CI pipeline and a K8s manifest" lang="yaml">

```yaml
# .github/workflows/ci.yml
name: ci
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci && npm test
```
```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata: { name: web }
spec:
  replicas: 3
  selector: { matchLabels: { app: web } }
  template:
    metadata: { labels: { app: web } }
    spec:
      containers:
        - { name: web, image: myapp:1.0, ports: [{ containerPort: 3000 }] }
```
</ExampleBox>

Key points:
- GitHub Actions workflows live in `.github/workflows/*.yml`.
- Each job runs on a runner (`ubuntu-latest`) with ordered `steps`.
- A K8s **Deployment** manages replica sets and rolling updates.
- A **Service** exposes pods internally or externally (ClusterIP/LoadBalancer).
- Automating tests in CI catches regressions before they reach production.

<ExerciseBox title="Add CI" difficulty="Easy">

Create a GitHub Actions workflow that installs dependencies and runs your test suite on every push to `main`.

</ExerciseBox>

<ExerciseBox title="Deploy to K8s" difficulty="Hard">

Write a Deployment with 3 replicas and a Service of type LoadBalancer for a containerized app, then apply it with `kubectl apply -f` and verify with `kubectl get pods`.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Added a CI pipeline', 'Deployed to K8s']" storageKey="devops/3-github-actions-k8s" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-3-github-actions-k8s" :cards="[
{ q: 'Where do GitHub Actions workflows live?', a: 'In <code>.github/workflows/*.yml</code>.' }, { q: 'What runs the workflow steps?', a: 'A runner such as <code>ubuntu-latest</code>.' }, { q: 'What manages replica sets in K8s?', a: 'A <b>Deployment</b>.' }, { q: 'What exposes pods externally?', a: 'A <b>Service</b> of type LoadBalancer or NodePort.' }
]" />

## Resources

<ResourceTable title="CI/CD & K8s Resources" :resources="[
  { label: 'GitHub Actions Docs', platform: 'Official', type: 'Docs', url: 'https://docs.github.com/en/actions' },
  { label: 'Kubernetes Docs', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/' },
  { label: 'Kubernetes Basics', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=d6WC5n9G_sM' },
  { label: 'CI/CD Explained', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=scEDHsr3APg' }
]" />

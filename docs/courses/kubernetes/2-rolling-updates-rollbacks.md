---
title: Rolling Updates & Rollbacks
---

# Module 2 — Pods & Workloads: Rolling Updates & Rollbacks

Deployments perform **rolling updates** by default: they gradually create new pods with the updated template while terminating old ones, keeping the service available throughout. If an update goes wrong, a **rollback** reverts to the previous revision instantly.

<ExampleBox title="Update and roll back" lang="bash">
# Change the container image and trigger a rolling update
kubectl set image deployment/web web=nginx:1.28-alpine

# Block until the new revision is fully rolled out
kubectl rollout status deployment/web

# View the revision history
kubectl rollout history deployment/web

# Roll back to the previous revision
kubectl rollout undo deployment/web

# Roll back to a specific revision
kubectl rollout undo deployment/web --to-revision=1
</ExampleBox>

You can also declare update strategy and history limits in the manifest to control how many pods are replaced at once.

<ExampleBox title="Control the rollout in YAML" lang="yaml">
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  revisionHistoryLimit: 5
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: web
          image: nginx:1.27-alpine
</ExampleBox>

Key points:
- `maxSurge` / `maxUnavailable` let you trade capacity for update speed and zero-downtime guarantees.
- Every `apply` that changes the template creates a new revision you can roll back to.
- `kubectl rollout undo` is the fastest recovery when a bad image ships.

<ExerciseBox title="Practice a safe update" difficulty="Medium">
Apply a Deployment, then `kubectl set image deployment/web web=nginx:1.28-alpine` and watch `kubectl rollout status deployment/web`. Confirm `kubectl get pods` shows new pods, then `kubectl rollout undo` and verify the pods revert to the original image.
</ExerciseBox>

<ExerciseBox title="Inspect revision history" difficulty="Easy">
After performing two updates, run `kubectl rollout history deployment/web` to list revisions. Roll back to an earlier revision and use `kubectl describe deployment web` to confirm the image field matches that revision.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-2-rolling-updates-rollbacks" :cards="[
{ q: 'How do you change a Deployment image to trigger a rollout?', a: '<code>kubectl set image deployment/web web=nginx:1.28-alpine</code>.' }, { q: 'How do you view a Deployment revision history?', a: '<code>kubectl rollout history deployment/web</code>.' }, { q: 'How do you roll back to the previous revision?', a: '<code>kubectl rollout undo deployment/web</code>.' }, { q: 'What does <code>maxSurge</code> control?', a: 'How many extra pods above the desired count may exist during a rollout.' }
]" />

## Resources

<ResourceTable title="Rolling Updates & Rollbacks" :resources="[
  { label: 'Kubernetes Official Docs', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/home/' },
  { label: 'Deployments Concept', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/concepts/workloads/controllers/deployment/' },
  { label: 'Rollback a Deployment', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#rolling-back-a-deployment' },
  { label: 'W3Schools Kubernetes', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/kubernetes/' },
  { label: 'Kubernetes Basics Tutorial', platform: 'Official', type: 'Tutorial', url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/' }
]" />

## Checklist

<ProgressChecklist :items="['Performed a rolling update', 'Checked rollout status', 'Rolled back']" storageKey="kubernetes/2-rolling-updates-rollbacks" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

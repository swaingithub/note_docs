---
title: Resource Requests & Limits
---

# Module 5 — Scaling & Health: Resource Requests & Limits

Every container should declare **requests** (the guaranteed amount the scheduler reserves) and **limits** (the maximum it may use). Requests drive scheduling decisions; limits prevent a single container from starving neighbors on a node. Setting both is essential for stable, fair multi-tenant clusters.

<ExampleBox title="Requests and limits on a container" lang="yaml">
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 2
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
          resources:
            requests:
              cpu: 100m
              memory: 128Mi
            limits:
              cpu: 500m
              memory: 256Mi
</ExampleBox>

<ExampleBox title="Observe usage" lang="bash">
# Requires metrics-server for CPU/memory columns
kubectl top pods
kubectl top nodes

# Describe a pod to see its effective QoS class
kubectl describe pod &lt;pod-name&gt;
</ExampleBox>

Key points:
- `100m` = 0.1 CPU core; memory uses binary units (Mi, Gi).
- Exceeding the memory limit triggers an OOMKill; exceeding the CPU limit is throttled, not killed.
- Pods with only limits (no requests) get requests equal to limits — set both explicitly.

<ExerciseBox title="Tune a resource budget" difficulty="Easy">
Add the requests/limits block above to a Deployment, apply it, and run `kubectl top pods` (with metrics-server) to see actual usage versus the declared budget.
</ExerciseBox>

<ExerciseBox title="Trigger a limit" difficulty="Hard">
Deploy a container with a tiny memory limit (e.g. `64Mi`) and a workload that allocates more. Observe the pod restart with `OOMKilled` via `kubectl get pods` and `kubectl describe pod`, then raise the limit to fix it.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-5-resource-requests-limits" :cards="[
{ q: 'What does a CPU request of 100m mean?', a: '0.1 of a CPU core is reserved by the scheduler.' }, { q: 'What happens when a container exceeds its memory limit?', a: 'It is OOMKilled; CPU is throttled instead of killed.' }, { q: 'What does a pod with only limits get for requests?', a: 'Requests are set equal to the limits automatically.' }, { q: 'Which command shows live pod usage?', a: '<code>kubectl top pods</code> (requires metrics-server).' }
]" />

## Resources

<ResourceTable title="Resource Requests & Limits" :resources="[
  { label: 'Kubernetes Official Docs', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/home/' },
  { label: 'Resource Management', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/' },
  { label: 'Assign Memory/CPU Resources', platform: 'Official', type: 'Tutorial', url: 'https://kubernetes.io/docs/tasks/configure-pod-container/assign-memory-resource/' },
  { label: 'GeeksforGeeks Kubernetes', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/kubernetes/' },
  { label: 'kubernetes/examples', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/kubernetes/examples' }
]" />

## Checklist

<ProgressChecklist :items="['Set requests', 'Set limits']" storageKey="kubernetes/5-resource-requests-limits" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

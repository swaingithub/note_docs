---
title: Probes (Liveness/Readiness)
---

# Module 5 — Scaling & Health: Probes (Liveness/Readiness)

**Probes** let Kubernetes check a container's health automatically. A **liveness probe** restarts a container that is deadlocked or unhealthy; a **readiness probe** controls whether a pod should receive traffic (removed from Service endpoints until ready). Use both to keep traffic off broken pods and to auto-recover stuck ones.

<ExampleBox title="Liveness and readiness probes" lang="yaml">
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
          ports:
            - containerPort: 80
          livenessProbe:
            httpGet:
              path: /healthz
              port: 80
            initialDelaySeconds: 10
            periodSeconds: 10
            failureThreshold: 3
          readinessProbe:
            httpGet:
              path: /ready
              port: 80
            initialDelaySeconds: 5
            periodSeconds: 5
</ExampleBox>

Probes also support `exec` (run a command) and `tcpSocket` (open a connection) check types.

<ExampleBox title="Exec and TCP probe variants" lang="yaml">
livenessProbe:
  exec:
    command: ["cat", "/tmp/healthy"]
  initialDelaySeconds: 15
  periodSeconds: 20
readinessProbe:
  tcpSocket:
    port: 5432
  periodSeconds: 5
</ExampleBox>

Key points:
- Liveness restarts unhealthy containers; readiness controls traffic, not restarts.
- `initialDelaySeconds` avoids false failures during slow startup.
- A passing readiness probe is what adds the pod to its Service's endpoints.

<ExerciseBox title="Add health checks to a Deployment" difficulty="Medium">
Take the `web` Deployment and add both probes hitting `httpGet` on `/healthz` and `/ready`. Apply it and watch `kubectl get pods` — note the `READY` column flips to `1/1` only after the readiness probe passes.
</ExerciseBox>

<ExerciseBox title="Observe a liveness restart" difficulty="Hard">
Configure a liveness probe that checks a file created at startup, then delete that file from inside the container (`kubectl exec`). Watch `kubectl get pods` increment the `RESTARTS` count as Kubernetes restarts the unhealthy container.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-5-probes-liveness-readiness" :cards="[
{ q: 'What does a liveness probe do?', a: 'Restarts a container that is deadlocked or unhealthy.' }, { q: 'What does a readiness probe control?', a: 'Whether a pod receives traffic (added to Service endpoints).' }, { q: 'What probe check types are supported?', a: '<code>httpGet</code>, <code>exec</code>, and <code>tcpSocket</code>.' }, { q: 'What does initialDelaySeconds avoid?', a: 'False failures during slow container startup.' }
]" />

## Resources

<ResourceTable title="Probes (Liveness/Readiness)" :resources="[
  { label: 'Kubernetes Official Docs', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/home/' },
  { label: 'Pod Lifecycle & Probes', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#container-probes' },
  { label: 'Configure Liveness/Readiness', platform: 'Official', type: 'Tutorial', url: 'https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/' },
  { label: 'GeeksforGeeks Kubernetes', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/kubernetes/' },
  { label: 'kubernetes/examples', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/kubernetes/examples' }
]" />

## Checklist

<ProgressChecklist :items="['Added liveness probe', 'Added readiness probe']" storageKey="kubernetes/5-probes-liveness-readiness" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

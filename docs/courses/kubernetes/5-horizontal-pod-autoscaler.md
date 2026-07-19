---
title: Horizontal Pod Autoscaler
---

# Module 5 — Scaling & Health: Horizontal Pod Autoscaler

The **Horizontal Pod Autoscaler (HPA)** automatically scales a Deployment's replica count up or down based on observed metrics such as CPU utilization, memory, or custom metrics. It requires **metrics-server** (or a custom metrics pipeline) to be installed so the HPA can read live usage.

<ExampleBox title="Create an HPA from the CLI" lang="bash">
# Scale web to keep average CPU near 50%, between 2 and 10 replicas
kubectl autoscale deployment web --cpu-percent=50 --min=2 --max=10

# Watch the current and target utilization
kubectl get hpa
kubectl describe hpa web
</ExampleBox>

<ExampleBox title="Declare an HPA in YAML" lang="yaml">
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 50
</ExampleBox>

Key points:
- The target workload must have CPU/memory **requests** set, or utilization cannot be computed.
- The HPA adjusts replicas to approach the target metric, never below `minReplicas` or above `maxReplicas`.
- metrics-server must be running (`kubectl top` works) for the HPA to function.

<ExerciseBox title="Autoscale under load" difficulty="Medium">
Deploy `web` with CPU requests, create the HPA above, then generate load inside a pod (e.g. a CPU-busy loop). Watch `kubectl get hpa` and `kubectl get pods` as replicas climb toward `maxReplicas`, then stop the load and watch it scale back down.
</ExerciseBox>

<ExerciseBox title="Verify metrics-server" difficulty="Easy">
Run `kubectl top nodes` and `kubectl top pods`. If metrics appear, metrics-server is installed and the HPA can read utilization; if not, install metrics-server before creating the HPA.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-5-horizontal-pod-autoscaler" :cards="[
{ q: 'What does the HPA scale based on?', a: 'Observed metrics like CPU utilization, memory, or custom metrics.' }, { q: 'What must be installed for an HPA to function?', a: '<b>metrics-server</b> (or a custom metrics pipeline).' }, { q: 'Why must target workloads set CPU requests?', a: 'Without requests, utilization cannot be computed by the HPA.' }, { q: 'How do you create an HPA from the CLI?', a: '<code>kubectl autoscale deployment web --cpu-percent=50 --min=2 --max=10</code>.' }
]" />

## Resources

<ResourceTable title="Horizontal Pod Autoscaler" :resources="[
  { label: 'Kubernetes Official Docs', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/home/' },
  { label: 'Horizontal Pod Autoscaler', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/concepts/workloads/autoscaling/' },
  { label: 'metrics-server', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/kubernetes-sigs/metrics-server' },
  { label: 'W3Schools Kubernetes', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/kubernetes/' },
  { label: 'kubernetes/examples', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/kubernetes/examples' }
]" />

## Checklist

<ProgressChecklist :items="['Created an HPA', 'Explained metrics-server']" storageKey="kubernetes/5-horizontal-pod-autoscaler" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

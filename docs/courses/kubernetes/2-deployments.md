---
title: Deployments
---

# Module 2 — Pods & Workloads: Deployments

A **Deployment** manages a set of identical Pods, called ReplicaSets, keeping a declared number of replicas running and enabling declarative updates. If a pod dies, the Deployment recreates it; if you change the image, it rolls out new pods gradually.

<ExampleBox title="A Deployment with 3 replicas" lang="yaml">
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 3
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
</ExampleBox>

<ExampleBox title="Apply and manage the Deployment" lang="bash">
# Create or update the Deployment
kubectl apply -f deploy.yaml

# Watch the rollout complete
kubectl rollout status deployment/web

# Scale up to 5 replicas
kubectl scale deployment web --replicas=5

# Verify the Deployment and its pods
kubectl get deployments
kubectl get pods -l app=web
</ExampleBox>

Key points:
- The `selector.matchLabels` must match the pod template's `labels` exactly.
- Deployments own ReplicaSets, which in turn own Pods — never edit those pods directly.
- `kubectl rollout status` blocks until the new revision is healthy.

<ExerciseBox title="Deploy and scale a web app" difficulty="Easy">
Write the Deployment above, apply it, and confirm 3 pods are `Running`. Then scale to 5, verify with `kubectl get pods -l app=web`, and scale back to 2.
</ExerciseBox>

<ExerciseBox title="Update the image" difficulty="Medium">
Change the container image in your Deployment to `nginx:1.28-alpine`, re-apply, and watch `kubectl rollout status deployment/web`. Use `kubectl get pods` to confirm the old pods are replaced by new ones with the updated image.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-k8s-deploy" :cards="[
  { q: 'What owns Pods in Kubernetes?', a: 'A ReplicaSet (created by a Deployment) owns the Pods.' },
  { q: 'What must <code>selector.matchLabels</code> match?', a: 'It must exactly match the <code>labels</code> on the Pod template.' },
  { q: 'How do you scale a Deployment?', a: '<code>kubectl scale deployment &lt;name&gt; --replicas=N</code> (or edit the manifest).' },
  { q: 'What does <code>kubectl rollout status</code> do?', a: 'It blocks until the new Deployment revision is fully rolled out and healthy.' }
]" />

## Resources

<ResourceTable title="Deployments" :resources="[
  { label: 'Kubernetes Official Docs', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/home/' },
  { label: 'Deployments Concept', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/concepts/workloads/controllers/deployment/' },
  { label: 'Kubernetes Basics Tutorial', platform: 'Official', type: 'Tutorial', url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/' },
  { label: 'W3Schools Kubernetes', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/kubernetes/' },
  { label: 'kubernetes/examples', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/kubernetes/examples' }
]" />

## Checklist

<ProgressChecklist :items="['Wrote a Deployment', 'Scaled replicas', 'Verified rollout']" storageKey="kubernetes/2-deployments" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

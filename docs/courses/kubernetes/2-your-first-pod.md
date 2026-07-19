---
title: Your First Pod
---

# Module 2 — Pods & Workloads: Your First Pod

A **Pod** is the smallest deployable unit in Kubernetes: a wrapper around one or more containers that share the same network IP and storage volumes. You almost always define pods via a manifest file so they can be version-controlled and reapplied.

<ExampleBox title="A minimal Pod manifest" lang="yaml">
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    app: nginx
spec:
  containers:
    - name: nginx
      image: nginx:1.27-alpine
      ports:
        - containerPort: 80
</ExampleBox>

Apply the manifest and verify the pod reaches the `Running` state. `port-forward` opens a tunnel from your local machine to the pod so you can test it without exposing a Service.

<ExampleBox title="Apply and probe the pod" lang="bash">
# Create the pod from the manifest
kubectl apply -f pod.yaml

# Wait for it to become Ready
kubectl get pods

# Forward local port 8080 to the container's port 80
kubectl port-forward pod/nginx 8080:80
</ExampleBox>

Key points:
- A Pod normally runs a single main container; sidecars are additional containers in the same Pod.
- `labels` are how Services and Deployments select which pods they manage.
- Pods are ephemeral — if a node dies, its pods die with it. Use a Deployment for resilience.

<ExerciseBox title="Launch and reach your first pod" difficulty="Easy">
Write the `nginx` Pod manifest above, apply it, and confirm `kubectl get pods` shows `Running`. Then `kubectl port-forward pod/nginx 8080:80` and curl `http://localhost:8080` to see the nginx welcome page.
</ExerciseBox>

<ExerciseBox title="Shell into the container" difficulty="Easy">
With the nginx pod running, run `kubectl exec -it nginx -- sh` and use `wget -qO- localhost` to verify the server responds from inside the container. Exit and delete the pod with `kubectl delete pod nginx`.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-2-your-first-pod" :cards="[
{ q: 'What command applies a Pod manifest?', a: '<code>kubectl apply -f pod.yaml</code> creates the Pod.' }, { q: 'How do you open a local tunnel to a pod port?', a: '<code>kubectl port-forward pod/nginx 8080:80</code>.' }, { q: 'What must pods have so Services can select them?', a: 'Matching <code>labels</code> that the Service selector targets.' }, { q: 'Why use a Deployment instead of a bare Pod?', a: 'Pods are ephemeral; a Deployment recreates them for resilience.' }
]" />

## Resources

<ResourceTable title="Your First Pod" :resources="[
  { label: 'Pod Overview', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/concepts/workloads/pods/' },
  { label: 'Kubernetes Basics Tutorial', platform: 'Official', type: 'Tutorial', url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/' },
  { label: 'W3Schools Kubernetes', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/kubernetes/' },
  { label: 'GeeksforGeeks Kubernetes', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/kubernetes/' },
  { label: 'kubernetes/examples', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/kubernetes/examples' }
]" />

## Checklist

<ProgressChecklist :items="['Wrote a Pod manifest', 'Applied it', 'Port-forwarded to test']" storageKey="kubernetes/2-your-first-pod" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

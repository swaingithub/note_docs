---
title: kubectl Essentials
---

# Module 1 — Concepts & Setup: kubectl Essentials

`kubectl` is how you create, inspect, and debug every object in a cluster. The command grammar is consistent: `kubectl <verb> <resource> [name] [flags]`. Mastering a handful of verbs (`get`, `describe`, `logs`, `exec`, `apply`, `delete`) covers the majority of daily work.

<ExampleBox title="Inspect and debug resources" lang="bash">
# List pods and nodes across the cluster
kubectl get pods
kubectl get nodes -o wide

# Show full details of a single pod (events, IP, container states)
kubectl describe pod nginx

# Stream logs from a container
kubectl logs nginx

# Run a shell inside a running container
kubectl exec -it nginx -- sh
</ExampleBox>

<ExampleBox title="Apply and delete declarative manifests" lang="bash">
# Create or update objects from a YAML file
kubectl apply -f file.yaml

# Delete objects defined in a file
kubectl delete -f file.yaml

# Scope commands to a namespace; -o wide shows extra columns
kubectl get pods -n kube-system -o wide
</ExampleBox>

Key points:
- Prefer `apply` (declarative) over imperative commands so manifests stay in version control.
- `describe` shows the Events section, which is the first place to look when something is stuck.
- `-n/--namespace` and `-o wide` are the two flags you will reach for constantly.

<ExerciseBox title="Investigate a failing pod" difficulty="Medium">
Create a pod from a manifest that points to a non-existent image (e.g. `nginx:does-not-exist`). Use `kubectl get pods -o wide` and `kubectl describe pod &lt;name&gt;` to find the `ImagePullBackOff` reason in the Events, then fix the image and re-apply.
</ExerciseBox>

<ExerciseBox title="Log and exec round-trip" difficulty="Easy">
Launch the `nginx:1.27-alpine` pod, fetch its logs with `kubectl logs`, then `kubectl exec -it &lt;pod&gt; -- sh` and run `wget -qO- localhost` to confirm the web server responds from inside the container.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-1-kubectl-essentials" :cards="[
{ q: 'What is the kubectl command grammar?', a: '<code>kubectl &lt;verb&gt; &lt;resource&gt; [name] [flags]</code>, e.g. <code>kubectl get pods</code>.' }, { q: 'How do you stream container logs?', a: '<code>kubectl logs &lt;pod&gt;</code> streams logs from a container.' }, { q: 'How do you run a shell inside a container?', a: '<code>kubectl exec -it &lt;pod&gt; -- sh</code> opens an interactive shell.' }, { q: 'Why prefer <code>apply</code> over imperative commands?', a: 'Apply is declarative, so manifests stay in version control and can be re-applied.' }
]" />

## Resources

<ResourceTable title="kubectl Essentials" :resources="[
  { label: 'Kubernetes Official Docs', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/home/' },
  { label: 'kubectl Cheat Sheet', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/reference/kubectl/cheatsheet/' },
  { label: 'Overview of kubectl', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/reference/kubectl/' },
  { label: 'W3Schools Kubernetes', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/kubernetes/' },
  { label: 'Kubernetes Basics Tutorial', platform: 'Official', type: 'Tutorial', url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/' }
]" />

## Checklist

<ProgressChecklist :items="['Listed pods/nodes', 'Described a resource', 'Used exec/logs']" storageKey="kubernetes/1-kubectl-essentials" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

---
title: What is Kubernetes?
---

# Module 1 — Concepts & Setup: What is Kubernetes?

Kubernetes (K8s) is a container orchestrator that manages the deployment, scaling, and healing of containerized applications across a group of machines called a cluster. It abstracts away individual servers so you declare *desired state* and Kubernetes continuously works to make reality match it.

The smallest deployable unit is a **Pod** — one or more containers that share storage and network and are scheduled together on a **Node** (a worker machine, VM, or physical host). A **Cluster** is the sum of the control plane and its nodes. The **Control Plane** runs the brain: the API server (front door for all commands), the scheduler (places pods on nodes), the controller-manager (reconciles desired vs actual state), and etcd (the clustered key-value store of all cluster state).

<ExampleBox title="See the core objects in your cluster" lang="bash">
# List the nodes backing your cluster
kubectl get nodes

# View the control-plane components running as pods
kubectl get pods -n kube-system

# Inspect a node's capacity and assigned pods
kubectl describe node &lt;node-name&gt;
</ExampleBox>

Why teams adopt Kubernetes:
- **Self-healing**: failed containers are restarted, unhealthy nodes are drained.
- **Horizontal scaling**: add replicas in seconds (manually or automatically).
- **Service discovery & load balancing** built in.
- **Rolling updates & rollbacks** with zero downtime.

<ExerciseBox title="Map the mental model" difficulty="Easy">
Draw (or write out) the hierarchy Cluster + Control Plane + Nodes + Pods + Containers for an app you know. Then run `kubectl get nodes` and `kubectl get pods -A` to connect the abstract model to real objects running on your cluster.
</ExerciseBox>

<ExerciseBox title="Inspect control plane components" difficulty="Medium">
Run `kubectl get pods -n kube-system -o wide` and identify which pods correspond to the API server, scheduler, and controller-manager. Read the description of one to see how Kubernetes runs its own control plane as managed workloads.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-1-what-is-kubernetes" :cards="[
{ q: 'What is the smallest deployable unit in Kubernetes?', a: 'A <b>Pod</b> wraps one or more containers that share network and storage.' }, { q: 'What component is the front door for all kubectl commands?', a: 'The <b>API server</b> in the control plane receives every command.' }, { q: 'What does the scheduler do?', a: 'It places pending pods onto suitable nodes.' }, { q: 'Which store holds all cluster state?', a: '<code>etcd</code>, the clustered key-value store of the control plane.' }
]" />

## Resources

<ResourceTable title="What is Kubernetes?" :resources="[
  { label: 'Kubernetes Official Docs', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/home/' },
  { label: 'Pod Overview', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/concepts/workloads/pods/' },
  { label: 'Kubernetes Basics Tutorial', platform: 'Official', type: 'Tutorial', url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/' },
  { label: 'GeeksforGeeks Kubernetes', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/kubernetes/' },
  { label: 'Kubernetes Explained (Video)', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=d6WC5n9G_sM' }
]" />

## Checklist

<ProgressChecklist :items="['Explained K8s purpose', 'Named the core objects', 'Explained control plane parts']" storageKey="kubernetes/1-what-is-kubernetes" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

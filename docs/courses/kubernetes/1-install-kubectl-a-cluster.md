---
title: Install kubectl & a Cluster
---

# Module 1 — Concepts & Setup: Install kubectl & a Cluster

Kubernetes is controlled through the `kubectl` CLI, which talks to the cluster's API server. To practice locally you need a cluster; `kind` (Kubernetes IN Docker) spins up a real cluster inside Docker containers, which is perfect for learning and CI.

<ExampleBox title="Install kubectl" lang="bash">
# macOS
brew install kubectl

# Linux
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# Windows (chocolatey)
choco install kubernetes-cli

# Verify the client binary
kubectl version --client
</ExampleBox>

<ExampleBox title="Create a local cluster with kind" lang="bash">
# Install kind
curl -Lo ./kind https://kind.sigs.k8s.io/dl/latest/kind-linux-amd64
chmod +x kind && sudo mv kind /usr/local/bin/

# Create a cluster named dev
kind create cluster --name dev

# Confirm the control plane is reachable
kubectl cluster-info
</ExampleBox>

A `kubeconfig` file stores your cluster, user, and namespace as a **context**. You can list and switch between contexts when you manage multiple clusters.

<ExampleBox title="Work with contexts" lang="bash">
# List every configured context
kubectl config get-contexts

# Switch to the kind cluster you just created
kubectl config use-context kind-dev

# Show the currently active context
kubectl config current-context
</ExampleBox>

Key points:
- `kubectl` is the single control plane client you will use for everything.
- `kind`, `minikube`, and managed clouds (EKS/GKE/AKS) all expose the same API.
- Always verify `kubectl version --client` and `kubectl cluster-info` after setup.

<ExerciseBox title="Set up your local playground" difficulty="Easy">
Install `kubectl` and `kind` on your machine. Create a cluster named `dev`, then run `kubectl get nodes` and confirm you see one control-plane node in the `Ready` state. Finally, list your contexts and switch to `kind-dev`.
</ExerciseBox>

<ExerciseBox title="Clean up and recreate" difficulty="Easy">
Delete your `dev` cluster with `kind delete cluster --name dev`, then recreate it and confirm `kubectl cluster-info` resolves the API server URL again. This proves your local tooling is repeatable.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-1-install-kubectl-a-cluster" :cards="[
{ q: 'What CLI controls a Kubernetes cluster?', a: 'The <code>kubectl</code> CLI talks to the cluster API server.' }, { q: 'Which command creates a local cluster with kind?', a: '<code>kind create cluster --name dev</code> spins up a real cluster in Docker.' }, { q: 'How do you list configured cluster contexts?', a: '<code>kubectl config get-contexts</code> lists every context; <code>kubectl config use-context</code> switches.' }, { q: 'What does <code>kubectl cluster-info</code> do?', a: 'It confirms the control plane API server is reachable.' }
]" />

## Resources

<ResourceTable title="Install kubectl & a Cluster" :resources="[
  { label: 'Kubernetes Official Docs', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/home/' },
  { label: 'Install Tools (kubectl)', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/tasks/tools/' },
  { label: 'kind Quick Start', platform: 'GitHub', type: 'Docs', url: 'https://github.com/kubernetes-sigs/kind' },
  { label: 'Kubernetes Basics Tutorial', platform: 'Official', type: 'Tutorial', url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/' },
  { label: 'W3Schools Kubernetes', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/kubernetes/' }
]" />

## Checklist

<ProgressChecklist :items="['Installed kubectl', 'Created a kind cluster', 'Switched context']" storageKey="kubernetes/1-install-kubectl-a-cluster" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

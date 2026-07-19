---
title: GitOps with Argo CD
---

# Module 6 — GitOps & Production: GitOps with Argo CD

**GitOps** is a continuous delivery pattern where Git is the single source of truth for cluster state, and a controller continuously reconciles the cluster to match the repo (pull-based CD). **Argo CD** is a popular GitOps tool: you declare an `Application` pointing at a Git repo, and Argo CD syncs manifests into the cluster, alerting you when reality drifts from Git.

<ExampleBox title="Install Argo CD" lang="bash">
# Install the Argo CD control plane into its own namespace
kubectl create namespace argocd
kubectl apply -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Get the initial admin password
kubectl -n argocd get secret argocd-initial-admin-secret \
  -o jsonpath="{.data.password}" | base64 -d
</ExampleBox>

<ExampleBox title="Define an Application" lang="yaml">
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: web-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/your-org/your-repo.git
    targetRevision: HEAD
    path: manifests
  destination:
    server: https://kubernetes.default.svc
    namespace: default
  syncPolicy:
    automated:
      selfHeal: true
      prune: true
</ExampleBox>

<ExampleBox title="Sync and observe" lang="bash">
# Log in and list Applications
argocd app list
argocd app get web-app

# Force a sync from Git to cluster
argocd app sync web-app
</ExampleBox>

Key points:
- Git is the source of truth; Argo CD detects drift and can auto-heal the cluster.
- `selfHeal` reverts manual changes back to Git state; `prune` deletes objects removed from Git.
- Argo CD itself runs as normal Kubernetes workloads — declarative and observable.

<ExerciseBox title="Sync a repo with Argo CD" difficulty="Hard">
Install Argo CD, then create the `Application` above pointing at a public demo repo (e.g. `https://github.com/argoproj/argocd-example-apps`). Run `argocd app sync web-app` and confirm `kubectl get pods` in the target namespace shows the deployed resources, and that the Argo CD UI marks the app `Synced`.
</ExerciseBox>

<ExerciseBox title="Observe drift and self-heal" difficulty="Medium">
After syncing, manually delete a synced Deployment with `kubectl delete deployment &lt;name&gt;`. Watch Argo CD mark the app `OutOfSync` and, with `selfHeal: true`, automatically recreate it — proving Git remains the source of truth.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-6-gitops-with-argo-cd" :cards="[
{ q: 'What is GitOps?', a: 'Git is the source of truth; a controller reconciles the cluster to match the repo.' }, { q: 'What is an Argo CD Application?', a: 'A resource pointing at a Git repo and target cluster/namespace to sync.' }, { q: 'What does selfHeal do?', a: 'Reverts manual cluster changes back to the Git-defined state.' }, { q: 'How do you force a sync?', a: '<code>argocd app sync web-app</code> pulls from Git to the cluster.' }
]" />

## Resources

<ResourceTable title="GitOps with Argo CD" :resources="[
  { label: 'Kubernetes Official Docs', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/home/' },
  { label: 'Argo CD Documentation', platform: 'Official', type: 'Docs', url: 'https://argo-cd.readthedocs.io/' },
  { label: 'GitOps with Argo CD', platform: 'Official', type: 'Tutorial', url: 'https://argo-cd.readthedocs.io/en/stable/getting_started/' },
  { label: 'Argo CD on GitHub', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/argoproj/argo-cd' },
  { label: 'Kubernetes Basics Tutorial', platform: 'Official', type: 'Tutorial', url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/' }
]" />

## Checklist

<ProgressChecklist :items="['Explained GitOps', 'Installed Argo CD', 'Defined an Application']" storageKey="kubernetes/6-gitops-with-argo-cd" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

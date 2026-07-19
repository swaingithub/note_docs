---
title: Helm Basics
---

# Module 6 — GitOps & Production: Helm Basics

**Helm** is the package manager for Kubernetes. It packages applications as **charts** — collections of templated YAML parameterized by `values.yaml`. Charts let you install, upgrade, and roll back complex apps (databases, ingress controllers) with a single command and versioned releases.

<ExampleBox title="Install and manage a chart" lang="bash">
# Add a chart repository
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

# Install a PostgreSQL release named mydb
helm install mydb bitnami/postgresql

# Override values and upgrade the release
helm upgrade mydb bitnami/postgresql --set auth.password=secret

# List and inspect releases
helm list
helm status mydb
</ExampleBox>

<ExampleBox title="A minimal chart structure" lang="yaml">
# Chart.yaml
apiVersion: v2
name: myapp
version: 0.1.0
appVersion: "1.0"
---
# values.yaml
replicaCount: 2
image:
  repository: nginx
  tag: 1.27-alpine
---
# templates/deployment.yaml (excerpt)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: &#123;&#123; .Release.Name &#125;&#125;-web
spec:
  replicas: &#123;&#123; .Values.replicaCount &#125;&#125;
  template:
    spec:
      containers:
        - name: web
          image: "&#123;&#123; .Values.image.repository &#125;&#125;:&#123;&#123; .Values.image.tag &#125;&#125;"
</ExampleBox>

Key points:
- `helm install` creates a tracked **release**; `helm upgrade`/`rollback` manage its lifecycle.
- `values.yaml` + templates separate config from boilerplate — no copy-paste manifests.
- `helm rollback mydb <revision>` reverts a release without re-applying files manually.

<ExerciseBox title="Install a database with Helm" difficulty="Easy">
Add the Bitnami repo and `helm install mydb bitnami/postgresql`. Run `helm list` and `kubectl get pods -l app.kubernetes.io/name=postgresql` to confirm Helm created the Deployment, Service, and Secret for you.
</ExerciseBox>

<ExerciseBox title="Package your own chart" difficulty="Hard">
Run `helm create myapp`, set `replicaCount` and `image.tag` in `values.yaml`, then `helm install demo ./myapp`. Change a value, `helm upgrade demo ./myapp`, and `helm rollback demo 1` to see versioned releases in action.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-6-helm-basics" :cards="[
{ q: 'What is a Helm chart?', a: 'A package of templated YAML parameterized by <code>values.yaml</code>.' }, { q: 'How do you install a chart?', a: '<code>helm install mydb bitnami/postgresql</code> creates a tracked release.' }, { q: 'How do you upgrade a release with new values?', a: '<code>helm upgrade mydb bitnami/postgresql --set auth.password=secret</code>.' }, { q: 'How do you revert a release?', a: '<code>helm rollback mydb &lt;revision&gt;</code> reverts without manual file edits.' }
]" />

## Resources

<ResourceTable title="Helm Basics" :resources="[
  { label: 'Kubernetes Official Docs', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/home/' },
  { label: 'Helm Documentation', platform: 'Official', type: 'Docs', url: 'https://helm.sh/docs/' },
  { label: 'Helm Quickstart Guide', platform: 'Official', type: 'Tutorial', url: 'https://helm.sh/docs/intro/quickstart/' },
  { label: 'Artifact Hub (charts)', platform: 'Official', type: 'Tutorial', url: 'https://artifacthub.io/' },
  { label: 'kubernetes/examples', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/kubernetes/examples' }
]" />

## Checklist

<ProgressChecklist :items="['Added a Helm repo', 'Installed a chart', 'Upgraded a release']" storageKey="kubernetes/6-helm-basics" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

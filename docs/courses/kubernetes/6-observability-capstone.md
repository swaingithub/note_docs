---
title: Observability & Capstone
---

# Module 6 — GitOps & Production: Observability & Capstone

**Observability** means understanding a system's internal state from its external outputs — metrics, logs, and traces. In Kubernetes you typically run the **Prometheus** stack for metrics, **Grafana** for dashboards, and **Loki** (or Elasticsearch/Fluent Bit) for centralized logs. Together they let you alert on SLO breaches and debug incidents across hundreds of pods.

<ExampleBox title="Deploy Prometheus & Grafana (kube-prometheus-stack)" lang="bash">
# Add the Prometheus community repo
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# Install the full monitoring stack
helm install monitoring prometheus-community/kube-prometheus-stack \
  --namespace monitoring --create-namespace

# Port-forward Grafana to browse dashboards
kubectl -n monitoring port-forward svc/monitoring-grafana 3000:80
</ExampleBox>

<ExampleBox title="Query metrics with PromQL" lang="bash">
# Average CPU usage across web pods (via Prometheus port-forward)
kubectl -n monitoring port-forward svc/monitoring-kube-prometheus-prometheus 9090:9090

# Example PromQL: pod CPU usage rate
# rate(container_cpu_usage_seconds_total{pod=~"web.*"}[5m])
</ExampleBox>

For the **capstone**, build a 3-tier application — web front end, API service, and database — wiring together everything from the course: Deployments, Services, Ingress, ConfigMaps/Secrets, PVCs, probes, and an HPA. Then deliver it through Helm or Argo CD and document the architecture in a README.

<ExampleBox title="Capstone architecture sketch" lang="yaml">
# A production-grade app ties these objects together:
# - web Deployment + Service + Ingress (external traffic)
# - api Deployment + Service (internal only) with probes + HPA
# - db StatefulSet + PVC + Secret (credentials)
# - ConfigMap for LOG_LEVEL consumed by api
# - all packaged by a Helm chart or synced by Argo CD
</ExampleBox>

Key points:
- Metrics (Prometheus) + dashboards (Grafana) + logs (Loki) = the three pillars of observability.
- The capstone should demonstrate self-healing, scaling, config injection, and GitOps delivery end to end.
- Document decisions in a README so the design is reproducible by others.

<ExerciseBox title="Stand up observability" difficulty="Medium">
Install the kube-prometheus-stack via Helm, port-forward Grafana, and open the built-in "Kubernetes / Compute Resources / Namespace" dashboard. Verify your running pods appear with live CPU and memory metrics.
</ExerciseBox>

<ExerciseBox title="Build the 3-tier capstone" difficulty="Hard">
Create a repo with manifests (or a Helm chart) for a web + API + DB stack using Deployments, Services, Ingress, ConfigMap, Secret, PVC, probes, and an HPA. Deploy it to your cluster, confirm every tier is reachable, then either package it with Helm or sync it via Argo CD and write a README describing the architecture.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-6-observability-capstone" :cards="[
{ q: 'What are the three pillars of observability?', a: 'Metrics (Prometheus), dashboards/logs (Grafana/Loki), and traces.' }, { q: 'How do you deploy the Prometheus stack via Helm?', a: '<code>helm install monitoring prometheus-community/kube-prometheus-stack</code>.' }, { q: 'What query language does Prometheus use?', a: '<b>PromQL</b>, e.g. <code>rate(container_cpu_usage_seconds_total[5m])</code>.' }, { q: 'What should the capstone tie together?', a: 'Deployments, Services, Ingress, ConfigMaps/Secrets, PVCs, probes, and an HPA.' }
]" />

## Resources

<ResourceTable title="Observability & Capstone" :resources="[
  { label: 'Kubernetes Official Docs', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/home/' },
  { label: 'Prometheus Docs', platform: 'Official', type: 'Docs', url: 'https://prometheus.io/docs/introduction/overview/' },
  { label: 'Grafana Documentation', platform: 'Official', type: 'Docs', url: 'https://grafana.com/docs/' },
  { label: 'Kubernetes Basics Tutorial', platform: 'Official', type: 'Tutorial', url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/' },
  { label: 'kubernetes/examples', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/kubernetes/examples' },
  { label: 'freeCodeCamp', platform: 'freeCodeCamp', type: 'Practice', url: 'https://www.freecodecamp.org/' }
]" />

## Checklist

<ProgressChecklist :items="['Deployed Prometheus/Grafana', 'Built 3-tier app', 'Deployed via GitOps', 'Wrote README']" storageKey="kubernetes/6-observability-capstone" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

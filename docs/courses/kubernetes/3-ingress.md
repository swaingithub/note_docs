---
title: Ingress
---

# Module 3 — Networking & Services: Ingress

An **Ingress** is an API object that manages external HTTP/HTTPS access to Services, providing URL routing, name-based virtual hosting, and TLS termination. It is a layer-7 (HTTP) router that sits in front of your Services. An **Ingress controller** (such as ingress-nginx) is the actual workload that reads Ingress rules and configures the underlying proxy.

<ExampleBox title="Route a host/path to a Service" lang="yaml">
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  rules:
    - host: app.local
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: web
                port:
                  number: 80
</ExampleBox>

<ExampleBox title="Enable TLS and apply" lang="yaml">
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-ingress-tls
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - app.local
      secretName: app-tls
  rules:
    - host: app.local
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: web
                port:
                  number: 80
</ExampleBox>

<ExampleBox title="Apply and verify" lang="bash">
# Requires an ingress controller installed first
kubectl apply -f ingress.yaml

# Inspect the assigned address and rules
kubectl get ingress web-ingress
kubectl describe ingress web-ingress
</ExampleBox>

Key points:
- Ingress is layer-7; use it for path/host-based routing and TLS, not raw TCP.
- `pathType` is required: `Prefix`, `Exact`, or `ImplementationSpecific`.
- Without an Ingress controller installed, Ingress objects do nothing.

<ExerciseBox title="Expose an app via Ingress" difficulty="Medium">
Install ingress-nginx on your cluster, deploy the `web` Deployment + ClusterIP Service, then create the Ingress above. Add `app.local` to your `/etc/hosts` (or use `--resolve`) and curl `http://app.local` to reach the backend through the Ingress.
</ExerciseBox>

<ExerciseBox title="Add TLS termination" difficulty="Hard">
Create a self-signed TLS Secret named `app-tls` for `app.local`, then extend your Ingress with the `tls` block above. Confirm `kubectl get ingress` shows the TLS host and that `curl -k https://app.local` succeeds.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-3-ingress" :cards="[
{ q: 'What layer does Ingress operate at?', a: 'Layer 7 (HTTP), for path/host routing and TLS termination.' }, { q: 'What must exist for an Ingress to work?', a: 'An <b>Ingress controller</b> (e.g. ingress-nginx) must be installed.' }, { q: 'Which field is required on every Ingress path?', a: '<code>pathType</code>: <code>Prefix</code>, <code>Exact</code>, or <code>ImplementationSpecific</code>.' }, { q: 'How do you add TLS to an Ingress?', a: 'Add a <code>tls</code> block referencing a Secret holding the certificate.' }
]" />

## Resources

<ResourceTable title="Ingress" :resources="[
  { label: 'Kubernetes Official Docs', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/home/' },
  { label: 'Ingress Concept', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/concepts/services-networking/ingress/' },
  { label: 'Ingress Controllers', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/' },
  { label: 'W3Schools Kubernetes', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/kubernetes/' },
  { label: 'kubernetes/examples', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/kubernetes/examples' }
]" />

## Checklist

<ProgressChecklist :items="['Wrote an Ingress', 'Explained ingress controller']" storageKey="kubernetes/3-ingress" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

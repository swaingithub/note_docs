---
title: ClusterIP & DNS
---

# Module 3 — Networking & Services: ClusterIP & DNS

**ClusterIP** is the default Service type: it assigns a virtual IP (the clusterIP) reachable only from inside the cluster, and registers a stable DNS name. Kubernetes runs **CoreDNS** so any pod can resolve other Services by name without knowing IPs.

<ExampleBox title="A ClusterIP Service" lang="yaml">
apiVersion: v1
kind: Service
metadata:
  name: web
spec:
  type: ClusterIP
  selector:
    app: web
  ports:
    - port: 80
      targetPort: 80
</ExampleBox>

<ExampleBox title="Resolve and call the Service by DNS" lang="bash">
# Apply the Service (assuming pods labeled app=web exist)
kubectl apply -f service.yaml

# From another pod, the Service is reachable at:
#   web.default.svc.cluster.local   (fully qualified)
#   web.default                     (namespace-scoped shorthand)
#   web                             (same-namespace shorthand)

# Test DNS resolution from a temporary pod
kubectl run curl --rm -it --image=curlimages/curl -- sh
# inside: curl http://web.default.svc.cluster.local
</ExampleBox>

Key points:
- The DNS name format is `<service>.<namespace>.svc.cluster.local`.
- CoreDNS automatically creates records for every Service and pod (pod DNS is opt-in via `subdomain`).
- ClusterIP keeps backend traffic internal; combine with Ingress for external access.

<ExerciseBox title="Resolve a Service by name" difficulty="Medium">
Create the `web` Deployment and the ClusterIP Service above. Launch a temporary `curlimages/curl` pod and `curl http://web.default.svc.cluster.local` to prove in-cluster DNS resolves and routes to a backend pod.
</ExerciseBox>

<ExerciseBox title="Inspect DNS records" difficulty="Easy">
Run `kubectl get svc web` to capture the clusterIP, then `kubectl exec` into a pod and run `nslookup web.default.svc.cluster.local` to confirm CoreDNS returns that IP.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-3-clusterip-dns" :cards="[
{ q: 'What is the default Service type?', a: '<b>ClusterIP</b>, reachable only from inside the cluster.' }, { q: 'What is the in-cluster DNS name format?', a: '<code>&lt;service&gt;.&lt;namespace&gt;.svc.cluster.local</code>.' }, { q: 'Which component provides in-cluster DNS?', a: '<b>CoreDNS</b> creates records for every Service.' }, { q: 'How do you test DNS from a temporary pod?', a: '<code>kubectl run curl --rm -it --image=curlimages/curl -- sh</code> then curl the name.' }
]" />

## Resources

<ResourceTable title="ClusterIP & DNS" :resources="[
  { label: 'Kubernetes Official Docs', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/home/' },
  { label: 'Service Concept', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/concepts/services-networking/service/' },
  { label: 'DNS for Services & Pods', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/' },
  { label: 'W3Schools Kubernetes', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/kubernetes/' },
  { label: 'kubernetes/examples', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/kubernetes/examples' }
]" />

## Checklist

<ProgressChecklist :items="['Wrote a Service', 'Explained in-cluster DNS']" storageKey="kubernetes/3-clusterip-dns" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

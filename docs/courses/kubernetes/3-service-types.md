---
title: Service Types
---

# Module 3 — Networking & Services: Service Types

A **Service** gives a stable IP and DNS name to a set of Pods, load-balancing traffic across them and decoupling clients from changing pod IPs. Kubernetes offers four Service types for different exposure needs.

- **ClusterIP** (default): internal-only virtual IP reachable only inside the cluster.
- **NodePort**: exposes the Service on a static port (30000–32767) on every node's IP.
- **LoadBalancer**: provisions a cloud load balancer that forwards external traffic to the nodes.
- **ExternalName**: returns a CNAME DNS record to an external hostname.

<ExampleBox title="Expose a Deployment as a Service" lang="bash">
# Create a ClusterIP Service fronting the web Deployment
kubectl expose deployment web --port=80 --target-port=80 --type=ClusterIP

# List Services and their assigned types/ports
kubectl get svc
</ExampleBox>

<ExampleBox title="Service type comparison in YAML" lang="yaml">
apiVersion: v1
kind: Service
metadata:
  name: web-nodeport
spec:
  type: NodePort
  selector:
    app: web
  ports:
    - port: 80
      targetPort: 80
      nodePort: 30080
---
apiVersion: v1
kind: Service
metadata:
  name: web-external
spec:
  type: ExternalName
  externalName: api.example.com
</ExampleBox>

Key points:
- Pods are ephemeral; a Service's `selector` keeps routing to whatever pods match the labels.
- `targetPort` is the container port; `port` is the Service port clients use.
- Use ClusterIP for internal traffic, NodePort/LoadBalancer for external, ExternalName for off-cluster DNS.

<ExerciseBox title="Expose and reach a Service" difficulty="Easy">
Create the `web` Deployment, then `kubectl expose deployment web --port=80 --type=ClusterIP`. Run `kubectl get svc web` and `kubectl describe svc web` to see the selector and endpoints populated with pod IPs.
</ExerciseBox>

<ExerciseBox title="Compare Service types" difficulty="Medium">
Using a kind or cloud cluster, expose the same Deployment as a `NodePort` and a `LoadBalancer`. Compare the `kubectl get svc` output — note the external IP field for LoadBalancer and the high node port for NodePort — and explain when you would pick each.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-3-service-types" :cards="[
{ q: 'Name the four Kubernetes Service types.', a: 'ClusterIP, NodePort, LoadBalancer, and ExternalName.' }, { q: 'What port range does NodePort use?', a: '30000-32767 on every node IP.' }, { q: 'What does ExternalName return?', a: 'A CNAME DNS record to an external hostname.' }, { q: 'What is the difference between port and targetPort?', a: '<code>port</code> is what clients use; <code>targetPort</code> is the container port.' }
]" />

## Resources

<ResourceTable title="Service Types" :resources="[
  { label: 'Kubernetes Official Docs', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/home/' },
  { label: 'Service Concept', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/concepts/services-networking/service/' },
  { label: 'Service Types', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types' },
  { label: 'W3Schools Kubernetes', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/kubernetes/' },
  { label: 'kubernetes/examples', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/kubernetes/examples' }
]" />

## Checklist

<ProgressChecklist :items="['Explained each Service type', 'Exposed a Deployment']" storageKey="kubernetes/3-service-types" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

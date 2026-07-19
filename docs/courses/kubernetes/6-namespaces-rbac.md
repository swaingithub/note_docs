---
title: Namespaces & RBAC
---

# Module 6 — GitOps & Production: Namespaces & RBAC

**Namespaces** partition a single cluster into virtual sub-clusters, providing scope for names, resource quotas, and access control — ideal for separating `team-a`, `team-b`, or `prod`/`staging`. **RBAC** (Role-Based Access Control) authorizes which users and ServiceAccounts can perform which API verbs on which resources, using Roles/RoleBindings (namespaced) and ClusterRoles/ClusterRoleBindings (cluster-wide).

<ExampleBox title="Create a namespace and scope commands" lang="bash">
kubectl create namespace team-a
kubectl -n team-a get pods

# Set the default namespace for your current context
kubectl config set-context --current --namespace=team-a
kubectl get pods
</ExampleBox>

<ExampleBox title="A Role and RoleBinding" lang="yaml">
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: team-a
  name: pod-reader
rules:
  - apiGroups: [""]
    resources: ["pods", "pods/log"]
    verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  namespace: team-a
  name: read-pods
subjects:
  - kind: User
    name: alice
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
</ExampleBox>

<ExampleBox title="Apply and verify permissions" lang="bash">
kubectl apply -f rbac.yaml
kubectl -n team-a auth can-i get pods --as alice
</ExampleBox>

Key points:
- Namespaces are a boundary for names and quotas, not a hard security isolation by themselves.
- `Role` is namespaced; `ClusterRole` applies cluster-wide or to non-namespaced resources.
- Use `kubectl auth can-i` to test what a subject is allowed to do.

<ExerciseBox title="Isolate a team namespace" difficulty="Medium">
Create `team-a`, deploy a pod there, then write a `pod-reader` Role + RoleBinding for user `alice`. Confirm `kubectl auth can-i get pods --as alice -n team-a` returns `yes` while `kubectl auth can-i delete pods --as alice -n team-a` returns `no`.
</ExerciseBox>

<ExerciseBox title="Quota a namespace" difficulty="Hard">
Add a `ResourceQuota` to `team-a` limiting it to 4 pods and 1 CPU total. Deploy 5 pods and observe the fifth stay Pending due to the quota, then clean up.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-6-namespaces-rbac" :cards="[
{ q: 'What do Namespaces provide?', a: 'A boundary for names, quotas, and access control within one cluster.' }, { q: 'What is the difference between Role and ClusterRole?', a: 'Role is namespaced; ClusterRole is cluster-wide or for non-namespaced resources.' }, { q: 'How do you test permissions for a subject?', a: '<code>kubectl auth can-i get pods --as alice</code>.' }, { q: 'What binds a Role to a user?', a: 'A <b>RoleBinding</b> referencing the Role and subject.' }
]" />

## Resources

<ResourceTable title="Namespaces & RBAC" :resources="[
  { label: 'Kubernetes Official Docs', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/home/' },
  { label: 'Namespaces Concept', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/' },
  { label: 'RBAC Authorization', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/reference/access-authn-authz/rbac/' },
  { label: 'GeeksforGeeks Kubernetes', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/kubernetes/' },
  { label: 'kubernetes/examples', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/kubernetes/examples' }
]" />

## Checklist

<ProgressChecklist :items="['Created a namespace', 'Explained RBAC']" storageKey="kubernetes/6-namespaces-rbac" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

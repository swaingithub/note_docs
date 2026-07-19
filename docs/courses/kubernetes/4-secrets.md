---
title: Secrets
---

# Module 4 — Config & Storage: Secrets

A **Secret** holds sensitive data such as passwords, tokens, and keys, similar to a ConfigMap but intended for confidential values. Secrets are base64-encoded at rest (not encrypted by default) and mounted or injected like ConfigMaps. In production, integrate an external secrets manager (Vault, Sealed Secrets, or External Secrets Operator) for real encryption and rotation.

<ExampleBox title="Create a Secret" lang="bash">
# From a literal value (the value is base64-encoded automatically)
kubectl create secret generic db-secret --from-literal=password=supersecret

# From a file
kubectl create secret generic tls-secret --from-file=tls.crt=server.crt --from-file=tls.key=server.key
</ExampleBox>

<ExampleBox title="Consume a Secret in a Pod" lang="yaml">
apiVersion: v1
kind: Pod
metadata:
  name: app
spec:
  containers:
    - name: app
      image: myapp:1.0
      env:
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: password
      volumeMounts:
        - name: secret
          mountPath: /etc/secret
          readOnly: true
  volumes:
    - name: secret
      secret:
        secretName: db-secret
</ExampleBox>

Key points:
- Secrets are base64-encoded, not encrypted — protect the cluster's etcd and use encryption-at-rest.
- Prefer `secretKeyRef` over baking credentials into images.
- External secret stores (Vault, AWS Secrets Manager via ESO) avoid committing secrets to Git.

<ExerciseBox title="Inject a database password" difficulty="Easy">
Create `db-secret` with `password=supersecret`, then write a Pod that maps it to the `DB_PASSWORD` env var. Exec in and echo `$DB_PASSWORD` to confirm the value is available.
</ExerciseBox>

<ExerciseBox title="Mount a secret as a file" difficulty="Medium">
Create a Secret holding a `token` key, mount it as a read-only volume at `/etc/secret`, then `kubectl exec` in and cat `/etc/secret/token` to verify the contents match the Secret.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-4-secrets" :cards="[
{ q: 'How are Secrets stored by default?', a: 'Base64-encoded at rest, not encrypted unless etcd encryption is enabled.' }, { q: 'How do you inject a Secret as an env var?', a: 'Use <code>valueFrom.secretKeyRef</code> with the Secret name and key.' }, { q: 'How do you create a Secret from a literal?', a: '<code>kubectl create secret generic db-secret --from-literal=password=supersecret</code>.' }, { q: 'Why prefer an external secrets manager?', a: 'It provides real encryption and rotation, avoiding secrets committed to Git.' }
]" />

## Resources

<ResourceTable title="Secrets" :resources="[
  { label: 'Kubernetes Official Docs', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/home/' },
  { label: 'Secrets Concept', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/concepts/configuration/secret/' },
  { label: 'Distribute Credentials Securely', platform: 'Official', type: 'Tutorial', url: 'https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/' },
  { label: 'GeeksforGeeks Kubernetes', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/kubernetes/' },
  { label: 'kubernetes/examples', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/kubernetes/examples' }
]" />

## Checklist

<ProgressChecklist :items="['Created a Secret', 'Mounted it', 'Explained secrets risk']" storageKey="kubernetes/4-secrets" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

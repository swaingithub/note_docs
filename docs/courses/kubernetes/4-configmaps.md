---
title: ConfigMaps
---

# Module 4 — Config & Storage: ConfigMaps

A **ConfigMap** stores non-secret configuration data as key-value pairs or files, decoupling configuration from container images. Pods consume ConfigMaps as environment variables, command-line arguments, or mounted files, so the same image runs in multiple environments.

<ExampleBox title="Create a ConfigMap" lang="bash">
# From a literal value
kubectl create configmap app-config --from-literal=LOG_LEVEL=info

# From a local file
kubectl create configmap app-config --from-file=config.yaml
</ExampleBox>

<ExampleBox title="Consume a ConfigMap in a Pod" lang="yaml">
apiVersion: v1
kind: Pod
metadata:
  name: app
spec:
  containers:
    - name: app
      image: myapp:1.0
      env:
        - name: LOG_LEVEL
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: LOG_LEVEL
      volumeMounts:
        - name: config
          mountPath: /etc/config
  volumes:
    - name: config
      configMap:
        name: app-config
</ExampleBox>

Key points:
- ConfigMaps are for non-sensitive data only; use Secrets for passwords and keys.
- Updates to a ConfigMap mounted as a volume are eventually reflected in the pod (file watch), but env vars are not hot-reloaded.
- A `required` ConfigMap referenced at pod start will block scheduling if it is missing.

<ExerciseBox title="Configure an app via ConfigMap" difficulty="Easy">
Create a ConfigMap with `LOG_LEVEL=debug`, then write a Pod that reads it as the `LOG_LEVEL` environment variable. Exec into the pod and print the variable to confirm it was injected.
</ExerciseBox>

<ExerciseBox title="Mount a config file" difficulty="Medium">
Create a ConfigMap from a small `app.properties` file, mount it into `/etc/config` in a Pod, then `kubectl exec` in and read the file to verify its contents appear at the mount path.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-4-configmaps" :cards="[
{ q: 'How do you create a ConfigMap from a literal?', a: '<code>kubectl create configmap app-config --from-literal=LOG_LEVEL=info</code>.' }, { q: 'How do you expose a ConfigMap value as an env var?', a: 'Use <code>valueFrom.configMapKeyRef</code> with the ConfigMap name and key.' }, { q: 'Are ConfigMaps encrypted at rest?', a: 'No; they hold non-secret config only. Use Secrets for sensitive data.' }, { q: 'Do env vars from a ConfigMap hot-reload?', a: 'No; mounted volumes update, but env vars do not reload automatically.' }
]" />

## Resources

<ResourceTable title="ConfigMaps" :resources="[
  { label: 'Kubernetes Official Docs', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/home/' },
  { label: 'ConfigMaps Concept', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/concepts/configuration/configmap/' },
  { label: 'Configure a Pod with ConfigMap', platform: 'Official', type: 'Tutorial', url: 'https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/' },
  { label: 'GeeksforGeeks Kubernetes', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/kubernetes/' },
  { label: 'kubernetes/examples', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/kubernetes/examples' }
]" />

## Checklist

<ProgressChecklist :items="['Created a ConfigMap', 'Consumed it as env']" storageKey="kubernetes/4-configmaps" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

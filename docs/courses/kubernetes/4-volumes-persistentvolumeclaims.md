---
title: Volumes & PersistentVolumeClaims
---

# Module 4 — Config & Storage: Volumes & PersistentVolumeClaims

Containers are ephemeral, so data written to their filesystem disappears when the pod dies. **Volumes** attach storage to a Pod, and a **PersistentVolumeClaim (PVC)** is a request for storage that the cluster fulfills from a PersistentVolume. This gives pods durable, pod-independent storage for databases and stateful apps.

<ExampleBox title="A Pod using a PVC" lang="yaml">
apiVersion: v1
kind: Pod
metadata:
  name: db
spec:
  containers:
    - name: db
      image: postgres:16-alpine
      volumeMounts:
        - name: data
          mountPath: /var/lib/postgresql/data
  volumes:
    - name: data
      persistentVolumeClaim:
        claimName: db-pvc
</ExampleBox>

<ExampleBox title="The PersistentVolumeClaim" lang="yaml">
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: db-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
</ExampleBox>

<ExampleBox title="Create and inspect storage" lang="bash">
kubectl apply -f pvc.yaml
kubectl apply -f pod.yaml

# PVC is Bound once a PV is provisioned
kubectl get pvc db-pvc
kubectl get pv
</ExampleBox>

Key points:
- `ReadWriteOnce` (RWO) allows one node to mount read-write; `ReadWriteMany` (RWX) allows many.
- The PVC binds to a matching PV; dynamic provisioning creates one automatically via a StorageClass.
- Deleting a PVC may delete the backing volume depending on the reclaim policy (`Delete` vs `Retain`).

<ExerciseBox title="Persist data across pod restarts" difficulty="Medium">
Create the PVC and a Pod writing a file to `/var/lib/postgresql/data`. Delete and recreate the Pod (using the same PVC) and confirm the file is still present, proving the storage outlived the pod.
</ExerciseBox>

<ExerciseBox title="Inspect binding" difficulty="Easy">
Apply the PVC, then run `kubectl get pvc db-pvc` and `kubectl describe pvc db-pvc`. Note the bound PV name and the StorageClass used by your cluster's dynamic provisioner.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-4-volumes-persistentvolumeclaims" :cards="[
{ q: 'What is a PVC?', a: 'A <b>PersistentVolumeClaim</b> is a request for storage fulfilled by a PersistentVolume.' }, { q: 'What does ReadWriteOnce mean?', a: 'One node may mount the volume read-write; ReadWriteMany allows many.' }, { q: 'What reclaim policies exist for a volume?', a: '<code>Delete</code> (default removes backing storage) or <code>Retain</code>.' }, { q: 'How is a PVC bound to storage?', a: 'It binds to a matching PV, often dynamically via a StorageClass.' }
]" />

## Resources

<ResourceTable title="Volumes & PersistentVolumeClaims" :resources="[
  { label: 'Kubernetes Official Docs', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/home/' },
  { label: 'Volumes Concept', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/concepts/storage/volumes/' },
  { label: 'Persistent Volumes', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/concepts/storage/persistent-volumes/' },
  { label: 'GeeksforGeeks Kubernetes', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/kubernetes/' },
  { label: 'kubernetes/examples', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/kubernetes/examples' }
]" />

## Checklist

<ProgressChecklist :items="['Wrote a PVC', 'Mounted it in a Pod']" storageKey="kubernetes/4-volumes-persistentvolumeclaims" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

---
title: Jobs & CronJobs
---

# Module 2 — Pods & Workloads: Jobs & CronJobs

A **Job** runs one or more pods to completion, retrying until the task succeeds — ideal for batch work like database migrations or report generation. A **CronJob** schedules Jobs on a recurring cron schedule, like a Unix crontab for the cluster.

<ExampleBox title="A one-off Job" lang="yaml">
apiVersion: batch/v1
kind: Job
metadata:
  name: batch
spec:
  template:
    spec:
      restartPolicy: Never
      containers:
        - name: c
          image: busybox:1.36
          command: ["echo", "hello"]
</ExampleBox>

<ExampleBox title="A scheduled CronJob" lang="yaml">
apiVersion: batch/v1
kind: CronJob
metadata:
  name: nightly
spec:
  schedule: "0 2 * * *"
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: OnFailure
          containers:
            - name: c
              image: busybox:1.36
              command: ["date"]
</ExampleBox>

<ExampleBox title="Run and observe" lang="bash">
# Create the Job and watch it finish
kubectl apply -f job.yaml
kubectl get jobs
kubectl logs job/batch

# Create the CronJob and list upcoming runs
kubectl apply -f cronjob.yaml
kubectl get cronjobs
</ExampleBox>

Key points:
- `restartPolicy` for Jobs is `Never` or `OnFailure` (never `Always`).
- The cron `schedule` field uses standard 5-field cron syntax (min hour dom month dow).
- CronJobs create a Job per invocation; old Jobs are cleaned up by `successfulJobsHistoryLimit`.

<ExerciseBox title="Run a completion task" difficulty="Easy">
Create the one-off Job above, then run `kubectl get jobs` and `kubectl logs job/batch` to confirm it printed `hello` and reached the `Complete` state.
</ExerciseBox>

<ExerciseBox title="Schedule a recurring task" difficulty="Medium">
Write a CronJob that runs `date` every minute (`* * * * *`). Apply it, watch `kubectl get jobs` spawn a new Job each minute, inspect its logs, then delete the CronJob to stop the schedule.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-2-jobs-cronjobs" :cards="[
{ q: 'What <code>restartPolicy</code> values are valid for a Job?', a: 'Only <code>Never</code> or <code>OnFailure</code> (never <code>Always</code>).' }, { q: 'What cron syntax does a CronJob schedule use?', a: 'Standard 5-field syntax: min hour day-of-month month day-of-week.' }, { q: 'What command runs a Job from a manifest?', a: '<code>kubectl apply -f job.yaml</code> then <code>kubectl get jobs</code>.' }, { q: 'What cleans up old CronJob runs?', a: '<code>successfulJobsHistoryLimit</code> controls retained completed Jobs.' }
]" />

## Resources

<ResourceTable title="Jobs & CronJobs" :resources="[
  { label: 'Kubernetes Official Docs', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/home/' },
  { label: 'Jobs Concept', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/concepts/workloads/controllers/job/' },
  { label: 'CronJobs Concept', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/' },
  { label: 'GeeksforGeeks Kubernetes', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/kubernetes/' },
  { label: 'kubernetes/examples', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/kubernetes/examples' }
]" />

## Checklist

<ProgressChecklist :items="['Created a Job', 'Created a CronJob', 'Explained schedules']" storageKey="kubernetes/2-jobs-cronjobs" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

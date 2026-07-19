---
title: Deploying to Cloud
---

# Module 11 — Orchestration & Deployment: Deploying to Cloud

When you outgrow a single host, managed platforms run your container images without you managing servers directly. The right choice depends on scale, traffic shape, and operational tolerance.

Common options:

<ExampleBox title="Platform comparison" lang="bash">
```
Cloud Run / AWS Fargate / ECS   -> run a single container from a registry image
Managed Kubernetes (EKS/GKE/AKS) -> complex, multi-service workloads with autoscaling
Nomad                         -> lightweight, simple orchestrator
```
</ExampleBox>

The universal pipeline pattern is the same everywhere:

<ExampleBox title="Build -> scan -> push -> deploy" lang="bash">
```bash
docker build -t registry/app:sha .
docker scout cves registry/app:sha
docker push registry/app:sha
# platform pulls registry/app:sha and runs it
```
</ExampleBox>

Key points:
- Serverless containers (Cloud Run, Fargate) scale to zero and bill per request — great for sporadic workloads.
- Managed Kubernetes handles rolling updates, self-healing, and service discovery but carries operational overhead.
- Always deploy immutable image digests/tags from a registry rather than building on the host.
- Wire healthchecks and resource limits into the platform's task/service definition.

<ExerciseBox title="Deploy a container to a serverless platform" difficulty="Medium">
Pick Cloud Run, Fargate, or a similar service. Push an image to a registry, create a service pointing at that image tag, and confirm it serves traffic from a public URL. Note how healthchecks and limits are configured there.
</ExerciseBox>

<ExerciseBox title="Map the deploy pattern" difficulty="Easy">
Write a short runbook describing how your local `build -> scan -> push -> deploy` flow maps onto a managed Kubernetes or serverless target, including where image tags and secrets live.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-deploying-to-cloud" :cards="[
  { q: 'What is a key benefit of serverless containers like Cloud Run or Fargate?', a: 'They scale to zero and bill per request, ideal for sporadic workloads.' },
  { q: 'What trade-off does managed Kubernetes carry?', a: 'It handles rolling updates and self-healing but has operational overhead.' },
  { q: 'What is the universal deploy pipeline pattern?', a: 'Build, scan, push to a registry, then deploy the immutable image tag.' },
  { q: 'Why deploy immutable image tags rather than building on the host?', a: 'Immutable tags from a registry are reproducible and avoid host-side build drift.' }
]" />

## Resources

<ResourceTable title="Deploying to Cloud" :resources="[
  { label: 'Deploy to cloud overview', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/guides/' },
  { label: 'Docker contexts for cloud', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/context/cloud/' },
  { label: 'Cloud deployment guides', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Docker cloud tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Deploying containers video', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=QjzI2QZj3k0' }
]" />

## Checklist

<ProgressChecklist :items="['Compared cloud options', 'Explained the deploy pattern']" storageKey="docker/11-deploying-to-cloud" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

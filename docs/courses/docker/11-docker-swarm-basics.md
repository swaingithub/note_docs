---
title: Docker Swarm Basics
---

# Module 11 — Orchestration & Deployment: Docker Swarm Basics

Docker Swarm turns a group of Docker hosts into a single virtual cluster. It provides multi-node scheduling, self-healing services, rolling updates, and built-in secrets — all using the Compose file you already know.

<ExampleBox title="Init a swarm and deploy a stack" lang="bash">
```bash
docker swarm init
docker stack deploy -c compose.yaml mystack
docker service ls
docker service ps mystack_app
```
</ExampleBox>

Worker nodes join with the token from `docker swarm join-token worker`. Swarm schedules replicated services across nodes and restarts them when they fail.

Compose files gain Swarm-only keys under `deploy`:

<ExampleBox title="Swarm deploy hints in compose.yaml" lang="yaml">
```yaml
services:
  app:
    image: myapp:1.0
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
      restart_policy:
        condition: on-failure
    ports:
      - "8080:8080"
```
</ExampleBox>

Key points:
- `docker stack deploy` applies a Compose file as a Swarm stack; `docker service ls` shows per-service replicas.
- `deploy.replicas` runs N copies for availability; the scheduler places them across nodes.
- `update_config` controls rolling updates so deploys never take all replicas down at once.
- Swarm `secrets` and `configs` mount sensitive data securely into services.

<ExerciseBox title="Run a replicated service" difficulty="Medium">
Initialize a single-node swarm, deploy a stack with `replicas: 3`, and use `docker service ps` to confirm three tasks are running. Scale to 5 with `docker service scale` and observe the change.
</ExerciseBox>

<ExerciseBox title="Perform a rolling update" difficulty="Hard">
Set `update_config.parallelism: 1` and `delay: 10s`, then deploy a new image tag with `docker stack deploy`. Watch `docker service ps` to confirm Swarm updates one task at a time without downtime.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-swarm-basics" :cards="[
  { q: 'Which command initializes a Docker Swarm?', a: '<code>docker swarm init</code>.' },
  { q: 'How do you deploy a Compose file as a Swarm stack?', a: '<code>docker stack deploy -c compose.yaml &lt;stack&gt;</code>.' },
  { q: 'What does <code>deploy.replicas: 3</code> do?', a: 'Runs three copies of the service for availability across nodes.' },
  { q: 'What does <code>update_config.parallelism: 1</code> control?', a: 'It updates one task at a time for rolling, no-downtime deploys.' }
]" />

## Resources

<ResourceTable title="Docker Swarm Basics" :resources="[
  { label: 'Swarm mode overview', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/swarm/' },
  { label: 'Deploy a stack', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/swarm/stack-deploy/' },
  { label: 'Swarm tutorials', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Docker Swarm guide', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Swarm walkthrough video', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=QjzI2QZj3k0' }
]" />

## Checklist

<ProgressChecklist :items="['Initialized a swarm', 'Deployed a stack', 'Listed services']" storageKey="docker/11-docker-swarm-basics" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

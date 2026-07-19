---
title: Logging & Monitoring
---

# Module 6 — Environment & Config: Logging & Monitoring

Docker captures everything a container writes to stdout/stderr and stores it via a configurable logging driver. The `docker logs` command is your first stop for debugging, while `docker stats` gives live resource usage. In production you ship logs and metrics to centralized systems.

<ExampleBox title="Read logs and configure rotation" lang="bash">
# Follow the last 50 lines and stream new output
docker logs -f --tail 50 web

# Show logs from the last hour
docker logs --since 1h web

# Limit log size with the json-file driver
docker run --log-driver json-file --log-opt max-size=10m --log-opt max-file=3 web
</ExampleBox>

<ExampleBox title="Live metrics" lang="bash">
docker stats
</ExampleBox>

Key points:
- `docker logs -f` tails output like `tail -f`; `--tail` and `--since` limit what you see.
- The default `json-file` driver buffers logs on disk — set `max-size`/`max-file` to avoid filling the disk.
- `docker stats` shows live CPU, memory, and network usage per container.
- For production, forward logs to Loki/ELK and scrape metrics into Prometheus.

<ExerciseBox title="Tail and rotate logs" difficulty="Easy">
Run a container that prints a line every second, then use `docker logs -f --tail 10` to watch it. Stop it, then restart with `--log-opt max-size=1m --log-opt max-file=2` and explain what happens when the log exceeds the limit.
</ExerciseBox>

<ExerciseBox title="Monitor resource usage" difficulty="Medium">
Start two busy containers and run `docker stats` to compare their CPU and memory. Identify the container using the most memory and explain how you would cap it (hint: `--memory` / `--cpus`). Note: capping requires the container to be recreated with those flags.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-logging-monitoring" :cards="[
  { q: 'What does <code>docker logs -f --tail 50</code> do?', a: 'It tails the last 50 lines and streams new output, like <code>tail -f</code>.' },
  { q: 'Which logging driver is the Docker default, and what option caps its size?', a: 'The <code>json-file</code> driver; use <code>--log-opt max-size</code> to cap size.' },
  { q: 'Which command shows live per-container CPU, memory, and network usage?', a: '<code>docker stats</code>.' },
  { q: 'How do you view only logs from the last hour?', a: 'Use <code>docker logs --since 1h &lt;container&gt;</code>.' }
]" />

## Resources

<ResourceTable title="Logging & Monitoring — further reading" :resources="[
  { label: 'Docker CLI reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/commandline/cli/' },
  { label: 'Configure logging drivers', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/config/containers/logging/configure/' },
  { label: 'docker stats', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/commandline/stats/' },
  { label: 'Docker Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Docker Overview', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Docker Crash Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo' }
]" />

## Checklist

<ProgressChecklist :items="['Tailed logs', 'Set log rotation', 'Reviewed docker stats']" storageKey="docker/6-logging-monitoring" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

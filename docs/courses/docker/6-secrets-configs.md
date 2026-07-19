---
title: Secrets & Configs
---

# Module 6 — Environment & Config: Secrets & Configs

Sensitive data — passwords, API keys, TLS certificates — must never be baked into images or passed as plain environment variables that show up in `docker inspect`. In Docker Swarm, `docker secret` mounts secrets as files under `/run/secrets`. Outside Swarm, use read-only bind mounts or an external vault such as HashiCorp Vault or AWS Secrets Manager.

<ExampleBox title="Docker Swarm secrets" lang="bash">
# Create a secret from a file (mounted at /run/secrets/db_password)
docker secret create db_password ./password.txt

# Grant the secret to a service
docker service create --secret db_password myapp
</ExampleBox>

Key points:
- Swarm secrets are encrypted at rest and mounted as in-memory files, not environment variables.
- `--secret <name>` makes the file available at `/run/secrets/<name>` inside the container.
- Outside Swarm, mount a secrets file read-only (`-v ./password.txt:/run/secrets/db_password:ro`).
- Never commit a real `.env` or secret file to version control — use `.gitignore` and a vault.

<ExerciseBox title="Create and use a Swarm secret" difficulty="Medium">
Initialize a local Swarm with `docker swarm init`, create a secret from a file, and run a service that mounts it. Exec into the service task and read `/run/secrets/db_password` to confirm the value is present and not exposed via `docker inspect` environment.
</ExerciseBox>

<ExerciseBox title="Secure secret via bind mount" difficulty="Easy">
Outside Swarm, create a `password.txt` and run a container mounting it read-only at `/run/secrets/db_password:ro`. Confirm the app can read it but cannot write to it, and verify it does not appear in `docker inspect --format '&#123;&#123; .Config.Env &#125;&#125;'`.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-secrets-configs" :cards="[
  { q: 'In Docker Swarm, where are secrets mounted inside the container?', a: 'As in-memory files under <code>/run/secrets/&lt;name&gt;</code>.' },
  { q: 'Why should secrets not be passed as plain environment variables?', a: 'They show up in <code>docker inspect</code> and can leak; Swarm mounts them as files instead.' },
  { q: 'How do you create a Swarm secret from a file?', a: 'Use <code>docker secret create &lt;name&gt; ./file.txt</code>.' },
  { q: 'Outside Swarm, how can you securely provide a secret file?', a: 'Mount it read-only with <code>-v ./password.txt:/run/secrets/db_password:ro</code>, or use an external vault.' }
]" />

## Resources

<ResourceTable title="Secrets & Configs — further reading" :resources="[
  { label: 'Docker CLI reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/commandline/cli/' },
  { label: 'Docker secrets', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/swarm/secrets/' },
  { label: 'Docker Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Docker Overview', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Docker Crash Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo' },
  { label: 'awesome-compose', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/docker/awesome-compose' }
]" />

## Checklist

<ProgressChecklist :items="['Created a Docker secret', 'Explained external vaults']" storageKey="docker/6-secrets-configs" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

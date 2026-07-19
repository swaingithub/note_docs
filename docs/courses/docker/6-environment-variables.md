---
title: Environment Variables
---

# Module 6 — Environment & Config: Environment Variables

Configuration that varies between environments (database URLs, log levels, feature flags) should be passed to containers as environment variables rather than baked into the image. Docker supports passing single vars with `-e`, bulk-loading from a file with `--env-file`, and Compose offers `environment:` and `env_file:` keys.

<ExampleBox title="Pass environment variables" lang="bash">
# Set individual variables
docker run -e NODE_ENV=production -e "DB_URL=postgres://db:5432/app" myapp

# Load all variables from a file
docker run --env-file .env myapp
</ExampleBox>

Key points:
- `-e KEY=value` injects a single variable; quote values that contain spaces or special characters.
- `--env-file .env` loads `KEY=value` pairs from a file, keeping secrets out of the command line.
- In Compose, use `environment:` for inline vars and `env_file:` to reference a file.
- Never bake secrets or environment-specific config into the image — keep them external.

<ExerciseBox title="Run with env vars" difficulty="Easy">
Create a `.env` file with `NODE_ENV=production` and `PORT=3000`, then run a container with `--env-file .env` and confirm the variables are present using `docker exec &lt;c> env` or `docker inspect --format '&#123;&#123; .Config.Env &#125;&#125;'`.
</ExerciseBox>

<ExerciseBox title="Override at runtime" difficulty="Medium">
Run a container with `--env-file .env`, then run another with an explicit `-e NODE_ENV=development` overriding the file value. Use `docker inspect` on both to show which value won. Explain the precedence of `-e` over `--env-file`.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-environment-variables" :cards="[
  { q: 'How do you inject a single environment variable when running a container?', a: 'With <code>-e KEY=value</code> (quote values with spaces or special characters).' },
  { q: 'What does <code>--env-file .env</code> do?', a: 'It loads <code>KEY=value</code> pairs from a file, keeping secrets off the command line.' },
  { q: 'Which takes precedence, <code>-e</code> or <code>--env-file</code>?', a: 'An explicit <code>-e</code> overrides a value loaded from <code>--env-file</code>.' },
  { q: 'In Compose, what keys set environment variables inline versus from a file?', a: '<code>environment:</code> for inline vars and <code>env_file:</code> to reference a file.' }
]" />

## Resources

<ResourceTable title="Environment Variables — further reading" :resources="[
  { label: 'Docker CLI reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/commandline/cli/' },
  { label: 'Environment variables in Compose', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/compose/environment-variables/' },
  { label: 'Docker Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Docker Overview', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Docker Crash Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo' },
  { label: 'awesome-compose', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/docker/awesome-compose' }
]" />

## Checklist

<ProgressChecklist :items="['Passed -e vars', 'Used --env-file']" storageKey="docker/6-environment-variables" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

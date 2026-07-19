---
title: The Docker Command Line
---

# Module 1 — Installation & Setup: The Docker Command Line

The Docker CLI is organized into *management commands* (such as `docker image`, `docker container`, `docker network`, `docker volume`) that group related operations, plus older top-level shortcuts (`docker images`, `docker ps`). Both forms work, but the grouped form is preferred because it is self-documenting and future-proof.

<ExampleBox title="Explore the CLI" lang="bash">
# Show all top-level commands and global flags
docker --help

# Show subcommands for each management group
docker image --help
docker container --help
docker network --help
docker volume --help

# System-level information about the engine and host
docker version
docker info
</ExampleBox>

Key points:
- `docker --help` is the fastest way to discover commands and flags.
- Management commands (`docker container ls`) and shortcuts (`docker ps`) are equivalent.
- `docker info` reveals engine configuration: storage driver, logging driver, swarm status, and resource warnings.

<ExerciseBox title="Navigate the CLI help" difficulty="Easy">
Run `docker --help` and pick three management commands you have not used. For each, run `&lt;command> --help` and write down one subcommand and its purpose.
</ExerciseBox>

<ExerciseBox title="Compare version and info" difficulty="Medium">
Run `docker version` and `docker info`. From the output, determine the client/server version mismatch (if any), the default storage driver, and the number of containers and images currently on your host.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-the-docker-command-line" :cards="[
  { q: 'What is the difference between a management command like <code>docker container ls</code> and a shortcut like <code>docker ps</code>?', a: 'They are equivalent; management commands group related operations and are preferred for being self-documenting.' },
  { q: 'Which command reveals engine configuration such as the storage driver and logging driver?', a: '<code>docker info</code>.' },
  { q: 'How do you discover the subcommands and flags of a management group such as <code>docker image</code>?', a: 'Run <code>docker image --help</code>.' },
  { q: 'Which global flag shows all top-level commands and global flags?', a: '<code>docker --help</code>.' }
]" />

## Resources

<ResourceTable title="Docker CLI — further reading" :resources="[
  { label: 'Docker CLI reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/commandline/cli/' },
  { label: 'Docker Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Docker Overview', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Docker Crash Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo' },
  { label: 'freeCodeCamp', platform: 'freeCodeCamp', type: 'Practice', url: 'https://www.freecodecamp.org/' },
  { label: 'awesome-compose', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/docker/awesome-compose' }
]" />

## Checklist

<ProgressChecklist :items="['Listed CLI command groups', 'Ran docker info']" storageKey="docker/1-the-docker-command-line" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

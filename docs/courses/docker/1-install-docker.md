---
title: Install Docker
---

# Module 1 — Installation & Setup: Install Docker

Docker runs your applications in isolated containers. Before you can build or run anything, you need the Docker engine installed on your machine. On Linux this is the `docker.io` package plus a running daemon, while on macOS and Windows Docker Desktop bundles the engine, CLI, and a lightweight VM.

<ExampleBox title="Install on Ubuntu and verify" lang="bash">
sudo apt-get update
sudo apt-get install -y docker.io
sudo systemctl enable --now docker
sudo usermod -aG docker $USER   # logout/login after

# macOS / Windows: install Docker Desktop
# https://www.docker.com/products/docker-desktop/

# Verify the installation
docker --version
docker run hello-world
</ExampleBox>

Key points:
- On Linux, add your user to the `docker` group so you can run commands without `sudo` (then re-login).
- On macOS/Windows, Docker Desktop provides the daemon and a friendly GUI.
- `docker run hello-world` downloads a tiny image and confirms the engine works end-to-end.

<ExerciseBox title="Install and verify Docker" difficulty="Easy">
Install Docker for your platform. Run `docker --version` and `docker run hello-world`. On Linux, add your user to the `docker` group and confirm you can run `hello-world` without `sudo` after re-logging in.
</ExerciseBox>

<ExerciseBox title="Inspect the engine" difficulty="Medium">
Once installed, run `docker info` and `docker version`. Identify the Server Version, the Storage Driver, and whether BuildKit is enabled. Note any warnings shown under `WARNING` in the `docker info` output.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-install" :cards="[
  { q: 'On Linux, what group must your user belong to in order to run docker commands without sudo?', a: 'The <code>docker</code> group; add the user with <code>usermod -aG docker $USER</code> then re-login.' },
  { q: 'Which command downloads a tiny image and confirms the Docker engine works end-to-end?', a: '<code>docker run hello-world</code>.' },
  { q: 'On macOS and Windows, what bundles the Docker engine, CLI, and a lightweight VM?', a: 'Docker Desktop.' },
  { q: 'Which command reports the Server Version, Storage Driver, and whether BuildKit is enabled?', a: '<code>docker info</code> (also <code>docker version</code> for client/server versions).' }
]" />

## Resources

<ResourceTable title="Install Docker — further reading" :resources="[
  { label: 'Install Docker Engine', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/get-docker/' },
  { label: 'Docker CLI reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/commandline/cli/' },
  { label: 'Docker Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Docker Overview', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Docker Crash Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo' },
  { label: 'freeCodeCamp', platform: 'freeCodeCamp', type: 'Practice', url: 'https://www.freecodecamp.org/' }
]" />

## Checklist

<ProgressChecklist :items="['Installed Docker', 'Added user to docker group (Linux)', 'Verified with hello-world']" storageKey="docker/1-install-docker" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

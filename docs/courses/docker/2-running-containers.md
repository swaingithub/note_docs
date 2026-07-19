---
title: Running Containers
---

# Module 2 — Images & Containers: Running Containers

The `docker run` command creates a container from an image and starts it. Common flags control detachment (`-d`), host-to-container port publishing (`-p`), naming (`--name`), environment variables (`-e`), automatic removal on stop (`--rm`), and interactive sessions (`-it`). Understanding these flags is the foundation of day-to-day container usage.

<ExampleBox title="Run, observe, and clean up a container" lang="bash">
# Run nginx detached, publishing host port 8080 to container port 80
docker run -d -p 8080:80 --name web nginx:1.27-alpine

# Inspect running state
docker ps
docker container logs web
docker container stats web

# Stop and remove
docker stop web
docker rm web

# Remove forcefully while running (stop + remove in one shot)
docker rm -f web
</ExampleBox>

Key points:
- `-d` runs the container in the background; without it the process holds your terminal.
- `-p 8080:80` maps `<host>:<container>` — the container port must be the one the app listens on.
- `--rm` automatically deletes the container when it stops, keeping your host clean.
- `docker ps` shows only running containers; add `-a` to see stopped ones.

<ExerciseBox title="Serve a web page" difficulty="Easy">
Run `nginx:1.27-alpine` with `-d`, name it `web`, and publish port `8080:80`. Open `http://localhost:8080` in a browser to confirm it serves the default page, then stop and remove the container.
</ExerciseBox>

<ExerciseBox title="Run with auto-remove and env" difficulty="Medium">
Use `docker run --rm -it --name temp -e GREETING=hello alpine sh` to open a shell, print the `GREETING` variable with `echo $GREETING`, then exit and confirm with `docker ps -a` that the container was automatically removed.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-run" :cards="[
  { q: 'What does <code>-d</code> do when running a container?', a: 'Runs the container in detached (background) mode.' },
  { q: 'What is the difference between <code>-p 8080:80</code> and <code>-P</code>?', a: '<code>-p</code> publishes a specific host port to a container port; <code>-P</code> publishes all exposed ports to random host ports.' },
  { q: 'What does <code>--rm</code> do?', a: 'Automatically removes the container when it exits.' },
  { q: 'How do you follow a container\'s logs live?', a: 'Use <code>docker logs -f &lt;container&gt;</code>.' }
]" />

## Resources

<ResourceTable title="Running Containers — further reading" :resources="[
  { label: 'Docker CLI reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/commandline/cli/' },
  { label: 'docker run reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/run/' },
  { label: 'Docker Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Docker Overview', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Docker Crash Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo' },
  { label: 'freeCodeCamp', platform: 'freeCodeCamp', type: 'Practice', url: 'https://www.freecodecamp.org/' }
]" />

## Checklist

<ProgressChecklist :items="['Ran a container with port mapping', 'Viewed logs & stats', 'Stopped and removed it']" storageKey="docker/2-running-containers" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

---
title: Pushing to Docker Hub
---

# Module 8 — Registries: Pushing to Docker Hub

Docker Hub is the default public registry. To share an image, you tag it with your Docker Hub namespace (`user/repo:tag`) and push it. Anyone can then `pull` and run it on any host.

<ExampleBox title="Tag, login, and push" lang="bash">
```bash
docker tag myapp:1.0 myuser/myapp:1.0
docker login
docker push myuser/myapp:1.0
```
</ExampleBox>

The `docker tag` command does not duplicate data; it creates a new reference to the same image layers. After pushing, the image is available globally:

<ExampleBox title="Pull and run anywhere" lang="bash">
```bash
docker pull myuser/myapp:1.0
docker run -d -p 8080:8080 myuser/myapp:1.0
```
</ExampleBox>

Key points:
- Tag convention is `namespace/repository:tag`. The tag identifies a specific image version.
- Avoid relying on `latest` in production — it is mutable and makes rollbacks and debugging harder.
- Use semantic tags (`1.0`, `1.0.2`) and consider digest pins (`myuser/myapp@sha256:...`) for full reproducibility.
- `docker logout` removes stored credentials from the local auth store.

<ExerciseBox title="Publish your first image" difficulty="Easy">
Build an image locally, tag it as `youruser/hello:1.0`, run `docker login`, and push it. Then pull it on a second machine (or after `docker rmi`) and run it to confirm it works end to end.
</ExerciseBox>

<ExerciseBox title="Use immutable version tags" difficulty="Medium">
Tag the same image with both `myuser/app:1.0` and `myuser/app:stable`, push both, then inspect the digest of each with `docker inspect`. Show that both tags point to the same image ID and explain why you should not deploy using `latest`.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-pushing-to-docker-hub" :cards="[
  { q: 'What is the Docker Hub tag convention?', a: '<code>namespace/repository:tag</code>, e.g. <code>myuser/myapp:1.0</code>.' },
  { q: 'Does <code>docker tag</code> duplicate image data?', a: 'No, it creates a new reference to the same image layers.' },
  { q: 'Why avoid deploying with the <code>latest</code> tag?', a: 'It is mutable, making rollbacks and debugging harder; prefer semantic or digest-pinned tags.' },
  { q: 'How do you pin an image by digest for full reproducibility?', a: 'Use <code>myuser/myapp@sha256:&lt;digest&gt;</code>.' }
]" />

## Resources

<ResourceTable title="Pushing to Docker Hub" :resources="[
  { label: 'docker push reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/commandline/push/' },
  { label: 'Docker Hub quickstart', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/docker-hub/' },
  { label: 'Docker basics', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Docker registry guide', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Push to Docker Hub tutorial', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=QjzI2QZj3k0' }
]" />

## Checklist

<ProgressChecklist :items="['Tagged an image', 'Pushed to Docker Hub', 'Pulled it back']" storageKey="docker/8-pushing-to-docker-hub" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

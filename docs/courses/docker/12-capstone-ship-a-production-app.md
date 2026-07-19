---
title: Capstone — Ship a Production App
---

# Module 12 — Troubleshooting & Capstone: Capstone — Ship a Production App

This capstone ties every module together into one production-ready setup. You will build a secure, observable, automatically deployed application from scratch.

A complete, production-grade flow:

<ExampleBox title="Multi-stage, non-root, health-checked Dockerfile" lang="dockerfile">
```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
RUN addgroup -S app && adduser -S app -G app
WORKDIR /app
COPY --chown=app:app --from=build /app/dist ./dist
USER app
HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1
EXPOSE 3000
CMD ["node", "dist/server.js"]
```
</ExampleBox>

<ExampleBox title="compose.yaml for app + Postgres" lang="yaml">
```yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: pw
      POSTGRES_DB: app
    volumes:
      - db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app"]
      interval: 10s
      retries: 5
  app:
    build: .
    ports: ["3000:3000"]
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: "1.0"
volumes:
  db-data:
```
</ExampleBox>

The end-to-end pipeline combines everything you learned:

<ExampleBox title="Ship it" lang="bash">
```bash
docker build -t ghcr.io/you/app:1.0 .
docker scout cves ghcr.io/you/app:1.0
notation sign ghcr.io/you/app:1.0
docker push ghcr.io/you/app:1.0
# CI does the above on every push; deploy pulls and runs with limits + restart
```
</ExampleBox>

Key points:
- Multi-stage builds keep the runtime image small; non-root + healthcheck + limits make it safe to run.
- Compose wires the database volume and gates app startup on DB health.
- Scanning and signing before push protect the supply chain; CI automates it.
- Deploy with `--restart=unless-stopped` and resource limits so the service survives reboots and stays bounded.
- Document run instructions in a README so others can reproduce the setup.

<ExerciseBox title="Build the full capstone stack" difficulty="Hard">
Implement steps 1–7: a multi-stage non-root Dockerfile with a healthcheck, a compose stack with Postgres + volume + healthchecks, scan and sign the image, push to GHCR, set up a CI workflow that builds/scans/pushes, and deploy to a host with restart policy and resource limits. Write a README with run instructions.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-capstone-ship-a-production-app" :cards="[
  { q: 'Name four production safeguards used in the capstone Dockerfile and compose.', a: 'Multi-stage build, non-root USER, HEALTHCHECK, and resource limits.' },
  { q: 'How does Compose gate app startup on database readiness?', a: 'With <code>depends_on: db: condition: service_healthy</code>.' },
  { q: 'What supply-chain steps run before pushing the image?', a: 'Scan with <code>docker scout cves</code> and sign with <code>notation sign</code>.' },
  { q: 'Which restart policy is used at deploy, and why?', a: '<code>unless-stopped</code> — survives reboots but stays down on a deliberate stop.' }
]" />

## Resources

<ResourceTable title="Capstone — Ship a Production App" :resources="[
  { label: 'Production best practices', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/develop/dev-best-practices/' },
  { label: 'Compose reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/compose/' },
  { label: 'Docker Scout', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/scout/' },
  { label: 'Docker guide hub', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Full course walkthrough', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=QjzI2QZj3k0' },
  { label: 'Awesome Compose', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/docker/awesome-compose' }
]" />

## Checklist

<ProgressChecklist :items="['Multi-stage Dockerfile', 'Compose + volume + healthcheck', 'Scanned & signed', 'Pushed to registry', 'CI build/scan/push', 'Deployed with limits', 'Wrote README']" storageKey="docker/12-capstone-ship-a-production-app" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

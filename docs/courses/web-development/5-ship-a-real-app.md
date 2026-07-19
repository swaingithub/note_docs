---
title: Ship a Real App
---

# Capstone: Ship a Real App

The capstone brings the whole stack together: a frontend, a backend API, a database, authentication, and tests — deployed to the web with a clear README. Shipping teaches you integration, deployment, and communication more than any single lesson.

<ExampleBox title="Deploy with a start script" lang="bash">

```bash
# package.json
# {
#   "scripts": {
#     "start": "node server.js",
#     "test": "vitest run"
#   }
# }

# deploy to a PaaS
git push heroku main      # or: fly deploy / vercel --prod
```
</ExampleBox>

Key points:
- Build a vertical slice: UI + API + DB working end to end.
- Add authentication (sessions or JWT) before exposing write endpoints.
- Write tests so deployments are safe and refactors are confident.
- Use environment variables for secrets; never commit them.
- A README should explain what it does, how to run it, and the deploy steps.

<ExerciseBox title="Ship v1" difficulty="Hard">

Build a task manager with a frontend, Express API, and PostgreSQL. Add login, write tests, and deploy it to a free platform. Document everything in a README.

</ExerciseBox>

<ExerciseBox title="Harden secrets" difficulty="Medium">

Move your database URL and JWT secret into environment variables. Add a `.env.example` (no real secrets) and confirm the app reads them at startup.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Built the app', 'Added auth', 'Deployed it', 'Wrote a README']" storageKey="web-development/5-ship-a-real-app" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-5-ship-a-real-app" :cards="[
{ q: 'What should a vertical slice include?', a: 'UI plus API plus database working end to end.' }, { q: 'How should secrets be handled?', a: 'Environment variables, never committed to the repo.' }, { q: 'Why add authentication before write endpoints?', a: 'To prevent unauthorized data changes.' }, { q: 'What documents deployment steps?', a: 'A README with run and deploy instructions.' }
]" />

## Resources

<ResourceTable title="Shipping Resources" :resources="[
  { label: 'The Odin Project', platform: 'Official', type: 'Tutorial', url: 'https://www.theodinproject.com/' },
  { label: 'Full Stack Open', platform: 'Official', type: 'Docs', url: 'https://fullstackopen.com/' },
  { label: 'freeCodeCamp', platform: 'freeCodeCamp', type: 'Practice', url: 'https://www.freecodecamp.org/' },
  { label: 'Deploy Node Apps', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=43q47pjTqFE' },
  { label: 'Environment Variables', platform: 'MDN', type: 'Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/environment' }
]" />

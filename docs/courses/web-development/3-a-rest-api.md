---
title: A REST API
---

# Backend (Node + Express): A REST API

Express is a minimal Node.js framework for building HTTP APIs. You define routes that map HTTP methods and paths to handler functions, parse request bodies with middleware, and return JSON responses.

<ExampleBox title="Express notes API" lang="js">

```js
import express from "express";
const app = express();
app.use(express.json());

const notes = [];
let nextId = 1;

app.get("/api/notes", (req, res) => res.json(notes));

app.post("/api/notes", (req, res) => {
  const note = { id: nextId++, content: req.body.content };
  notes.push(note);
  res.status(201).json(note);
});

app.delete("/api/notes/:id", (req, res) => {
  const i = notes.findIndex((n) => n.id === Number(req.params.id));
  if (i === -1) return res.status(404).json({ error: "not found" });
  notes.splice(i, 1);
  res.status(204).end();
});

app.listen(3000, () => console.log("Listening on :3000"));
```
</ExampleBox>

Key points:
- `express.json()` middleware parses incoming JSON request bodies.
- Route parameters like `:id` are read from `req.params`.
- Use correct status codes: `201` created, `404` not found, `204` no content.
- REST conventions map CRUD to GET/POST/PUT/DELETE.
- Return JSON consistently and validate input before trusting it.

<ExerciseBox title="Extend the API" difficulty="Medium">

Add a `PUT /api/notes/:id` route that updates a note's content, returning `404` if missing and `200` with the updated note otherwise.

</ExerciseBox>

<ExerciseBox title="Add validation" difficulty="Easy">

Reject `POST /api/notes` with a `400` status when `content` is missing or not a string. Return a clear JSON error message.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Created an Express app', 'Added GET route', 'Added POST route']" storageKey="web-development/3-a-rest-api" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-3-a-rest-api" :cards="[
{ q: 'What middleware parses JSON bodies in Express?', a: '<code>express.json()</code>.' }, { q: 'How do you read a route parameter?', a: 'From <code>req.params</code>, e.g. <code>req.params.id</code>.' }, { q: 'What status code means created?', a: '<code>201</code> for a successful POST.' }, { q: 'What status code means no content?', a: '<code>204</code> for a successful DELETE with no body.' }
]" />

## Resources

<ResourceTable title="Express Resources" :resources="[
  { label: 'Express Guide', platform: 'Official', type: 'Docs', url: 'https://expressjs.com/en/guide/routing.html' },
  { label: 'Node.js Docs', platform: 'Official', type: 'Docs', url: 'https://nodejs.org/en/docs' },
  { label: 'REST API Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/java/java_api.asp' },
  { label: 'Node & Express Course', platform: 'freeCodeCamp', type: 'Practice', url: 'https://www.freecodecamp.org/learn/back-end-development-and-apis/' },
  { label: 'Express Crash Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=SccSCuHhOw0' }
]" />

---
title: Fetch & APIs
---

# JavaScript: Fetch & APIs

`fetch` lets the browser request data from APIs over HTTP. You typically `await` the response, parse JSON, and render the result. Always handle errors and non-OK status codes.

<ExampleBox title="Fetching and rendering JSON" lang="js">

```js
async function loadUser() {
  try {
    const res = await fetch("https://api.github.com/users/octocat");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const user = await res.json();
    document.querySelector("#name").textContent = user.login;
  } catch (err) {
    console.error("Failed to load user:", err);
  }
}

loadUser();
```
</ExampleBox>

Key points:
- `fetch(url)` returns a promise resolving to a `Response` object.
- Check `res.ok` (or `res.status`) before trusting the body.
- `await res.json()` parses the body into a JavaScript object.
- Wrap calls in `try/catch` to handle network and parse errors.
- Use `async/await` for readable asynchronous code.

<ExerciseBox title="Fetch and render" difficulty="Easy">

Fetch a public API (e.g. a list of posts) and render the titles into a `&lt;ul&gt;`. Handle the loading and error states.

</ExerciseBox>

<ExerciseBox title="Post with fetch" difficulty="Medium">

Use `fetch` with `method: "POST"`, a `Content-Type` header, and a JSON body to create a resource on `https://jsonplaceholder.typicode.com/posts`. Log the returned id.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Fetched from a public API', 'Parsed JSON', 'Rendered data to the page']" storageKey="web-development/2-fetch-apis" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-2-fetch-apis" :cards="[
{ q: 'What does <code>fetch</code> return?', a: 'A promise resolving to a <code>Response</code> object.' }, { q: 'Why check <code>res.ok</code>?', a: 'To catch non-OK HTTP statuses before trusting the body.' }, { q: 'How do you parse JSON from a response?', a: '<code>await res.json()</code> parses the body.' }, { q: 'How do you handle fetch errors?', a: 'Wrap the call in <code>try/catch</code> for network/parse errors.' }
]" />

## Resources

<ResourceTable title="Fetch & APIs Resources" :resources="[
  { label: 'Fetch API', platform: 'MDN', type: 'Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API' },
  { label: 'AJAX Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/js/js_api_fetch.asp' },
  { label: 'JSONPlaceholder', platform: 'Official', type: 'Practice', url: 'https://jsonplaceholder.typicode.com/' },
  { label: 'Fetch API Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=G2VdRxKWZwY' }
]" />

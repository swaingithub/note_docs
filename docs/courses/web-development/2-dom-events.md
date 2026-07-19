---
title: DOM & Events
---

# JavaScript: DOM & Events

The DOM (Document Object Model) is the live tree of your page. JavaScript can select elements, change their content, and respond to user events like clicks and input — this is what makes pages interactive.

<ExampleBox title="Selecting and listening" lang="js">

```js
const btn = document.querySelector("button");
const output = document.querySelector("#output");

btn.addEventListener("click", () => {
  document.body.style.background = "#4f46e5";
  output.textContent = "Clicked!";
});

const input = document.querySelector("#name");
input.addEventListener("input", (e) => {
  output.textContent = `Hello, ${e.target.value}`;
});
```
</ExampleBox>

Key points:
- `document.querySelector` / `querySelectorAll` find elements by CSS selector.
- `addEventListener("click", fn)` runs `fn` when the event fires.
- Prefer `textContent` over `innerHTML` to avoid accidental HTML injection.
- The event object `e` carries details like `e.target` and `e.key`.
- Style changes via `element.style` or by toggling CSS classes.

<ExerciseBox title="Interactive counter" difficulty="Easy">

Add a button and a `&lt;span&gt;` to your page. On each click, increment a counter and display it in the span.

</ExerciseBox>

<ExerciseBox title="Live filter" difficulty="Medium">

Render a list of items from an array. Add a text input that filters the visible list as the user types, using `input` events and `textContent`.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Selected an element', 'Attached a click listener']" storageKey="web-development/2-dom-events" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-2-dom-events" :cards="[
{ q: 'How do you select an element?', a: '<code>document.querySelector(&quot;button&quot;)</code> by CSS selector.' }, { q: 'How do you respond to a click?', a: '<code>btn.addEventListener(&quot;click&quot;, fn)</code>.' }, { q: 'Why prefer textContent over innerHTML?', a: 'To avoid accidental HTML/JS injection.' }, { q: 'What does the event object carry?', a: 'Details like <code>e.target</code> and <code>e.key</code>.' }
]" />

## Resources

<ResourceTable title="DOM & Events Resources" :resources="[
  { label: 'DOM Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/js/js_htmldom.asp' },
  { label: 'Introduction to Events', platform: 'MDN', type: 'Docs', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events' },
  { label: 'JavaScript DOM', platform: 'freeCodeCamp', type: 'Practice', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/' },
  { label: 'DOM Manipulation', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=0ik6XpDq4Y8' }
]" />

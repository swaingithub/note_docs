---
title: Basics
---

# JavaScript: Basics

JavaScript is the language of the web. This lesson covers variables, functions, template literals, arrays, and objects — the building blocks you'll use everywhere in frontend and backend code.

<ExampleBox title="Functions and template literals" lang="js">

```js
const greet = (name) => `Hello, ${name}!`;
console.log(greet("World"));

const numbers = [1, 2, 3, 4];
const doubled = numbers.map((n) => n * 2);
const total = numbers.reduce((sum, n) => sum + n, 0);

const user = { name: "Ada", age: 36 };
console.log(`${user.name} is ${user.age}`);
```
</ExampleBox>

Key points:
- `const`/`let` declare variables; avoid `var` in modern code.
- Arrow functions `(x) => ...` are concise and don't rebind `this`.
- **Template literals** `` `Hello, ${name}` `` embed expressions in strings.
- `map`, `filter`, and `reduce` transform arrays declaratively.
- Objects group related data as key–value pairs.

<ExerciseBox title="Practice the basics" difficulty="Easy">

Write a function `sumEven(nums)` that returns the sum of even numbers in an array using `filter` and `reduce`.

</ExerciseBox>

<ExerciseBox title="Build a small utility" difficulty="Medium">

Create a `todo` module with add/remove/toggle functions operating on an array of `{id, text, done}` objects. Export the functions and write a couple of `console.assert` checks.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Wrote a function', 'Used template literals']" storageKey="web-development/2-basics" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-2-basics" :cards="[
{ q: 'What keyword declares block-scoped variables?', a: '<code>const</code> or <code>let</code>; avoid <code>var</code>.' }, { q: 'What embeds expressions in a string?', a: 'Template literals: <code>`Hello, ${name}`</code>.' }, { q: 'What array method transforms each element?', a: '<code>map</code> returns a new array of transformed values.' }, { q: 'What method combines values to one result?', a: '<code>reduce</code> accumulates via a reducer function.' }
]" />

## Resources

<ResourceTable title="JavaScript Resources" :resources="[
  { label: 'JavaScript Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/js/' },
  { label: 'JavaScript Guide', platform: 'MDN', type: 'Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' },
  { label: 'freeCodeCamp JS', platform: 'freeCodeCamp', type: 'Practice', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/' },
  { label: 'JS Full Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg' }
]" />

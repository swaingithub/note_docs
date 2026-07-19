---
title: JavaScript
---

# JavaScript

JavaScript (JS) is the scripting language of the web. It is **prototype-based**, **multi-paradigm**, and runs both in browsers and on servers via Node.js. Modern JS (ES2023+) powers frontend frameworks (React, Vue, Svelte) and backend runtimes (Node, Deno, Bun).

> **Paradigms:** Event-driven · Functional · Object-oriented (prototype-based) &nbsp;•&nbsp; **Extension:** `.js` / `.mjs` &nbsp;•&nbsp; **Run:** `node file.js` (or directly in a browser)
> **Difficulty:** Beginner-friendly &nbsp;•&nbsp; **Created:** 1995 (Brendan Eich) &nbsp;•&nbsp; **Standard:** ECMAScript (ECMA-262)

## Table of Contents

- [1. Getting Started](#1-getting-started)
- [2. Variables & Scope](#2-variables--scope)
- [3. Data Types & Coercion](#3-data-types--coercion)
- [4. Operators](#4-operators)
- [5. Functions & Closures](#5-functions--closures)
- [6. Arrays & Objects](#6-arrays--objects)
- [7. Control Flow](#7-control-flow)
- [8. Async: Promises & async/await](#8-async-promises--asyncawait)
- [9. DOM & Events](#9-dom--events)
- [10. Classes & Prototypes](#10-classes--prototypes)
- [11. Modules](#11-modules)
- [12. Exercises](#12-exercises)
- [13. Resources](#13-resources)

---

## 1. Getting Started

JavaScript code can run in three places: the browser console, an HTML `<script>` tag, or a `.js` file executed by Node.

<ExampleBox title="Hello, World" lang="js">

```js
console.log('Hello, JavaScript!')
```

</ExampleBox>

<TryIt lang="js" code="const name = 'World';&#10;console.log('Hello, ' + name + '!');&#10;console.log('2 + 3 =', 2 + 3);" />

> 💡 **Tip:** Open your browser's DevTools (F12) → Console tab and type `2 + 2` to evaluate JS instantly.

---

## 2. Variables & Scope

| Keyword | Scope | Hoisted | Reassignable | Use for |
|---------|-------|---------|--------------|---------|
| `var` | Function | Yes (initialized `undefined`) | Yes | Legacy only |
| `let` | Block | No (TDZ) | Yes | Values that change |
| `const` | Block | No (TDZ) | No (reference) | Values that don't change |

<ExampleBox title="Block scope vs function scope" lang="js">

```js
function demo() {
  if (true) {
    var a = 1      // function-scoped
    let b = 2      // block-scoped
    const c = 3    // block-scoped
  }
  console.log(a)   // 1  (var leaked out)
  // console.log(b) // ReferenceError: b is not defined
}
demo()
```

</ExampleBox>

**Key rules:**
- Prefer `const` by default; use `let` only when reassignment is needed.
- Never use `var` in modern code (it causes confusing bugs).

<TryIt lang="js" code="const pi = 3.14159;&#10;let radius = 5;&#10;let area = pi * radius * radius;&#10;console.log('Area =', area);" />

---

## 3. Data Types & Coercion

**Primitives:** `string`, `number`, `bigint`, `boolean`, `null`, `undefined`, `symbol`.
**Reference:** `object` (incl. arrays, functions, dates).

<ExampleBox title="Type checking" lang="js">

```js
console.log(typeof 'hi')        // "string"
console.log(typeof 42)          // "number"
console.log(typeof true)        // "boolean"
console.log(typeof null)        // "object"  (historical bug)
console.log(Array.isArray([]))  // true
```

</ExampleBox>

**Coercion traps:**
```js
console.log(1 == '1')     // true  (loose, coerces)
console.log(1 === '1')    // false (strict, no coercion)
console.log([] + {})      // "[object Object]"
```
Rule: **always use `===` and `!==`.**

---

## 4. Operators

| Category | Operators |
|----------|-----------|
| Arithmetic | `+ - * / % **` |
| Assignment | `= += -= *= /=` |
| Comparison | `== === != !== > < >= <=` |
| Logical | `&& \|\| !` |
| Nullish | `??` (null/undefined only) |

<ExampleBox title="Nullish coalescing vs OR" lang="js">

```js
const count = 0
console.log(count || 10)   // 10  (0 is falsy)
console.log(count ?? 10)   // 0   (only null/undefined fall back)
```

</ExampleBox>

---

## 5. Functions & Closures

Functions are **first-class**: you can pass them as arguments, return them, and store them in variables.

<ExampleBox title="Arrow functions & defaults" lang="js">

```js
const add = (a, b = 0) => a + b
console.log(add(2, 3))   // 5
console.log(add(2))      // 2

const nums = [1, 2, 3]
const squared = nums.map(n => n * n)
console.log(squared)     // [1, 4, 9]
```

</ExampleBox>

**Closures** capture their lexical scope — the foundation of modules and callbacks:

<ExampleBox title="A counter closure" lang="js">

```js
function createCounter() {
  let count = 0
  return () => ++count
}
const next = createCounter()
console.log(next(), next(), next())  // 1 2 3
```

</ExampleBox>

---

## 6. Arrays & Objects

<ExampleBox title="Common array methods" lang="js">

```js
const users = [
  { name: 'Ada', age: 36 },
  { name: 'Lin', age: 22 },
  { name: 'Bo', age: 41 },
]
const names = users
  .filter(u => u.age > 30)
  .map(u => u.name.toUpperCase())
console.log(names)   // ["ADA", "BO"]
```

</ExampleBox>

<ExampleBox title="Object destructuring & spread" lang="js">

```js
const user = { name: 'Ada', age: 36, role: 'admin' }
const { name, ...rest } = user
console.log(name)            // "Ada"
console.log({ ...rest, id: 1 })  // { age: 36, role: 'admin', id: 1 }
```

</ExampleBox>

---

## 7. Control Flow

```js
for (let i = 0; i < 3; i++) console.log(i)
// 0 1 2

const score = 85
const grade = score >= 90 ? 'A' : score >= 70 ? 'B' : 'C'
console.log(grade)   // "B"

[1, 2, 3].forEach(n => console.log(n))
```

---

## 8. Async: Promises & async/await

JS is single-threaded; async work (network, timers) uses the **event loop**.

<ExampleBox title="Promises & async/await" lang="js">

```js
function delay(ms) {
  return new Promise(res => setTimeout(res, ms))
}

async function main() {
  console.log('start')
  await delay(100)
  console.log('after 100ms')
}
main()
```

</ExampleBox>

Microtask queue (Promises) runs before the macrotask queue (`setTimeout`).

---

## 9. DOM & Events

<ExampleBox title="Select & listen" lang="html">

```html
&lt;button id="btn">Click me&lt;/button>
&lt;script>
  document.getElementById('btn').addEventListener('click', (e) => {
    e.target.textContent = 'Clicked!'
  })
&lt;/script>
```

</ExampleBox>

**Event delegation** — attach one listener to a parent instead of many children:
```js
list.addEventListener('click', e => {
  if (e.target.matches('li')) console.log(e.target.textContent)
})
```

---

## 10. Classes & Prototypes

`class` is syntactic sugar over prototype-based inheritance.

<ExampleBox title="Class with inheritance" lang="js">

```js
class Animal {
  constructor(name) { this.name = name }
  speak() { return `${this.name} makes a noise` }
}
class Dog extends Animal {
  speak() { return `${this.name} barks` }
}
console.log(new Dog('Rex').speak())  // "Rex barks"
```

</ExampleBox>

---

## 11. Modules

Use **ESM** (`import`/`export`) for new projects; CommonJS (`require`) remains in older Node code.

```js
// math.js
export const sum = (a, b) => a + b

// app.js
import { sum } from './math.js'
console.log(sum(2, 3))
```

---

## 12. Exercises

<ExerciseBox title="Exercise 1 — FizzBuzz" difficulty="Easy">

Print numbers 1–15. For multiples of 3 print `Fizz`, for 5 print `Buzz`, for both print `FizzBuzz`.

```js
for (let i = 1; i <= 15; i++) {
  // your code here
}
```
</ExerciseBox>

<ExerciseBox title="Exercise 2 — Unique values" difficulty="Medium">

Write a function `unique(arr)` that returns an array with duplicates removed, without using `Set`.

```js
unique([1, 2, 2, 3, 3, 3]) // [1, 2, 3]
```
</ExerciseBox>

<ExerciseBox title="Exercise 3 — Debounce" difficulty="Hard">

Implement `debounce(fn, ms)` that delays calling `fn` until `ms` has passed since the last call.
</ExerciseBox>

---

## 13. Self-Test (Flashcards)

<Quiz storageKey="quiz-javascript" :cards="[
  { q: 'What is the difference between <code>let</code> and <code>var</code>?', a: '<code>let</code> is block-scoped and not hoisted as initialized; <code>var</code> is function-scoped and hoisted (initialized to <code>undefined</code>).' },
  { q: 'Why should you prefer <code>===</code> over <code>==</code>?', a: '<code>==</code> performs type coercion which leads to surprising results; <code>===</code> compares value and type strictly.' },
  { q: 'What is a closure?', a: 'A function that captures variables from its lexical scope, even after that scope has exited.' },
  { q: 'What is the difference between microtask and macrotask queues?', a: 'Promise callbacks (microtasks) run before timers (macrotasks) on each turn of the event loop.' }
]" />

## 14. Resources

<ResourceTable title="JavaScript learning paths" :resources="[
  { label: 'JavaScript Guide', platform: 'MDN', type: 'Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' },
  { label: 'JS Reference', platform: 'MDN', type: 'Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference' },
  { label: 'JavaScript Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/js/' },
  { label: 'JS Full Course', platform: 'W3Schools', type: 'Video', url: 'https://www.youtube.com/watch?v=hdI2bqOjyBc' },
  { label: 'The Modern JS Tutorial', platform: 'JavaScriptInfo', type: 'Tutorial', url: 'https://javascript.info/' },
  { label: 'You Don\'t Know JS', platform: 'GitHub', type: 'Book', url: 'https://github.com/getify/You-Dont-Know-JS' },
  { label: 'JS Algorithms', platform: 'freeCodeCamp', type: 'Practice', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/' },
  { label: 'JS Arrays deep-dive', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/javascript-arrays/' },
  { label: 'JS Cheatsheet', platform: 'Programiz', type: 'Tutorial', url: 'https://www.programiz.com/javascript/cheatsheet' }
]" />

> 📝 Draft anything in the [Live Editor](/editor), then paste it here to keep your docs current.

---
title: TypeScript
---

# TypeScript

TypeScript (TS) is a **statically typed superset of JavaScript** that compiles to plain JS. It adds static types, interfaces, generics, and superior tooling — catching whole classes of errors at compile time instead of runtime.

> **Paradigms:** Statically typed · Multi-paradigm · Structural (duck) typing &nbsp;•&nbsp; **Extension:** `.ts` / `.tsx` &nbsp;•&nbsp; **Run:** `tsc file.ts` (or a bundler like Vite/esbuild)
> **Difficulty:** Intermediate (know JS first) &nbsp;•&nbsp; **Created:** 2012 (Microsoft) &nbsp;•&nbsp; **Standard:** ECMAScript + type layer

## Table of Contents

- [1. Getting Started](#1-getting-started)
- [2. Static Types & Inference](#2-static-types--inference)
- [3. Interfaces & Type Aliases](#3-interfaces--type-aliases)
- [4. Union & Literal Types](#4-union--literal-types)
- [5. Functions & Generics](#5-functions--generics)
- [6. Utility Types](#6-utility-types)
- [7. Classes & Access Modifiers](#7-classes--access-modifiers)
- [8. Type Narrowing](#8-type-narrowing)
- [9. tsconfig & Strict Mode](#9-tsconfig--strict-mode)
- [10. Exercises](#10-exercises)
- [11. Resources](#11-resources)

---

## 1. Getting Started

<ExampleBox title="Hello, World" lang="ts">

```ts
const message: string = 'Hello, TypeScript!'
console.log(message)
```

</ExampleBox>

<TryIt lang="js" code="const message = 'Hello, TypeScript!';&#10;console.log(message);&#10;// TS types are erased at runtime — this is valid JS" />

> 💡 **Tip:** Run TS in the browser via the [TypeScript Playground](https://www.typescriptlang.org/play). The `<TryIt>` box above runs the compiled JS.

---

## 2. Static Types & Inference

Type annotations use a colon; most types are **inferred** so you rarely write them explicitly.

<ExampleBox title="Annotations vs inference" lang="ts">

```ts
let count: number = 10          // explicit annotation
let name = 'Ada'                // inferred as string
// name = 42                    // Error: Type 'number' is not assignable to 'string'

const numbers: number[] = [1, 2, 3]
```

</ExampleBox>

**Key rules:**
- Avoid `any` — it disables checking. Prefer `unknown` when a type is truly uncertain.
- Enable `noImplicitAny` (part of `strict`) to forbid implicit `any`.

---

## 3. Interfaces & Type Aliases

`interface` describes object **shapes**; `type` can describe unions, intersections, and primitives.

<ExampleBox title="Interface vs type" lang="ts">

```ts
interface User {
  id: number
  name: string
  email?: string        // optional
}

type Role = 'admin' | 'editor' | 'viewer'

const u: User = { id: 1, name: 'Ada' }
```

</ExampleBox>

Use `interface` for objects/classes; use `type` for unions and computed types.

---

## 4. Union & Literal Types

Model real domains precisely with unions and literal types.

<ExampleBox title="Discriminated unions" lang="ts">

```ts
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; side: number }

function area(s: Shape): number {
  if (s.kind === 'circle') return Math.PI * s.radius ** 2
  return s.side ** 2
}
```

</ExampleBox>

---

## 5. Functions & Generics

Generics make components reusable and type-safe.

<ExampleBox title="Generic identity & constraints" lang="ts">

```ts
function identity&lt;T>(x: T): T {
  return x
}

function longest&lt;T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b
}

console.log(identity(42))        // 42
console.log(longest([1, 2, 3], [1])) // [1, 2, 3]
```

</ExampleBox>

---

## 6. Utility Types

Transform existing types instead of rewriting them.

| Utility | Purpose |
|---------|---------|
| `Partial<T>` | All properties optional |
| `Required<T>` | All properties required |
| `Pick<T, K>` | Keep only keys `K` |
| `Omit<T, K>` | Drop keys `K` |
| `Record<K, V>` | Map of `K` → `V` |
| `ReturnType<F>` | Return type of function `F` |

<ExampleBox title="Pick & Omit" lang="ts">

```ts
interface User { id: number; name: string; email: string }
type PublicUser = Omit&lt;User, 'email'>
const u: PublicUser = { id: 1, name: 'Ada' }
```

</ExampleBox>

---

## 7. Classes & Access Modifiers

<ExampleBox title="Class with modifiers" lang="ts">

```ts
class Account {
  private balance = 0
  constructor(public owner: string) {}
  deposit(amount: number) {
    if (amount <= 0) throw new Error('Invalid amount')
    this.balance += amount
  }
  getBalance(): number { return this.balance }
}
```

</ExampleBox>

`public` (default), `private`, `protected`, `readonly` are enforced at compile time.

---

## 8. Type Narrowing

TypeScript narrows types using `typeof`, `in`, and `instanceof`.

<ExampleBox title="Narrowing with typeof" lang="ts">

```ts
function format(value: string | number): string {
  if (typeof value === 'string') return value.toUpperCase()
  return value.toFixed(2)
}
```

</ExampleBox>

---

## 9. tsconfig & Strict Mode

`tsconfig.json` controls compilation. Always enable `strict`.

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler"
  }
}
```

`strict` turns on: `noImplicitAny`, `strictNullChecks`, `strictFunctionTypes`, and more.

---

## 10. Exercises

<ExerciseBox title="Exercise 1 — Typed sum" difficulty="Easy">

Write a generic `sum&lt;T extends number>(items: T[]): number` that adds an array of numbers.
</ExerciseBox>

<ExerciseBox title="Exercise 2 — Result type" difficulty="Medium">

Model a `Result&lt;T>` as a union of `{ ok: true; value: T }` and `{ ok: false; error: string }`, then write a function `safeParse(json: string): Result&lt;unknown>`.
</ExerciseBox>

<ExerciseBox title="Exercise 3 — Mapped type" difficulty="Hard">

Create a generic `Mutable&lt;T>` that converts all `readonly` properties of `T` to mutable using a mapped type.
</ExerciseBox>

---

## 11. Self-Test (Flashcards)

<Quiz storageKey="quiz-typescript" :cards="[
  { q: 'What is the difference between <code>interface</code> and <code>type</code> in TypeScript?', a: 'Use <code>interface</code> for object and class shapes; use <code>type</code> for unions, intersections, and primitives. Interfaces are also open to declaration merging.' },
  { q: 'What does the <code>strict</code> compiler option enable?', a: 'It turns on <code>noImplicitAny</code>, <code>strictNullChecks</code>, <code>strictFunctionTypes</code>, and other checks that catch more errors at compile time.' },
  { q: 'How does a generic constraint like <code>&lt;T extends { length: number }&gt;</code> work?', a: 'It restricts <code>T</code> to types that have a <code>length</code> property, so you can safely use <code>.length</code> inside the function.' },
  { q: 'What is the difference between <code>unknown</code> and <code>any</code>?', a: '<code>any</code> disables type checking entirely; <code>unknown</code> accepts any value but forces you to narrow before using it.' }
]" />

## 12. Resources

<ResourceTable title="TypeScript learning paths" :resources="[
  { label: 'TypeScript Handbook', platform: 'Official', type: 'Docs', url: 'https://www.typescriptlang.org/docs/handbook/intro.html' },
  { label: 'TS for JS Developers', platform: 'Official', type: 'Tutorial', url: 'https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html' },
  { label: 'TypeScript Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/typescript/' },
  { label: 'TS Deep Dive', platform: 'GitHub', type: 'Book', url: 'https://www.typescript-book.com/' },
  { label: 'Type Challenges', platform: 'GitHub', type: 'Practice', url: 'https://github.com/type-challenges/type-challenges' },
  { label: 'Total TypeScript', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=TXhWkEahz4k' },
  { label: 'TS Utility Types', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/typescript-utility-types/' },
  { label: 'TypeScript Course', platform: 'freeCodeCamp', type: 'Video', url: 'https://www.youtube.com/watch?v=30LWjhZzg50' }
]" />

> 📝 Draft anything in the [Live Editor](/editor), then paste it here to keep your docs current.

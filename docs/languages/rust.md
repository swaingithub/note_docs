---
title: Rust
---

# Rust

Rust is a systems programming language focused on **memory safety** and **performance** without a garbage collector. Its ownership model enforces safe memory access at compile time, eliminating whole classes of bugs (data races, null/dangling pointers) while keeping code as fast as C/C++.

> **Paradigms:** Multi-paradigm · Statically typed · Ownership-based &nbsp;•&nbsp; **Extension:** `.rs` &nbsp;•&nbsp; **Run:** `cargo run` (or `rustc file.rs`)
> **Difficulty:** Steep learning curve &nbsp;•&nbsp; **Created:** 2010 (Graydon Hoare, Mozilla) &nbsp;•&nbsp; **Standard:** Stable channel (semver, 6-week releases)

## Table of Contents

- [1. Getting Started](#1-getting-started)
- [2. Variables & Ownership](#2-variables--ownership)
- [3. Borrowing & References](#3-borrowing--references)
- [4. Data Types](#4-data-types)
- [5. Enums & Pattern Matching](#5-enums--pattern-matching)
- [6. Structs & Impl](#6-structs--impl)
- [7. Traits](#7-traits)
- [8. Collections](#8-collections)
- [9. Error Handling (Result & Option)](#9-error-handling-result--option)
- [10. Concurrency](#10-concurrency)
- [11. Exercises](#11-exercises)
- [12. Resources](#12-resources)

---

## 1. Getting Started

Install the toolchain with `rustup`, then create a project with Cargo (Rust's build tool and package manager). The `main` function is the entry point, and `println!` is a macro for formatted output.

<ExampleBox title="Hello, World" lang="rust">

```rust
fn main() {
    println!("Hello, Rust!");

    let name = "World";
    println!("Hello, {}!", name);
    println!("2 + 3 = {}", 2 + 3);
}
```

</ExampleBox>

> 💡 **Tip:** Try it: run with `cargo run` after `cargo new hello && cd hello`, or paste the snippet into the [Rust Playground](https://play.rust-lang.org/).

**Key rules:**
- Every executable program needs a `fn main()`.
- Statements end with `;`; `println!` is a macro (note the `!`).

---

## 2. Variables & Ownership

Variables are immutable by default. Use `mut` to allow reassignment. Each value has exactly **one owner**; when the owner goes out of scope the value is dropped. Assigning a non-`Copy` value **moves** it; after the move the original is no longer usable.

<ExampleBox title="Immutability, mutability & moves" lang="rust">

```rust
fn main() {
    let x = 5;
    // x = 6; // error: cannot assign twice to immutable variable

    let mut y = 5;
    y = 6; // ok

    let s1 = String::from("hello");
    let s2 = s1; // s1 is MOVED into s2
    // println!("{}", s1); // error: borrow of moved value
    println!("{}", s2); // hello
}
```

</ExampleBox>

**Key rules:**
- Prefer immutable bindings; add `mut` only when needed.
- Moving transfers ownership; primitives (`i32`, `f64`, `bool`, `char`) are `Copy` and are duplicated instead.

---

## 3. Borrowing & References

Instead of transferring ownership, you can **borrow** a value with `&` (shared reference) or `&mut` (mutable reference). The borrow checker enforces: either many shared borrows **or** one mutable borrow, never both at the same time. References must always be valid (no dangling refs).

<ExampleBox title="Shared vs mutable borrows" lang="rust">

```rust
fn main() {
    let mut s = String::from("hello");

    let r1 = &s;        // shared borrow
    let r2 = &s;        // another shared borrow — ok
    println!("{} {}", r1, r2);

    let r3 = &mut s;    // mutable borrow — ok now, no active shared borrows
    r3.push_str(" world");
    println!("{}", r3);
}
```

</ExampleBox>

**Key rules:**
- Use `&T` to read without taking ownership; `&mut T` to modify.
- You cannot have a mutable borrow while shared borrows are alive.
- References cannot outlive the data they point to (lifetimes guarantee this).

---

## 4. Data Types

Rust has scalar types (`i32`, `u32`, `f64`, `bool`, `char`), tuples, arrays, and the `String` type. Type inference is strong, but you can annotate explicitly. Integer overflow in debug builds panics; in release builds it wraps.

<ExampleBox title="Scalars, tuples & arrays" lang="rust">

```rust
fn main() {
    let integer: i32 = -42;
    let float: f64 = 3.14;
    let boolean: bool = true;
    let character: char = '🦀';

    let tuple: (i32, f64, char) = (1, 2.0, 'a');
    let (a, _b, c) = tuple;
    println!("{} {}", a, c);

    let array: [i32; 3] = [1, 2, 3];
    println!("first = {}", array[0]);
}
```

</ExampleBox>

**Key rules:**
- `char` is a Unicode scalar value (4 bytes), not a single byte like C.
- Arrays have fixed length `[T; N]`; use `Vec<T>` for a growable collection.
- Numeric literals can be suffixed (`42u8`) or inferred from context.

---

## 5. Enums & Pattern Matching

Enums let a type be one of several variants, and variants can carry data. `match` is exhaustive pattern matching — the compiler forces you to handle every case. This is the backbone of Rust's error and option handling.

<ExampleBox title="Enums with data & match" lang="rust">

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
}

fn handle(msg: Message) {
    match msg {
        Message::Quit => println!("quit"),
        Message::Move { x, y } => println!("move to {},{}", x, y),
        Message::Write(text) => println!("text: {}", text),
    }
}

fn main() {
    handle(Message::Move { x: 10, y: 20 });
    handle(Message::Write(String::from("hi")));
}
```

</ExampleBox>

**Key rules:**
- `match` must cover all variants (use `_` as a catch-all if needed).
- Enums + `match` replace many uses of inheritance and nullable types.

---

## 6. Structs & Impl

Structs group related fields. Use `struct` for named data and `tuple struct` for unnamed. Methods and associated functions are defined in an `impl` block. The `new` convention returns `Self`.

<ExampleBox title="Structs & methods" lang="rust">

```rust
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn new(width: u32, height: u32) -> Self {
        Rectangle { width, height }
    }

    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect = Rectangle::new(30, 50);
    println!("area = {}", rect.area());
}
```

</ExampleBox>

**Key rules:**
- `&self` borrows the instance; `&mut self` mutates it; `self` takes ownership.
- Associated functions without `self` (like `new`) are called with `::`.

---

## 7. Traits

Traits define shared behavior — Rust's equivalent of interfaces. Types `impl` a trait to provide its methods. Traits enable polymorphism via generics and trait bounds.

<ExampleBox title="Defining & implementing a trait" lang="rust">

```rust
trait Summary {
    fn summarize(&self) -> String;
}

struct Article {
    title: String,
}

impl Summary for Article {
    fn summarize(&self) -> String {
        format!("Read: {}", self.title)
    }
}

fn notify&lt;T: Summary>(item: &T) {
    println!("Breaking news! {}", item.summarize());
}

fn main() {
    let a = Article { title: String::from("Rust 2.0") };
    notify(&a);
}
```

</ExampleBox>

**Key rules:**
- Use trait bounds (`T: Trait`) to write generic, reusable functions.
- Default method implementations can be provided in the trait.

---

## 8. Collections

The standard library provides growable, heap-allocated collections. `Vec<T>` is a dynamic array; `String` is a byte vector; `HashMap<K, V>` is a hash map. These allocate on the heap and are the common "owned" data containers.

<ExampleBox title="Vec, String & HashMap" lang="rust">

```rust
use std::collections::HashMap;

fn main() {
    let mut v = vec![1, 2, 3];
    v.push(4);
    println!("{:?}", v); // [1, 2, 3, 4]

    let mut scores = HashMap::new();
    scores.insert(String::from("Alice"), 10);
    scores.insert(String::from("Bob"), 20);

    if let Some(score) = scores.get("Alice") {
        println!("Alice: {}", score);
    }
}
```

</ExampleBox>

**Key rules:**
- Iterate with `for x in &v` to borrow, `for x in v` to consume.
- `HashMap` keys need `Eq + Hash`; values are moved in on insert.

---

## 9. Error Handling (Result & Option)

Rust has no exceptions. Recoverable errors use `Result<T, E>`; absence of a value uses `Option<T>`. The `?` operator propagates errors upward, keeping code clean.

<ExampleBox title="Result, Option & the ? operator" lang="rust">

```rust
use std::num::ParseIntError;

fn parse_number(s: &str) -> Result&lt;i32, ParseIntError> {
    let n: i32 = s.parse()?; // propagates error if parsing fails
    Ok(n * 2)
}

fn main() {
    match parse_number("21") {
        Ok(v) => println!("doubled = {}", v),
        Err(e) => println!("error: {}", e),
    }

    let maybe: Option&lt;i32> = Some(5);
    println!("{}", maybe.unwrap_or(0));
}
```

</ExampleBox>

**Key rules:**
- Use `Option<T>` instead of null; use `Result<T, E>` for fallible operations.
- `?` returns early on `Err`/`None`; never use `unwrap()` in production code.

---

## 10. Concurrency

Rust's type system prevents **data races** at compile time ("fearless concurrency"). Spawn threads with `std::thread`, and share data safely with `Arc<Mutex<T>>` or message passing via channels.

<ExampleBox title="Threads & a channel" lang="rust">

```rust
use std::thread;
use std::sync::mpsc;

fn main() {
    let (tx, rx) = mpsc::channel();

    let handle = thread::spawn(move || {
        tx.send(String::from("hello from thread")).unwrap();
    });

    handle.join().unwrap();
    println!("received: {}", rx.recv().unwrap());
}
```

</ExampleBox>

**Key rules:**
- Use `move` closures to transfer ownership into a thread.
- Share state with `Arc<Mutex<T>>` or communicate with channels — never share mutable state freely.

---

## 11. Exercises

<ExerciseBox title="Exercise 1 — Ownership puzzle" difficulty="Easy">

Predict which lines compile. Fix the code so it prints both strings without cloning unnecessarily:

```rust
fn main() {
    let s = String::from("rust");
    let t = s;
    println!("{} {}", s, t);
}
```

</ExerciseBox>

<ExerciseBox title="Exercise 2 — Trait + struct" difficulty="Medium">

Create a `Shape` trait with an `area(&self) -> f64` method. Implement it for `Circle` (radius) and `Square` (side). Write a function that prints the area of any `Shape`.

</ExerciseBox>

<ExerciseBox title="Exercise 3 — Safe counter with threads" difficulty="Hard">

Spawn 4 threads that each increment a shared counter 1000 times. Use `Arc&lt;Mutex&lt;i32&gt;>` (or atomics) so the final value is exactly 4000. Print the result.

</ExerciseBox>

---

## 12. Self-Test (Flashcards)

<Quiz storageKey="quiz-rust" :cards="[
  { q: 'What is ownership in Rust?', a: 'Each value has exactly one owner; when the owner goes out of scope the value is dropped. Assigning a non-Copy value moves it, making the original unusable.' },
  { q: 'What does the <code>?</code> operator do?', a: 'It returns early from the function on <code>Err</code> or <code>None</code>, propagating the error upward — a concise alternative to manual match handling.' },
  { q: 'How is fearless concurrency enforced?', a: 'The type system and borrow checker prevent data races at compile time, so you cannot share mutable state across threads without synchronization like <code>Arc&lt;Mutex&lt;T&gt;&gt;</code>.' },
  { q: 'What is the difference between <code>Option&lt;T&gt;</code> and <code>Result&lt;T, E&gt;</code>?', a: '<code>Option&lt;T&gt;</code> models an optional value (some or none); <code>Result&lt;T, E&gt;</code> models a fallible operation that can succeed with a value or fail with an error.' }
]" />

## 12. Resources

<ResourceTable title="Rust learning paths" :resources="[
  { label: 'Learn Rust', platform: 'Official', type: 'Tutorial', url: 'https://www.rust-lang.org/learn' },
  { label: 'The Rust Book', platform: 'Official', type: 'Book', url: 'https://doc.rust-lang.org/book/' },
  { label: 'Rust by Example', platform: 'Official', type: 'Tutorial', url: 'https://doc.rust-lang.org/rust-by-example/' },
  { label: 'Rust Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/rust/' },
  { label: 'Rust Programming', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/rust/' },
  { label: 'Rust Tutorial', platform: 'Programiz', type: 'Tutorial', url: 'https://www.programiz.com/rust' },
  { label: 'Rust Full Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=5C_HPTJg5ek' },
  { label: 'Rust Repository', platform: 'GitHub', type: 'Docs', url: 'https://github.com/rust-lang/rust' }
]" />

> 📝 Draft anything in the [Live Editor](/editor), then paste it here to keep your docs current.

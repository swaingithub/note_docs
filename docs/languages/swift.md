---
title: Swift
---

# Swift

Swift is Apple's modern, safe, and fast programming language for iOS, macOS, watchOS, tvOS, and server-side development (via Vapor). It combines the performance of compiled languages with expressive, approachable syntax and a strong emphasis on **protocol-oriented** and **value-semantic** design.

> **Paradigms:** Multi-paradigm · Statically typed · Protocol-oriented &nbsp;•&nbsp; **Extension:** `.swift` &nbsp;•&nbsp; **Run:** `swift file.swift` (or Xcode / Swift Playgrounds)
> **Difficulty:** Beginner-friendly &nbsp;•&nbsp; **Created:** 2014 (Apple) &nbsp;•&nbsp; **Standard:** Open-source (Apache 2.0)

## Table of Contents

- [1. Getting Started](#1-getting-started)
- [2. Variables & Optionals](#2-variables--optionals)
- [3. Control Flow](#3-control-flow)
- [4. Functions & Closures](#4-functions--closures)
- [5. Structs & Classes](#5-structs--classes)
- [6. Enums & Protocols](#6-enums--protocols)
- [7. Optionals Deep Dive](#7-optionals-deep-dive)
- [8. Collections](#8-collections)
- [9. Error Handling](#9-error-handling)
- [10. Exercises](#10-exercises)
- [11. Resources](#11-resources)

---

## 1. Getting Started

Swift code runs via the Swift compiler or interactively in a REPL / Playground. `print` outputs to the console, and type inference keeps declarations concise.

<ExampleBox title="Hello, World" lang="swift">

```swift
let name = "World"
print("Hello, \(name)!")
print("2 + 3 = \(2 + 3)")
```

</ExampleBox>

> 💡 **Tip:** Try it: run with `swift hello.swift` from the command line, or paste the snippet into the [Swift Playground](https://swiftplaygrounds.apple.com/) / a Swift REPL.

**Key rules:**
- `let` declares a constant; `var` declares a variable. Prefer `let`.
- String interpolation uses `\(expression)`.

---

## 2. Variables & Optionals

Constants use `let`, variables use `var`. Swift infers types but you can annotate. **Optionals** (`Type?`) represent the absence of a value safely — a core Swift feature replacing null pointers.

<ExampleBox title="Constants, variables & optionals" lang="swift">

```swift
let pi = 3.14159
var radius = 5.0
radius = 6.0

let area = pi * radius * radius
print("Area = \(area)")

var maybeName: String? = nil
maybeName = "Ada"
```

</ExampleBox>

**Key rules:**
- Use `let` by default; switch to `var` only when reassignment is required.
- An optional is either `nil` or wraps a value of the underlying type.

---

## 3. Control Flow

Swift offers `if`/`else`, `for-in` loops, `while`, and `switch` (which is exhaustive and supports pattern matching, ranges, and tuples).

<ExampleBox title="For-in, if & switch" lang="swift">

```swift
let scores = [90, 75, 50, 88]
for score in scores {
    let grade: String
    switch score {
    case 90...100: grade = "A"
    case 70..<90:  grade = "B"
    default:       grade = "C"
    }
    print("\(score) -> \(grade)")
}

var i = 0
while i < 3 {
    print(i)
    i += 1
}
```

</ExampleBox>

**Key rules:**
- `switch` must be exhaustive; no need for `break` (use `fallthrough` to opt in).
- Ranges: `a...b` is inclusive, `a..<b` is half-open.

---

## 4. Functions & Closures

Functions are declared with `func`, support default parameters and tuple returns. **Closures** are self-contained blocks of functionality — used heavily for callbacks and higher-order functions.

<ExampleBox title="Functions & closures" lang="swift">

```swift
func greet(_ name: String, loudly: Bool = false) -> String {
    let message = "Hello, \(name)"
    return loudly ? message.uppercased() : message
}

print(greet("Ada"))
print(greet("Bo", loudly: true))

let numbers = [1, 2, 3, 4]
let doubled = numbers.map { $0 * 2 }
print(doubled) // [2, 4, 6, 8]
```

</ExampleBox>

**Key rules:**
- `_ name` omits the external argument label; `loudly:` requires the label at call site.
- `$0`, `$1` refer to closure arguments positionally.

---

## 5. Structs & Classes

`struct` and `enum` are **value types** (copied on assignment); `class` is a **reference type** (shared). Swift encourages value types for safety and predictability. Both support properties, methods, and initializers.

<ExampleBox title="Struct vs class" lang="swift">

```swift
struct Point {
    var x: Int
    var y: Int
}

class Counter {
    var count = 0
    func increment() { count += 1 }
}

var p1 = Point(x: 1, y: 2)
var p2 = p1      // copy
p2.x = 99
print(p1.x)      // 1 (p1 unchanged)

let c = Counter()
let d = c        // shared reference
d.increment()
print(c.count)   // 1
```

</ExampleBox>

**Key rules:**
- Prefer `struct` unless you need identity or shared mutable state.
- Classes support inheritance; structs and enums do not.

---

## 6. Enums & Protocols

Swift enums are powerful: they can carry associated values and have methods. **Protocols** define a blueprint of methods/properties; types conform to them, enabling polymorphism without deep inheritance.

<ExampleBox title="Enums with associated values & protocols" lang="swift">

```swift
enum NetworkResult {
    case success(data: String)
    case failure(code: Int)
}

protocol Describable {
    var description: String { get }
}

struct User: Describable {
    var name: String
    var description: String { return "User: \(name)" }
}

let u = User(name: "Ada")
print(u.description)
```

</ExampleBox>

**Key rules:**
- Enums with associated values model tagged unions safely.
- Protocols + extensions replace much of traditional OOP inheritance.

---

## 7. Optionals Deep Dive

Optionals must be unwrapped before use. Safe approaches: `if let`, `guard let`, optional chaining (`?.`), nil-coalescing (`??`), and `switch`. Avoid forced unwrapping (`!`) in production.

<ExampleBox title="Unwrapping optionals" lang="swift">

```swift
let maybeNumber: Int? = Int("42")

if let n = maybeNumber {
    print("parsed: \(n)")
} else {
    print("not a number")
}

let fallback = maybeNumber ?? 0
print("value or zero: \(fallback)")

struct Person { var name: String }
let p: Person? = Person(name: "Bo")
print(p?.name ?? "unknown") // optional chaining
```

</ExampleBox>

**Key rules:**
- `guard let` early-returns, keeping the happy path unindented.
- Use `??` to provide a default instead of crashing on `nil`.

---

## 8. Collections

Swift's standard collections are `Array`, `Set`, and `Dictionary` — all value types with copy-on-write semantics. They are generic and support rich methods.

<ExampleBox title="Arrays, sets & dictionaries" lang="swift">

```swift
var fruits = ["apple", "banana", "cherry"]
fruits.append("date")
print(fruits.count)

let unique = Set([1, 1, 2, 3, 3])
print(unique) // {1, 2, 3}

var ages = ["Ada": 36, "Bo": 41]
ages["Lin"] = 22
if let age = ages["Ada"] {
    print("Ada is \(age)")
}
```

</ExampleBox>

**Key rules:**
- Iterate with `for item in collection`; filter/map with closures.
- Dictionary lookups return optionals (the key may be absent).

---

## 9. Error Handling

Swift uses `throw`, `do-try-catch`, and the `Error` protocol. Errors are enums conforming to `Error`. `try?` converts to an optional; `try!` force-unwraps (avoid).

<ExampleBox title="Throwing & catching" lang="swift">

```swift
enum ValidationError: Error {
    case tooShort
}

func validate(_ s: String) throws -> String {
    guard s.count >= 3 else { throw ValidationError.tooShort }
    return s.uppercased()
}

do {
    let result = try validate("hi")
    print(result)
} catch {
    print("Validation failed: \(error)")
}
```

</ExampleBox>

**Key rules:**
- Mark throwing functions with `throws` and call them with `try`.
- Use `do-catch` to handle errors gracefully; reserve `try!` for truly impossible failures.

---

## 10. Exercises

<ExerciseBox title="Exercise 1 — FizzBuzz" difficulty="Easy">

Print numbers 1–15. For multiples of 3 print `Fizz`, for 5 print `Buzz`, for both print `FizzBuzz`. Use `for-in` and `switch` or `if`.
</ExerciseBox>

<ExerciseBox title="Exercise 2 — Struct + protocol" difficulty="Medium">

Define a `Shape` protocol with a `area() -> Double` requirement. Implement it for `Circle(radius:)` and `Square(side:)` structs. Write a function printing the area of any `Shape`.
</ExerciseBox>

<ExerciseBox title="Exercise 3 — Safe optional parsing" difficulty="Hard">

Write a function `average(of numbers: [String]) -> Double?` that parses each string to `Int`, ignores unparseable entries, and returns the average of valid numbers. Return `nil` if none are valid.
</ExerciseBox>

---

## 11. Self-Test (Flashcards)

<Quiz storageKey="quiz-swift" :cards="[
  { q: 'What is the difference between a struct and a class in Swift?', a: 'Structs and enums are value types (copied on assignment); classes are reference types (shared). Structs do not support inheritance, classes do.' },
  { q: 'What is an optional and how do you safely use one?', a: 'An optional <code>Type?</code> may hold a value or be nil. Unwrap it safely with <code>if let</code>, <code>guard let</code>, optional chaining <code>?.</code>, or <code>??</code> — avoid forced unwrapping with <code>!</code>.' },
  { q: 'Why does Swift require an exhaustive switch?', a: 'The compiler forces every case to be handled (with a default or <code>_</code>), preventing unhandled states and making the code safer than C-style switches.' },
  { q: 'What does <code>try?</code> do when calling a throwing function?', a: 'It converts the result into an optional, returning nil if the function throws instead of propagating the error with <code>try</code>.' }
]" />

## 12. Resources

<ResourceTable title="Swift learning paths" :resources="[
  { label: 'Swift Documentation', platform: 'Official', type: 'Docs', url: 'https://swift.org/documentation/' },
  { label: 'The Swift Book', platform: 'Official', type: 'Book', url: 'https://docs.swift.org/swift-book/' },
  { label: 'Swift at Apple', platform: 'Official', type: 'Docs', url: 'https://developer.apple.com/swift/' },
  { label: 'Swift Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/swift/' },
  { label: 'Swift Programming', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/swift/' },
  { label: 'Swift Tutorial', platform: 'Programiz', type: 'Tutorial', url: 'https://www.programiz.com/swift-programming' },
  { label: 'Swift Full Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=comQ1-x2a1Q' }
]" />

> 📝 Draft anything in the [Live Editor](/editor), then paste it here to keep your docs current.

---
title: Kotlin
---

# Kotlin

Kotlin is a modern, concise, statically typed language that runs on the JVM and is officially preferred for Android development. It is fully interoperable with Java and reduces boilerplate through type inference, null safety, and expressive syntax.

> **Paradigms:** Object-oriented · Functional · Statically typed &nbsp;•&nbsp; **Extension:** `.kt` &nbsp;•&nbsp; **Run:** `kotlinc file.kt -include-runtime -d app.jar && java -jar app.jar`
> **Difficulty:** Moderate &nbsp;•&nbsp; **Created:** 2011 (JetBrains), v1.0 in 2016 &nbsp;•&nbsp; **Standard:** Kotlin Language Specification

## Table of Contents

- [1. Getting Started](#1-getting-started)
- [2. Variables & Types](#2-variables--types)
- [3. Operators](#3-operators)
- [4. Control Flow](#4-control-flow)
- [5. Functions](#5-functions)
- [6. Arrays & Collections](#6-arrays--collections)
- [7. Classes & Objects](#7-classes--objects)
- [8. Data Classes & Sealed Classes](#8-data-classes--sealed-classes)
- [9. Null Safety](#9-null-safety)
- [10. Interfaces](#10-interfaces)
- [11. Inheritance & Extension Functions](#11-inheritance--extension-functions)
- [12. Exceptions](#12-exceptions)
- [13. Coroutines](#13-coroutines)
- [14. Packages & Modules](#14-packages--modules)
- [15. Exercises](#15-exercises)
- [16. Resources](#16-resources)

---

## 1. Getting Started

A Kotlin file can declare top-level functions and classes. The entry point is a `main` function (no wrapper class needed).

<ExampleBox title="Hello, World" lang="kotlin">

```kotlin
fun main() {
    println("Hello, Kotlin!")
}
```

</ExampleBox>

> Try it: compile and run with `kotlinc hello.kt -include-runtime -d hello.jar && java -jar hello.jar`, or use the Kotlin Playground in your browser.

> 💡 **Tip:** Kotlin's type inference means you rarely write explicit types — the compiler figures them out from the right-hand side.

---

## 2. Variables & Types

Use `val` for read-only (immutable) variables and `var` for mutable ones. Kotlin has nullable (`Type?`) and non-nullable types.

<ExampleBox title="Declaring variables" lang="kotlin">

```kotlin
val name = "Ada"        // read-only String
var age = 30            // mutable Int
val price: Double = 19.99
val active: Boolean = true
val grade = 'A'
```

</ExampleBox>

**Key rules:**
- Prefer `val` over `var` to make intent clear and code safer.
- Types are non-nullable by default; append `?` to allow `null`.

---

## 3. Operators

| Category | Operators |
|----------|-----------|
| Arithmetic | `+ - * / % ++ --` |
| Assignment | `= += -= *= /= %=` |
| Comparison | `== != > < >= <=` |
| Logical | `&& || !` |
| Null-safe | `?.`, `?:`, `!!` |

<ExampleBox title="Operator usage" lang="kotlin">

```kotlin
val a = 10
val b = 3
println(a / b)        // 3
println(a % b)        // 1
println(a > b && b > 0)  // true

val name: String? = null
println(name?.length)      // null (safe call)
println(name?.length ?: 0) // 0 (Elvis operator)
```

</ExampleBox>

---

## 4. Control Flow

Kotlin's `if` is an expression (returns a value), and `when` replaces verbose `switch` statements.

<ExampleBox title="If, when, and loops" lang="kotlin">

```kotlin
val score = 85
val grade = if (score >= 90) "A" else if (score >= 70) "B" else "C"
println(grade)

when (score / 10) {
    10, 9 -> println("Excellent")
    8, 7 -> println("Good")
    else -> println("Okay")
}

for (i in 0 until 3) {
    println(i)
}

val nums = listOf(1, 2, 3)
for (n in nums) {
    println(n)
}
```

</ExampleBox>

---

## 5. Functions

Functions are declared with `fun`. Default arguments and named parameters reduce overloads.

<ExampleBox title="Functions with defaults" lang="kotlin">

```kotlin
fun greet(name: String, greeting: String = "Hello"): String {
    return "$greeting, $name!"
}

fun main() {
    println(greet("Ada"))
    println(greet("Lin", "Hi"))
}
```

</ExampleBox>

**Key rules:**
- Use single-expression functions: `fun square(n: Int) = n * n`.
- `Unit` is the return type for functions that return nothing (can be omitted).

---

## 6. Arrays & Collections

Kotlin favors read-only and mutable collection interfaces (`List`, `Set`, `Map`) over raw arrays.

<ExampleBox title="Collections and lambdas" lang="kotlin">

```kotlin
val nums = listOf(1, 2, 3, 4, 5)
val evens = nums.filter { it % 2 == 0 }
                .map { it * it }
println(evens)   // [4, 16]

val scores = mapOf("Ada" to 95, "Lin" to 82)
println(scores["Ada"])   // 95

val mutable = mutableListOf(1, 2, 3)
mutable.add(4)
println(mutable)
```

</ExampleBox>

---

## 7. Classes & Objects

Classes are concise. A primary constructor is declared inline; `init` blocks run during construction.

<ExampleBox title="A simple class" lang="kotlin">

```kotlin
class Person(val name: String, var age: Int) {
    init {
        println("Created $name")
    }

    fun introduce() {
        println("I'm $name, age $age")
    }
}

fun main() {
    val p = Person("Ada", 36)
    p.introduce()
}
```

</ExampleBox>

**Key rules:**
- Properties declared in the primary constructor with `val`/`var` are automatically fields with getters/setters.
- Use `data class` for value objects (see section 8).

---

## 8. Data Classes & Sealed Classes

`data class` auto-generates `toString`, `equals`, `hashCode`, and `copy`. `sealed class` models restricted hierarchies.

<ExampleBox title="Data and sealed classes" lang="kotlin">

```kotlin
data class User(val name: String, val age: Int)

sealed class Result
class Success(val data: String) : Result()
class Error(val message: String) : Result()

fun handle(r: Result) = when (r) {
    is Success -> println(r.data)
    is Error -> println(r.message)
}

fun main() {
    val u = User("Ada", 36)
    val copy = u.copy(age = 37)
    println(copy)
    handle(Success("ok"))
}
```

</ExampleBox>

---

## 9. Null Safety

Kotlin eliminates most `NullPointerException`s at compile time by distinguishing nullable from non-nullable types.

<ExampleBox title="Null-safe operations" lang="kotlin">

```kotlin
fun lengthOf(s: String?): Int {
    return s?.length ?: 0
}

fun main() {
    val a: String? = "hi"
    val b: String? = null
    println(lengthOf(a))   // 2
    println(lengthOf(b))   // 0
}
```

</ExampleBox>

**Key rules:**
- Use `?.` for safe calls and `?:` (Elvis) to provide a default.
- Avoid `!!` (non-null assertion) — it can throw `NullPointerException`.

---

## 10. Interfaces

Interfaces can declare abstract members and provide default implementations.

<ExampleBox title="Interface implementation" lang="kotlin">

```kotlin
interface Drawable {
    fun draw()
    fun describe() = "I am drawable"
}

class Circle : Drawable {
    override fun draw() {
        println("Drawing a circle")
    }
}

fun main() {
    val d: Drawable = Circle()
    d.draw()
    println(d.describe())
}
```

</ExampleBox>

---

## 11. Inheritance & Extension Functions

A class is `final` by default; mark it `open` to allow subclassing. Extension functions add behavior without inheritance.

<ExampleBox title="Open class and extension" lang="kotlin">

```kotlin
open class Animal {
    open fun speak() = println("Animal makes a noise")
}

class Dog : Animal() {
    override fun speak() = println("Dog barks")
}

fun String.shout() = this.uppercase() + "!"

fun main() {
    Dog().speak()
    println("hello".shout())   // HELLO!
}
```

</ExampleBox>

---

## 12. Exceptions

All exceptions are unchecked. Use `try`/`catch`/`finally`; `throw` is an expression.

<ExampleBox title="Handling exceptions" lang="kotlin">

```kotlin
fun divide(a: Int, b: Int): Int {
    return try {
        a / b
    } catch (e: ArithmeticException) {
        println("Cannot divide by zero")
        0
    }
}

fun main() {
    println(divide(10, 0))
}
```

</ExampleBox>

---

## 13. Coroutines

Coroutines provide lightweight concurrency. `suspend` functions pause without blocking threads.

<ExampleBox title="Launching coroutines" lang="kotlin">

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    launch {
        delay(100)
        println("World")
    }
    println("Hello")
}
```

</ExampleBox>

**Key rules:**
- Use `launch` for fire-and-forget tasks, `async`/`await` for results.
- The `kotlinx.coroutines` library is required for coroutine support.

---

## 14. Packages & Modules

Every Kotlin file belongs to a package; directory structure mirrors the package name.

<ExampleBox title="Package declaration" lang="kotlin">

```kotlin
package com.example.demo

fun hello() {
    println("Hello from com.example.demo")
}
```

</ExampleBox>

> Build tools: Gradle is the standard for Kotlin/Android projects; Kotlin Multiplatform shares logic across JVM, Android, iOS, and JS.

---

## 15. Exercises

<ExerciseBox title="Exercise 1 — FizzBuzz" difficulty="Easy">

Print numbers 1–20. For multiples of 3 print `Fizz`, for 5 print `Buzz`, for both print `FizzBuzz`.

```kotlin
fun main() {
    // your code here
}
```

</ExerciseBox>

<ExerciseBox title="Exercise 2 — Word length map" difficulty="Medium">

Write a function that takes a list of words and returns a map of word to its length, using `associateWith`.

```kotlin
fun wordLengths(words: List&lt;String>): Map&lt;String, Int> {
    // your code here
}
```

</ExerciseBox>

<ExerciseBox title="Exercise 3 — Safe divide with null" difficulty="Hard">

Write `fun safeDivide(a: Int, b: Int): Int?` that returns `null` when `b` is zero instead of throwing. Then use `let` to print the result safely.

```kotlin
fun safeDivide(a: Int, b: Int): Int? {
    // your code here
}
```

</ExerciseBox>

---

## 16. Self-Test (Flashcards)

<Quiz storageKey="quiz-kotlin" :cards="[
  { q: 'How does Kotlin enforce null safety?', a: 'Types are non-nullable by default; you must explicitly write <code>Type?</code> to allow null, so the compiler blocks most null dereferences at compile time.' },
  { q: 'What is the difference between <code>val</code> and <code>var</code>?', a: '<code>val</code> declares a read-only (immutable) variable; <code>var</code> declares a mutable one. Prefer <code>val</code> unless reassignment is needed.' },
  { q: 'What is the Elvis operator <code>?:</code>?', a: 'It returns the left operand if non-null, otherwise the right operand — a concise way to supply a default for nullable values.' },
  { q: 'What are extension functions?', a: 'They add new methods to an existing class without inheritance, e.g. <code>fun String.shout() = ...</code>, called as <code>&quot;hi&quot;.shout()</code>.' }
]" />

## 17. Resources

<ResourceTable title="Kotlin learning paths" :resources="[
  { label: 'Kotlin Documentation', platform: 'Official', type: 'Docs', url: 'https://kotlinlang.org/docs/home.html' },
  { label: 'Kotlin Programming', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/kotlin/' },
  { label: 'Kotlin Programming', platform: 'Programiz', type: 'Tutorial', url: 'https://www.programiz.com/kotlin-programming' },
  { label: 'Kotlin Tutorial', platform: 'Tutorialspoint', type: 'Tutorial', url: 'https://www.tutorialspoint.com/kotlin/' },
  { label: 'Kotlin Full Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=F9UC9DY-vIU' },
  { label: 'Android Kotlin', platform: 'Official', type: 'Docs', url: 'https://developer.android.com/kotlin' },
  { label: 'Kotlin by Example', platform: 'Official', type: 'Practice', url: 'https://kotlinlang.org/docs/koans.html' },
  { label: 'Kotlin on GitHub', platform: 'GitHub', type: 'Book', url: 'https://github.com/JetBrains/kotlin' }
]" />

> 📝 Draft anything in the [Live Editor](/editor), then paste it here to keep your docs current.

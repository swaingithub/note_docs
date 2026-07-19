---
title: Go
---

# Go

Go (Golang) is a statically typed, compiled language created at Google for simplicity and concurrency. It powers cloud infrastructure, CLI tools, and microservices, and ships as a single self-contained binary with no runtime dependency.

> **Paradigms:** Procedural · Concurrent · Statically typed &nbsp;•&nbsp; **Extension:** `.go` &nbsp;•&nbsp; **Run:** `go run file.go`
> **Difficulty:** Moderate &nbsp;•&nbsp; **Created:** 2009 (Google), v1.0 in 2012 &nbsp;•&nbsp; **Standard:** Go Language Specification

## Try It — Run Go in Your Browser

<ClientOnly>
  <LangPlayground lang="go" />
</ClientOnly>

## Table of Contents

- [1. Getting Started](#1-getting-started)
- [2. Variables & Types](#2-variables--types)
- [3. Operators](#3-operators)
- [4. Control Flow](#4-control-flow)
- [5. Functions](#5-functions)
- [6. Arrays & Slices](#6-arrays--slices)
- [7. Maps](#7-maps)
- [8. Structs & Methods](#8-structs--methods)
- [9. Interfaces](#9-interfaces)
- [10. Pointers](#10-pointers)
- [11. Error Handling](#11-error-handling)
- [12. Concurrency: Goroutines & Channels](#12-concurrency-goroutines--channels)
- [13. Packages & Modules](#13-packages--modules)
- [14. Exercises](#14-exercises)
- [15. Resources](#15-resources)

---

## 1. Getting Started

Every Go program starts in package `main` with a `main` function. Imports are explicit; unused imports are a compile error.

<ExampleBox title="Hello, World" lang="go">

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}
```

</ExampleBox>

> Try it: run directly with `go run main.go`, or build a binary with `go build main.go` then `./main`.

> 💡 **Tip:** `gofmt` enforces a single canonical style — run it (or your editor's format-on-save) so you never argue about formatting.

---

## 2. Variables & Types

Declare with `var`, or use short assignment `:=` inside functions. Types are inferred from the right-hand side.

<ExampleBox title="Declaring variables" lang="go">

```go
package main

import "fmt"

func main() {
    var name string = "Ada"
    age := 30
    var price float64 = 19.99
    active := true
    const max = 100

    fmt.Println(name, age, price, active, max)
}
```

</ExampleBox>

**Key rules:**
- Use `:=` for local variables; `var` for package-level or explicit typing.
- Zero values: `0` for numbers, `""` for strings, `false` for booleans, `nil` for pointers/interfaces.

---

## 3. Operators

| Category | Operators |
|----------|-----------|
| Arithmetic | `+ - * / % ++ --` |
| Assignment | `= += -= *= /= %=` |
| Comparison | `== != > < >= <=` |
| Logical | `&& || !` |
| Bitwise | `& | ^ << >>` |

<ExampleBox title="Operator usage" lang="go">

```go
package main

import "fmt"

func main() {
    a, b := 10, 3
    fmt.Println(a / b)   // 3  (integer division)
    fmt.Println(a % b)   // 1
    fmt.Println(a > b && b > 0)  // true
}
```

</ExampleBox>

---

## 4. Control Flow

Go uses `if`/`else`, `switch` (no fallthrough by default), and `for` for all looping (no `while`).

<ExampleBox title="If, switch, and loops" lang="go">

```go
package main

import "fmt"

func main() {
    score := 85
    if score >= 90 {
        fmt.Println("A")
    } else if score >= 70 {
        fmt.Println("B")
    } else {
        fmt.Println("C")
    }

    switch score / 10 {
    case 10, 9:
        fmt.Println("Excellent")
    case 8, 7:
        fmt.Println("Good")
    default:
        fmt.Println("Okay")
    }

    for i := 0; i < 3; i++ {
        fmt.Println(i)
    }

    nums := []int{1, 2, 3}
    for _, n := range nums {
        fmt.Println(n)
    }
}
```

</ExampleBox>

---

## 5. Functions

Functions take typed parameters and declare a return type. They can return multiple values.

<ExampleBox title="Multiple return values" lang="go">

```go
package main

import "fmt"

func divide(a, b int) (int, error) {
    if b == 0 {
        return 0, fmt.Errorf("divide by zero")
    }
    return a / b, nil
}

func main() {
    result, err := divide(10, 2)
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Println(result)
}
```

</ExampleBox>

**Key rules:**
- Use named returns to document intent, but keep them simple.
- A function can be a value (`func(int) int`) and passed as an argument.

---

## 6. Arrays & Slices

Arrays have fixed length; **slices** are dynamic, flexible views backed by arrays and are used far more often.

<ExampleBox title="Slices" lang="go">

```go
package main

import "fmt"

func main() {
    nums := []int{1, 2, 3, 4, 5}
    fmt.Println(len(nums))   // 5
    fmt.Println(nums[0])     // 1

    nums = append(nums, 6)
    fmt.Println(nums)        // [1 2 3 4 5 6]

    sub := nums[1:3]
    fmt.Println(sub)         // [2 3]
}
```

</ExampleBox>

---

## 7. Maps

Maps are Go's built-in key-value type (hash table). Access returns the value and a boolean "ok".

<ExampleBox title="Using maps" lang="go">

```go
package main

import "fmt"

func main() {
    scores := map[string]int{"Ada": 95, "Lin": 82}
    scores["Bo"] = 77

    if v, ok := scores["Ada"]; ok {
        fmt.Println("Ada:", v)
    }

    delete(scores, "Lin")
    fmt.Println(len(scores))
}
```

</ExampleBox>

---

## 8. Structs & Methods

Structs group fields. Methods are functions with a receiver; use value or pointer receivers.

<ExampleBox title="Struct with method" lang="go">

```go
package main

import "fmt"

type Person struct {
    Name string
    Age  int
}

func (p Person) introduce() {
    fmt.Printf("I'm %s, age %d\n", p.Name, p.Age)
}

func main() {
    p := Person{Name: "Ada", Age: 36}
    p.introduce()
}
```

</ExampleBox>

**Key rules:**
- Use a pointer receiver (`func (p *Person)`) when the method mutates the struct.
- Structs are value types; assign/copy duplicates the data unless you use a pointer.

---

## 9. Interfaces

Interfaces are implemented **implicitly** — a type satisfies an interface just by having the right methods.

<ExampleBox title="Implicit interface implementation" lang="go">

```go
package main

import "fmt"

type Drawable interface {
    Draw() string
}

type Circle struct{}

func (c Circle) Draw() string {
    return "Drawing a circle"
}

func render(d Drawable) {
    fmt.Println(d.Draw())
}

func main() {
    render(Circle{})
}
```

</ExampleBox>

**Key rules:**
- Prefer small interfaces (e.g. `io.Reader`, `Stringer`) for flexible, decoupled code.
- The empty interface `any` (alias for `interface{}`) holds any type.

---

## 10. Pointers

Go has pointers but no pointer arithmetic. Use `&` to take an address and `*` to dereference.

<ExampleBox title="Pointers" lang="go">

```go
package main

import "fmt"

func main() {
    x := 10
    p := &x
    *p = 20
    fmt.Println(x)   // 20
}
```

</ExampleBox>

---

## 11. Error Handling

Errors are values of the `error` interface. Check `if err != nil` explicitly — Go has no exceptions.

<ExampleBox title="Returning and checking errors" lang="go">

```go
package main

import (
    "errors"
    "fmt"
)

func sqrt(n float64) (float64, error) {
    if n < 0 {
        return 0, errors.New("negative input")
    }
    return n, nil
}

func main() {
    v, err := sqrt(-1)
    if err != nil {
        fmt.Println("error:", err)
        return
    }
    fmt.Println(v)
}
```

</ExampleBox>

**Key rules:**
- Return errors; do not panic for expected failures.
- Wrap errors with `fmt.Errorf("...: %w", err)` to preserve the chain.

---

## 12. Concurrency: Goroutines & Channels

Goroutines are lightweight threads started with `go`. Channels pass data between them — "share memory by communicating."

<ExampleBox title="Goroutine with channel" lang="go">

```go
package main

import (
    "fmt"
    "time"
)

func worker(done chan bool) {
    fmt.Println("working...")
    time.Sleep(100 * time.Millisecond)
    done <- true
}

func main() {
    done := make(chan bool, 1)
    go worker(done)
    <-done
    fmt.Println("done")
}
```

</ExampleBox>

**Key rules:**
- Use `select` to wait on multiple channels.
- Guard shared state with channels or `sync.Mutex`; prefer channels by default.

---

## 13. Packages & Modules

A module is defined by `go.mod`; packages live in directories. Public symbols start with a capital letter.

<ExampleBox title="Module and package" lang="go">

```go
// go.mod
// module example.com/demo
// go 1.22

// greet.go
package demo

func Hello() string {
    return "Hello from demo"
}
```

</ExampleBox>

> Dependency management is built-in via `go mod` (`go get`, `go mod tidy`); the standard library covers HTTP, testing, and more.

---

## 14. Exercises

<ExerciseBox title="Exercise 1 — FizzBuzz" difficulty="Easy">

Print numbers 1–20. For multiples of 3 print `Fizz`, for 5 print `Buzz`, for both print `FizzBuzz`.

```go
package main

import "fmt"

func main() {
    // your code here
}
```

</ExerciseBox>

<ExerciseBox title="Exercise 2 — Sum of slice" difficulty="Medium">

Write a function `Sum(nums []int) int` that returns the total of all elements. Avoid using any built-in reduce helper.

```go
func Sum(nums []int) int {
    // your code here
}
```

</ExerciseBox>

<ExerciseBox title="Exercise 3 — Concurrent worker pool" difficulty="Hard">

Launch 3 goroutines that each send a number to a channel, then collect and print all 3 results in `main` using a loop and a buffered channel.

```go
func main() {
    // your code here
}
```

</ExerciseBox>

---

## 15. Self-Test (Flashcards)

<Quiz storageKey="quiz-go" :cards="[
  { q: 'How does Go handle errors without exceptions?', a: 'Functions return a value of the <code>error</code> interface (often alongside a result), and callers check <code>if err != nil</code> explicitly.' },
  { q: 'What is the difference between an array and a slice in Go?', a: 'Arrays have a fixed length baked into the type; slices are dynamic, flexible views backed by an array and are used far more often.' },
  { q: 'How are interfaces implemented in Go?', a: 'Implicitly: a type satisfies an interface simply by implementing its methods — there is no <code>implements</code> keyword.' },
  { q: 'What starts a goroutine and how do they communicate?', a: 'The <code>go</code> keyword starts a lightweight goroutine; they communicate via channels, following the motto &quot;share memory by communicating&quot;.' }
]" />

## 16. Resources

<ResourceTable title="Go learning paths" :resources="[
  { label: 'Go Documentation', platform: 'Official', type: 'Docs', url: 'https://go.dev/doc/' },
  { label: 'Go Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/go/' },
  { label: 'Go Language', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/go-language/' },
  { label: 'Go Programming', platform: 'Programiz', type: 'Tutorial', url: 'https://www.programiz.com/golang' },
  { label: 'Go Full Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=YS4e4q9oBaU' },
  { label: 'Go Topics on GitHub', platform: 'GitHub', type: 'Book', url: 'https://github.com/topics/go' },
  { label: 'A Tour of Go', platform: 'Official', type: 'Practice', url: 'https://go.dev/tour/' },
  { label: 'Effective Go', platform: 'Official', type: 'Docs', url: 'https://go.dev/doc/effective_go' }
]" />

> 📝 Draft anything in the [Live Editor](/editor), then paste it here to keep your docs current.

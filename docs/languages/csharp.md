---
title: C#
---

# C#

C# is Microsoft's modern, statically typed, object-oriented language that runs on .NET. It powers desktop apps, web services (ASP.NET Core), games (Unity), and cloud solutions, with first-class tooling and a rich standard library.

> **Paradigms:** Object-oriented · Statically typed · Component-oriented · Multi-paradigm &nbsp;•&nbsp; **Extension:** `.cs` &nbsp;•&nbsp; **Run:** `dotnet run`
> **Difficulty:** Beginner–Intermediate &nbsp;•&nbsp; **Created:** 2000 (Anders Hejlsberg) &nbsp;•&nbsp; **Standard:** ECMA-334 / ISO/IEC 23270

## Table of Contents

- [1. Getting Started](#1-getting-started)
- [2. Variables & Data Types](#2-variables--data-types)
- [3. Operators](#3-operators)
- [4. Control Flow](#4-control-flow)
- [5. Methods & Parameters](#5-methods--parameters)
- [6. Arrays & Collections](#6-arrays--collections)
- [7. Classes & OOP](#7-classes--oop)
- [8. Properties & Events](#8-properties--events)
- [9. Exception Handling](#9-exception-handling)
- [10. LINQ](#10-linq)
- [11. Async/Await](#11-asyncawait)
- [12. Exercises](#12-exercises)
- [13. Resources](#13-resources)

---

## 1. Getting Started

A C# program lives inside a `class` with a `static void Main()` (or a top-level statements file). `Console.WriteLine` prints output. The `dotnet` CLI builds and runs projects.

<ExampleBox title="Hello, World" lang="cs">

```cs
using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, C#!");
    }
}
```

</ExampleBox>

> 💡 **Tip:** Try it: compile and run with `dotnet` — create a project with `dotnet new console` then `dotnet run`. The .NET SDK is cross-platform.

**Key rules:**
- `using System;` imports the core namespace.
- `Main` is the entry point; modern projects can use top-level statements instead.
- C# is case-sensitive: `Console` differs from `console`.

---

## 2. Variables & Data Types

C# is statically and strongly typed. Primitives include `int`, `double`, `bool`, `char`, and `string` (a first-class immutable type). `var` lets the compiler infer the type.

<ExampleBox title="Types and var" lang="cs">

```cs
using System;

class Program {
    static void Main() {
        int age = 30;
        double price = 9.99;
        bool active = true;
        string name = "C#";
        var doubled = age * 2;   // inferred as int

        Console.WriteLine($"{name}: {doubled}, {active}");
    }
}
```

</ExampleBox>

**Key rules:**
- `string` is a reference type but behaves immutably like a value type.
- Use `$"..."` interpolated strings for clean formatting.
- `var` is allowed only when the type is obvious from the initializer.

---

## 3. Operators

C# operators resemble C/C++/Java, with extras like the null-conditional `?.` and null-coalescing `??` / `??=`.

<ExampleBox title="Null-coalescing operators" lang="cs">

```cs
using System;

class Program {
    static void Main() {
        string? input = null;
        string result = input ?? "default";
        Console.WriteLine(result);   // default

        int? count = null;
        count ??= 0;
        Console.WriteLine(count);    // 0
    }
}
```

</ExampleBox>

**Key rules:**
- `?.` safely accesses members on potentially null objects.
- `??` provides a fallback; `??=` assigns only if null.
- Enable nullable reference types (`<Nullable>enable</Nullable>`) for safety.

---

## 4. Control Flow

C# supports `if`/`else`, `switch` (with pattern matching), and `for`/`foreach`/`while` loops. `foreach` is the idiomatic way to iterate collections.

<ExampleBox title="foreach and switch" lang="cs">

```cs
using System;

class Program {
    static void Main() {
        int[] nums = { 1, 2, 3, 4, 5 };
        foreach (int n in nums) {
            string kind = n % 2 == 0 ? "even" : "odd";
            Console.WriteLine($"{n} is {kind}");
        }
    }
}
```

</ExampleBox>

**Key rules:**
- `foreach` works on any type implementing `IEnumerable<T>`.
- Modern `switch` supports pattern matching and `when` guards.
- Prefer `foreach` over indexed `for` when you don't need the index.

---

## 5. Methods & Parameters

Methods are declared with a return type, name, and parameters. C# adds named arguments, optional parameters, and `ref`/`out` for passing by reference.

<ExampleBox title="Named and out parameters" lang="cs">

```cs
using System;

class Program {
    static int Divide(int a, int b, out int remainder) {
        remainder = a % b;
        return a / b;
    }

    static void Main() {
        int rem;
        int q = Divide(10, 3, out rem);
        Console.WriteLine($"quotient={q}, remainder={rem}");
    }
}
```

</ExampleBox>

**Key rules:**
- `out` parameters return values without a return type; `ref` requires pre-initialization.
- Named arguments improve readability: `Divide(a: 10, b: 3, remainder: out rem)`.
- Methods are scoped to a class or struct — there are no free functions.

---

## 6. Arrays & Collections

C# arrays are fixed-length and bounds-checked. The `System.Collections.Generic` namespace provides `List<T>`, `Dictionary<TKey,TValue>`, and more.

<ExampleBox title="List and Dictionary" lang="cs">

```cs
using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        List&lt;int> nums = new List&lt;int> { 1, 2, 3 };
        nums.Add(4);
        Console.WriteLine(nums.Count);   // 4

        Dictionary&lt;string, int> ages = new() {
            ["Ada"] = 36, ["Bo"] = 41
        };
        Console.WriteLine(ages["Ada"]);  // 36
    }
}
```

</ExampleBox>

**Key rules:**
- `List<T>` is the go-to dynamic array; `Dictionary` is a hash map.
- Use collection initializers `{ ... }` and `new()` target-typed syntax.
- Indexing a missing dictionary key throws — use `TryGetValue` to be safe.

---

## 7. Classes & OOP

C# is fully object-oriented: classes support inheritance, interfaces, access modifiers (`public`/`private`/`protected`), and method overriding via `virtual`/`override`.

<ExampleBox title="Class with inheritance" lang="cs">

```cs
using System;

class Animal {
    public string Name { get; }
    public Animal(string name) => Name = name;
    public virtual void Speak() => Console.WriteLine($"{Name} makes a noise");
}

class Dog : Animal {
    public Dog(string name) : base(name) {}
    public override void Speak() => Console.WriteLine($"{Name} barks");
}

class Program {
    static void Main() {
        Animal a = new Dog("Rex");
        a.Speak();   // Rex barks
    }
}
```

</ExampleBox>

**Key rules:**
- All types ultimately derive from `object`.
- Use `base(...)` to call a base constructor.
- Mark overridable members `virtual`; overrides use `override`.

---

## 8. Properties & Events

Properties are typed members with `get`/`set` accessors, providing encapsulation without boilerplate. `event` and delegates enable the observer pattern.

<ExampleBox title="Auto-property and event" lang="cs">

```cs
using System;

class Counter {
    public int Value { get; private set; }

    public event Action&lt;int>? OnChange;

    public void Increment() {
        Value++;
        OnChange?.Invoke(Value);
    }
}

class Program {
    static void Main() {
        var c = new Counter();
        c.OnChange += v => Console.WriteLine($"now {v}");
        c.Increment();
        c.Increment();
    }
}
```

</ExampleBox>

**Key rules:**
- `public int X { get; set; }` is an auto-implemented property.
- Use `?.Invoke(...)` to safely raise an event that may be unsubscribed.
- Properties can have different access levels for `get` and `set`.

---

## 9. Exception Handling

C# uses structured exception handling with `try`/`catch`/`finally`. Exceptions are objects derived from `System.Exception`.

<ExampleBox title="Try-catch-finally" lang="cs">

```cs
using System;

class Program {
    static void Main() {
        try {
            int x = 0;
            int y = 10 / x;
        } catch (DivideByZeroException e) {
            Console.WriteLine($"Error: {e.Message}");
        } finally {
            Console.WriteLine("Always runs");
        }
    }
}
```

</ExampleBox>

**Key rules:**
- Catch the most specific exception type first.
- Use `finally` for cleanup that must always run.
- Avoid using exceptions for normal control flow.

---

## 10. LINQ

LINQ (Language Integrated Query) lets you query collections with a SQL-like, fluent syntax, using `Where`, `Select`, `OrderBy`, and more.

<ExampleBox title="LINQ query" lang="cs">

```cs
using System;
using System.Linq;
using System.Collections.Generic;

class Program {
    static void Main() {
        List&lt;int> nums = new() { 5, 2, 8, 1, 9 };
        var result = nums
            .Where(n => n > 3)
            .OrderBy(n => n)
            .Select(n => n * 10);

        Console.WriteLine(string.Join(", ", result));   // 50, 80, 90
    }
}
```

</ExampleBox>

**Key rules:**
- LINQ works on any `IEnumerable<T>`.
- Queries are lazily evaluated — materialize with `ToList()` when needed.
- Method syntax and query syntax (`from n in nums ...`) are equivalent.

---

## 11. Async/Await

C# has first-class asynchronous programming via `Task`, `async`, and `await`, built on the task-based asynchronous pattern.

<ExampleBox title="Async method" lang="cs">

```cs
using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program {
    static async Task Main() {
        using var client = new HttpClient();
        string html = await client.GetStringAsync("https://example.com");
        Console.WriteLine($"Downloaded {html.Length} chars");
    }
}
```

</ExampleBox>

**Key rules:**
- `async` methods return `Task`, `Task<T>`, or `void` (event handlers only).
- `await` suspends without blocking the thread.
- Always `await` tasks; never call `.Result` or `.Wait()` synchronously on the UI thread.

---

## 12. Exercises

<ExerciseBox title="Exercise 1 — Sum a list" difficulty="Easy">

Create a `List&lt;int>` of 1..10 and print the sum using a `foreach` loop and a running total.

```cs
List&lt;int> nums = new List&lt;int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
/* your code here */
```

</ExerciseBox>

<ExerciseBox title="Exercise 2 — Bank account class" difficulty="Medium">

Create a `BankAccount` class with a `Balance` property, a `Deposit(decimal)` method, and a `Withdraw(decimal)` method that returns `false` if funds are insufficient. Use a constructor that sets the initial balance.

</ExerciseBox>

<ExerciseBox title="Exercise 3 — Async file downloader" difficulty="Hard">

Write an `async` method that downloads text from a URL with `HttpClient`, counts the number of lines, and returns the count. Handle network exceptions with `try`/`catch` and call the method from an `async Main`.

</ExerciseBox>

---

## 13. Self-Test (Flashcards)

<Quiz storageKey="quiz-csharp" :cards="[
  { q: 'What is the difference between <code>ref</code> and <code>out</code> parameters?', a: 'Both pass by reference, but <code>out</code> is for returning a value and need not be initialized by the caller; <code>ref</code> requires the caller to initialize the variable first.' },
  { q: 'What does the null-conditional operator <code>?.</code> do?', a: 'It safely accesses a member only if the receiver is not null, returning null otherwise instead of throwing a NullReferenceException.' },
  { q: 'Why should you await a Task instead of reading .Result?', a: 'Awaiting suspends without blocking the thread and preserves async flow; .Result can deadlock on the UI thread and wraps exceptions in AggregateException.' },
  { q: 'What is LINQ?', a: 'Language Integrated Query: a fluent, SQL-like API for querying <code>IEnumerable&lt;T&gt;</code> collections with methods like Where, Select, and OrderBy.' }
]" />

## 14. Resources

<ResourceTable title="C# learning paths" :resources="[
  { label: 'C# Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/cs/' },
  { label: 'C# Documentation', platform: 'Microsoft', type: 'Docs', url: 'https://learn.microsoft.com/en-us/dotnet/csharp/' },
  { label: 'C# Programming', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/csharp/' },
  { label: 'C# Programming', platform: 'Programiz', type: 'Tutorial', url: 'https://www.programiz.com/csharp-programming' },
  { label: '.NET Docs', platform: 'Microsoft', type: 'Docs', url: 'https://docs.microsoft.com/dotnet' },
  { label: 'C# Full Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=GhQdlIFyl0w' },
  { label: 'Learn .NET', platform: 'dotnet', type: 'Practice', url: 'https://dotnet.microsoft.com/learn' },
  { label: 'C# Topics on GitHub', platform: 'GitHub', type: 'Book', url: 'https://github.com/topics/csharp' }
]" />

> 📝 Draft anything in the [Live Editor](/editor), then paste it here to keep your docs current.

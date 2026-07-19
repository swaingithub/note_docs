---
title: C++
---

# C++

C++ extends C with classes, templates, the Standard Template Library (STL), and RAII-based resource management. It targets performance-critical software: games, trading systems, operating systems, and high-performance libraries, while remaining close to the hardware.

> **Paradigms:** Multi-paradigm · Object-oriented · Generic · Procedural &nbsp;•&nbsp; **Extension:** `.cpp` / `.hpp` &nbsp;•&nbsp; **Run:** `g++ file.cpp -o file && ./file`
> **Difficulty:** Intermediate–Advanced &nbsp;•&nbsp; **Created:** 1985 (Bjarne Stroustrup) &nbsp;•&nbsp; **Standard:** ISO/IEC 14882 (C++20/C++23)

## Table of Contents

- [1. Getting Started](#1-getting-started)
- [2. Variables & Data Types](#2-variables--data-types)
- [3. Operators](#3-operators)
- [4. Control Flow](#4-control-flow)
- [5. Functions & Overloading](#5-functions--overloading)
- [6. Arrays & the STL](#6-arrays--the-stl)
- [7. Classes & OOP](#7-classes--oop)
- [8. Memory & Smart Pointers](#8-memory--smart-pointers)
- [9. Templates & Generic Programming](#9-templates--generic-programming)
- [10. Modern C++ Features](#10-modern-c-features)
- [11. Files & Streams](#11-files--streams)
- [12. Exercises](#12-exercises)
- [13. Resources](#13-resources)

---

## 1. Getting Started

C++ programs also start at `main()`, but use `iostream` and `std::cout` for output (though `printf` still works). The `std` namespace holds the standard library.

<ExampleBox title="Hello, World" lang="cpp">

```cpp
#include &lt;iostream>

int main() {
    std::cout << "Hello, C++!" << std::endl;
    return 0;
}
```

</ExampleBox>

> 💡 **Tip:** Try it: compile with `g++` — run `g++ hello.cpp -o hello && ./hello`. Prefer `g++ -std=c++17` to enable modern features.

**Key rules:**
- `#include <iostream>` is needed for `std::cout`/`std::cin`.
- `using namespace std;` is convenient but discouraged in headers.
- `std::endl` flushes the stream; `'\n'` is faster for just a newline.

---

## 2. Variables & Data Types

C++ keeps C's built-in types and adds `bool`, `string`, and `auto` for type deduction. The `std::string` class replaces fragile C-style char arrays.

<ExampleBox title="Types and auto" lang="cpp">

```cpp
#include &lt;iostream>
#include &lt;string>

int main() {
    int count = 5;
    double ratio = 0.75;
    bool ready = true;
    std::string name = "C++";

    auto doubled = count * 2;   // auto deduces int
    std::cout << name << " " << doubled << " " << ready << std::endl;
    return 0;
}
```

</ExampleBox>

**Key rules:**
- `auto` deduces the type from the initializer — great for long STL types.
- `std::string` manages its own memory; use `+` to concatenate.
- Prefer `const` for values that never change.

---

## 3. Operators

Operators are largely inherited from C, with additions like the scope-resolution `::`, member-access `->`, and `new`/`delete`.

<ExampleBox title="Operators in action" lang="cpp">

```cpp
#include &lt;iostream>

int main() {
    int a = 15, b = 4;
    std::cout << "a / b = " << a / b << std::endl;   // 3 (int division)
    std::cout << "a % b = " << a % b << std::endl;   // 3

    int* p = &a;
    std::cout << "value via pointer: " << *p << std::endl;  // 15
    return 0;
}
```

</ExampleBox>

**Key rules:**
- `::` accesses global/namespace/class scope.
- Overloadable operators let you define behavior for your own types.
- Short-circuit evaluation applies to `&&` and `||` as in C.

---

## 4. Control Flow

C++ control flow mirrors C, with the addition of range-based `for` loops for iterating containers cleanly.

<ExampleBox title="Range-based for loop" lang="cpp">

```cpp
#include &lt;iostream>
#include &lt;vector>

int main() {
    std::vector&lt;int> nums = {1, 2, 3, 4, 5};
    for (int n : nums) {
        if (n % 2 == 0) {
            std::cout << n << " is even\n";
        }
    }
    return 0;
}
```

</ExampleBox>

**Key rules:**
- Use `for (auto x : container)` for read-only iteration.
- Use `for (auto& x : container)` to modify elements in place.
- `break`/`continue` behave the same as in C.

---

## 5. Functions & Overloading

C++ allows function overloading (multiple functions with the same name but different parameters) and default arguments. Pass large objects by `const` reference to avoid copies.

<ExampleBox title="Overloading and references" lang="cpp">

```cpp
#include &lt;iostream>
#include &lt;string>

void print(int x)        { std::cout << "int: " << x << std::endl; }
void print(std::string s){ std::cout << "string: " << s << std::endl; }

void greet(const std::string& name) {   // const ref avoids a copy
    std::cout << "Hi, " << name << std::endl;
}

int main() {
    print(42);
    print("hello");
    greet("Ada");
    return 0;
}
```

</ExampleBox>

**Key rules:**
- Overload resolution picks the best-matching signature.
- Prefer passing by `const std::string&` for large inputs.
- Default arguments must appear in the declaration, not re-specified in the definition.

---

## 6. Arrays & the STL

C++ offers raw arrays (like C) but you should usually use `std::vector` (dynamic) or `std::array` (fixed). The STL provides containers, iterators, and algorithms.

<ExampleBox title="vector and algorithms" lang="cpp">

```cpp
#include &lt;iostream>
#include &lt;vector>
#include &lt;algorithm>

int main() {
    std::vector&lt;int> v = {5, 2, 8, 1, 9};
    std::sort(v.begin(), v.end());

    int target = 8;
    if (std::binary_search(v.begin(), v.end(), target)) {
        std::cout << target << " found\n";
    }
    for (int x : v) std::cout << x << " ";
    return 0;
}
```

</ExampleBox>

**Key rules:**
- `std::vector` grows automatically; use `push_back` to add elements.
- `.begin()/.end()` give iterators for STL algorithms.
- Prefer STL containers over raw arrays for safety and flexibility.

---

## 7. Classes & OOP

C++ is class-based. Constructors initialize objects, destructors clean up, and `public`/`private` control access. Inheritance and virtual functions enable polymorphism.

<ExampleBox title="Class with inheritance" lang="cpp">

```cpp
#include &lt;iostream>

class Animal {
public:
    Animal(std::string n) : name(n) {}
    virtual void speak() const {
        std::cout << name << " makes a noise\n";
    }
protected:
    std::string name;
};

class Dog : public Animal {
public:
    Dog(std::string n) : Animal(n) {}
    void speak() const override {
        std::cout << name << " barks\n";
    }
};

int main() {
    Dog rex("Rex");
    rex.speak();   // Rex barks
    return 0;
}
```

</ExampleBox>

**Key rules:**
- Mark overriding methods with `override` to catch mistakes.
- Use `virtual` for runtime polymorphism; destructors of base classes should be `virtual`.
- Prefer `public` inheritance to model "is-a" relationships.

---

## 8. Memory & Smart Pointers

C++ has `new`/`delete`, but modern code uses RAII and smart pointers so memory is freed automatically. `std::unique_ptr` has sole ownership; `std::shared_ptr` shares ownership.

<ExampleBox title="Smart pointers (RAII)" lang="cpp">

```cpp
#include &lt;iostream>
#include &lt;memory>

struct Resource {
    Resource() { std::cout << "acquired\n"; }
    ~Resource() { std::cout << "released\n"; }
};

int main() {
    auto p = std::make_unique&lt;Resource>();   // freed automatically
    // use p.get() for the raw pointer if needed
    return 0;   // destructor runs here, no delete required
}
```

</ExampleBox>

**Key rules:**
- Never `delete` a smart pointer's managed object manually.
- Use `std::make_unique` / `std::make_shared` to construct safely.
- Avoid raw `new`/`delete` in modern C++.

---

## 9. Templates & Generic Programming

Templates let you write functions and classes that work with any type. The STL itself is built on templates.

<ExampleBox title="Function template" lang="cpp">

```cpp
#include &lt;iostream>

template &lt;typename T>
T max(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    std::cout << max(3, 7) << std::endl;       // int
    std::cout << max(2.5, 1.8) << std::endl;  // double
    return 0;
}
```

</ExampleBox>

**Key rules:**
- `template <typename T>` introduces a type parameter.
- Both type arguments must match unless you specialize.
- Templates are instantiated at compile time — no runtime cost.

---

## 10. Modern C++ Features

C++11 and later brought `auto`, lambdas, `constexpr`, move semantics, and (in C++20) ranges and modules. These make C++ safer and more expressive.

<ExampleBox title="Lambdas and constexpr" lang="cpp">

```cpp
#include &lt;iostream>
#include &lt;vector>
#include &lt;algorithm>

int main() {
    constexpr int factor = 2;            // computed at compile time
    std::vector&lt;int> v = {1, 2, 3};

    std::transform(v.begin(), v.end(), v.begin(),
                   [](int x) { return x * 2; });

    for (int x : v) std::cout << x << " ";   // 2 4 6
    return 0;
}
```

</ExampleBox>

**Key rules:**
- Lambdas `[capture](params) { body }` are anonymous functions.
- `constexpr` values/functions are evaluated at compile time when possible.
- Move semantics (`std::move`) transfer ownership to avoid expensive copies.

---

## 11. Files & Streams

C++ file I/O uses `std::fstream`, `std::ifstream`, and `std::ofstream` with the `<<` and `>>` operators.

<ExampleBox title="Reading and writing files" lang="cpp">

```cpp
#include &lt;iostream>
#include &lt;fstream>

int main() {
    std::ofstream out("data.txt");
    out << "Hello, file!" << std::endl;
    out.close();

    std::ifstream in("data.txt");
    std::string line;
    while (std::getline(in, line)) {
        std::cout << line << std::endl;
    }
    return 0;
}
```

</ExampleBox>

**Key rules:**
- Always check a stream is open before use (`if (out)`).
- `std::getline` reads a full line (unlike `>>` which stops at whitespace).
- Streams are RAII-managed and close automatically when they go out of scope.

---

## 12. Exercises

<ExerciseBox title="Exercise 1 — Vector sum" difficulty="Easy">

Create a `std::vector&lt;int>` of 1..10 and print the sum using a range-based for loop.

```cpp
std::vector&lt;int> v = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
/* your code here */
```

</ExerciseBox>

<ExerciseBox title="Exercise 2 — Class with getters" difficulty="Medium">

Define a `BankAccount` class with a `balance` member, a `deposit(double)` method, and a `getBalance()` method. Add a constructor that takes an initial balance.

</ExerciseBox>

<ExerciseBox title="Exercise 3 — Smart pointer factory" difficulty="Hard">

Write a function that returns a `std::unique_ptr&lt;Resource>` created with `std::make_unique`, where `Resource` is a class that logs construction and destruction. Demonstrate that the resource is freed automatically when the pointer leaves scope.

</ExerciseBox>

---

## 13. Self-Test (Flashcards)

<Quiz storageKey="quiz-cpp" :cards="[
  { q: 'What is RAII and why is it important in C++?', a: 'Resource Acquisition Is Initialization: a resource is tied to an object\'s lifetime, so its destructor frees it automatically — preventing leaks without manual <code>delete</code>.' },
  { q: 'When should you use a smart pointer instead of <code>new</code>/<code>delete</code>?', a: 'In modern C++ almost always. Use <code>std::unique_ptr</code> for sole ownership and <code>std::shared_ptr</code> for shared ownership; the pointer frees the object automatically.' },
  { q: 'What does the <code>override</code> keyword do?', a: 'It tells the compiler this method is meant to override a base-class virtual method; if no such method exists, compilation fails, catching typos early.' },
  { q: 'What is a template in C++?', a: 'A way to write functions or classes parameterized by type (e.g. <code>template &lt;typename T&gt;</code>), with the compiler generating concrete versions at compile time.' }
]" />

## 14. Resources

<ResourceTable title="C++ learning paths" :resources="[
  { label: 'C++ Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/cpp/' },
  { label: 'C++ Programming', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/c-plus-plus/' },
  { label: 'C++ Programming', platform: 'Programiz', type: 'Tutorial', url: 'https://www.programiz.com/cpp-programming' },
  { label: 'C++ Tutorial', platform: 'cplusplus.com', type: 'Tutorial', url: 'https://cplusplus.com/doc/tutorial/' },
  { label: 'C++ Reference', platform: 'cppreference', type: 'Docs', url: 'https://en.cppreference.com/w/' },
  { label: 'C++ Full Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=vLnPwxZdW4Y' },
  { label: 'C++ Practice', platform: 'freeCodeCamp', type: 'Practice', url: 'https://www.freecodecamp.org/' },
  { label: 'C++ Topics on GitHub', platform: 'GitHub', type: 'Book', url: 'https://github.com/topics/cpp' }
]" />

> 📝 Draft anything in the [Live Editor](/editor), then paste it here to keep your docs current.

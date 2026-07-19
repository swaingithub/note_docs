---
title: Java
---

# Java

Java is a statically typed, class-based, object-oriented language running on the JVM. It powers enterprise systems, Android apps, and large-scale backends. Its "Write once, run anywhere" promise comes from compiling to bytecode that any JVM can execute.

> **Paradigms:** Object-oriented · Statically typed · Imperative &nbsp;•&nbsp; **Extension:** `.java` &nbsp;•&nbsp; **Run:** `javac File.java && java File`
> **Difficulty:** Moderate &nbsp;•&nbsp; **Created:** 1995 (James Gosling, Sun Microsystems) &nbsp;•&nbsp; **Standard:** JLS / JDK LTS

## Table of Contents

- [1. Getting Started](#1-getting-started)
- [2. Variables & Data Types](#2-variables--data-types)
- [3. Operators](#3-operators)
- [4. Control Flow](#4-control-flow)
- [5. Methods](#5-methods)
- [6. Arrays](#6-arrays)
- [7. Classes & Objects](#7-classes--objects)
- [8. Inheritance & Polymorphism](#8-inheritance--polymorphism)
- [9. Interfaces & Abstract Classes](#9-interfaces--abstract-classes)
- [10. Exceptions](#10-exceptions)
- [11. Collections & Streams](#11-collections--streams)
- [12. Generics](#12-generics)
- [13. Concurrency](#13-concurrency)
- [14. Packages & Modules](#14-packages--modules)
- [15. Exercises](#15-exercises)
- [16. Resources](#16-resources)

---

## 1. Getting Started

Every Java file declares a `public class` whose name matches the file name. The program entry point is the `main` method.

<ExampleBox title="Hello, World" lang="java">

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}
```

</ExampleBox>

> Try it: compile and run with `javac Main.java && java Main` from your terminal.

> 💡 **Tip:** Use an IDE (IntelliJ IDEA, Eclipse, VS Code + Extension Pack for Java) to get autocomplete, refactoring, and a built-in debugger.

---

## 2. Variables & Data Types

Java splits values into **primitives** (stored by value) and **reference types** (objects, stored by reference).

| Category | Types |
|----------|-------|
| Integer | `byte`, `short`, `int`, `long` |
| Floating | `float`, `double` |
| Other | `char`, `boolean` |
| Reference | `String`, arrays, objects |

<ExampleBox title="Declaring variables" lang="java">

```java
int age = 30;
double price = 19.99;
char grade = 'A';
boolean active = true;
String name = "Ada";
final int MAX = 100;   // constant
```

</ExampleBox>

**Key rules:**
- Use `camelCase` for variables and methods, `PascalCase` for class names.
- `String` is immutable; concatenation in loops should use `StringBuilder`.
- `final` makes a variable, method, or class unmodifiable.

---

## 3. Operators

| Category | Operators |
|----------|-----------|
| Arithmetic | `+ - * / % ++ --` |
| Assignment | `= += -= *= /= %=` |
| Comparison | `== != > < >= <=` |
| Logical | `&& || !` |
| Bitwise | `& | ^ ~ << >> >>>` |

<ExampleBox title="Operator usage" lang="java">

```java
int a = 10, b = 3;
System.out.println(a / b);    // 3  (integer division)
System.out.println(a % b);    // 1  (remainder)
System.out.println(a == b);   // false
System.out.println(a > b && b > 0);  // true
```

</ExampleBox>

---

## 4. Control Flow

Java uses `if`/`else`, `switch` (enhanced with arrow syntax since Java 14), and loops.

<ExampleBox title="If, switch, and loops" lang="java">

```java
int score = 85;
if (score >= 90) {
    System.out.println("A");
} else if (score >= 70) {
    System.out.println("B");
} else {
    System.out.println("C");
}

switch (score / 10) {
    case 10, 9 -> System.out.println("Excellent");
    case 8, 7 -> System.out.println("Good");
    default -> System.out.println("Okay");
}

for (int i = 0; i < 3; i++) {
    System.out.println(i);
}

int[] nums = {1, 2, 3};
for (int n : nums) {
    System.out.println(n);
}
```

</ExampleBox>

---

## 5. Methods

Methods bundle logic with a name, parameters, and a return type. `void` means no return value.

<ExampleBox title="Defining and calling methods" lang="java">

```java
public static int add(int a, int b) {
    return a + b;
}

public static void greet(String name) {
    System.out.println("Hi, " + name);
}

public static void main(String[] args) {
    int sum = add(2, 3);
    System.out.println(sum);   // 5
    greet("Ada");
}
```

</ExampleBox>

**Key rules:**
- Method names are `camelCase`.
- Overloading allows multiple methods with the same name but different parameters.
- Pass-by-value applies to both primitives and references (the reference itself is copied).

---

## 6. Arrays

Arrays are fixed-length, type-safe containers.

<ExampleBox title="Creating and using arrays" lang="java">

```java
int[] numbers = {1, 2, 3, 4, 5};
System.out.println(numbers.length);   // 5
System.out.println(numbers[0]);       // 1

numbers[1] = 20;
for (int n : numbers) {
    System.out.println(n);
}
```

</ExampleBox>

For dynamic sizing, prefer collections (see section 11).

---

## 7. Classes & Objects

Everything in Java lives inside a class. Fields hold state; methods define behavior.

<ExampleBox title="A simple class" lang="java">

```java
public class Person {
    String name;
    int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void introduce() {
        System.out.println("I'm " + name + ", age " + age);
    }
}

public class Main {
    public static void main(String[] args) {
        Person p = new Person("Ada", 36);
        p.introduce();
    }
}
```

</ExampleBox>

**Key rules:**
- Use constructors to initialize objects; `this` refers to the current instance.
- Encapsulate fields with `private` and expose them via getters/setters.
- One `public` class per file, file name must match.

---

## 8. Inheritance & Polymorphism

A class extends one superclass with `extends`. Methods can be overridden for polymorphic behavior.

<ExampleBox title="Inheritance" lang="java">

```java
class Animal {
    public void speak() {
        System.out.println("Animal makes a noise");
    }
}

class Dog extends Animal {
    @Override
    public void speak() {
        System.out.println("Dog barks");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal a = new Dog();
        a.speak();   // Dog barks  (polymorphism)
    }
}
```

</ExampleBox>

---

## 9. Interfaces & Abstract Classes

Interfaces define a contract of methods; classes implement them with `implements`. A class can implement many interfaces but extend only one class.

<ExampleBox title="Interface implementation" lang="java">

```java
interface Drawable {
    void draw();
}

class Circle implements Drawable {
    @Override
    public void draw() {
        System.out.println("Drawing a circle");
    }
}

public class Main {
    public static void main(String[] args) {
        Drawable d = new Circle();
        d.draw();
    }
}
```

</ExampleBox>

**Key rules:**
- Use `interface` for capabilities, `abstract class` for shared base state/logic.
- Default methods (`default void foo()`) let interfaces evolve without breaking implementers.

---

## 10. Exceptions

Java uses checked and unchecked exceptions. Wrap risky code in `try`/`catch` and clean up in `finally`.

<ExampleBox title="Handling exceptions" lang="java">

```java
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero: " + e.getMessage());
        } finally {
            System.out.println("Cleanup done");
        }
    }
}
```

</ExampleBox>

**Key rules:**
- Catch the most specific exception first.
- Use `throws` to declare checked exceptions a method may propagate.

---

## 11. Collections & Streams

The Collections Framework provides `List`, `Set`, and `Map`. The Stream API enables functional pipelines.

<ExampleBox title="Collections and streams" lang="java">

```java
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List&lt;Integer> nums = Arrays.asList(1, 2, 3, 4, 5);
        List&lt;Integer> evens = nums.stream()
                                  .filter(n -> n % 2 == 0)
                                  .map(n -> n * n)
                                  .collect(Collectors.toList());
        System.out.println(evens);   // [4, 16]

        Map&lt;String, Integer> scores = new HashMap<>();
        scores.put("Ada", 95);
        scores.put("Lin", 82);
        System.out.println(scores.get("Ada"));   // 95
    }
}
```

</ExampleBox>

---

## 12. Generics

Generics add compile-time type safety to classes and methods.

<ExampleBox title="Generic class" lang="java">

```java
class Box&lt;T> {
    private T value;
    public void set(T value) { this.value = value; }
    public T get() { return value; }
}

public class Main {
    public static void main(String[] args) {
        Box&lt;String> box = new Box<>();
        box.set("Hello");
        System.out.println(box.get());
    }
}
```

</ExampleBox>

---

## 13. Concurrency

Java offers threads, executors, and `CompletableFuture` for asynchronous work.

<ExampleBox title="A simple thread" lang="java">

```java
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread(() -> {
            for (int i = 0; i < 3; i++) {
                System.out.println("Worker: " + i);
            }
        });
        t.start();
        t.join();
        System.out.println("Main done");
    }
}
```

</ExampleBox>

**Key rules:**
- Prefer `ExecutorService` over manually spawning threads for production code.
- Protect shared state with `synchronized` or `java.util.concurrent` utilities.

---

## 14. Packages & Modules

Packages organize classes; the module system (since Java 9) controls visibility between libraries.

<ExampleBox title="Package declaration" lang="java">

```java
package com.example.demo;

public class Greeter {
    public static void hello() {
        System.out.println("Hello from com.example.demo");
    }
}
```

</ExampleBox>

> Build tools: Maven (`pom.xml`) and Gradle (`build.gradle`) manage dependencies and builds; Spring Boot is the dominant backend framework.

---

## 15. Exercises

<ExerciseBox title="Exercise 1 — FizzBuzz" difficulty="Easy">

Print numbers 1–20. For multiples of 3 print `Fizz`, for 5 print `Buzz`, for both print `FizzBuzz`.

```java
public class Main {
    public static void main(String[] args) {
        // your code here
    }
}
```

</ExerciseBox>

<ExerciseBox title="Exercise 2 — Reverse a string" difficulty="Medium">

Write a method `String reverse(String s)` that returns the reversed string without using `StringBuilder.reverse()`.

```java
public static String reverse(String s) {
    // your code here
}
```

</ExerciseBox>

<ExerciseBox title="Exercise 3 — Thread-safe counter" difficulty="Hard">

Implement a class `Counter` with `increment()` and `get()` that is safe to use from multiple threads. Use `synchronized` or an `AtomicInteger`.

```java
public class Counter {
    // your code here
}
```

</ExerciseBox>

---

## 16. Self-Test (Flashcards)

<Quiz storageKey="quiz-java" :cards="[
  { q: 'What is the difference between an interface and an abstract class in Java?', a: 'A class can implement many interfaces but extend only one class. Interfaces define a contract (and default methods); abstract classes can hold shared state and partially implemented logic.' },
  { q: 'Does Java pass objects by reference or by value?', a: 'Java is always pass-by-value. For objects the value is the reference, so the caller\'s reference is copied — you can mutate the object but not reassign the caller\'s variable.' },
  { q: 'What happens in <code>10 / 3</code> with two ints in Java?', a: 'It performs integer division and truncates the fractional part, yielding <code>3</code>. Use <code>10 / 3.0</code> for a floating-point result.' },
  { q: 'How does polymorphism work with <code>@Override</code>?', a: 'A superclass reference holding a subclass instance calls the subclass\'s overridden method at runtime, e.g. an <code>Animal</code> variable holding a <code>Dog</code> calls <code>Dog.speak()</code>.' }
]" />

## 17. Resources

<ResourceTable title="Java learning paths" :resources="[
  { label: 'Java Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/java/' },
  { label: 'Oracle Java Documentation', platform: 'Official', type: 'Docs', url: 'https://docs.oracle.com/en/java/' },
  { label: 'Java Programming', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/java/' },
  { label: 'Java Programming', platform: 'Programiz', type: 'Tutorial', url: 'https://www.programiz.com/java-programming' },
  { label: 'Learn Java', platform: 'Official', type: 'Tutorial', url: 'https://dev.java/learn/' },
  { label: 'Java Full Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=grEKMHGYyns' },
  { label: 'Practice Coding', platform: 'freeCodeCamp', type: 'Practice', url: 'https://www.freecodecamp.org/' },
  { label: 'Java Topics on GitHub', platform: 'GitHub', type: 'Book', url: 'https://github.com/topics/java' }
]" />

> 📝 Draft anything in the [Live Editor](/editor), then paste it here to keep your docs current.

---
title: C
---

# C

C is a low-level, procedural systems language that gives you direct control over memory and hardware. It underpins operating systems, embedded systems, compilers, and is the lingua franca of systems programming. Learning C teaches you how computers really work — pointers, the stack, the heap, and the preprocessor.

> **Paradigms:** Procedural · Imperative · Structured &nbsp;•&nbsp; **Extension:** `.c` / `.h` &nbsp;•&nbsp; **Run:** `gcc file.c -o file && ./file`
> **Difficulty:** Intermediate &nbsp;•&nbsp; **Created:** 1972 (Dennis Ritchie) &nbsp;•&nbsp; **Standard:** ISO/IEC 9899 (C17/C18)

## Table of Contents

- [1. Getting Started](#1-getting-started)
- [2. Variables & Data Types](#2-variables--data-types)
- [3. Operators](#3-operators)
- [4. Control Flow](#4-control-flow)
- [5. Functions](#5-functions)
- [6. Arrays & Strings](#6-arrays--strings)
- [7. Pointers](#7-pointers)
- [8. Structs](#8-structs)
- [9. Memory Management](#9-memory-management)
- [10. Preprocessor & Headers](#10-preprocessor--headers)
- [11. Input & Output](#11-input--output)
- [12. Exercises](#12-exercises)
- [13. Resources](#13-resources)

---

## 1. Getting Started

A C program is a collection of functions, and execution always begins at `main()`. You must include standard headers (like `stdio.h`) to use library functions such as `printf`.

<ExampleBox title="Hello, World" lang="c">

```c
#include &lt;stdio.h>

int main() {
    printf("Hello, C!\n");
    return 0;
}
```

</ExampleBox>

> 💡 **Tip:** Try it: compile with `gcc` — run `gcc hello.c -o hello && ./hello` in your terminal. No online playground needed; the compiler is your best teacher.

**Key rules:**
- Every program needs exactly one `main()` function.
- `printf` does not add a newline automatically — use `\n`.
- `return 0;` from `main` signals success to the OS.

---

## 2. Variables & Data Types

C is statically typed: every variable's type is fixed at compile time. Basic types include `int`, `char`, `float`, `double`, and modifiers like `long`, `short`, `unsigned`.

<ExampleBox title="Declaring and using variables" lang="c">

```c
#include &lt;stdio.h>

int main() {
    int age = 30;
    double price = 9.99;
    char grade = 'A';
    unsigned int count = 42;

    printf("Age: %d, Price: %.2f, Grade: %c\n", age, price, grade);
    printf("Count: %u\n", count);
    return 0;
}
```

</ExampleBox>

**Key rules:**
- Use `%d` for `int`, `%f`/`%.2f` for `float`/`double`, `%c` for `char`, `%u` for `unsigned`.
- Uninitialized local variables hold garbage values — always initialize.
- `char` is a 1-byte integer that can also hold an ASCII character.

---

## 3. Operators

C provides arithmetic, relational, logical, and bitwise operators, plus the all-important address-of (`&`) and dereference (`*`) operators.

<ExampleBox title="Arithmetic and bitwise operators" lang="c">

```c
#include &lt;stdio.h>

int main() {
    int a = 10, b = 3;
    printf("a + b = %d\n", a + b);   // 13
    printf("a / b = %d\n", a / b);   // 3  (integer division truncates)
    printf("a %% b = %d\n", a % b);  // 1  (remainder)

    unsigned int x = 1;
    printf("x << 3 = %u\n", x << 3); // 8  (left shift = multiply by 8)
    return 0;
}
```

</ExampleBox>

**Key rules:**
- Integer division drops the fractional part (`10 / 3 == 3`).
- Use `fmod` from `math.h` for floating-point remainder.
- Short-circuit `&&` and `||` skip the right side when the result is already known.

---

## 4. Control Flow

C uses `if`/`else`, `for`, `while`, and `do...while` loops — the same structures found in most C-family languages.

<ExampleBox title="Conditionals and loops" lang="c">

```c
#include &lt;stdio.h>

int main() {
    for (int i = 1; i <= 5; i++) {
        if (i % 2 == 0) {
            printf("%d is even\n", i);
        } else {
            printf("%d is odd\n", i);
        }
    }

    int n = 0;
    while (n < 3) {
        printf("n = %d\n", n);
        n++;
    }
    return 0;
}
```

</ExampleBox>

**Key rules:**
- Declaring the loop variable inside `for` requires C99 or later (`gcc -std=c99`).
- `break` exits a loop; `continue` skips to the next iteration.
- A `switch` works only on integer/char expressions.

---

## 5. Functions

Functions group logic and must be declared before use (or forward-declared with a prototype). Parameters are passed by value — a copy is made.

<ExampleBox title="Function with prototype" lang="c">

```c
#include &lt;stdio.h>

int add(int a, int b);   /* prototype */

int main() {
    printf("Sum = %d\n", add(4, 7));
    return 0;
}

int add(int a, int b) {
    return a + b;
}
```

</ExampleBox>

**Key rules:**
- Functions cannot return arrays directly — return a pointer instead.
- Use `void` for functions that take no parameters: `int main(void)`.
- `static` functions are visible only within their translation unit (file).

---

## 6. Arrays & Strings

Arrays are fixed-size, contiguous blocks of memory indexed from 0. In most contexts an array "decays" into a pointer to its first element. Strings are null-terminated `char` arrays ending in `'\0'`.

<ExampleBox title="Arrays and string handling" lang="c">

```c
#include &lt;stdio.h>
#include &lt;string.h>

int main() {
    int nums[5] = {1, 2, 3, 4, 5};
    printf("Third element: %d\n", nums[2]);   // 3

    char name[] = "C Language";
    printf("Length: %zu\n", strlen(name));    // 10
    printf("Greeting: %s\n", name);
    return 0;
}
```

</ExampleBox>

**Key rules:**
- Array size must be a compile-time constant (unless using C99 VLAs).
- `strlen` does not count the trailing `'\0'`.
- Writing past the end of an array is undefined behavior — a common source of bugs.

---

## 7. Pointers

A pointer stores a memory address. The address-of operator `&` gets an address; the dereference operator `*` reads/writes the pointed-to value. Pointers are the heart of C.

<ExampleBox title="Pointers and addresses" lang="c">

```c
#include &lt;stdio.h>

int main() {
    int x = 42;
    int *p = &x;

    printf("x = %d\n", x);
    printf("*p = %d\n", *p);     // 42
    printf("address of x: %p\n", (void *)p);

    *p = 100;                    // modify x through the pointer
    printf("x is now %d\n", x);  // 100
    return 0;
}
```

</ExampleBox>

**Key rules:**
- Always initialize pointers; a wild pointer causes crashes.
- `NULL` (or `0`) is the null pointer — never dereference it.
- Pointer arithmetic moves by the size of the pointed-to type.

---

## 8. Structs

A `struct` groups related data into a single user-defined type. Access members with `.` for values and `->` for pointers to structs.

<ExampleBox title="Defining and using a struct" lang="c">

```c
#include &lt;stdio.h>
#include &lt;string.h>

struct Person {
    char name[32];
    int age;
};

int main() {
    struct Person p;
    strcpy(p.name, "Ada");
    p.age = 36;

    printf("%s is %d years old\n", p.name, p.age);
    return 0;
}
```

</ExampleBox>

**Key rules:**
- Use `typedef` to avoid repeating `struct` (e.g. `typedef struct { ... } Person;`).
- Structs can be passed by value, but passing a pointer is usually more efficient.
- Be aware of padding/alignment — `sizeof` a struct may exceed the sum of its members.

---

## 9. Memory Management

C has no garbage collector. Use `malloc`/`calloc` to allocate heap memory and `free` to release it. Forgetting to `free` leaks memory; freeing twice or using freed memory is undefined behavior.

<ExampleBox title="Dynamic allocation" lang="c">

```c
#include &lt;stdio.h>
#include &lt;stdlib.h>

int main() {
    int *arr = malloc(5 * sizeof(int));
    if (arr == NULL) {
        return 1;   /* allocation failed */
    }
    for (int i = 0; i < 5; i++) {
        arr[i] = i * i;
    }
    printf("arr[3] = %d\n", arr[3]);   // 9
    free(arr);
    return 0;
}
```

</ExampleBox>

**Key rules:**
- Always check the return value of `malloc` for `NULL`.
- Match every `malloc`/`calloc`/`realloc` with exactly one `free`.
- After `free`, set the pointer to `NULL` to avoid dangling references.

---

## 10. Preprocessor & Headers

The preprocessor runs before compilation: `#include` pastes a file, `#define` creates macros, and `#ifndef` guards prevent double inclusion of headers.

<ExampleBox title="Macros and header guards" lang="c">

```c
#include &lt;stdio.h>

#define PI 3.14159
#define MAX(a, b) ((a) > (b) ? (a) : (b))

int main() {
    printf("PI = %.5f\n", PI);
    printf("Max = %d\n", MAX(10, 25));   // 25
    return 0;
}
```

</ExampleBox>

**Key rules:**
- Wrap macro arguments in parentheses to avoid operator-precedence bugs.
- Guard headers with `#ifndef MY_H / #define MY_H / #endif`.
- Prefer `const` and `enum` over `#define` when possible for type safety.

---

## 11. Input & Output

Beyond `printf`, `scanf` reads formatted input from stdin. File I/O uses `FILE *` handles opened with `fopen` and closed with `fclose`.

<ExampleBox title="Reading input and files" lang="c">

```c
#include &lt;stdio.h>

int main() {
    int age;
    printf("Enter your age: ");
    scanf("%d", &age);                 /* note the & */
    printf("You are %d years old\n", age);

    FILE *f = fopen("data.txt", "w");
    if (f != NULL) {
        fprintf(f, "Hello file!\n");
        fclose(f);
    }
    return 0;
}
```

</ExampleBox>

**Key rules:**
- `scanf` needs the address of the variable (`&age`).
- Always check `fopen` returned non-`NULL` before using the file.
- Open a file for reading as `"r"`, writing as `"w"` (truncates), appending as `"a"`.

---

## 12. Exercises

<ExerciseBox title="Exercise 1 — Sum an array" difficulty="Easy">

Write a program that creates an array of 10 integers, fills it with values 1..10, and prints the sum.

```c
int nums[10];
/* your code here */
```

</ExerciseBox>

<ExerciseBox title="Exercise 2 — Swap with pointers" difficulty="Medium">

Write a function `void swap(int *a, int *b)` that swaps two integers using pointers, then call it from `main`.

</ExerciseBox>

<ExerciseBox title="Exercise 3 — Dynamic string reversal" difficulty="Hard">

Write a program that reads a line of input, dynamically allocates a buffer with `malloc`, stores the input, and prints the string reversed. Remember to `free` the buffer.

</ExerciseBox>

---

## 13. Self-Test (Flashcards)

<Quiz storageKey="quiz-c" :cards="[
  { q: 'What is undefined behavior in C?', a: 'An operation the standard does not define, such as writing past an array end or dereferencing a freed pointer. The program may crash, produce wrong output, or appear to work.' },
  { q: 'Why must you pass the address to <code>scanf</code> (e.g. <code>&amp;age</code>)?', a: 'C is pass-by-value, so without the address <code>scanf</code> would only modify a local copy. The <code>&amp;</code> operator supplies the memory location to write into.' },
  { q: 'What does <code>malloc</code> return and why check it for NULL?', a: 'It returns a pointer to newly allocated heap memory, or <code>NULL</code> if allocation failed. Always check for NULL to avoid dereferencing a null pointer.' },
  { q: 'How does a string differ from a normal char array in C?', a: 'A C string is a <code>char</code> array terminated by a null byte <code>\'\\0\'</code>. Functions like <code>strlen</code> read until that terminator, so forgetting it causes buffer overruns.' }
]" />

## 14. Resources

<ResourceTable title="C learning paths" :resources="[
  { label: 'C Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/c/' },
  { label: 'C Programming Language', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/c-programming-language/' },
  { label: 'C Programming', platform: 'Programiz', type: 'Tutorial', url: 'https://www.programiz.com/c-programming' },
  { label: 'C Reference', platform: 'DevDocs', type: 'Docs', url: 'https://devdocs.io/c/' },
  { label: 'C Standard (cppreference)', platform: 'cppreference', type: 'Docs', url: 'https://en.cppreference.com/w/c' },
  { label: 'C Full Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=KJgsSFOSQv0' },
  { label: 'C Practice', platform: 'freeCodeCamp', type: 'Practice', url: 'https://www.freecodecamp.org/' },
  { label: 'C Topics on GitHub', platform: 'GitHub', type: 'Book', url: 'https://github.com/topics/c' }
]" />

> 📝 Draft anything in the [Live Editor](/editor), then paste it here to keep your docs current.

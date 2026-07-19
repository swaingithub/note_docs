---
title: PHP
---

# PHP

PHP is a server-side scripting language built for the web. It powers a large share of the internet (WordPress, Laravel apps) and embeds directly into HTML. PHP 8+ brings modern features like typed properties, attributes, and the JIT compiler.

> **Paradigms:** Procedural · Object-oriented · Imperative &nbsp;•&nbsp; **Extension:** `.php` &nbsp;•&nbsp; **Run:** `php file.php` (or via a web server)
> **Difficulty:** Beginner-friendly &nbsp;•&nbsp; **Created:** 1995 (Rasmus Lerdorf) &nbsp;•&nbsp; **Standard:** PHP reference implementation (Zend Engine)

## Table of Contents

- [1. Getting Started](#1-getting-started)
- [2. Variables & Types](#2-variables--types)
- [3. Data Types](#3-data-types)
- [4. Operators](#4-operators)
- [5. Control Flow](#5-control-flow)
- [6. Functions](#6-functions)
- [7. Arrays](#7-arrays)
- [8. Strings & Heredocs](#8-strings--heredocs)
- [9. Classes & OOP](#9-classes--oop)
- [10. Namespaces, Composer & Autoloading](#10-namespaces-composer--autoloading)
- [11. Errors & Exceptions](#11-errors--exceptions)
- [12. File I/O](#12-file-io)
- [13. Exercises](#13-exercises)
- [14. Resources](#14-resources)

---

## 1. Getting Started

PHP code is embedded in `<?php ... ?>` tags and can be mixed with HTML. Run scripts from the CLI with the interpreter.

<ExampleBox title="Hello, World" lang="php">

```php
<?php
echo "Hello, PHP!\n";
```

</ExampleBox>

> Try it: run with `php` — save the snippet to `hello.php` and execute `php hello.php`.

> 💡 **Tip:** Start a local dev server with `php -S localhost:8000` to serve files without installing a full web server.

---

## 2. Variables & Types

Variables start with `$` and are created by assignment. PHP is dynamically typed but supports optional type declarations.

<ExampleBox title="Assignment & type declaration" lang="php">

```php
<?php
$name = 'Ada';
$age = 36;
$age = 37;   // reassignment is fine

function add(int $a, int $b): int {
    return $a + $b;
}
echo add(2, 3);   // 5
```

</ExampleBox>

**Key rules:**
- Variable names are case-sensitive and use `$snake_case`.
- Type declarations (`int`, `string`, `array`, `object`, `?type` for nullable) improve safety.
- Use `===` for strict comparison (value and type).

---

## 3. Data Types

**Scalars:** `int`, `float`, `string`, `bool`, `null`.
**Compound:** `array`, `object`.
**Special:** `resource`, `callable`.

<ExampleBox title="Type checking" lang="php">

```php
<?php
echo gettype('hi');     // string
echo gettype(42);       // integer
echo gettype(3.14);     // double
var_dump(is_int(42));   // bool(true)
```

</ExampleBox>

**Key rules:**
- `array` is the only collection type and is actually an ordered map.
- `null` is the null value (test with `is_null()` or `=== null`).
- `0`, `''`, `'0'`, and `null` are falsy; be careful with `==`.

---

## 4. Operators

| Category | Operators |
|----------|-----------|
| Arithmetic | `+ - * / % **` |
| Assignment | `= += -= *= /=` |
| Comparison | `== === != !== > < >= <= <=>` |
| Logical | `&& \|\| !` (and `and or xor`) |
| Null coalescing | `??`, `??=` |

<ExampleBox title="Null coalescing" lang="php">

```php
<?php
$count = 0;
echo $count ?? 10;     // 0  (0 is set, not null)
echo $missing ?? 10;   // 10 (falls back)
```

</ExampleBox>

---

## 5. Control Flow

PHP uses C-style `if`/`elseif`/`else` and braces for blocks.

<ExampleBox title="if / for / while" lang="php">

```php
<?php
$score = 85;
$grade = $score >= 90 ? 'A' : ($score >= 70 ? 'B' : 'C');
echo $grade;   // B

for ($i = 0; $i < 3; $i++) {
    echo $i;   // 012
}

$n = 3;
while ($n > 0) {
    echo $n;
    $n--;
}
```

</ExampleBox>

**Key rules:**
- `match` (PHP 8) is a safer alternative to `switch` with strict comparison.
- `foreach` iterates arrays and objects.
- Avoid assigning inside conditions (`if ($x = foo())`) to prevent bugs.

---

## 6. Functions

Functions are declared with `function` and support default, variadic, and typed parameters.

<ExampleBox title="Defaults & variadic args" lang="php">

```php
<?php
function sum(int $a, int $b = 0, int ...$rest): int {
    return $a + $b + array_sum($rest);
}

echo sum(2, 3);          // 5
echo sum(2, 3, 4, 5);    // 14
```

</ExampleBox>

**Key rules:**
- First-class functions: store in variables with `$fn = fn() => ...` (arrow functions).
- `fn()` arrow functions auto-capture variables by value.
- Use named arguments (`add(b: 3, a: 2)`) for clarity (PHP 8).

---

## 7. Arrays

PHP arrays are ordered maps (both lists and dictionaries).

<ExampleBox title="List & associative arrays" lang="php">

```php
<?php
$fruits = ['apple', 'banana', 'cherry'];
echo $fruits[0];    // apple

$scores = ['math' => 90, 'science' => 85];
echo $scores['math'];   // 90

$users = [
    ['name' => 'Ada', 'age' => 36],
    ['name' => 'Lin', 'age' => 22],
];
$names = array_map(
    fn($u) => strtoupper($u['name']),
    array_filter($users, fn($u) => $u['age'] > 30)
);
print_r($names);   // ['ADA']
```

</ExampleBox>

**Key rules:**
- Use `[]` shorthand (PHP 5.4+) instead of `array()`.
- `array_filter`, `array_map`, `array_reduce` for functional processing.
- `foreach ($arr as $k => $v)` for key/value iteration.

---

## 8. Strings & Heredocs

PHP offers double-quoted interpolation, single quotes (no interpolation), and heredocs.

<ExampleBox title="Interpolation & heredoc" lang="php">

```php
<?php
$name = 'Ada';
echo "Hello, $name!\n";   // Hello, Ada!

$sql = <<&lt;SQL
SELECT * FROM users
WHERE name = '$name'
SQL;
echo $sql;
```

</ExampleBox>

**Key rules:**
- Double quotes interpolate variables; single quotes are literal.
- Use `htmlspecialchars()` to safely output user data in HTML.
- Prefer `sprintf()`/`strtr()` for complex formatting.

---

## 9. Classes & OOP

PHP supports full OOP: classes, inheritance, interfaces, traits, and visibility keywords.

<ExampleBox title="Class with inheritance" lang="php">

```php
<?php
class Animal {
    public function __construct(public string $name) {}
    public function speak(): string {
        return "{$this->name} makes a noise";
    }
}

class Dog extends Animal {
    public function speak(): string {
        return "{$this->name} barks";
    }
}

echo (new Dog('Rex'))->speak();   // Rex barks
```

</ExampleBox>

**Key rules:**
- Promote constructor params with `public`/`private` (PHP 8 constructor property promotion).
- `trait` shares code across unrelated classes (multiple inheritance workaround).
- Use `readonly` properties (PHP 8.1+) for immutable values.

---

## 10. Namespaces, Composer & Autoloading

Namespaces prevent name collisions. Composer manages dependencies and PSR-4 autoloading.

<ExampleBox title="Namespace & autoload" lang="php">

```php
<?php
namespace App\Math;

function sum(int $a, int $b): int {
    return $a + $b;
}

// composer.json maps App\ to src/
// require 'vendor/autoload.php';
```

</ExampleBox>

**Key rules:**
- Run `composer require vendor/package` to add dependencies from Packagist.
- Always `require 'vendor/autoload.php';` at the entry point.
- Follow PSR-4: `App\Math` → `src/Math.php`.

---

## 11. Errors & Exceptions

PHP uses exceptions (and traditional errors). Wrap risky code in `try/catch/finally`.

<ExampleBox title="Try / catch / finally" lang="php">

```php
<?php
try {
    $value = (int) readline('Number: ');
    echo 10 / $value;
} catch (DivisionByZeroError $e) {
    echo 'Cannot divide by zero';
} catch (Throwable $e) {
    echo 'Error: ' . $e->getMessage();
} finally {
    echo "\nCleanup runs regardless";
}
```

</ExampleBox>

**Key rules:**
- Catch `Throwable` to handle both Exceptions and Errors.
- Throw `new Exception('msg')` with a meaningful message.
- Set `display_errors=Off` in production for security.

---

## 12. File I/O

Use `file_get_contents`/`file_put_contents` for simple reads/writes, or `fopen` with handles.

<ExampleBox title="Read & write text" lang="php">

```php
<?php
file_put_contents('notes.txt', "Hello, file!\n");

$content = file_get_contents('notes.txt');
echo $content;   // Hello, file!
```

</ExampleBox>

**Key rules:**
- `file_put_contents` returns bytes written and is atomic for simple cases.
- Always validate and sanitize file paths from user input.
- Use `json_encode`/`json_decode` for structured data.

---

## 13. Exercises

<ExerciseBox title="Exercise 1 — FizzBuzz" difficulty="Easy">

Print numbers 1–15. For multiples of 3 print `Fizz`, for 5 print `Buzz`, for both print `FizzBuzz`.

```php
<?php
for ($i = 1; $i <= 15; $i++) {
    // your code here
}
```

</ExerciseBox>

<ExerciseBox title="Exercise 2 — Unique values" difficulty="Medium">

Write a function `unique(array $items): array` that returns an array with duplicates removed, without using `array_unique`.

```php
unique([1, 2, 2, 3, 3, 3]);  // [1, 2, 3]
```

</ExerciseBox>

<ExerciseBox title="Exercise 3 — Word counter" difficulty="Hard">

Write a function `wordCount(string $path): array` that reads a text file and returns an associative array mapping each lowercase word (punctuation stripped) to its occurrence count.

</ExerciseBox>

---

## 14. Self-Test (Flashcards)

<Quiz storageKey="quiz-php" :cards="[
  { q: 'Why should you prefer <code>===</code> over <code>==</code> in PHP?', a: '<code>==</code> does loose, type-juggling comparison (so <code>0 == &quot;0&quot;</code> is true); <code>===</code> checks both value and type strictly.' },
  { q: 'What is the null-coalescing operator <code>??</code>?', a: 'It returns the left operand if it is set and not null, otherwise the right operand — a concise fallback used instead of verbose <code>isset</code> checks.' },
  { q: 'What kind of data structure is a PHP array?', a: 'An ordered map: the same type serves as both an indexed list and an associative dictionary, with keys that can be integers or strings.' },
  { q: 'What does PHP 8 constructor property promotion do?', a: 'It lets you declare and initialize a property directly in the constructor signature, e.g. <code>public function __construct(public string $name)</code>, reducing boilerplate.' }
]" />

## 15. Resources

<ResourceTable title="PHP learning paths" :resources="[
  { label: 'PHP Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/php/' },
  { label: 'PHP Manual', platform: 'Official', type: 'Docs', url: 'https://www.php.net/docs.php' },
  { label: 'PHP Guide', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/php/' },
  { label: 'PHP Programming', platform: 'Programiz', type: 'Tutorial', url: 'https://www.programiz.com/php' },
  { label: 'PHP Full Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=OK_JCtrrv-c' },
  { label: 'Laravel Documentation', platform: 'Official', type: 'Docs', url: 'https://laravel.com/docs' },
  { label: 'PHP Topic on GitHub', platform: 'GitHub', type: 'Practice', url: 'https://github.com/topics/php' }
]" />

> 📝 Draft anything in the [Live Editor](/editor), then paste it here to keep your docs current.

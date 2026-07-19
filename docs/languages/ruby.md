---
title: Ruby
---

# Ruby

Ruby is a dynamic, elegant, object-oriented language focused on developer happiness. Ruby on Rails popularized convention-over-configuration web development. In Ruby, everything is an object, and the language favors expressive, readable code.

> **Paradigms:** Object-oriented · Dynamic · Functional &nbsp;•&nbsp; **Extension:** `.rb` &nbsp;•&nbsp; **Run:** `ruby file.rb`
> **Difficulty:** Beginner-friendly &nbsp;•&nbsp; **Created:** 1995 (Yukihiro "Matz" Matsumoto) &nbsp;•&nbsp; **Standard:** Ruby reference implementation (MRI)

## Table of Contents

- [1. Getting Started](#1-getting-started)
- [2. Variables & Dynamic Typing](#2-variables--dynamic-typing)
- [3. Data Types](#3-data-types)
- [4. Operators](#4-operators)
- [5. Control Flow](#5-control-flow)
- [6. Methods & Blocks](#6-methods--blocks)
- [7. Arrays & Hashes](#7-arrays--hashes)
- [8. Symbols & Ranges](#8-symbols--ranges)
- [9. Classes & OOP](#9-classes--oop)
- [10. Modules, Mixins & Gems](#10-modules-mixins--gems)
- [11. Errors & Exceptions](#11-errors--exceptions)
- [12. File I/O](#12-file-io)
- [13. Exercises](#13-exercises)
- [14. Resources](#14-resources)

---

## 1. Getting Started

Ruby code runs from a `.rb` file via the interpreter, or interactively in `irb` (Interactive Ruby).

<ExampleBox title="Hello, World" lang="ruby">

```ruby
puts 'Hello, Ruby!'
```

</ExampleBox>

> Try it: run with `ruby` — save the snippet to `hello.rb` and execute `ruby hello.rb`.

> 💡 **Tip:** Run `irb` in your terminal to evaluate Ruby expressions immediately and experiment with the language.

---

## 2. Variables & Dynamic Typing

Variables are created by assignment; there is no type declaration. Ruby is strongly, dynamically typed, and local variables use `snake_case`.

<ExampleBox title="Assignment & interpolation" lang="ruby">

```ruby
name = 'Ada'
age = 36
age = 37            # reassignment is fine

puts "#{name} is #{age}"   # Ada is 37

a, b = 1, 2         # parallel assignment
puts a, b           # 1 / 2
```

</ExampleBox>

**Key rules:**
- Constants start with an uppercase letter (`PI = 3.14`) and trigger a warning if reassigned.
- Use string interpolation `#{}` instead of concatenation.
- `nil` is the singleton null value (test with `.nil?`).

---

## 3. Data Types

**Built-in scalars:** `Integer`, `Float`, `String`, `Symbol`, `TrueClass`, `FalseClass`, `NilClass`.
**Built-in collections:** `Array`, `Hash`.

<ExampleBox title="Type checking" lang="ruby">

```ruby
puts 'hi'.class        # String
puts 42.class          # Integer
puts 3.14.class        # Float
puts true.class        # TrueClass
puts [1, 2].is_a?(Array)  # true
```

</ExampleBox>

**Key rules:**
- Everything is an object — even literals respond to methods (`3.times { }`).
- Strings are mutable; `Symbol` (`:name`) is an immutable, reusable identifier.
- `nil` is falsy; only `nil` and `false` are falsy, everything else is truthy.

---

## 4. Operators

| Category | Operators |
|----------|-----------|
| Arithmetic | `+ - * / % **` |
| Assignment | `= += -= *= /=` |
| Comparison | `== != > < >= <= <=>` |
| Logical | `&& \|\| !` (and `and or not`) |
| Membership | `include?`, `===` |

<ExampleBox title="Spaceship & safe navigation" lang="ruby">

```ruby
puts 1 <=> 2    # -1
puts 2 <=> 2    # 0
puts 3 <=> 2    # 1

user = nil
puts user&.name # nil (no error) — safe navigation operator
```

</ExampleBox>

---

## 5. Control Flow

Ruby uses `if`/`elsif`/`else` and `unless`; blocks end with `end` (no braces).

<ExampleBox title="if / unless / case" lang="ruby">

```ruby
score = 85
grade = if score >= 90
          'A'
        elsif score >= 70
          'B'
        else
          'C'
        end
puts grade   # B

for i in 0...3
  puts i     # 0 1 2
end

n = 3
while n > 0
  puts n
  n -= 1
end
```

</ExampleBox>

**Key rules:**
- Prefer `unless` for negative conditions (`unless valid?`).
- Use `case/when` for multi-branch matching (supports `===`).
- `0` is truthy in Ruby (unlike some other languages).

---

## 6. Methods & Blocks

Methods are defined with `def`/`end`. **Blocks** (closures) are central to Ruby via `yield`, `proc`, and `lambda`.

<ExampleBox title="Method with a block" lang="ruby">

```ruby
def repeat(n)
  n.times { |i| yield i }
end

repeat(3) { |i| puts "Iteration #{i}" }
# Iteration 0 / 1 / 2
```

</ExampleBox>

**Key rules:**
- Blocks are ubiquitous: `each`, `map`, `select`, `reduce` all take them.
- `lambda` enforces argument count; `proc` is more lenient.
- Use `&block` to accept a block as a parameter.

<ExampleBox title="Enumerable map & select" lang="ruby">

```ruby
nums = [1, 2, 3, 4]
squared = nums.map { |n| n * n }
evens = nums.select(&:even?)
puts squared.inspect   # [1, 4, 9, 16]
puts evens.inspect     # [2, 4]
```

</ExampleBox>

---

## 7. Arrays & Hashes

- `Array` — ordered, indexed, allows duplicates.
- `Hash` — key-value store; modern syntax uses `{ key: value }`.

<ExampleBox title="Array & hash operations" lang="ruby">

```ruby
fruits = ['apple', 'banana', 'cherry']
puts fruits[0]            # apple
puts fruits.last          # cherry

users = [
  { name: 'Ada', age: 36 },
  { name: 'Lin', age: 22 }
]
names = users.select { |u| u[:age] > 30 }.map { |u| u[:name].upcase }
puts names.inspect        # ["ADA"]

scores = { math: 90, science: 85 }
puts scores[:math]        # 90
puts scores.fetch(:art, 'N/A')  # N/A
```

</ExampleBox>

**Key rules:**
- Use `<<` to append (`arr << 5`).
- Symbols (`:key`) are the conventional hash keys.
- Iterate hashes with `.each { |k, v| }`.

---

## 8. Symbols & Ranges

`Symbol` is an immutable, memory-efficient name. `Range` represents an interval and is used heavily for loops and slicing.

<ExampleBox title="Symbols & ranges" lang="ruby">

```ruby
status = :active
puts status.class   # Symbol

(1..5).each { |n| print n }   # 12345
puts
puts (1...5).to_a.inspect     # [1, 2, 3, 4]

letters = ('a'..'d').to_a
puts letters.inspect          # ["a", "b", "c", "d"]
```

</ExampleBox>

**Key rules:**
- Use `..` (inclusive) vs `...` (exclusive of end).
- Prefer symbols over strings for identifiers and hash keys.
- Ranges respond to `.include?` and `.cover?`.

---

## 9. Classes & OOP

Everything in Ruby is an object. Classes use `initialize` for constructors and `attr_accessor` for getters/setters.

<ExampleBox title="Class with inheritance" lang="ruby">

```ruby
class Animal
  attr_accessor :name
  def initialize(name)
    @name = name
  end
  def speak
    "#{@name} makes a noise"
  end
end

class Dog < Animal
  def speak
    "#{@name} barks"
  end
end

puts Dog.new('Rex').speak   # Rex barks
```

</ExampleBox>

**Key rules:**
- Instance variables start with `@`; class variables with `@@`.
- Open classes let you add methods anywhere (`class String; ...; end`).
- Use `super` to call the parent implementation.

---

## 10. Modules, Mixins & Gems

`Module` provides namespaces and **mixins** (shared behavior injected via `include`). Gems are Ruby packages managed by `gem` and `bundler`.

<ExampleBox title="Module as a mixin" lang="ruby">

```ruby
module Greetable
  def greet
    "Hello, I am #{@name}"
  end
end

class Person
  include Greetable
  def initialize(name)
    @name = name
  end
end

puts Person.new('Ada').greet   # Hello, I am Ada
```

</ExampleBox>

**Key rules:**
- Use `include` for instance methods; `extend` for class methods.
- Pin dependencies in a `Gemfile` and run `bundle install`.
- Namespace code with modules to avoid collisions.

---

## 11. Errors & Exceptions

Ruby raises exceptions; rescue them with `begin/rescue/ensure`.

<ExampleBox title="Begin / rescue / ensure" lang="ruby">

```ruby
begin
  value = Integer(gets)
  puts 10 / value
rescue ArgumentError
  puts 'Not a valid integer'
rescue ZeroDivisionError
  puts 'Cannot divide by zero'
else
  puts 'No error occurred'
ensure
  puts 'Cleanup runs regardless'
end
```

</ExampleBox>

**Key rules:**
- Rescue the most specific exception class.
- `retry` re-runs the `begin` block.
- Raise custom exceptions by subclassing `StandardError`.

---

## 12. File I/O

Use `File.open` with a block so the file closes automatically.

<ExampleBox title="Read & write text" lang="ruby">

```ruby
File.write('notes.txt', "Hello, file!\n")

content = File.read('notes.txt')
puts content   # Hello, file!
```

</ExampleBox>

**Key rules:**
- Pass a block to `File.open` to guarantee closure.
- Use `File.readlines` to get an array of lines.
- Specify encoding when needed: `File.read(path, encoding: 'UTF-8')`.

---

## 13. Exercises

<ExerciseBox title="Exercise 1 — FizzBuzz" difficulty="Easy">

Print numbers 1–15. For multiples of 3 print `Fizz`, for 5 print `Buzz`, for both print `FizzBuzz`.

```ruby
(1..15).each do |i|
  # your code here
end
```

</ExerciseBox>

<ExerciseBox title="Exercise 2 — Unique values" difficulty="Medium">

Write a method `unique(items)` that returns an array with duplicates removed, without using `uniq`.

```ruby
unique([1, 2, 2, 3, 3, 3])  # [1, 2, 3]
```

</ExerciseBox>

<ExerciseBox title="Exercise 3 — Word counter" difficulty="Hard">

Write a method `word_count(path)` that reads a text file and returns a hash mapping each word (lowercased, punctuation stripped) to its occurrence count.

</ExerciseBox>

---

## 14. Self-Test (Flashcards)

<Quiz storageKey="quiz-ruby" :cards="[
  { q: 'What is truthy in Ruby?', a: 'Only <code>nil</code> and <code>false</code> are falsy; everything else (including <code>0</code> and empty strings) is truthy.' },
  { q: 'What is a Ruby block and why is it central?', a: 'A block is an anonymous closure passed to a method (e.g. <code>each { }</code>). Iterators like <code>map</code> and <code>select</code> take blocks, making them idiomatic for collection processing.' },
  { q: 'How does a mixin differ from inheritance?', a: 'A module mixed in with <code>include</code> injects shared behavior into a class without using inheritance, sidestepping single-inheritance limits.' },
  { q: 'What is the safe navigation operator <code>&amp;.?</code>?', a: 'It calls a method only if the receiver is not nil, returning nil instead of raising NoMethodError — e.g. <code>user&amp;.name</code>.' }
]" />

## 15. Resources

<ResourceTable title="Ruby learning paths" :resources="[
  { label: 'Ruby Documentation', platform: 'Official', type: 'Docs', url: 'https://www.ruby-lang.org/en/documentation/' },
  { label: 'Ruby Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/ruby/' },
  { label: 'Ruby Guide', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/ruby/' },
  { label: 'Ruby Programming', platform: 'Programiz', type: 'Tutorial', url: 'https://www.programiz.com/ruby-programming' },
  { label: 'Ruby Monk', platform: 'Official', type: 'Tutorial', url: 'https://rubymonk.com/' },
  { label: 'Ruby Full Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=t_ispmWmdjY' },
  { label: 'Ruby Topic on GitHub', platform: 'GitHub', type: 'Practice', url: 'https://github.com/topics/ruby' }
]" />

> 📝 Draft anything in the [Live Editor](/editor), then paste it here to keep your docs current.

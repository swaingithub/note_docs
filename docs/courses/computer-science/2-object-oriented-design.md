---
title: Object-Oriented Design
---

# Core Programming: Object-Oriented Design

Object-oriented design (OOD) organizes code around objects that bundle data and behavior. Classes define blueprints, inheritance lets types share behavior, and composition builds complex objects from simpler parts. The SOLID principles guide maintainable, extensible designs.

<ExampleBox title="Classes, inheritance, and composition" lang="python">

```python
class Animal:
    def speak(self):
        raise NotImplementedError

class Dog(Animal):
    def speak(self):
        return "Woof"

class Collar:
    def __init__(self, color):
        self.color = color

class Pet:
    # composition: a Pet has-a Collar, not is-a Collar
    def __init__(self, animal: Animal, collar: Collar):
        self.animal = animal
        self.collar = collar

pet = Pet(Dog(), Collar("red"))
print(pet.animal.speak(), pet.collar.color)
```
</ExampleBox>

Key points:
- **Single Responsibility**: a class should have one reason to change.
- **Open/Closed**: open for extension, closed for modification.
- **Liskov Substitution**: subclasses must be usable in place of their base class.
- **Interface Segregation**: clients should not depend on methods they don't use.
- **Dependency Inversion**: depend on abstractions, not concrete details.
- Prefer composition over inheritance when behavior is shared rather than an "is-a" relationship.

<ExerciseBox title="Model a library system" difficulty="Medium">

Design classes for `Book`, `Member`, and `Library` where a member can borrow and return books. Apply the Single Responsibility principle: keep borrowing logic in `Library`, not in `Book`.

</ExerciseBox>

<ExerciseBox title="Refactor to SOLID" difficulty="Hard">

Take a single 200-line "god class" that does parsing, validation, and storage. Split it into separate classes with clear interfaces and use dependency injection for the storage backend.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Designed an OO system', 'Refactored into clean layers']" storageKey="computer-science/2-object-oriented-design" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-2-object-oriented-design" :cards="[
{ q: 'What does the L in SOLID stand for?', a: '<b>Liskov Substitution</b>: subclasses must be usable as their base class.' }, { q: 'When should you prefer composition over inheritance?', a: 'When behavior is shared via has-a, not an is-a relationship.' }, { q: 'What is the Single Responsibility principle?', a: 'A class should have only one reason to change.' }, { q: 'What does Dependency Inversion require?', a: 'Depend on abstractions, not concrete implementations.' }
]" />

## Resources

<ResourceTable title="Object-Oriented Design Resources" :resources="[
  { label: 'Python Classes Docs', platform: 'Official', type: 'Docs', url: 'https://docs.python.org/3/tutorial/classes.html' },
  { label: 'SOLID Principles', platform: 'GeeksforGeeks', type: 'Tutorial', url: 'https://www.geeksforgeeks.org/solid-principle-in-programming-understand-with-real-life-examples/' },
  { label: 'Object-Oriented Programming', platform: 'Programiz', type: 'Tutorial', url: 'https://www.programiz.com/python-programming/object-oriented-programming' },
  { label: 'Composition vs Inheritance', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=wfMtDGfHWpA' },
  { label: 'Refactoring (Fowler)', platform: 'GitHub', type: 'Book', url: 'https://github.com/cmur2/refactoring' },
  { label: 'MDN OOP in JS', platform: 'MDN', type: 'Docs', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented' }
]" />

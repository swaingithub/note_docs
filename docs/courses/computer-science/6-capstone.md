---
title: Capstone
---

# Final Project: Capstone

The capstone is where everything comes together: you design, build, test, and publish a real project, then write a retrospective reflecting on what you learned and what you would do differently.

<ExampleBox title="A project skeleton" lang="python">

```python
# A small, testable project module
def fib(n: int) -> int:
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

if __name__ == "__main__":
    print(fib(10))  # 55
```

```bash
# Run tests and publish
python -m pytest
git tag v1.0.0
git push origin --tags
```
</ExampleBox>

Key points:
- Pick a project that exercises multiple skills (UI, API, data, tests).
- Keep the codebase modular with clear interfaces and tests.
- Use version control deliberately: meaningful commits and tagged releases.
- Document with a README: what it does, how to run it, design decisions.
- A retrospective turns the project into durable, transferable knowledge.

<ExerciseBox title="Ship v1.0" difficulty="Medium">

Build a small but complete project (e.g. a CLI todo app or a web note-taker). Add unit tests, a README, and publish it on GitHub with a tagged release.

</ExerciseBox>

<ExerciseBox title="Write the retrospective" difficulty="Easy">

After shipping, write 300 words covering: the hardest bug, one thing you'd architect differently, and one new skill you gained.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Shipped capstone on GitHub', 'Wrote a retrospective']" storageKey="computer-science/6-capstone" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-6-capstone" :cards="[
{ q: 'What should a capstone project exercise?', a: 'Multiple skills: UI, API, data, and tests.' }, { q: 'How should releases be managed?', a: 'Meaningful commits plus tagged releases (e.g. <code>git tag v1.0.0</code>).' }, { q: 'What belongs in a README?', a: 'What it does, how to run it, and design decisions.' }, { q: 'What does a retrospective produce?', a: 'Durable knowledge: hard bugs, better architecture, new skills.' }
]" />

## Resources

<ResourceTable title="Capstone Resources" :resources="[
  { label: 'GitHub Guides', platform: 'Official', type: 'Docs', url: 'https://guides.github.com/' },
  { label: 'Write a README', platform: 'GitHub', type: 'Tutorial', url: 'https://docs.github.com/en/repositories/managing-your-repositories-settings-and-features/customizing-your-repository/about-readmes' },
  { label: 'pytest Docs', platform: 'Official', type: 'Docs', url: 'https://docs.pytest.org/' },
  { label: 'Project-based Learning', platform: 'GitHub', type: 'Book', url: 'https://github.com/practical-tutorials/project-based-learning' },
  { label: 'How to write a retrospective', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=ZuXfBVm6rSc' }
]" />

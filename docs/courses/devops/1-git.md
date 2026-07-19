---
title: Git
---

# Linux & Git: Git

Git tracks changes to your code, enables branching, and powers collaboration through pull requests. `rebase` keeps history linear by replaying your commits on top of the latest `main`, while merge commits preserve branch context.

<ExampleBox title="Branching, rebasing, merging" lang="bash">

```bash
git switch -c feature/x
# ... make commits ...
git fetch origin
git rebase origin/main      # replay your work on top of latest main
git push -u origin feature/x
# open a PR; after review:
git switch main
git merge --no-ff feature/x
```
</ExampleBox>

Key points:
- `git switch -c <branch>` creates and checks out a new branch.
- `git rebase main` rewrites commit history onto the newest main.
- Conflicts happen when both sides change the same lines — resolve, `add`, then continue.
- `--no-ff` merge keeps a clear record that work happened on a branch.
- Push with `-u` to set the upstream and enable simple `git push` later.

<ExerciseBox title="Rebase flow" difficulty="Medium">

Create a branch, make two commits, then `rebase` onto an updated `main` with a deliberate conflict. Resolve it and complete the rebase.

</ExerciseBox>

<ExerciseBox title="Open a PR" difficulty="Easy">

Push your branch and open a pull request on GitHub. Add a description, request a review, and merge after it passes checks.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Opened a PR', 'Resolved a conflict']" storageKey="devops/1-git" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-1-git" :cards="[
{ q: 'How do you create and switch branches?', a: '<code>git switch -c feature/x</code>.' }, { q: 'What does <code>git rebase main</code> do?', a: 'Replays your commits on top of the latest main.' }, { q: 'What keeps branch context on merge?', a: '<code>git merge --no-ff</code>.' }, { q: 'What sets the upstream on push?', a: 'The <code>-u</code> flag, enabling later <code>git push</code>.' }
]" />

## Resources

<ResourceTable title="Git Resources" :resources="[
  { label: 'Git Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/git/' },
  { label: 'Git Documentation', platform: 'Official', type: 'Docs', url: 'https://git-scm.com/doc' },
  { label: 'GitHub Docs', platform: 'Official', type: 'Docs', url: 'https://docs.github.com/' },
  { label: 'Learn Git Branching', platform: 'GitHub', type: 'Practice', url: 'https://github.com/pcottle/learnGitBranching' },
  { label: 'Git & GitHub Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=RGOj5yH7evk' }
]" />

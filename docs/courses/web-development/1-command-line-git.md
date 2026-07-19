---
title: Command Line & Git
---

# Foundations (HTML & CSS): Command Line & Git

The command line and Git are essential developer tools. The shell lets you navigate and script the filesystem; Git tracks changes and enables collaboration through branches, commits, and pull requests.

<ExampleBox title="Shell and Git basics" lang="bash">

```bash
# navigate and inspect
ls -la
cd projects/my-site

# start version control
git init
git add index.html style.css
git commit -m "first page"

# create a feature branch and push
git switch -c feature/nav
git add .
git commit -m "add navigation"
git push -u origin feature/nav
```
</ExampleBox>

Key points:
- `git init` creates a repository; `git add` stages; `git commit` saves a snapshot.
- Branches isolate work: `git switch -c <name>` creates and checks out a branch.
- Push branches and open a **pull request** to review before merging.
- `git rebase main` replays your commits on top of the latest main.
- Resolve conflicts by editing the marked files, then `git add` and continue.

<ExerciseBox title="First commit" difficulty="Easy">

Initialize a git repo in a project folder, create an `index.html`, commit it, and push the repository to GitHub.

</ExerciseBox>

<ExerciseBox title="Branch and PR" difficulty="Medium">

Create a feature branch, make a change, commit it, push, and open a pull request on GitHub. Resolve a deliberate merge conflict by editing the conflict markers.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Initialized a git repo', 'Made a commit', 'Pushed to GitHub']" storageKey="web-development/1-command-line-git" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-1-command-line-git" :cards="[
{ q: 'What does <code>git init</code> do?', a: 'Creates a new Git repository in the current folder.' }, { q: 'What is the staging command?', a: '<code>git add</code> stages changes before a commit.' }, { q: 'How do you create and switch to a branch?', a: '<code>git switch -c feature/nav</code> creates and checks out it.' }, { q: 'What is a pull request for?', a: 'Reviewing changes on a branch before merging to main.' }
]" />

## Resources

<ResourceTable title="Git & CLI Resources" :resources="[
  { label: 'Git Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/git/' },
  { label: 'Git Documentation', platform: 'Official', type: 'Docs', url: 'https://git-scm.com/doc' },
  { label: 'GitHub Docs', platform: 'Official', type: 'Docs', url: 'https://docs.github.com/' },
  { label: 'Learn Git Branching', platform: 'GitHub', type: 'Practice', url: 'https://github.com/pcottle/learnGitBranching' },
  { label: 'Git & GitHub Crash Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=RGOj5yH7evk' }
]" />

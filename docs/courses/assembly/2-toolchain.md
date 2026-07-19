---
title: 'Lesson 2 — Toolchain: Assemble, Link, Run'
---

# Lesson 2 — Toolchain: Assemble, Link, Run

> **Module 1 · Foundations · Lesson 2 of 10**

You need three tools to turn assembly into a running program: an **assembler**, a **linker**, and a way to **run** it. On Linux the standard pair is `nasm` (assembler) + `ld` (linker).

## Install the toolchain

<ExampleBox title="Debian/Ubuntu" lang="bash">

```bash
sudo apt update
sudo apt install nasm binutils   # binutils provides ld
nasm -v                          # confirm it works
```

</ExampleBox>

On macOS: `brew install nasm`. On Windows use WSL or MinGW.

## The three steps

<ExampleBox title="Assemble → Link → Run" lang="bash">

```bash
# 1. Assemble: .asm  ->  .o  (object file, machine code + symbols)
nasm -f elf64 hello.asm -o hello.o

# 2. Link:    .o   ->  executable (resolves _start, system libs)
ld hello.o -o hello

# 3. Run
./hello
```

</ExampleBox>

- **`-f elf64`** tells NASM the output format (64-bit ELF, Linux's executable format).
- **`ld`** combines your object file into a runnable binary and sets the entry point (`_start`).
- On macOS use `-f macho64` and link with `ld -o hello hello.o -lSystem -syslibroot $(xcrun --show-sdk-path) -e _start`.

## Inspect what you built

<ExampleBox title="Disassemble & debug info" lang="bash">

```bash
objdump -d hello | less     # show the actual machine instructions
file hello                   # confirm it is an executable
nm hello                     # list symbols (e.g. _start)
```

</ExampleBox>

> 💡 **Godbolt (Compiler Explorer)** lets you write C and see the assembly it compiles to — the best way to learn real-world asm. Bookmark it: https://godbolt.org/

## Common beginner errors

| Error | Cause | Fix |
|-------|-------|-----|
| `ld: cannot find _start` | no `global _start` | add `global _start` in `.text` |
| `undefined reference` | typo in symbol name | check spelling/case |
| `segfault` | wrote to bad memory / bad syscall | step in `gdb` |

<ExerciseBox title="Set up your tools" difficulty="Easy">
Install `nasm` and `binutils` (or verify they are present). Run `nasm -v` and `ld --version` and confirm both print version info. If you are on a non-Linux OS, note the equivalent commands.
</ExerciseBox>

<ExerciseBox title="Disassemble a snippet" difficulty="Medium">
Assemble any small file, then run `objdump -d` on the object file and find the bytes for a `mov` instruction. Confirm the mnemonic you wrote matches the disassembly.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-asm-2" :cards="[
  { q: 'What is the job of the assembler (nasm)?', a: 'Turn .asm source into an object file (.o) containing machine code and symbols.' },
  { q: 'What does the linker (ld) do?', a: 'Combines object files into a final executable and resolves the entry point and external symbols.' },
  { q: 'What does <code>-f elf64</code> mean?', a: 'Output format is 64-bit ELF, the executable format used on Linux.' },
  { q: 'Why might ld complain about a missing <code>_start</code>?', a: 'Your code did not declare <code>global _start</code>, so the linker has no entry point.' }
]" />

## Resources

<ResourceTable title="Lesson 2 — further reading" :resources="[
  { label: 'NASM download/install', platform: 'Official', type: 'Docs', url: 'https://www.nasm.us/' },
  { label: 'GNU ld manual', platform: 'Official', type: 'Docs', url: 'https://sourceware.org/binutils/docs/ld/' },
  { label: 'Compiler Explorer (Godbolt)', platform: 'GitHub', type: 'Practice', url: 'https://godbolt.org/' },
  { label: 'ASM setup tutorial', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=K0gXH9tJUV0' }
]" />

## Checklist

<ProgressChecklist :items="['Installed nasm + ld', 'Ran assemble/link/run steps', 'Used objdump to inspect output']" storageKey="assembly/2-toolchain" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

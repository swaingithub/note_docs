---
title: Assembly Playground
---

# Assembly Playground (RISC-V, in your browser)

Practice **RISC-V** assembly with no toolchain. The emulator below is a self-contained RV32I simulator written in JavaScript — it runs entirely in your browser, offline.

<ClientOnly>
  <AssemblyPlayground />
</ClientOnly>

## How it works

- `ecall` prints the value in `a0` (`x10`) followed by a newline.
- Labels are written as `name:` at the start of a line.
- Branches (`beq`, `bne`, `blt`, `bge`) and `j`/`jal` jump to labels.

## Try this: sum 1..5

```
  li   x1, 1
  li   x2, 0
loop:
  add  x2, x2, x1
  addi x1, x1, 1
  blt  x1, x6, loop   ; need x6 = 6 first
```

Better — set the limit explicitly:

```
  li   x1, 1        ; i = 1
  li   x2, 0        ; sum = 0
  li   x6, 6        ; limit = 6
loop:
  add  x2, x2, x1
  addi x1, x1, 1
  blt  x1, x6, loop
  mv   x10, x2      ; print sum (15)
  ecall
  li   x10, 0
  ecall
```

> Want x86-64 instead? Install `nasm` + `ld` and follow the [Assembly course](/courses/assembly/). This playground uses RISC-V because it runs safely in-browser.

## Supported instructions

`li`, `la`, `mv`, `add`, `sub`, `mul`, `addi`, `muli`, `slli`, `srli`, `srai`, `and`, `or`, `xor`, `andi`, `ori`, `slt`, `slti`, `beq`, `bne`, `blt`, `bge`, `jal`, `j`, `ecall`, `nop`.

> 📝 Draft anything in the [Live Editor](/editor), then paste it here to keep your docs current.

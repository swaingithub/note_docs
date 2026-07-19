---
title: Online Compiler
---

# Online Compiler

Run code in your browser — no install needed. Switch languages with the tabs. JavaScript runs **fully offline**; Python, Go, and Rust use the official playground APIs (require internet).

<ClientOnly>
  <OnlineCompiler />
</ClientOnly>

## What runs here

| Language | Engine | Needs internet? |
|----------|--------|-----------------|
| JavaScript | Native browser VM (console captured) | No |
| Python | Skulpt (in-browser, CDN-loaded) | Yes (to load runtime) |
| Go | goplay.golang.org (WebSocket) | Yes |
| Rust | play.rust-lang.org (REST API) | Yes |

> Want assembly instead? Try the [Assembly Playground](/assembly-playground) (RISC-V, fully offline). Want to draft notes? Use the [Live Editor](/editor).

> 📝 Draft anything in the [Live Editor](/editor), then paste it here to keep your docs current.

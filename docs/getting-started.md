# How to Use DevNotes

A quick guide to getting the most out of your notes.

## Step 1 — Browse

Use the sidebar to navigate **Languages** and **Courses**. Each page follows a consistent, step-by-step layout.

## Step 2 — Edit live

Open the [Live Editor](/editor). Type Markdown on the left; the preview updates on the right. Your content is **autosaved to your browser** automatically.

<LiveEditor doc="how-to" title="My How-To Notes" />

## Step 3 — Make it permanent

- Click **Export .md** to download your note.
- Place it in `docs/languages/` or `docs/courses/`.
- Restart the dev server (or it hot-reloads) and your note appears in the docs.

## Step 4 — Customize the UI

- Edit `docs/.vitepress/theme/style.css` for colors and styling.
- Edit `docs/.vitepress/config.ts` to add sidebar categories and nav items.

## Tips

- Use `npm run dev` for live editing with hot reload.
- Use `npm run build` to produce a static site you can deploy anywhere.
- Search is built-in (press `Ctrl/⌘ + K`).

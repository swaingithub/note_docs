# How to Use DevNotes

A quick guide to getting the most out of your notes.

## Step 1 - Browse

Use the sidebar to navigate **Languages** and **Courses**. Each page follows a consistent, step-by-step layout.

## Step 2 - Edit live

Open the [Live Editor](/editor). Type Markdown on the left; the preview updates on the right. Your content is **autosaved to your browser** automatically.

<LiveEditor doc="how-to" title="My How-To Notes" />

## Step 3 - Make it permanent

- Click **Export .md** to download your note.
- Place it in `docs/languages/` or `docs/courses/`.
- Restart the dev server, or let it hot-reload, and your note appears in the docs.

## Step 4 - Upgrade to expert depth

- Use the [Expert Knowledge Standard](/expert-standard) as the 10/10 quality bar.
- Start new advanced pages from `docs/templates/expert-lesson-template.md`.
- Improve existing pages by adding mechanics, production notes, failure modes, decision guides, exercises, and authoritative resources.

## Step 5 - Customize the UI

- Edit `docs/.vitepress/theme/style.css` for colors and styling.
- Edit `docs/.vitepress/config.ts` to add sidebar categories and nav items.

## Tips

- Use `npm run dev` for live editing with hot reload.
- Use `npm.cmd run build` on Windows PowerShell if `npm run build` is blocked by script policy.
- Search is built into the VitePress UI.

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useData } from 'vitepress'

const { isDark } = useData()

const STORAGE_KEY = 'devnotes:editor:'
const props = defineProps<{ doc?: string; title?: string }>()

function docFromUrl(): string {
  if (typeof window === 'undefined') return 'scratch'
  const p = new URLSearchParams(window.location.search).get('doc')
  return p || 'scratch'
}

const docId = computed(() => props.doc || docFromUrl())
const key = computed(() => STORAGE_KEY + docId.value)

const defaultContent = `# ${props.title || 'My Notes'}

Start writing your notes here. Everything is saved automatically in your browser.

## Step 1
Describe the first step.

## Step 2
Add code examples:

\`\`\`js
console.log('Hello, DevNotes!')
\`\`\`

> Tip: Use the **Editor** to draft, then copy into a docs page.
`

const content = ref(defaultContent)
const savedAt = ref<string | null>(null)
const status = ref<'saved' | 'saving' | 'idle'>('idle')

function load() {
  const raw = localStorage.getItem(key.value)
  if (raw !== null) {
    content.value = raw
  } else {
    content.value = defaultContent
  }
}

let timer: number | undefined
function save() {
  status.value = 'saving'
  localStorage.setItem(key.value, content.value)
  savedAt.value = new Date().toLocaleTimeString()
  status.value = 'saved'
}

watch(content, () => {
  status.value = 'idle'
  if (timer) window.clearTimeout(timer)
  timer = window.setTimeout(save, 600)
})

onMounted(load)

function download() {
  const blob = new Blob([content.value], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${docId.value}.md`
  a.click()
  URL.revokeObjectURL(url)
}

function upload(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    content.value = String(reader.result)
    save()
  }
  reader.readAsText(file)
}

function clearAll() {
  if (confirm('Clear this note? This cannot be undone.')) {
    localStorage.removeItem(key.value)
    content.value = defaultContent
    savedAt.value = null
  }
}

const previewHtml = computed(() => renderMarkdown(content.value))

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function renderMarkdown(src: string): string {
  const lines = src.split('\n')
  let html = ''
  let i = 0
  let inCode = false
  let codeLang = ''
  let codeBuf: string[] = []

  const inline = (t: string) =>
    escapeHtml(t)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code>$1</code>')

  while (i < lines.length) {
    const line = lines[i]
    if (line.startsWith('```')) {
      if (!inCode) {
        inCode = true
        codeLang = line.slice(3).trim()
        codeBuf = []
      } else {
        inCode = false
        html += `<pre class="code-block" data-lang="${codeLang}"><code>${escapeHtml(codeBuf.join('\n'))}</code></pre>`
      }
      i++
      continue
    }
    if (inCode) {
      codeBuf.push(line)
      i++
      continue
    }
    if (/^######\s/.test(line)) html += `<h6>${inline(line.replace(/^######\s/, ''))}</h6>`
    else if (/^#####\s/.test(line)) html += `<h5>${inline(line.replace(/^#####\s/, ''))}</h5>`
    else if (/^####\s/.test(line)) html += `<h4>${inline(line.replace(/^####\s/, ''))}</h4>`
    else if (/^###\s/.test(line)) html += `<h3>${inline(line.replace(/^###\s/, ''))}</h3>`
    else if (/^##\s/.test(line)) html += `<h2>${inline(line.replace(/^##\s/, ''))}</h2>`
    else if (/^#\s/.test(line)) html += `<h1>${inline(line.replace(/^#\s/, ''))}</h1>`
    else if (/^>\s/.test(line)) html += `<blockquote>${inline(line.replace(/^>\s/, ''))}</blockquote>`
    else if (/^[-*]\s/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^[-*]\s/.test(lines[i])) {
        items.push(`<li>${inline(lines[i].replace(/^[-*]\s/, ''))}</li>`)
        i++
      }
      html += `<ul>${items.join('')}</ul>`
      continue
    } else if (/^\d+\.\s/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(`<li>${inline(lines[i].replace(/^\d+\.\s/, ''))}</li>`)
        i++
      }
      html += `<ol>${items.join('')}</ol>`
      continue
    } else if (line.trim() === '') {
      html += ''
    } else {
      html += `<p>${inline(line)}</p>`
    }
    i++
  }
  return html
}
</script>

<template>
  <div class="live-editor" :class="{ dark: isDark }">
    <div class="le-toolbar">
      <div class="le-title">
        <span class="le-dot" :class="status"></span>
        <strong>{{ title || 'Live Editor' }}</strong>
        <span class="le-status">
          <template v-if="status === 'saving'">saving…</template>
          <template v-else-if="status === 'saved'">saved · {{ savedAt }}</template>
          <template v-else>autosave on</template>
        </span>
      </div>
      <div class="le-actions">
        <label class="le-btn">
          Import
          <input type="file" accept=".md,.markdown,.txt" @change="upload" hidden />
        </label>
        <button class="le-btn" @click="download">Export .md</button>
        <button class="le-btn ghost" @click="clearAll">Clear</button>
      </div>
    </div>

    <div class="le-body">
      <textarea
        v-model="content"
        class="le-input"
        spellcheck="false"
        placeholder="Write Markdown here…"
      ></textarea>
      <div class="le-preview" v-html="previewHtml"></div>
    </div>
  </div>
</template>

<style scoped>
.live-editor {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  margin: 1.8rem 0;
}
.le-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: color-mix(in srgb, var(--vp-c-bg) 80%, transparent);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--vp-c-divider);
  flex-wrap: wrap;
  gap: 8px;
}
.le-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.92rem;
}
.le-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.18);
  transition: background 0.3s, box-shadow 0.3s;
}
.le-dot.idle { background: #f59e0b; box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.18); }
.le-status {
  color: var(--vp-c-text-2);
  font-size: 0.78rem;
  font-variant-numeric: tabular-nums;
}
.le-actions {
  display: flex;
  gap: 8px;
}
.le-btn {
  cursor: pointer;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  padding: 6px 14px;
  border-radius: 9px;
  font-size: 0.82rem;
  font-weight: 500;
  transition: all 0.15s;
}
.le-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.le-btn.ghost {
  background: transparent;
}
.le-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 60vh;
}
@media (max-width: 720px) {
  .le-body { grid-template-columns: 1fr; }
}
.le-input {
  border: none;
  resize: none;
  padding: 18px;
  font-family: var(--vp-font-family-mono, ui-monospace, monospace);
  font-size: 0.85rem;
  line-height: 1.65;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  outline: none;
}
.le-input::placeholder { color: var(--vp-c-text-3, #999); }
.le-preview {
  padding: 18px 22px;
  border-left: 1px solid var(--vp-c-divider);
  overflow: auto;
  background: var(--vp-c-bg-soft);
}
.le-preview :deep(h1) { font-size: 1.7rem; margin: 0 0 0.6rem; font-weight: 800; letter-spacing: -0.02em; color: var(--vp-c-text-1); }
.le-preview :deep(h2) { font-size: 1.3rem; margin: 1.3rem 0 0.5rem; border-bottom: 1px solid var(--vp-c-divider); padding-bottom: 6px; font-weight: 700; }
.le-preview :deep(h3) { font-size: 1.1rem; margin: 1rem 0 0.4rem; font-weight: 700; }
.le-preview :deep(p) { margin: 0.5rem 0; line-height: 1.75; }
.le-preview :deep(ul), .le-preview :deep(ol) { padding-left: 1.4rem; margin: 0.5rem 0; }
.le-preview :deep(li) { margin: 0.2rem 0; }
.le-preview :deep(blockquote) {
  margin: 0.7rem 0;
  padding: 0.5rem 1rem;
  border-left: 3px solid var(--vp-c-brand-2);
  color: var(--vp-c-text-2);
  background: var(--vp-c-brand-softest, rgba(124,58,237,0.06));
  border-radius: 0 10px 10px 0;
}
.le-preview :deep(code) {
  background: var(--vp-c-brand-softest, rgba(124,58,237,0.06));
  color: var(--vp-c-brand-1);
  padding: 2px 6px;
  border-radius: 5px;
  font-size: 0.85em;
  font-family: var(--vp-font-family-mono, monospace);
}
.le-preview :deep(.code-block) {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 14px 16px;
  overflow: auto;
  margin: 0.8rem 0;
}
.le-preview :deep(.code-block code) { background: none; padding: 0; color: var(--vp-c-text-1); }
</style>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const key = computed(() => 'devnotes:hl:' + (route.path || '').replace(/\/$/, ''))

const highlights = ref([])
const note = ref('')
const panelOpen = ref(false)

function load() {
  try { highlights.value = JSON.parse(localStorage.getItem(key.value) || '[]') } catch { highlights.value = [] }
}

function save() {
  localStorage.setItem(key.value, JSON.stringify(highlights.value))
}

let pendingText = ''
function onMouseUp() {
  const sel = window.getSelection()
  pendingText = sel && sel.toString().trim()
  if (!pendingText) { note.value = ''; return }
  // don't autofocus aggressively; keep note field ready
}

function addHighlight() {
  if (!pendingText) return
  highlights.value.unshift({ text: pendingText, note: note.value.trim(), ts: Date.now() })
  save()
  note.value = ''
  pendingText = ''
  window.getSelection()?.removeAllRanges()
  panelOpen.value = true
}

function removeAt(i) {
  highlights.value.splice(i, 1)
  save()
}

function clearAll() {
  highlights.value = []
  save()
}

function scrollToText(h) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  let n
  while ((n = walker.nextNode())) {
    if (n.nodeValue && n.nodeValue.includes(h.text.slice(0, 40))) {
      n.parentElement?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      break
    }
  }
}

onMounted(() => {
  load()
  document.addEventListener('mouseup', onMouseUp)
})
onBeforeUnmount(() => document.removeEventListener('mouseup', onMouseUp))
</script>

<template>
  <div class="hl" v-if="highlights.length || true">
    <button class="toggle" @click="panelOpen = !panelOpen" :title="'Highlights for this page'">
      🖍️ {{ highlights.length }}
    </button>
    <div v-if="panelOpen" class="panel">
      <div class="phead">
        <strong>Highlights</strong>
        <span class="acts">
          <button v-if="highlights.length" @click="clearAll" class="clr">Clear</button>
          <button @click="panelOpen = false">×</button>
        </span>
      </div>
      <div v-if="!highlights.length" class="empty">
        Select any text on this page, then click <em>Add highlight</em> to save it with a note. Saved in your browser only.
      </div>
      <ul v-else>
        <li v-for="(h, i) in highlights" :key="h.ts">
          <div class="htxt" @click="scrollToText(h)">{{ h.text.slice(0, 140) }}{{ h.text.length > 140 ? '…' : '' }}</div>
          <div v-if="h.note" class="hnote">{{ h.note }}</div>
          <button class="rm" @click="removeAt(i)">remove</button>
        </li>
      </ul>
      <div v-if="pendingText || highlights.length" class="add">
        <textarea v-model="note" placeholder="Add a note (optional)…" rows="2"></textarea>
        <button class="addbtn" :disabled="!pendingText" @click="addHighlight">
          + Add highlight{{ pendingText ? '' : ' (select text first)' }}
        </button>
        <div v-if="pendingText" class="sel">“{{ pendingText.slice(0, 60) }}…”</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hl { margin: 12px 0; }
.toggle {
  cursor: pointer; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1); border-radius: 999px; padding: 4px 12px; font-weight: 600; font-size: 0.8rem;
}
.panel {
  margin-top: 8px; border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg-soft);
  padding: 12px; position: relative;
}
.phead { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.acts button { cursor: pointer; border: none; background: transparent; color: var(--vp-c-text-2); font-size: 1rem; padding: 0 4px; }
.acts .clr { font-size: 0.74rem; color: #b45309; }
.empty { color: var(--vp-c-text-2); font-size: 0.85rem; }
ul { list-style: none; margin: 0; padding: 0; max-height: 320px; overflow: auto; }
li { padding: 8px 0; border-bottom: 1px solid var(--vp-c-divider); }
.htxt { cursor: pointer; font-size: 0.85rem; line-height: 1.5; color: var(--vp-c-text-1); }
.htxt:hover { color: var(--vp-c-brand-1); }
.hnote { margin-top: 4px; font-size: 0.8rem; color: var(--vp-c-text-2); background: var(--vp-c-bg); border-left: 3px solid var(--vp-c-brand-1); padding: 4px 8px; border-radius: 4px; }
.rm { margin-top: 4px; cursor: pointer; border: none; background: transparent; color: #ef4444; font-size: 0.72rem; font-weight: 600; padding: 0; }
.add { margin-top: 10px; }
.add textarea { width: 100%; resize: vertical; border: 1px solid var(--vp-c-divider); border-radius: 8px; padding: 6px 8px; font-family: inherit; font-size: 0.82rem; background: var(--vp-c-bg); color: var(--vp-c-text-1); }
.addbtn { margin-top: 6px; cursor: pointer; border: none; border-radius: 8px; padding: 6px 12px; font-weight: 600; background: #4f46e5; color: #fff; }
.addbtn:disabled { opacity: .6; cursor: default; }
.sel { margin-top: 6px; font-size: 0.74rem; color: var(--vp-c-text-2); font-style: italic; }
</style>

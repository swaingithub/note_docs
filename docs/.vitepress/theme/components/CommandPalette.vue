<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { useData, useRouter, withBase } from 'vitepress'

const { theme, page } = useData()
const router = useRouter()

const open = ref(false)
const query = ref('')
const active = ref(0)
const inputEl = ref<HTMLInputElement | null>(null)
const listEl = ref<HTMLElement | null>(null)

interface Item {
  text: string
  link: string
  group: string
}

// Flatten the sidebar nav into a searchable list.
function collect(): Item[] {
  const out: Item[] = []
  const sidebars = (theme.value.sidebar || {}) as Record<string, any>
  const pushGroup = (node: any, group: string) => {
    if (!node) return
    if (Array.isArray(node)) {
      node.forEach((n) => pushGroup(n, group))
      return
    }
    if (node.text && node.link) {
      out.push({ text: node.text, link: node.link, group })
    }
    if (node.items) pushGroup(node.items, node.text || group)
  }
  Object.values(sidebars).forEach((s) => pushGroup(s, ''))
  // de-dupe by link
  const seen = new Set<string>()
  return out.filter((i) => {
    if (seen.has(i.link)) return false
    seen.add(i.link)
    return true
  })
}

const items = ref<Item[]>([])

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return items.value.slice(0, 12)
  return items.value
    .filter(
      (i) =>
        i.text.toLowerCase().includes(q) ||
        i.group.toLowerCase().includes(q) ||
        i.link.toLowerCase().includes(q)
    )
    .slice(0, 20)
})

function show() {
  open.value = true
  query.value = ''
  active.value = 0
  nextTick(() => inputEl.value?.focus())
}
function hide() {
  open.value = false
}
function go(item: Item) {
  hide()
  router.go(withBase(item.link))
}
function onKey(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    open.value ? hide() : show()
    return
  }
  if (!open.value) return
  if (e.key === 'Escape') hide()
  else if (e.key === 'ArrowDown') {
    e.preventDefault()
    active.value = Math.min(active.value + 1, filtered.value.length - 1)
    scrollActive()
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    active.value = Math.max(active.value - 1, 0)
    scrollActive()
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const it = filtered.value[active.value]
    if (it) go(it)
  }
}
function scrollActive() {
  nextTick(() => {
    const el = listEl.value?.querySelector('.cp-item.active')
    el?.scrollIntoView({ block: 'nearest' })
  })
}

watch(filtered, () => (active.value = 0))

onMounted(() => {
  items.value = collect()
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div v-if="open" class="cp-overlay" @click.self="hide">
    <div class="cp-modal" role="dialog" aria-label="Search">
      <div class="cp-input-row">
        <span class="cp-icon">⌕</span>
        <input
          ref="inputEl"
          v-model="query"
          class="cp-input"
          placeholder="Search courses, lessons, languages…"
          @input="active = 0"
        />
        <kbd class="cp-kbd">Esc</kbd>
      </div>
      <ul ref="listEl" class="cp-list">
        <li
          v-for="(it, i) in filtered"
          :key="it.link"
          :class="['cp-item', { active: i === active }]"
          @mouseenter="active = i"
          @click="go(it)"
        >
          <span class="cp-text">{{ it.text }}</span>
          <span class="cp-group">{{ it.group }}</span>
        </li>
        <li v-if="filtered.length === 0" class="cp-empty">No matches</li>
      </ul>
      <div class="cp-foot">
        <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
        <span><kbd>↵</kbd> open</span>
        <span><kbd>esc</kbd> close</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cp-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(2px);
  z-index: 1000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 12vh;
}
.cp-modal {
  width: min(620px, 92vw);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  box-shadow: 0 24px 60px -20px rgba(0, 0, 0, 0.4);
  overflow: hidden;
}
.cp-input-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.cp-icon {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
}
.cp-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}
.cp-kbd,
.cp-foot kbd {
  font-size: 0.7rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 5px;
  padding: 1px 6px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
}
.cp-list {
  list-style: none;
  margin: 0;
  padding: 6px;
  max-height: 52vh;
  overflow: auto;
}
.cp-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 9px;
  cursor: pointer;
}
.cp-item.active {
  background: var(--vp-c-brand-softest);
}
.cp-text {
  font-size: 0.92rem;
  color: var(--vp-c-text-1);
}
.cp-group {
  font-size: 0.72rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  padding: 2px 8px;
  border-radius: 999px;
}
.cp-empty {
  padding: 16px;
  text-align: center;
  color: var(--vp-c-text-2);
}
.cp-foot {
  display: flex;
  gap: 16px;
  padding: 10px 16px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.74rem;
  color: var(--vp-c-text-2);
}
.cp-foot kbd {
  margin-right: 2px;
}
</style>

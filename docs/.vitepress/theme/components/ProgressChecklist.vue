<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useData } from 'vitepress'

const props = defineProps<{ items: string[]; storageKey?: string }>()

const { page } = useData()
const key = computed(() =>
  'devnotes:progress:' + (props.storageKey || (page.value.relativePath || 'page'))
)

interface Store {
  done: Record<number, boolean>
  completedAt?: number
}

const store = ref<Store>({ done: {} })

function load() {
  try {
    const raw = localStorage.getItem(key.value)
    const parsed = raw ? JSON.parse(raw) : null
    if (parsed && typeof parsed === 'object' && 'done' in parsed) {
      store.value = parsed as Store
    } else if (parsed && typeof parsed === 'object') {
      // migrate legacy flat map
      store.value = { done: parsed as Record<number, boolean> }
    } else {
      store.value = { done: {} }
    }
  } catch {
    store.value = { done: {} }
  }
}

function persist() {
  const allDone = props.items.every((_, i) => store.value.done[i])
  if (allDone && Object.keys(store.value.done).length > 0) {
    store.value.completedAt = Date.now()
  } else {
    delete store.value.completedAt
  }
  localStorage.setItem(key.value, JSON.stringify(store.value))
}

function toggle(i: number) {
  store.value.done[i] = !store.value.done[i]
  persist()
}

function reset() {
  store.value = { done: {} }
  persist()
}

onMounted(load)

const done = computed(() => store.value.done)

const checked = computed(() =>
  props.items.filter((_, i) => store.value.done[i]).length
)
const total = computed(() => props.items.length)
const pct = computed(() =>
  total.value === 0 ? 0 : Math.round((checked.value / total.value) * 100)
)
const completedAt = computed(() => store.value.completedAt)

function fmtDate(ts?: number) {
  if (!ts) return ''
  return new Date(ts).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

watch(
  () => page.value.relativePath,
  () => load()
)
</script>

<template>
  <div class="progress-checklist">
    <div class="pc-head">
      <span class="pc-label">Progress</span>
      <span class="pc-count">{{ checked }}/{{ total }} · {{ pct }}%</span>
      <button class="pc-reset" @click="reset">Reset</button>
    </div>
    <div v-if="completedAt" class="pc-done-date">✓ Completed on {{ fmtDate(completedAt) }}</div>
    <div class="pc-bar">
      <div class="pc-fill" :style="{ width: pct + '%' }"></div>
    </div>
    <ul class="pc-list">
      <li
        v-for="(item, i) in items"
        :key="i"
        :class="{ done: done[i] }"
        @click="toggle(i)"
      >
        <span class="pc-box">{{ done[i] ? '✓' : '' }}</span>
        <span class="pc-text">{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.progress-checklist {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 14px 16px;
  margin: 1.4rem 0;
}
.pc-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.pc-label {
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
}
.pc-count {
  margin-left: auto;
  font-size: 0.82rem;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-2);
}
.pc-reset {
  cursor: pointer;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 0.78rem;
  padding: 3px 10px;
  border-radius: 7px;
}
.pc-reset:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.pc-done-date {
  margin-top: 8px;
  font-size: 0.8rem;
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
.pc-bar {
  height: 8px;
  border-radius: 6px;
  background: var(--vp-c-divider);
  overflow: hidden;
}
.pc-fill {
  height: 100%;
  background: var(--vp-c-brand-1);
  transition: width 0.3s ease;
}
.pc-list {
  list-style: none;
  margin: 12px 0 0;
  padding: 0;
  display: grid;
  gap: 6px;
}
.pc-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 10px;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  transition: background 0.15s;
}
.pc-list li:hover {
  background: var(--vp-c-brand-softest);
}
.pc-box {
  flex: 0 0 auto;
  width: 20px;
  height: 20px;
  border: 1.5px solid var(--vp-c-divider);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: #fff;
  background: var(--vp-c-bg);
  transition: all 0.15s;
}
.pc-list li.done .pc-box {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}
.pc-text {
  font-size: 0.92rem;
  color: var(--vp-c-text-1);
}
.pc-list li.done .pc-text {
  color: var(--vp-c-text-2);
  text-decoration: line-through;
}
</style>

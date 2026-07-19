<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useData } from 'vitepress'

const route = useRoute()
const { title } = useData()

const KEY = 'devnotes:bookmarks'
const bookmarks = ref<{ title: string; link: string }[]>([])
const isOn = computed(() => bookmarks.value.some((b) => b.link === route.path))

function load() {
  try {
    bookmarks.value = JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    bookmarks.value = []
  }
}
function toggle() {
  const list = bookmarks.value
  const i = list.findIndex((b) => b.link === route.path)
  if (i >= 0) list.splice(i, 1)
  else list.push({ title: (title.value as string) || route.path, link: route.path })
  localStorage.setItem(KEY, JSON.stringify(list))
}
function remove(link: string) {
  bookmarks.value = bookmarks.value.filter((b) => b.link !== link)
  localStorage.setItem(KEY, JSON.stringify(bookmarks.value))
}
function printPdf() {
  window.print()
}

onMounted(load)
</script>

<template>
  <div class="bm">
    <button class="bm-btn" :class="{ on: isOn }" @click="toggle" :title="isOn ? 'Remove bookmark' : 'Bookmark this page'">
      {{ isOn ? '★ Bookmarked' : '☆ Bookmark' }}
    </button>
    <button class="bm-btn" @click="printPdf" title="Export / Print to PDF">⎙ PDF</button>

    <details class="bm-list" v-if="bookmarks.length">
      <summary>🔖 Bookmarks ({{ bookmarks.length }})</summary>
      <ul>
        <li v-for="b in bookmarks" :key="b.link">
          <a :href="b.link">{{ b.title }}</a>
          <span class="bm-x" @click="remove(b.link)">✕</span>
        </li>
      </ul>
    </details>
  </div>
</template>

<style scoped>
.bm {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin: 0.5rem 0 1.2rem;
}
.bm-btn {
  cursor: pointer;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.8rem;
  padding: 5px 12px;
  border-radius: 8px;
  transition: all 0.15s;
}
.bm-btn:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
.bm-btn.on { background: var(--vp-c-brand-1); color: #fff; border-color: var(--vp-c-brand-1); }
.bm-list {
  width: 100%;
  margin-top: 6px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  padding: 8px 12px;
}
.bm-list summary { cursor: pointer; font-size: 0.82rem; font-weight: 600; }
.bm-list ul { list-style: none; margin: 8px 0 0; padding: 0; }
.bm-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 4px 0;
  border-top: 1px dashed var(--vp-c-divider);
}
.bm-list a { color: var(--vp-c-brand-1); text-decoration: none; font-size: 0.85rem; }
.bm-list a:hover { text-decoration: underline; }
.bm-x { cursor: pointer; color: var(--vp-c-text-2); font-size: 0.8rem; }
.bm-x:hover { color: #f43f5e; }

@media print {
  .bm { display: none; }
}
</style>

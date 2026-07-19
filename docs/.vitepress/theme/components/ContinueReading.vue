<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useData } from 'vitepress'

const { title } = useData()
const KEY = 'devnotes:recent'
const recent = ref<{ title: string; link: string }[]>([])

function load() {
  try {
    recent.value = JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    recent.value = []
  }
}
function record() {
  const path = location.pathname
  if (path === '/' || path.endsWith('/tags') || path.endsWith('/editor') || path.endsWith('/progress')) return
  const list = recent.value.filter((r) => r.link !== path)
  list.unshift({ title: (title.value as string) || path, link: path })
  recent.value = list.slice(0, 6)
  localStorage.setItem(KEY, JSON.stringify(recent.value))
}

onMounted(() => {
  load()
  record()
})

const items = computed(() => recent.value)
</script>

<template>
  <div class="cr" v-if="items.length">
    <h2 class="cr-h">↪ Continue reading</h2>
    <ul class="cr-list">
      <li v-for="r in items" :key="r.link">
        <a :href="r.link">{{ r.title }}</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.cr {
  margin: 2rem 0 1rem;
  padding: 1.1rem 1.4rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}
.cr-h { font-size: 1.05rem; margin: 0 0 0.6rem; font-weight: 700; }
.cr-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 4px; }
.cr-list li { padding: 5px 0; border-bottom: 1px dashed var(--vp-c-divider); }
.cr-list a { color: var(--vp-c-brand-1); text-decoration: none; font-weight: 500; }
.cr-list a:hover { text-decoration: underline; }
</style>

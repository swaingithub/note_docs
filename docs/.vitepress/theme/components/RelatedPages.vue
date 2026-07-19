<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import { TAGS, tagsForPath } from '../tags'

const { page } = useData()
const route = useRoute()

const current = computed(() => route.path)
const myTags = computed(() => tagsForPath(current.value))

const related = computed(() => {
  const seen = new Set<string>([current.value, '/', '/progress', '/editor', '/getting-started'])
  const out: { text: string; link: string; tag: string }[] = []
  for (const tag of myTags.value) {
    for (const e of TAGS[tag] || []) {
      if (seen.has(e.link)) continue
      seen.add(e.link)
      out.push({ ...e, tag })
    }
  }
  return out.slice(0, 8)
})
</script>

<template>
  <div class="related" v-if="related.length">
    <h2 class="rel-h">Related pages</h2>
    <div class="rel-tags">
      <span v-for="t in myTags" :key="t" class="rel-tagchip">{{ t }}</span>
    </div>
    <ul class="rel-list">
      <li v-for="r in related" :key="r.link">
        <a :href="r.link">{{ r.text }}</a>
        <span class="rel-via">via {{ r.tag }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.related {
  margin: 2.4rem 0 1rem;
  padding: 1.2rem 1.4rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}
.rel-h {
  font-size: 1.05rem;
  margin: 0 0 0.6rem;
  font-weight: 700;
}
.rel-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 0.8rem;
}
.rel-tagchip {
  font-size: 0.72rem;
  background: var(--vp-c-brand-softest);
  color: var(--vp-c-brand-1);
  border: 1px solid var(--vp-c-brand-2);
  border-radius: 999px;
  padding: 2px 10px;
}
.rel-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 6px 18px;
}
.rel-list li {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 4px 0;
  border-bottom: 1px dashed var(--vp-c-divider);
}
.rel-list a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
}
.rel-list a:hover { text-decoration: underline; }
.rel-via {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { TAGS } from '../tags'

const allTags = Object.keys(TAGS).sort()
const active = ref<string | null>(null)

const entries = computed(() => {
  if (!active.value) return []
  return TAGS[active.value] || []
})
function toggle(t: string) {
  active.value = active.value === t ? null : t
}
const count = (t: string) => (TAGS[t] || []).length
</script>

<template>
  <div class="tf">
    <div class="tf-cloud">
      <button
        v-for="t in allTags"
        :key="t"
        class="tf-chip"
        :class="{ on: active === t }"
        @click="toggle(t)"
      >
        #{{ t }} <span class="tf-n">{{ count(t) }}</span>
      </button>
    </div>

    <div v-if="active" class="tf-results">
      <div class="tf-head">
        <span class="tf-title">#{{ active }}</span>
        <button class="tf-clear" @click="active = null">clear</button>
      </div>
      <ul class="tf-list">
        <li v-for="e in entries" :key="e.link">
          <a :href="e.link">{{ e.text }}</a>
        </li>
      </ul>
    </div>
    <p v-else class="tf-hint">Pick a tag to see related pages. Tags are derived from each page's topic.</p>
  </div>
</template>

<style scoped>
.tf { margin: 1.5rem 0; }
.tf-cloud { display: flex; flex-wrap: wrap; gap: 8px; }
.tf-chip {
  cursor: pointer;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.82rem;
  padding: 6px 12px;
  border-radius: 999px;
  transition: all 0.15s;
}
.tf-chip:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
.tf-chip.on { background: var(--vp-c-brand-1); color: #fff; border-color: var(--vp-c-brand-1); }
.tf-n {
  font-size: 0.7rem;
  opacity: 0.7;
  margin-left: 4px;
}
.tf-results { margin-top: 1.4rem; }
.tf-head { display: flex; align-items: baseline; gap: 10px; margin-bottom: 8px; }
.tf-title { font-weight: 800; font-size: 1.1rem; color: var(--vp-c-brand-1); }
.tf-clear { cursor: pointer; border: none; background: none; color: var(--vp-c-text-2); font-size: 0.8rem; }
.tf-clear:hover { color: var(--vp-c-brand-1); }
.tf-list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 6px 18px; }
.tf-list li { padding: 6px 0; border-bottom: 1px dashed var(--vp-c-divider); }
.tf-list a { color: var(--vp-c-brand-1); text-decoration: none; font-weight: 500; }
.tf-list a:hover { text-decoration: underline; }
.tf-hint { color: var(--vp-c-text-2); font-size: 0.86rem; margin-top: 1rem; }
</style>

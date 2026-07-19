<script setup lang="ts">
// ResourceTable: renders a platform x type resource table for a topic.
// props.resources: array of { label, platform, type, url, note? }
// type values: Docs | Tutorial | Video | Practice | Book
const props = defineProps<{
  resources?: { label: string; platform: string; type: string; url: string; note?: string }[]
  title?: string
}>()

const typeOrder = ['Docs', 'Tutorial', 'Video', 'Practice', 'Book']
const typeIcon: Record<string, string> = {
  Docs: '📘',
  Tutorial: '📝',
  Video: '🎬',
  Practice: '🧪',
  Book: '📚',
}
const platformColor: Record<string, string> = {
  W3Schools: '#04aa6d',
  MDN: '#000000',
  GeeksforGeeks: '#2f8d46',
  Programiz: '#d6336c',
  freeCodeCamp: '#0a0a23',
  JavaScriptInfo: '#2563eb',
  YouTube: '#ff0000',
  Official: '#4f46e5',
}

function rows() {
  const map = new Map<string, any[]>()
  for (const r of props.resources || []) {
    if (!map.has(r.platform)) map.set(r.platform, [])
    map.get(r.platform)!.push(r)
  }
  return Array.from(map.entries()).map(([platform, items]) => ({ platform, items }))
}
const data = rows()
</script>

<template>
  <div class="rt">
    <div class="rt-head" v-if="title">
      <span class="rt-title">{{ title }}</span>
      <span class="rt-sub">Curated across platforms &amp; formats</span>
    </div>
    <table class="rt-table">
      <thead>
        <tr>
          <th class="rt-plat">Platform</th>
          <th class="rt-type">Type</th>
          <th>Resource</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in data" :key="row.platform">
          <td class="rt-plat">
            <span
              class="rt-badge"
              :style="{ background: platformColor[row.platform] || '#4f46e5' }"
              >{{ row.platform }}</span
            >
          </td>
          <td class="rt-type">
            <span
              v-for="it in row.items"
              :key="it.url"
              class="rt-typechip"
              :title="it.type"
              >{{ typeIcon[it.type] || '🔗' }} {{ it.type }}</span
            >
          </td>
          <td>
            <a
              v-for="it in row.items"
              :key="it.url"
              class="rt-link"
              :href="it.url"
              target="_blank"
              rel="noopener"
              >{{ it.label }}<span v-if="it.note" class="rt-note"> — {{ it.note }}</span></a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.rt {
  margin: 1.4rem 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}
.rt-head {
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
}
.rt-title {
  font-weight: 700;
  font-size: 0.95rem;
}
.rt-sub {
  font-size: 0.76rem;
  color: var(--vp-c-text-2);
}
.rt-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
}
.rt-table th,
.rt-table td {
  text-align: left;
  padding: 10px 14px;
  border-bottom: 1px solid var(--vp-c-divider);
  vertical-align: top;
}
.rt-table tr:last-child td {
  border-bottom: none;
}
.rt-plat {
  width: 150px;
}
.rt-badge {
  display: inline-block;
  color: #fff;
  font-size: 0.74rem;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 999px;
}
.rt-type {
  width: 170px;
}
.rt-typechip {
  display: inline-block;
  font-size: 0.72rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 2px 8px;
  margin: 0 6px 4px 0;
}
.rt-link {
  display: block;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
  padding: 2px 0;
}
.rt-link:hover {
  text-decoration: underline;
}
.rt-note {
  color: var(--vp-c-text-2);
  font-weight: 400;
}
</style>

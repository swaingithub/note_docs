<script setup lang="ts">
// ExampleBox: a W3Schools-style "example" card with optional title.
defineProps<{ title?: string; lang?: string }>()
</script>

<template>
  <div class="exb">
    <div class="exb-bar" v-if="title">
      <span class="exb-dot"></span>
      <span class="exb-title">{{ title }}</span>
      <span class="exb-tag" v-if="lang">{{ lang }}</span>
    </div>
    <div class="exb-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.exb {
  margin: 1.2rem 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}
.exb-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: var(--vp-c-brand-softest);
  border-bottom: 1px solid var(--vp-c-divider);
}
.exb-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
}
.exb-title {
  font-weight: 700;
  font-size: 0.82rem;
  color: var(--vp-c-brand-1);
}
.exb-tag {
  margin-left: auto;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 1px 8px;
}
.exb-body {
  padding: 0;
}
.exb-body :deep(pre) {
  margin: 0;
  border-radius: 0;
}
.exb-body :deep(.vp-code) {
  border-radius: 0;
}
</style>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import CommandPalette from './components/CommandPalette.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import ReadingMeta from './components/ReadingMeta.vue'
import RelatedPages from './components/RelatedPages.vue'
import Bookmarks from './components/Bookmarks.vue'
import SendToEditor from './components/SendToEditor.vue'
import Highlighter from './components/Highlighter.vue'

const { frontmatter, page } = useData()
const showMeta = () => frontmatter.value.layout !== 'home' && !frontmatter.value.layout?.includes('home')
</script>

<template>
  <DefaultTheme.Layout>
    <template #doc-before>
      <ClientOnly>
        <Bookmarks v-if="page && frontmatter.layout !== 'home'" />
        <SendToEditor v-if="page && frontmatter.layout !== 'home'" />
        <ReadingMeta v-if="page && frontmatter.layout !== 'home'" />
      </ClientOnly>
    </template>
    <template #doc-bottom>
      <ClientOnly>
        <RelatedPages v-if="frontmatter.layout !== 'home'" />
        <Highlighter v-if="frontmatter.layout !== 'home'" />
      </ClientOnly>
    </template>
    <template #layout-bottom>
      <ClientOnly>
        <CommandPalette />
        <ThemeToggle />
      </ClientOnly>
    </template>
  </DefaultTheme.Layout>
</template>

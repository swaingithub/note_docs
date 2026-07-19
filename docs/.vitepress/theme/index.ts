import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import LiveEditor from './components/LiveEditor.vue'
import ProgressChecklist from './components/ProgressChecklist.vue'
import GlobalProgress from './components/GlobalProgress.vue'
import CommandPalette from './components/CommandPalette.vue'
import ReadingMeta from './components/ReadingMeta.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import Playground from './components/Playground.vue'
import ResourceTable from './components/ResourceTable.vue'
import ExampleBox from './components/ExampleBox.vue'
import TryIt from './components/TryIt.vue'
import ExerciseBox from './components/ExerciseBox.vue'
import RelatedPages from './components/RelatedPages.vue'
import Bookmarks from './components/Bookmarks.vue'
import SendToEditor from './components/SendToEditor.vue'
import Quiz from './components/Quiz.vue'
import AIExplain from './components/AIExplain.vue'
import TagFilter from './components/TagFilter.vue'
import ContinueReading from './components/ContinueReading.vue'
import AssemblyPlayground from './components/AssemblyPlayground.vue'
import LangPlayground from './components/LangPlayground.vue'
import MyLayout from './MyLayout.vue'
import './style.css'

function registerSW() {
  if (typeof window === 'undefined') return
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    })
  }
}

export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app }) {
    registerSW()
    app.component('LiveEditor', LiveEditor)
    app.component('ProgressChecklist', ProgressChecklist)
    app.component('GlobalProgress', GlobalProgress)
    app.component('CommandPalette', CommandPalette)
    app.component('ReadingMeta', ReadingMeta)
    app.component('ThemeToggle', ThemeToggle)
    app.component('Playground', Playground)
    app.component('ResourceTable', ResourceTable)
    app.component('ExampleBox', ExampleBox)
    app.component('TryIt', TryIt)
    app.component('ExerciseBox', ExerciseBox)
    app.component('RelatedPages', RelatedPages)
    app.component('Bookmarks', Bookmarks)
    app.component('SendToEditor', SendToEditor)
    app.component('Quiz', Quiz)
    app.component('AIExplain', AIExplain)
    app.component('TagFilter', TagFilter)
    app.component('ContinueReading', ContinueReading)
    app.component('AssemblyPlayground', AssemblyPlayground)
    app.component('LangPlayground', LangPlayground)
  },
} satisfies Theme

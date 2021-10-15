<script lang="ts" setup>
import { watchEffect } from 'vue'
import { RouterLink } from 'vue-router'
const props = defineProps<{ title?: string; description?: string }>()

watchEffect(() => {
  if (props.title) {
    document.title = `${props.title} — TheseMetrics`
  } else {
    document.title = `TheseMetrics`
  }

  const description = document.head.querySelector('meta[name="description"]')!
  if (description) {
    description.setAttribute(
      'content',
      props.description || `Simpler metrics for your website.`,
    )
  }
})
</script>

<template>
  <div class="bg-white w-full min-h-screen py-4">
    <div class="max-w-5xl mx-auto px-4">
      <header class="flex flex-row">
        <div class="flex-1">
          <slot name="header-prefix"></slot>
        </div>
        <div class="flex-1 text-center">
          <img
            src="../assets/logo.svg"
            alt="TheseMetrics"
            class="inline-block h-6 w-6"
          />
        </div>
        <div class="flex-1">
          <slot name="header-suffix"></slot>
        </div>
      </header>

      <slot></slot>

      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

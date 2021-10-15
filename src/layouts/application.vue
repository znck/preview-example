<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<template>
  <main class="mx-auto my-4 p-4 bg-white max-w-6xl">
    <slot />
  </main>
  <footer></footer>
</template>

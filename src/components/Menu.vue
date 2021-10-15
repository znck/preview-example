<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<template>
  <menu class="bg-white rounded w-64 m-0 px-0 py-2">
    <section>
      <ul>
        <li @click="$emit('close')">
          <RouterLink
            :to="{ name: 'login' }"
            class="block px-6 py-2 hover:bg-gray-100 cursor-pointer"
            >Login</RouterLink
          >
        </li>
      </ul>
    </section>
  </menu>
</template>

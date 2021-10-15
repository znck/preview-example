<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    change: {
      type: String,
    },
  },
})
</script>

<template>
  <svg
    height="0.85em"
    viewBox="0 0 12 12"
    class="inline-block mb-1 transition-all duration-500 transform"
    :class="{
      'text-green-600 rotate-0': change === 'positive',
      'text-red-600 rotate-180': change === 'negative',
    }"
  >
    <path
      d="M0.855847 4.86367C0.597432 5.12594 0.600558 5.54804 0.862829 5.80645C1.1251 6.06487 1.5472 6.06174 1.80561 5.79947L5.33317 2.21927V11.3333C5.33317 11.7015 5.63165 12 5.99984 12C6.36803 12 6.6665 11.7015 6.6665 11.3333V2.2236L10.1898 5.79947C10.4482 6.06174 10.8703 6.06487 11.1326 5.80645C11.3949 5.54804 11.398 5.12594 11.1396 4.86367L6.59131 0.247542C6.2649 -0.0837343 5.73051 -0.0837349 5.4041 0.247542L0.855847 4.86367Z"
      class="fill-current"
    />
  </svg>
</template>

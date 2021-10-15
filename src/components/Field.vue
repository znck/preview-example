<script lang="ts">
import { defineComponent } from 'vue'

let id = 0
export default defineComponent({
  props: {
    title: {
      type: String,
      // required: true,
      default: 'Need a title here',
    },
    shimmer: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return { id: `--x-field-id-${++id}` }
  },
})
</script>

<template>
  <div
    class="border-2 border-gray-300 rounded-lg p-5 focus-within:border-gray-900 flex flex-col my-4"
  >
    <label class="block text-sm text-gray-700" :for="id">
      <span :class="{ 'u-placeholder-shimmer': shimmer }">{{ title }}</span>
      <slot name="subtitle" />
    </label>

    <slot v-bind="{ id }"> Need an element here. </slot>
  </div>
</template>

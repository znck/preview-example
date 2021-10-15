<script lang="ts">
import { defineComponent } from 'vue'
import Card from '../components/Card.vue'
import IconChange from '../components/IconChange.vue'
import Stepper from '../components/Stepper.vue'

export default defineComponent({
  components: { Layout: Card, IconChange, Stepper },
  props: {
    value: { type: Number, required: true },
    precision: { type: Number, default: 0 },
    unit: { type: String },
    change: { type: Number, required: true },
    maxValue: { type: Number, required: true },
    history: { type: Array as () => number[], required: true },
  },
})
</script>

<template>
  <Layout class="p-4" data-widget="card">
    <h2 class="text-sm text-gray-600 font-regular"><slot /></h2>

    <div class="flex flex-row flex-wrap items-center">
      <p class="flex-1 whitespace-no-wrap" style="min-width: 202px">
        <span class="text-4xl font-black">
          <Stepper :value="value" :precision="precision" />{{
            unit ? ' ' + unit : unit
          }}
        </span>
        <span
          class="ml-2"
          :aria-label="change + '%'"
          v-if="change"
          :title="`${Math.abs(change).toFixed(2)}% ${
            change < 0 ? 'less' : 'more'
          } than last week`"
        >
          <IconChange :change="change < 0 ? 'negative' : 'positive'" />
          <Stepper :value="Math.abs(change)" :precision="2" />%</span
        >
        <span v-else class="ml-2 text-gray-300" title="Same as last week"
          >—</span
        >
      </p>

      <svg
        class="flex-1 text-gray-100 -mb-4"
        viewBox="0 0 216 68"
        style="min-width: 202px"
      >
        <rect
          v-for="(item, index) in history"
          width="24"
          rx="4"
          :x="index * 32"
          :y="68 * (1 - item / maxValue) + 4"
          :height="(68 * item) / maxValue"
          class="fill-current"
        />
      </svg>
    </div>
  </Layout>
</template>

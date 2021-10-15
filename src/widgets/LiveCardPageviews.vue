<script lang="ts">
import { defineComponent, inject, computed, unref } from 'vue'
import Card from '../components/Card.vue'
import Stepper from '../components/Stepper.vue'
import IconChange from '../components/IconChange.vue'
import { useLiveStats } from '../functions/stats'
import { DASHBOARD_CONTEXT } from '../types'

export default defineComponent({
  components: { Card, IconChange, Stepper },
  setup() {
    const stats = useLiveStats(inject(DASHBOARD_CONTEXT)!)

    return {
      count: computed(() => unref(stats.data)?.active ?? 0),
      message: computed(() => unref(stats.data)?.messages[0] ?? ''),
    }
  },
})
</script>

<template>
  <Card class="p-4" data-widget="card">
    <h2 class="text-sm text-gray-600 font-regular flex items-center">
      <svg
        width="8"
        height="8"
        viewBox="0 0 8 8"
        class="text-primary-600 breathe inline-block mr-1"
      >
        <rect width="8" height="8" rx="4" class="fill-current" />
      </svg>

      <span title="Any visitor in last 5 minutes counts as active user."
        >Active Users</span
      >
    </h2>

    <p>
      <span class="text-4xl font-black"
        ><Stepper :value="count" immediate
      /></span>
    </p>
  </Card>
</template>

<style>
.breathe {
  animation: breathing 2.5s ease-out infinite normal;
  transform-origin: center;
}

@keyframes breathing {
  0% {
    transform: scale(0.8);
  }

  25% {
    transform: scale(1.25);
  }

  60% {
    transform: scale(1);
  }

  100% {
    transform: scale(1);
  }
}
</style>

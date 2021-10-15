<script lang="ts">
import { computed, defineComponent, inject } from 'vue'
import { useStats } from '../functions/stats'
import { DASHBOARD_CONTEXT } from '../types'
import Card from './Card.vue'

export default defineComponent({
  components: { Card },
  setup() {
    const stats = useStats(inject(DASHBOARD_CONTEXT)!)
    const duration = computed(() => {
      if (
        !stats.data ||
        !stats.data.engagement ||
        !stats.data.engagement.length
      )
        return { value: 0, unit: 'sec' }
      const duration =
        stats.data.engagement.reduce(
          (total, item) => total + item.duration,
          0,
        ) /
        stats.data.engagement.length /
        1000

      if (duration >= 3600) {
        return { value: duration / 3600, unit: 'hr' }
      } else if (duration >= 60) {
        return { value: duration / 60, unit: 'min' }
      } else {
        return { value: duration, unit: 'sec' }
      }
    })
    const sorted = computed(() => {
      if (!stats.data || !stats.data.engagement) return []
      return stats.data.engagement
        .slice()
        .map((item) => ({ date: new Date(item.date), count: item.duration }))
    })
    const last7Days = computed(() => {
      const values = sorted.value
        .slice(sorted.value.length - 7)
        .map((item) => item.count)

      while (values.length < 7) {
        values.unshift(0)
      }

      return { max: Math.max(1, ...values), values }
    })
    const change = computed(() => {
      const items = sorted.value
      if (items.length < 14) return 0

      const current = items
        .slice(items.length - 7)
        .reduce((total, item) => total + item.count, 0)
      const previous = items
        .slice(items.length - 14, items.length - 7)
        .reduce((total, item) => total + item.count, 0)
      const change = current - previous

      if (previous) return (change / previous) * 100
      return 100
    })

    return { change, duration, last7Days }
  },
})
</script>

<template>
  <Card
    :value="duration.value"
    :precision="1"
    :unit="duration.unit"
    :maxValue="last7Days.max"
    :change="change"
    :history="last7Days.values"
  >
    <span title="Engagement is calulated as average time spent on a page."
      >Engagement</span
    >
  </Card>
</template>

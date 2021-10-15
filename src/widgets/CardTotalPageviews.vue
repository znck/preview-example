<script lang="ts">
import { computed, defineComponent, inject, unref } from 'vue'
import Card from './Card.vue'
import { useStats, useLiveStats } from '../functions/stats'
import { DASHBOARD_CONTEXT } from '../types'

export default defineComponent({
  components: { Card },
  setup() {
    const state = inject(DASHBOARD_CONTEXT)!
    const stats = useStats(state)
    const liveStats = useLiveStats(state)
    const sorted = computed(() => {
      const items = (unref(stats.data)?.pageviews ?? []).map((item) => ({
        date: new Date(item.date),
        count: item.count,
      }))

      if (unref(liveStats.data) != null) {
        const { pageviews } = unref(liveStats.data)
        items.push({ date: new Date(pageviews.date), count: pageviews.count })
      }

      items.sort((a, b) => a.date.getTime() - b.date.getTime())

      return items
    })

    const count = computed(() => {
      return (
        (unref(stats.data)?.summary.count ?? 0) +
        (unref(liveStats.data)?.pageviews.count ?? 0)
      )
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

    return { change, count, last7Days }
  },
})
</script>

<template>
  <Card
    :value="count"
    :maxValue="last7Days.max"
    :change="change"
    :history="last7Days.values"
  >
    <span title="This excludes bots and search engines.">Pageviews</span>
  </Card>
</template>

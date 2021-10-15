<script lang="ts">
import { defineComponent, inject, shallowRef, watchEffect, unref } from 'vue'
import PageViewGraph from '../components/PageViewGraph.vue'
import { useLiveStats, useStats } from '../functions/stats'
import { DASHBOARD_CONTEXT } from '../types'
import { defineResponsiveComponent } from '../utilities'

const Resources = defineResponsiveComponent(
  () => import('../components/Resources.mobile.vue'),
  () => import('../components/Resources.vue'),
)

export default defineComponent({
  components: { Resources, PageViewGraph },
  setup() {
    const state = inject(DASHBOARD_CONTEXT)!
    const stats = useStats(state)
    const liveStats = useLiveStats(state)
    const pageviews = shallowRef<
      { date: Date; count: number; uniqueCount: number }[]
    >([])

    watchEffect(() => {
      const liveData = unref(liveStats.data) // registering as a dependency
      const data = unref(stats.data)
      if (data != null) {
        const items = data.pageviews?.slice() ?? []

        if (Array.isArray(liveData?.pageviews)) {
          items.push({ ...liveData.pageviews })
        }

        pageviews.value = items
      } else if (Array.isArray(liveData?.pageviews)) {
        pageviews.value = liveData.pageviews.slice()
      }
    })

    return { state, pageviews }
  },
})
</script>

<template>
  <PageViewGraph
    :from="state.from"
    :to="state.to"
    :data="pageviews"
    data-widget="chart"
  >
    <Resources v-model="state.path" />
  </PageViewGraph>
</template>

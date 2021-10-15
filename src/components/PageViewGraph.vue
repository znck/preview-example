<script lang="ts">
import Chart from 'apexcharts'
import { computed, defineComponent, markRaw, onMounted, ref, watch } from 'vue'

function getTimestamp(date: string | Date) {
  return new Date(date).getTime()
}

export default defineComponent({
  props: {
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
    data: {
      type: Array as () => Array<{
        date: string | Date
        count: number
        uniqueCount: number
      }>,
      required: true,
    },
  },

  setup(props) {
    const el = ref<HTMLDivElement | null>(null)
    let chart: Chart

    const series = computed(() => {
      const pageviews = props.data.map((item) => [
        getTimestamp(item.date),
        item.count,
      ])
      const visitors = props.data.map((item) => [
        getTimestamp(item.date),
        item.uniqueCount,
      ])

      // SORT ASCENDING
      pageviews.sort((a, b) => a[0] - b[0])
      visitors.sort((a, b) => a[0] - b[0])

      const k = pageviews.length

      if (k < 2) {
        pageviews.unshift([getTimestamp(props.from), 0])
        visitors.unshift([getTimestamp(props.from), 0])
      }

      if (k < 1) {
        pageviews.push([getTimestamp(props.to), 0])
        visitors.push([getTimestamp(props.to), 0])
      }

      return markRaw({ pageviews, visitors })
    })

    onMounted(() => {
      chart = new Chart(el.value!, {
        chart: {
          type: 'line',
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        stroke: {
          curve: 'smooth',
          width: 1,
        },
        series: [
          {
            name: 'Page Views',
            data: series.value.pageviews,
          },
          {
            name: 'Visitors',
            data: series.value.visitors,
          },
        ],
        xaxis: {
          type: 'datetime',
        },
        legend: {
          show: false,
        },
      })

      chart.render()
    })

    watch(
      () => series.value,
      ({ pageviews, visitors }) => {
        chart.updateSeries(
          [
            {
              name: 'Page Views',
              data: pageviews as any,
            },
            {
              name: 'Visitors',
              data: visitors as any,
            },
          ],
          true,
        )
      },
    )

    return { el }
  },
})
</script>

<template>
  <div
    class="bg-white rounded border border-gray-300 flex flex-col md:flex-row w-full"
    style="max-height: 548px"
  >
    <div class="md:border-r border-gray-300 md:sidebar-w flex-shrink-0">
      <slot />
    </div>
    <div class="h-full w-full flex flex-col justify-center overflow-hidden">
      <div
        ref="el"
        class="flex flex-col justify-center"
        style="height: min(62.5vw, 516px)"
      />
    </div>
  </div>
</template>

<style>
@screen md {
  .md\:sidebar-w {
    width: 236px;
  }
}
</style>

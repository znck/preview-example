import { computed, defineComponent, inject, ref, unref, watchEffect } from 'vue'
import { useLiveStats, useStats } from '../functions/stats'
import { DASHBOARD_CONTEXT } from '../types'

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: '*',
    },
  },

  setup(props, { emit }) {
    const resource = computed({
      get: () => props.modelValue,
      set: (value) => {
        emit('update:modelValue', value)
      },
    })
    const state = inject(DASHBOARD_CONTEXT)
    if (state == null) throw new Error('Missing dashboard context')
    const stats = useStats(state)
    const liveStats = useLiveStats(state)
    const isOpen = ref(false)
    const items = ref<any[]>([])

    function percentage(value: number): string {
      const num = ~~(value * 10000)

      return `${num / 100}%`
    }

    watchEffect(() => {
      const data = unref(stats.data)?.pages
      if (Array.isArray(data)) {
        items.value = data
      }
    })

    return {
      isOpen,
      percentage,
      isLoading: computed(() => stats.isValidating),
      items,
      error: computed(() => stats.error),
      total: computed(() => unref(stats.data)?.summary.count ?? 0),
      today: computed(() => unref(liveStats.data)?.pageviews.count ?? 0),
      resource,
    }
  },
})

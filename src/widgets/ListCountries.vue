<script lang="ts">
import { computed, defineComponent, inject, unref } from 'vue'
import ListBox from '../components/ListBox.vue'
import { useStats } from '../functions/stats'
import { DASHBOARD_CONTEXT } from '../types'
import { getCountryName, getFlag } from '../utilities'

export default defineComponent({
  components: { ListBox },
  setup() {
    const stats = useStats(inject(DASHBOARD_CONTEXT)!)

    return {
      isLoading: stats.isValidating,
      total: computed(() =>
        Math.max(
          1,
          unref(stats.data)?.pageviews.reduce(
            (total, item) => total + item.count,
            0,
          ),
        ),
      ),
      error: computed(() => stats.error),
      data: computed(
        () =>
          unref(stats.data)?.countries?.map((item) => ({
            title: getCountryName(item.key),
            iconText: getFlag(item.key),
            count: item.value,
          })) || [],
      ),
    }
  },
})
</script>

<template>
  <ListBox
    :isLoading="isLoading"
    :data="data"
    :error="error?.message"
    :total="total"
    data-widget="list"
  >
    <template #header>Traffic Origin</template>
  </ListBox>
</template>

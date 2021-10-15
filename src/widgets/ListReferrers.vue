<script lang="ts">
import { computed, defineComponent, inject, unref } from 'vue'
import ListBox from '../components/ListBox.vue'
import { useStats } from '../functions/stats'
import { DASHBOARD_CONTEXT } from '../types'

export default defineComponent({
  components: { ListBox },
  setup() {
    const stats = useStats(inject(DASHBOARD_CONTEXT)!)

    return {
      isLoading: stats.isValidating,
      total: computed(() =>
        Math.max(
          1,
          unref(stats.data)?.pageviews?.reduce(
            (total, item) => total + item.count,
            0,
          ) || 0,
        ),
      ),
      error: computed(() => stats.error),
      data: computed(
        () =>
          unref(stats.data)?.sources?.map((item) => ({
            title: item.key,
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
    <template #header>Traffic Sources</template>
    <template #itemTitle="{ title }">
      <a :href="'//' + title" target="_blank" rel="noopener" class="break-all"
        >{{ title.split('/', 2)[0]
        }}<span class="text-gray-400">{{
          title.indexOf('/') >= 0 ? title.substr(title.indexOf('/')) : ''
        }}</span></a
      >
    </template>
  </ListBox>
</template>

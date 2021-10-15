<script lang="ts">
import { computed, defineComponent, inject, unref } from 'vue'
import ListBox from '../components/ListBox.vue'
import { useStats } from '../functions/stats'
import { DASHBOARD_CONTEXT } from '../types'

const KNOWN_BROWSERS = new Set([
  'Chrome',
  'Chrome Mobile',
  'Chrome Mobile iOS',
  'Chrome Mobile WebView',
  'Chromium',
  'Facebook',
  'Firefox',
  'Firefox iOS',
  'Firefox Mobile',
  'HeadlessChrome',
  'IE',
  'Mobile Safari',
  'Mobile Safari UI/WKWebView',
  'Opera',
  'Safari',
  'Samsung Internet',
  'UC Browser',
])

function getIconFileName(browser: string) {
  const name = KNOWN_BROWSERS.has(browser)
    ? browser.toLowerCase().replace(/[^a-z]+/g, '-')
    : 'other'

  return {
    iconSet: `/assets/icons/${name}.png, /assets/icons/${name}@2x.png 2x, /assets/icons/${name}@3x.png 3x`,
    icon: `/assets/icons/${name}@3x.png`,
  }
}

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
          unref(stats.data)?.browsers?.map((item) => ({
            title: item.key,
            count: item.value,
            ...getIconFileName(item.key),
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
    <template #header> Browsers </template>
  </ListBox>
</template>

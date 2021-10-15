<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    isLoading: Boolean,
    data: Array as () => Array<{
      icon: string
      iconSet?: string
      iconText?: string
      title: string
      count: number
    }>,
    total: Number,
    error: String,
  },
  setup(props) {
    return {
      max: computed(() => Math.max(1, props.total)),
      percentage: (value) => {
        const num = ~~(value * 10000)

        return Number(num / 100) + '%'
      },
    }
  },
})
</script>

<template>
  <section
    class="bg-white border rounded border-gray-300 flex flex-col"
    style="min-height: 240px"
  >
    <header class="p-4 font-semibold border-b border-gray-300">
      <slot name="header" />
    </header>

    <div v-if="error" class="p-8 text-center text-red-600 uppercase text-xs">
      {{ error }}
    </div>
    <div
      v-else-if="!data || !data.length"
      class="p-8 text-center text-gray-600 uppercase text-xs flex-1 grid content-center"
    >
      No data
    </div>

    <ul v-else class="overflow-auto list-box-size">
      <li
        v-for="(item, index) in data"
        class="border-gray-300 py-2 px-4 flex flex-row items-center text-gray-900 text-sm border-b"
        :key="item.title"
      >
        <slot name="item" v-bind="item" :total="total">
          <div
            v-if="item.iconText"
            class="w-8 h-8 mr-2 text-3xl leading-4 flex flex-row items-center bg-gray-200 rounded-full p-1"
            role="presentation"
          >
            {{ item.iconText }}
          </div>
          <img
            v-else-if="item.icon || item.iconSet"
            class="w-8 h-8 mr-2"
            :src="item.icon"
            :srcset="item.iconSet"
            :alt="item.title"
            role="presentation"
          />
          <div
            class="flex-1 flex flex-col"
            :title="`${item.count} page views (${percentage(
              item.count / max,
            )})`"
          >
            <slot name="itemTitle" v-bind="item" :total="total">{{
              item.title
            }}</slot>
            <progress class="sr-only" :value="item.count" :max="max" />
            <div class="flex flex-row items-center" role="presentation">
              <div
                class="rounded-full mr-1"
                :class="{ 'bg-blue-500': !index, 'bg-blue-300': index }"
                :style="{
                  width: (item.count / max) * 100 + '%',
                  height: '6px',
                }"
              />
              <span class="text-xs text-gray-700">{{ item.count }}</span>
            </div>
          </div>
        </slot>
      </li>
    </ul>
  </section>
</template>

<style>
@media (min-width: 768px) {
  .list-box-size {
    max-height: max(480px, 60vh);
  }
}
</style>

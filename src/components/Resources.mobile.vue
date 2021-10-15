<script lang="ts">
import component from './Resources'

export default component
</script>

<template>
  <section class="h-full flex flex-col relative">
    <header class="py-2 border-b border-gray-300">
      <div
        class="px-4 py-1 cursor-pointer text-blue-700 flex flex-row items-center"
        tabindex="0"
        role="combobox"
        @click="isOpen = !isOpen"
      >
        <div class="flex-1 mr-1">
          <div>
            {{ resource === '*' ? 'Total — all pages' : resource }}
          </div>
          <div class="text-xs text-gray-600">
            {{ total }} views<span v-if="today">
              + {{ today }} new views today</span
            >
          </div>
        </div>

        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          :style="{
            transform: `rotate(${isOpen ? 180 : 0}deg)`,
          }"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.16069 6.49406C3.48613 6.16862 4.01376 6.16862 4.3392 6.49406L9.58328 11.7381L14.8274 6.49406C15.1528 6.16862 15.6804 6.16862 16.0059 6.49406C16.3313 6.8195 16.3313 7.34714 16.0059 7.67257L10.1725 13.5059C9.8471 13.8313 9.31946 13.8313 8.99402 13.5059L3.16069 7.67257C2.83525 7.34714 2.83525 6.8195 3.16069 6.49406Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </header>

    <ul
      @click="isOpen = false"
      v-show="isOpen"
      class="py-2 flex-1 overflow-y-auto overflow-x-hidden absolute bg-white rounded-b border border-gray-300 z-50 -mt-px"
      style="top: 100%; max-height: 71.51vw; left: -1px; right: -1px"
    >
      <li>
        <label
          class="px-4 block py-1 cursor-pointer border-l-2"
          :class="{
            'border-blue-500 bg-blue-100 text-blue-700': resource === '*',
            'border-transparent': resource !== '*',
          }"
        >
          <input type="radio" value="*" v-model="resource" class="sr-only" />
          <div>Total — all pages</div>
          <div class="text-xs text-gray-600">{{ total }} views</div>
        </label>
      </li>
      <li
        v-for="item of items"
        :key="item.key"
        :title="`${item.value} page views (${percentage(item.value / total)})`"
      >
        <label
          class="px-4 block py-1 cursor-pointer border-l-2"
          :class="{
            'border-blue-500 bg-blue-100 text-blue-700': resource === item.key,
            'border-transparent': resource !== item.key,
          }"
        >
          <input
            type="radio"
            :value="item.key"
            v-model="resource"
            class="sr-only"
          />
          <div>
            {{ item.key }}
          </div>
          <div class="text-xs text-gray-600">{{ item.value }} views</div>
        </label>
      </li>
    </ul>
  </section>
</template>

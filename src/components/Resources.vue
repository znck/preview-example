<script lang="ts">
import component from './Resources'

export default component
</script>

<template>
  <section class="h-full flex flex-col relative">
    <header class="py-2 border-b border-gray-300">
      <label
        class="pl-4 flex flex-row items-center py-1 cursor-pointer border-l-2"
        :class="{
          'border-blue-500 bg-blue-100 text-blue-700': resource === '*',
          'border-transparent': resource !== '*',
        }"
      >
        <input type="radio" value="*" v-model="resource" class="sr-only" />
        <div class="flex-1 mr-1">
          <div>Total — all pages</div>
          <div class="text-xs text-gray-600">
            {{ total }} views<span v-if="resource === '*' && today">
              + {{ today }} new views today</span
            >
          </div>
        </div>

        <svg
          :class="{
            'opacity-0': '*' !== resource,
          }"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.07757 16.4226C5.75214 16.0971 5.75214 15.5695 6.07757 15.2441L11.3217 9.99999L6.07757 4.75591C5.75214 4.43048 5.75214 3.90284 6.07757 3.5774C6.40301 3.25196 6.93065 3.25196 7.25608 3.5774L13.0894 9.41074C13.4149 9.73617 13.4149 10.2638 13.0894 10.5892L7.25608 16.4226C6.93065 16.748 6.40301 16.748 6.07757 16.4226Z"
            fill="currentColor"
          />
        </svg>
      </label>
    </header>

    <ul class="py-2 flex-1 overflow-y-auto overflow-x-hidden">
      <li v-for="item of items" :key="item.key" class="mb-1">
        <label
          class="pl-4 flex flex-row items-center py-1 cursor-pointer border-l-2"
          :class="{
            'border-blue-500 bg-blue-100 text-blue-700': resource === item.key,
            'border-transparent': resource !== item.key,
          }"
          :title="`${item.value} page views (${percentage(
            item.value / total,
          )})`"
        >
          <input
            type="radio"
            :value="item.key"
            v-model="resource"
            class="sr-only"
          />
          <div class="flex-1 mr-1">
            <div class="break-words">
              {{ item.key }}
            </div>
            <div class="text-xs text-gray-600">
              {{ item.value }} views<span v-if="resource === item.key && today">
                + {{ today }} new views today</span
              >
            </div>
          </div>

          <svg
            :class="{
              'opacity-0': item.key !== resource,
            }"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.07757 16.4226C5.75214 16.0971 5.75214 15.5695 6.07757 15.2441L11.3217 9.99999L6.07757 4.75591C5.75214 4.43048 5.75214 3.90284 6.07757 3.5774C6.40301 3.25196 6.93065 3.25196 7.25608 3.5774L13.0894 9.41074C13.4149 9.73617 13.4149 10.2638 13.0894 10.5892L7.25608 16.4226C6.93065 16.748 6.40301 16.748 6.07757 16.4226Z"
              fill="currentColor"
            />
          </svg>
        </label>
      </li>
    </ul>
  </section>
</template>

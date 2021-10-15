<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup(_, { emit }) {
    const start = ref<Date | null>(null)
    const end = ref<Date | null>(null)
    const refDate = ref(new Date())
    const firstOfMonth = computed(() => {
      const first = new Date(refDate.value)
      first.setDate(1)

      return first
    })
    const lastOfMonth = computed(() => {
      const last = new Date(firstOfMonth.value)
      last.setMonth(last.getMonth() + 1)
      last.setDate(last.getDate() - 1)

      return last
    })
    const prefix = computed(() => {
      return firstOfMonth.value.getDay()
    })
    const days = computed(() => {
      return lastOfMonth.value.getDate()
    })
    const suffix = computed(() => {
      const diff = 6 - lastOfMonth.value.getDay()

      if (prefix.value + days.value + diff <= 35) {
        return 7 + diff
      }

      return diff
    })
    const month = computed(() => {
      return 'January,February,March,April,May,June,July,August,September,October,November,December'.split(
        ',',
      )[refDate.value.getMonth()]
    })
    const year = computed(() => {
      return refDate.value.getFullYear()
    })

    function goto(diff: number) {
      const date = new Date(refDate.value)
      date.setMonth(date.getMonth() + diff)

      if (
        date.getFullYear() < today.getFullYear() ||
        (date.getFullYear() === today.getFullYear() &&
          date.getMonth() <= today.getMonth())
      ) {
        refDate.value = date
      }
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    function isAllowed(day: number) {
      const date = getDate(day)

      return date.getTime() < today.getTime()
    }

    function isActive(day: number) {
      if (!isAllowed(day)) return false

      const date = getDate(day)

      if (date.getTime() >= today.getTime())
        if (start.value && end.value) {
          return (
            start.value.getTime() <= date.getTime() &&
            date.getTime() <= end.value.getTime()
          )
        }

      if (start.value) {
        return (
          start.value.toISOString().split('T').shift() ===
          date.toISOString().split('T').shift()
        )
      }

      return false
    }

    function getDate(day: number): Date {
      return new Date(
        `${refDate.value.getFullYear()}-${refDate.value.getMonth() + 1}-${day}`,
      )
    }

    function selectDate(event: MouseEvent) {
      const day = parseInt((event.target as HTMLDivElement).dataset.date!)

      if (!isAllowed(day)) return
      refDate.value = getDate(day)

      if (start.value == null) {
        start.value = refDate.value
      } else if (end.value == null) {
        end.value = refDate.value
        emit(
          'done',
          start.value.getTime() < end.value.getTime()
            ? [start.value, end.value]
            : [end.value, start.value],
        )
      }
    }

    return {
      year,
      month,
      prefix,
      suffix,
      days,
      next: () => goto(1),
      previous: () => goto(-1),
      isActive,
      selectDate,
      isAllowed,
    }
  },
})
</script>

<template>
  <section class="bg-white rounded py-4 px-6" style="width: 18rem">
    <header class="flex justify-between mb-2">
      <div>
        <span class="text-lg font-bold text-gray-800">{{ month }}</span>
        <span class="ml-1 text-lg text-gray-600 font-normal">{{ year }}</span>
      </div>

      <div>
        <button
          type="button"
          class="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
          @click="previous"
        >
          <svg
            class="h-6 w-6 text-gray-500 inline-flex"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
        <button
          type="button"
          class="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
          @click="next"
        >
          <svg
            class="h-6 w-6 text-gray-500 inline-flex"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      </div>
    </header>

    <div class="flex mb-3 -mx-2">
      <div
        class="px-1 text-gray-800 font-medium text-center text-xs"
        style="width: 14.28%"
      >
        Sun
      </div>
      <div
        class="px-1 text-gray-800 font-medium text-center text-xs"
        style="width: 14.28%"
      >
        Mon
      </div>
      <div
        class="px-1 text-gray-800 font-medium text-center text-xs"
        style="width: 14.28%"
      >
        Tue
      </div>
      <div
        class="px-1 text-gray-800 font-medium text-center text-xs"
        style="width: 14.28%"
      >
        Wed
      </div>
      <div
        class="px-1 text-gray-800 font-medium text-center text-xs"
        style="width: 14.28%"
      >
        Thu
      </div>
      <div
        class="px-1 text-gray-800 font-medium text-center text-xs"
        style="width: 14.28%"
      >
        Fri
      </div>
      <div
        class="px-1 text-gray-800 font-medium text-center text-xs"
        style="width: 14.28%"
      >
        Sat
      </div>
    </div>

    <div class="flex flex-wrap -mx-2">
      <div
        v-for="day in prefix"
        class="p-1"
        style="width: 14.28%"
        :key="'prefix' + day"
      >
        <div
          class="text-center text-sm rounded-full leading-loose opacity-0"
          role="presentation"
        >
          {{ 0 }}
        </div>
      </div>
      <div v-for="day in days" class="p-1" style="width: 14.28%" :key="day">
        <div
          @click="selectDate"
          class="cursor-pointer text-center text-sm rounded-full leading-loose transition ease-in-out duration-100"
          :data-date="day"
          :class="{
            'text-gray-300 cursor-not-allowed': !isAllowed(day),
            'hover:bg-blue-700 text-white bg-blue-500': isActive(day),
            'hover:bg-gray-700 hover:text-white text-gray-800':
              isAllowed(day) && !isActive(day),
          }"
        >
          {{ day }}
        </div>
      </div>
      <div
        v-for="day in suffix"
        class="p-1"
        style="width: 14.28%"
        :key="'prefix' + day"
      >
        <div
          class="text-center text-sm rounded-full leading-loose opacity-0"
          role="presentation"
        >
          {{ 0 }}
        </div>
      </div>
    </div>
  </section>
</template>

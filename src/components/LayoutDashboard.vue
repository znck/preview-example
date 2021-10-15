<script lang="ts" setup>
import { defineComponent, inject, computed, ref } from 'vue'
import Layout from './Layout.vue'
import { RouterLink } from 'vue-router'
import ProjectSwitcher from './ProjectSwitcher.vue'
import Menu from './Menu.vue'
import DatePicker from './DatePicker.vue'
import Dropdown from './Dropdown.vue'
import { DASHBOARD_CONTEXT } from '../types'
import { projects as getProjects, me } from '../graphql'
import { asyncComputed } from '../utilities'
import { isAuthenticated } from '../auth'
import { Project } from '@thesemetrics/core/schema'

const months = 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(',')

const context = inject(DASHBOARD_CONTEXT)!
const hasUser = asyncComputed(isAuthenticated)
const user = asyncComputed(me)
const isPro = computed(() => user.value?.subscription?.id === 'pro')
const projects = ref<Project[]>([])
const projectName = computed(() => {
  const domain = context.domain
  const project = projects.value.find((project) => project.domain === domain)

  if (project && project.name !== '') return project.name

  return domain
})
const currentDateRangeText = computed(() => {
  const { from, to } = context

  if (from.getFullYear() !== to.getFullYear()) {
    return `${from.getDate()} ${
      months[from.getMonth()]
    } ${from.getFullYear()} to ${to.getDate()} ${
      months[to.getMonth()]
    } ${to.getFullYear()}`
  } else if (from.getMonth() !== to.getMonth()) {
    return `${from.getDate()} ${months[from.getMonth()]} to ${to.getDate()} ${
      months[to.getMonth()]
    } ${to.getFullYear()}`
  } else {
    return `${from.getDate()} to ${to.getDate()} ${
      months[to.getMonth()]
    } ${to.getFullYear()}`
  }
})

function onDateChange([from, to]: [Date, Date]) {
  context.from = from
  context.to = to
}

getProjects()
  .then((result) => {
    projects.value = result
  })
  .catch(() => {
    // Unauthorized maybe??
  })
</script>

<template>
  <Layout>
    <template #header-prefix>
      <Dropdown>
        <template #trigger="{ isOpen }">
          <div
            class="px-2 py-1 rounded border focus:border-gray-800 cursor-pointer inline-flex justify-between items-center"
            tabindex="0"
          >
            <span class="whitespace-no-wrap">{{ projectName }}</span>
            <svg
              class="w-4 h-4 ml-2 transform transition-transform duration-150"
              :class="{ 'rotate-180': isOpen }"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.86177 5.52864C3.12212 5.26829 3.54423 5.26829 3.80458 5.52864L7.99984 9.7239L12.1951 5.52864C12.4554 5.26829 12.8776 5.26829 13.1379 5.52864C13.3983 5.78899 13.3983 6.2111 13.1379 6.47145L8.47124 11.1381C8.21089 11.3985 7.78878 11.3985 7.52843 11.1381L2.86177 6.47145C2.60142 6.2111 2.60142 5.78899 2.86177 5.52864Z"
                fill="#828282"
              />
            </svg>
          </div>
        </template>
        <template #content="{ close }">
          <ProjectSwitcher
            v-if="hasUser"
            :title="user?.name"
            :projects="projects"
            @close="close"
          />
          <Menu v-else @close="close" />
        </template>
      </Dropdown>
    </template>

    <template #header-suffix>
      <Dropdown
        v-if="isPro"
        style="top: 40px"
        align="right"
        :disabled="context.project == null"
      >
        <template #trigger="{ isOpen }">
          <div
            class="border-gray-00 border rounded bg-gray-100 py-1 px-1 float-right inline-block"
          >
            <div class="inline-block mr-1 text-gray-700 whitespace-no-wrap">
              {{ currentDateRangeText }}
            </div>
          </div>
        </template>
        <template #content="{ close }">
          <DatePicker
            @done="
              ($event) => {
                onDateChange($event)
                close()
              }
            "
          />
        </template>
      </Dropdown>
      <div class="text-xs text-right flex-1 relative" v-else>
        <div
          class="border-gray-00 border rounded bg-gray-100 py-1 px-1 cursor-not-allowed hidden md:inline-block"
        >
          <svg
            viewBox="0 0 16 16"
            class="h-4 -mt-1 mr-1 text-gray-600 inline-block"
          >
            <path
              d="M7.99984 1.33337C9.4726 1.33337 10.6665 2.52728 10.6665 4.00004V5.33337H12.3332C12.8855 5.33337 13.3332 5.78109 13.3332 6.33337V13.6667C13.3332 14.219 12.8855 14.6667 12.3332 14.6667H3.6665C3.11422 14.6667 2.6665 14.219 2.6665 13.6667V6.33337C2.6665 5.78109 3.11422 5.33337 3.6665 5.33337H5.33317V4.00004C5.33317 2.52728 6.52708 1.33337 7.99984 1.33337ZM7.99992 9.00004C7.44764 9.00004 6.99992 9.44776 6.99992 10C6.99992 10.5523 7.44764 11 7.99992 11C8.55221 11 8.99992 10.5523 8.99992 10C8.99992 9.44776 8.55221 9.00004 7.99992 9.00004ZM7.99984 2.66671C7.26346 2.66671 6.6665 3.26366 6.6665 4.00004V5.33337H9.33317V4.00004C9.33317 3.26366 8.73622 2.66671 7.99984 2.66671Z"
              class="fill-current"
            />
          </svg>

          <div class="inline-block mr-1 text-gray-700">
            {{ currentDateRangeText }}
          </div>

          <RouterLink
            :to="{ name: 'upgrade' }"
            class="bg-purple-500 text-white inline-block p-1 rounded leading-3"
            >Upgrade</RouterLink
          >
        </div>

        <RouterLink
          :to="{ name: 'upgrade' }"
          class="bg-purple-500 text-white inline-block p-2 rounded leading-3 md:hidden"
          >Upgrade</RouterLink
        >
      </div>
    </template>

    <template #default>
      <slot />
    </template>
  </Layout>
</template>

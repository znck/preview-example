<script lang="ts">
import { computed, defineComponent, inject } from 'vue'
import { useRouter } from 'vue-router'
import { logout } from '../auth'
import { DASHBOARD_CONTEXT } from '../types'

export default defineComponent({
  props: {
    title: {
      type: String,
    },
    projects: {
      type: Array as () => Array<{ name: string; domain: string }>,
      default: () => [],
    },
  },
  setup(_, { emit }) {
    const context = inject(DASHBOARD_CONTEXT)!
    const router = useRouter()

    async function onLogout() {
      await logout()
      emit('close')
      router.push('/')
    }

    return { domain: computed(() => context.domain), onLogout }
  },
})
</script>

<template>
  <menu class="bg-white rounded w-64 m-0 px-0 py-2">
    <section v-if="projects.length">
      <header class="text-gray-600 text-sm px-6">Your sites</header>

      <ul>
        <li
          v-for="project of projects"
          :key="project.id"
          @click="$emit('close')"
        >
          <RouterLink
            :to="{ name: 'dashboard', params: { domain: project.domain } }"
            class="block w-full px-6 py-2 hover:bg-gray-100 cursor-pointer"
          >
            <div class="flex justify-between items-center">
              <span>{{ project.name || project.domain }}</span>
              <svg
                viewBox="0 0 16 16"
                class="w-4 h-4"
                v-if="domain === project.domain"
              >
                <path
                  d="M5.66667 11.0572L3.13807 8.5286C2.87772 8.26825 2.45561 8.26825 2.19526 8.5286C1.93491 8.78895 1.93491 9.21105 2.19526 9.4714L5.19526 12.4714C5.45561 12.7318 5.87772 12.7318 6.13807 12.4714L13.4714 5.13807C13.7318 4.87772 13.7318 4.45561 13.4714 4.19526C13.2111 3.93491 12.7889 3.93491 12.5286 4.19526L5.66667 11.0572Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div class="text-xs text-gray-500">{{ project.domain }}</div>
          </RouterLink>
        </li>
      </ul>
    </section>

    <hr class="my-2" v-if="projects.length" />

    <section>
      <ul>
        <li @click="$emit('close')">
          <RouterLink
            :to="{ name: 'create' }"
            class="flex justify-between items-center w-full px-6 py-2 hover:bg-gray-100 cursor-pointer"
          >
            <span>Add new site</span>
            <svg viewBox="0 0 16 16" class="w-4 h-4">
              <path
                d="M7.92225 2.00449L8 2C8.34189 2 8.62367 2.25736 8.66218 2.58892L8.66667 2.66667V7.33333H13.3333C13.6752 7.33333 13.957 7.59069 13.9955 7.92225L14 8C14 8.34189 13.7426 8.62367 13.4111 8.66218L13.3333 8.66667H8.66667V13.3333C8.66667 13.6752 8.40931 13.957 8.07775 13.9955L8 14C7.65811 14 7.37633 13.7426 7.33782 13.4111L7.33333 13.3333V8.66667H2.66667C2.32478 8.66667 2.043 8.40931 2.00449 8.07775L2 8C2 7.65811 2.25736 7.37633 2.58892 7.33782L2.66667 7.33333H7.33333V2.66667C7.33333 2.32478 7.59069 2.043 7.92225 2.00449L8 2L7.92225 2.00449Z"
                fill="currentColor"
              />
            </svg>
          </RouterLink>
        </li>
      </ul>
    </section>

    <hr class="my-2" />

    <section>
      <header class="text-gray-600 text-sm px-6">{{ title }}</header>

      <ul>
        <li @click="$emit('close')">
          <RouterLink
            :to="{ name: 'settings' }"
            class="block px-6 py-2 hover:bg-gray-100 cursor-pointer"
            >Settings</RouterLink
          >
        </li>
        <li
          @click="onLogout"
          class="px-6 py-2 hover:bg-gray-100 cursor-pointer"
        >
          Logout
        </li>
      </ul>
    </section>
  </menu>
</template>

<script lang="ts" setup>
import { computed, provide, reactive, toRefs, unref, watchEffect } from 'vue'
import DashboardError from '../components/DashboardError.vue'
import DashboardNotFoundError from '../components/DashboardNotFoundError.vue'
import DashboardPlaceholder from '../components/DashboardPlaceholder.vue'
import Layout from '../components/LayoutDashboard.vue'
import SetupInstructions from '../components/SetupInstructions.vue'
import { RouterLink } from 'vue-router'
import { WithResource } from '../components/WithResource'
import { useProject, useUserProjects } from '../functions/project'
import { DashboardContext, DASHBOARD_CONTEXT } from '../types'
import { getDateRangeFromToday, asyncComputed } from '../utilities'
import widgets from '../widgets'
import ProjectLiveDataProvider from '../components/ProjectLiveDataProvider.vue'
import ProjectDataProvider from '../components/ProjectDataProvider.vue'
import { me } from '../graphql'

const props = defineProps<{ domain: string }>()
const { domain } = toRefs(props)
const state = reactive<DashboardContext>({
  domain: props.domain,
  ...getDateRangeFromToday(),
  path: '*',
  project: null,
})

const project = useProject(domain)
const projects = useUserProjects()

provide(DASHBOARD_CONTEXT, state)

watchEffect(() => {
  state.domain = props.domain
  state.project = project.data

  const dashboard = unref(project.data)?.dashboard
  if (dashboard) {
    if (Array.isArray(dashboard.pages)) {
      state.path = dashboard.pages[0]
    }
  }
})

const userProject = computed(() => {
  const domain = props.domain

  return projects.data.value?.find((project) => project.domain === domain)
})

const usage = computed(() => {
  return unref(project.data)?.usage
})

const user = asyncComputed(me)
const isPro = computed(() => user.value?.subscription?.id === 'pro')
</script>

<template>
  <Layout>
    <WithResource
      :resource="project"
      #default="{ data, error, isValidating, isReady }"
    >
      <DashboardPlaceholder v-if="!isReady" />
      <DashboardNotFoundError v-else-if="data == null" :domain="domain" />
      <DashboardError v-else-if="data.status === 'blocked'">
        <section>
          <h2
            class="uppercase text-red-600 text-2xl font-bold text-center mb-4"
          >
            Payment required
          </h2>

          <p>
            Access to <strong>{{ domain }}</strong> has been blocked. Update
            your payment information to resume access.
          </p>
        </section>
      </DashboardError>
      <template v-else>
        <div v-if="data.status === 'pending_setup' && userProject" class="my-4">
          <SetupInstructions
            :domain="domain"
            :framework="userProject?.framework"
          />
        </div>
        <div
          class="my-4 flex justify-between bg-warning-600 p-4 rounded"
          v-if="usage && usage.total.pageviews > usage.quota"
        >
          <p>
            You have exceeded your usage limit.
            <template v-if="!isPro">
              Upgrade to <strong>Pro</strong> to increase limits.
            </template>
          </p>
          <RouterLink v-if="!isPro" :to="{ name: 'upgrade' }" class="underline"
            >Upgrade to Pro</RouterLink
          >
        </div>
        <div
          class="my-4 flex justify-between bg-warning-600 p-4 rounded"
          v-else-if="usage && usage.total.pageviews > usage.quota * 0.95"
        >
          <p>
            You are about to exceed the usage limit ({{
              Number((usage.total.pageviews / usage.quota) * 100).toFixed(0)
            }}% used).

            <template v-if="!isPro">
              Upgrade to <strong>Pro</strong> to increase limits.
            </template>
          </p>
          <RouterLink v-if="!isPro" :to="{ name: 'upgrade' }" class="underline"
            >Upgrade to Pro</RouterLink
          >
        </div>

        <template v-if="!!data.dashboard">
          <DashboardError v-if="data.dashboard.access === 'password'">
            <section>
              <h2
                class="uppercase text-red-600 text-2xl font-bold text-center mb-4"
              >
                Password required
              </h2>

              <p>YET TO IMPLEMENT.</p>
            </section>
          </DashboardError>
          <div class="dashboard flex flex-row flex-wrap my-4" v-else>
            <component
              :is="
                data.dashboard.segment.live
                  ? ProjectLiveDataProvider
                  : ProjectDataProvider
              "
            >
              <component
                v-for="(widget, index) of data.dashboard.widgets"
                :key="index"
                :is="widgets[widget.name]"
                v-bind="widget"
              />
            </component>
          </div>
        </template>
      </template>
    </WithResource>
  </Layout>
</template>

<style>
.dashboard {
  gap: 1rem;
}

.dashboard [data-widget] {
  flex: 0 0 100%;
}

@media (min-width: 768px) {
  .dashboard [data-widget='card'] {
    flex: 3 3 20%;
  }

  .dashboard [data-widget='list'] {
    flex: 4 4 30%;
  }
}

@supports (-webkit-hyphens: none) {
  .dashboard [data-widget] {
    margin-bottom: 1rem;
  }

  @media (min-width: 768px) {
    .dashboard [data-widget='card'] + [data-widget='card'],
    .dashboard [data-widget='list'] + [data-widget='list'] {
      margin-left: 1rem;
    }
  }
}
</style>

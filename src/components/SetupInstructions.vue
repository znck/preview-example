<script lang="ts" setup>
import { computed, ref, toRefs } from 'vue'
import { frameworks } from '../frameworks'
import { useProject } from '../functions/project'
import Button from './Button.vue'

const props = withDefaults(
  defineProps<{
    domain: string
    framework?: string
  }>(),
  { framework: 'html' },
)
const value = ref(props.framework)
const project = useProject(toRefs(props).domain)
const currentFramework = computed(() => {
  const name = value.value

  return frameworks.find((framework) => framework.value === name)
})

const isBusy = ref(false)
function onVerify() {
  if (isBusy.value) return
  isBusy.value = true
  project.revalidate()
  setTimeout(() => {
    isBusy.value = false
  }, 5000)
}
</script>

<template>
  <div class="border rounded border-black flex flex-col md:flex-row">
    <div
      class="border-b md:border-b-0 md:border-r border-black p-4 md:p-6"
      style="flex: 0 0 50%"
    >
      <h2 class="text-xl font-semibold text-primary-600">Complete setup</h2>

      <ul class="list-outside list-decimal my-4 leading-7 ml-8">
        <li>Add tracking script to your website.</li>
        <li>Deploy your website.</li>
        <li>Wait for first page view.</li>
      </ul>

      <Button appearance="cta" @click="onVerify" :isLoading="isBusy">
        Verify now
      </Button>
    </div>

    <div
      class="overflow-auto relative"
      style="flex: 0 0 50%; max-height: 300px"
    >
      <label
        class="flex flex-row items-center mt-4 mr-6 top-0 right-0 absolute"
      >
        <select
          v-model="value"
          class="border border-gray-400 rounded px-2 py-1 text-sm font-bold appearance-none inline-block cursor-pointer pr-6"
        >
          <option
            v-for="framework of frameworks"
            :value="framework.value"
            :key="framework.value"
          >
            {{ framework.title }}
          </option>
        </select>
        <svg
          class="w-4 h-4 text-gray-400 inline-block -ml-6 pointer-events-none"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.86177 5.52861C3.12212 5.26826 3.54423 5.26826 3.80458 5.52861L7.99984 9.72387L12.1951 5.52861C12.4554 5.26826 12.8776 5.26826 13.1379 5.52861C13.3983 5.78896 13.3983 6.21107 13.1379 6.47141L8.47124 11.1381C8.21089 11.3984 7.78878 11.3984 7.52843 11.1381L2.86177 6.47141C2.60142 6.21107 2.60142 5.78896 2.86177 5.52861Z"
            class="fill-current"
          />
        </svg>
      </label>

      <pre
        class="whitespace-pre font-mono text-gray-600 mt-10 px-4 mb-8 md:px-6"
      ><code>{{currentFramework.instructions}}</code></pre>
    </div>
  </div>
</template>

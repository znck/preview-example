<script lang="ts">
import { defineComponent, ref, reactive, watchEffect } from 'vue'
import Layout from '../components/Layout.vue'
import InputField from '../components/InputField.vue'
import RadioField from '../components/RadioField.vue'
import Button from '../components/Button.vue'
import { useRouter } from 'vue-router'
import { frameworks } from '../frameworks'
import { AbsoluteURL } from '../utilities'
import { createProject, ValidationException } from '../graphql'

function decodeHTMLEntities(text: string) {
  var textArea = document.createElement('textarea')
  textArea.innerHTML = text
  return textArea.value
}

export default defineComponent({
  components: { Layout, InputField, RadioField, Button },
  setup() {
    const router = useRouter()
    const stage = ref(0)
    const isBusy = ref(false)
    const state = reactive({
      name: '',
      domain: '',
      framework: 'html',

      error: '',
    })

    async function detectWebsiteInfo() {
      isBusy.value = true

      const response = await fetch(
        AbsoluteURL`/api/assets/website/inspect?domain=${state.domain}`,
        { credentials: 'include' },
      )

      try {
        if (response.status === 200) {
          const { title, framework } = await response.json()

          state.error = ''
          state.name = decodeHTMLEntities(title)
          state.framework = framework
        } else if (response.status === 422) {
          const errors = await response.json()

          throw new Error(
            Object.entries(errors)
              .map(([key, message]) => `The website ${message}`)
              .join(' '),
          )
        } else {
          throw new Error(response.statusText)
        }
      } catch (error) {
        state.error = error.message || 'We got some error. Try again.'
        state.framework = state.name = ''
        stage.value = 0
      }

      isBusy.value = false
    }

    function onSubmit() {
      if (stage.value <= 0) {
        stage.value = 1
        detectWebsiteInfo()
      } else {
        createProject({
          name: state.name,
          domain: state.domain,
          framework: state.framework,
        })
          .then((project) => {
            router.push({
              name: 'dashboard',
              params: { domain: project.domain },
            })
          })
          .catch((error) => {
            state.error = error.message

            if (error instanceof ValidationException) {
              state.error = error.errors
                .flatMap((error) =>
                  Object.values(error.constraints).map(
                    (message) => `The ${message}.`,
                  ),
                )
                .join(' ')
            }
          })
      }
    }

    function onBack() {
      if (stage.value === 0) {
        router.back()
      } else {
        --stage.value
      }
    }

    function onFocus() {
      stage.value = 0
      state.error = ''
    }

    return {
      stage,
      state,
      isBusy,
      onSubmit,
      onBack,
      frameworks,
      detectWebsiteInfo,
      onFocus,
    }
  },
})
</script>

<template>
  <Layout>
    <form
      @submit.prevent="onSubmit"
      class="mx-auto max-w-md my-20"
      style="min-height: 60vh"
    >
      <InputField
        v-model="state.domain"
        title="Website"
        appearance="large"
        :required="true"
        @focus="onFocus"
      />
      <template v-if="stage > 0">
        <InputField
          v-model="state.name"
          title="Project Name"
          :required="true"
          :shimmer="isBusy"
          autofocus
        />
        <RadioField
          v-model="state.framework"
          title="Project Type"
          :options="frameworks"
          :required="true"
          :shimmer="isBusy"
        />
      </template>

      <div v-if="state.error" class="text-sm text-red-700 my-4">
        {{ state.error }}
      </div>

      <footer class="flex flex-row justify-between mt-8">
        <Button @click="onBack">Back</Button>
        <Button appearance="primary" type="submit" :isLoading="isBusy">{{
          stage ? 'Done' : 'Next'
        }}</Button>
      </footer>
    </form>
  </Layout>
</template>

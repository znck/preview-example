<script lang="ts">
import { computed, defineComponent, reactive, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import Button from '../components/Button.vue'
import Field from '../components/Field.vue'
import InputField from '../components/InputField.vue'
import Layout from '../components/Layout.vue'
import StripeField from '../components/StripeField.vue'
import { downgradeToStarter, me } from '../graphql'
import { asyncComputed } from '../utilities'

export default defineComponent({
  components: { Layout, InputField, Field, StripeField, Button },
  setup() {
    const state = reactive({
      error: null,
    })
    const user = asyncComputed(me)
    const router = useRouter()
    const busy = ref(false)

    function onBack() {
      router.push({ name: 'settings' })
    }

    async function onSubmit() {
      state.error = null
      busy.value = true
      try {
        await downgradeToStarter({ plan: 'free' })
        router.push({ name: 'settings' })
      } catch (error) {
        state.error = error.message
      }
      busy.value = false
    }

    watchEffect(() => {
      if (user.value) {
        const plan = user.value?.subscription
        if (plan.id === 'free') router.push({ name: 'upgrade' })
      }
    })

    return {
      state,
      user,
      onBack,
      onSubmit,
      isBusy: computed(() => !user.value || busy.value),
    }
  },
})
</script>

<template>
  <Layout>
    <div class="flex flex-row mt-12">
      <div class="flex-1 text-center text-4xl font-bold">Change Plan</div>
    </div>

    <div>
      <form
        @submit.prevent="onSubmit"
        class="mx-auto max-w-md my-10"
        style="min-height: 60vh"
      >
        <Field
          title="Your current plan"
          class="dim border-red-300 text-red-600"
        >
          <div class="flex flex-row justify-between my-2">
            <div class="">Plan</div>
            <div class="font-bold">
              <span>Pro</span>
            </div>
          </div>

          <div class="flex flex-row justify-between my-2">
            <div class="">Projects</div>
            <div class="font-bold">Unlimited</div>
          </div>

          <div class="flex flex-row justify-between my-2">
            <div class="">Total page views</div>
            <div class="font-bold">Upto 50k</div>
          </div>
        </Field>

        <Field title="Your new plan">
          <div class="flex flex-row justify-between my-2">
            <div class="">Plan</div>
            <div class="font-bold">
              <span>Starter</span>
            </div>
          </div>

          <div class="flex flex-row justify-between my-2">
            <div class="">Projects</div>
            <div class="font-bold">Unlimited</div>
          </div>

          <div class="flex flex-row justify-between my-2">
            <div class="">Total page views</div>
            <div class="font-bold">Upto 10k</div>
          </div>
        </Field>

        <p
          class="bg-red-100 text-red-800 text-sm my-4 p-4 rounded border border-red-700"
          v-if="state.error"
        >
          {{ state.error }}
        </p>

        <div class="flex flex-row justify-between items-center">
          <Button type="submit" :isLoading="isBusy">Switch to Starter</Button>
          <Button @click="onBack" appearance="primary" :disabled="isBusy"
            >Back</Button
          >
        </div>
      </form>
    </div>
  </Layout>
</template>

<style scoped>
.dim {
  filter: opacity(0.5);
}
</style>

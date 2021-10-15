<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import Button from '../components/Button.vue'
import Field from '../components/Field.vue'
import Layout from '../components/Layout.vue'
import { me } from '../graphql'
import { asyncComputed } from '../utilities'
import { createBillingPortalSession } from '../graphql'

export default defineComponent({
  components: { Layout, Field, Button },
  setup() {
    const user = asyncComputed(me)
    const router = useRouter()
    const isBusy = computed(() => !user.value)

    function onBack() {
      router.push({ name: 'home' })
    }

    async function redirectToStripeBillingPortal() {
      const { url } = await createBillingPortalSession()
      window.location.href = url
    }

    return { user, onBack, isBusy, redirectToStripeBillingPortal }
  },
})
</script>

<template>
  <Layout title="Settings">
    <div class="flex flex-row mt-12">
      <div class="flex-1"><Button @click="onBack">Back</Button></div>
      <div class="flex-1 text-center text-4xl font-bold">Account Settings</div>
      <div class="flex-1"></div>
    </div>

    <form
      @submit.prevent="onSubmit"
      class="mx-auto max-w-md my-10"
      style="min-height: 60vh"
    >
      <Field title="Your name" :shimmer="isBusy">
        <div class="font-bold text-xl">{{ user?.name }}</div>
      </Field>
      <Field title="Login managed by" :shimmer="isBusy">
        <div class="font-bold text-xl">{{ user?.authProvider }}</div>
      </Field>
      <Field title="Payment plan" :shimmer="isBusy">
        <div class="flex justify-between items-center">
          <span>
            <span class="font-bold text-xl">{{ user?.subscription.plan }}</span>
            <span
              v-if="user?.subscription.id === 'pro'"
              class="pl-2 text-gray-500 hover:underline"
              role="button"
              :tabindex="0"
              @click="redirectToStripeBillingPortal"
              >see billing history</span
            >
          </span>
          <template v-if="!isBusy">
            <Button
              as="RouterLink"
              :to="{ name: 'upgrade' }"
              class="-mt-5"
              appearance="primary"
              v-if="user?.subscription?.id !== 'pro'"
              >Upgrade to pro</Button
            >
            <div v-else-if="user?.subscription.id === 'pro'">
              <Button
                as="RouterLink"
                :to="{ name: 'downgrade' }"
                appearance="secondary"
                >Cancel</Button
              >

              <Button
                as="RouterLink"
                :to="{ name: 'upgrade' }"
                appearance="primary"
                >Edit</Button
              >
            </div>
          </template>
        </div>
      </Field>
    </form>
  </Layout>
</template>

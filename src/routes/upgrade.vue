<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  watchEffect,
  computed,
  nextTick,
} from 'vue'
import Layout from '../components/Layout.vue'
import InputField from '../components/InputField.vue'
import StripeField from '../components/StripeField.vue'
import Field from '../components/Field.vue'
import Button from '../components/Button.vue'
import { me, upgradeToPro, updateSubscription } from '../graphql'
import { asyncComputed } from '../utilities'
import { useRouter } from 'vue-router'
import { useStripe } from '../stripe'

export default defineComponent({
  components: { Layout, InputField, Field, StripeField, Button },
  setup() {
    const stripeAsPromise = useStripe()
    const state = reactive({
      email: '',
      address: '',
      card: null,
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
        const stripe = await stripeAsPromise
        const card = showStripeField.value
          ? await stripe.createPaymentMethod({
              type: 'card',
              card: state.card!,
              billing_details: {
                email: state.email,
                address: {
                  line1: state.address,
                },
              },
            })
          : null
        const intent =
          card !== null
            ? await upgradeToPro({
                email: state.email,
                address: state.address,
                paymentMethodId: card.paymentMethod!.id,
                plan: 'pro',
              })
            : await updateSubscription({
                email: state.email,
                address: state.address,
              })

        if (
          card != null &&
          (intent.status === 'requires_action' ||
            intent.status === 'requires_payment_method')
        ) {
          const result = await stripe.confirmCardPayment(intent.clientSecret!, {
            payment_method: card.paymentMethod!.id,
            receipt_email: state.email,
          })
          if (result.error) throw result.error
        }

        await router.push({ name: 'settings' })
      } catch (error) {
        state.error = error.message
      }

      busy.value = false
    }

    const card = computed(() => user.value?.subscription?.card)
    const showStripeField = ref(true)
    const stripeField = ref<typeof StripeField | null>(null)

    watchEffect(() => {
      if (user.value) {
        const { subscription, email } = user.value

        if (email) state.email = email
        if (subscription) {
          state.address = subscription.address
          if (subscription.card && subscription.id !== 'free')
            showStripeField.value = false
        }
      }
    })

    function editCardDetails() {
      showStripeField.value = true
      nextTick(() => {
        if (stripeField.value) {
          stripeField.value.focus()
        }
      })
    }

    return {
      state,
      user,
      onBack,
      onSubmit,
      card,
      stripeField,
      showStripeField,
      editCardDetails,
      isBusy: computed(() => !user.value || busy.value),
    }
  },
})
</script>

<template>
  <Layout>
    <div class="flex flex-row mt-12">
      <div class="flex-1 text-center text-4xl font-bold">
        {{
          user?.subscription?.id === 'pro'
            ? 'Update Payment Details'
            : 'Upgrade to Pro'
        }}
      </div>
    </div>

    <form
      @submit.prevent="onSubmit"
      class="mx-auto max-w-md my-10"
      style="min-height: 60vh"
    >
      <InputField
        title="Your email"
        type="email"
        autocomplete="email"
        v-model="state.email"
        required
      />
      <InputField
        title="Billing address"
        autocomplete="address"
        v-model="state.address"
        required
      />
      <InputField
        v-if="card && !showStripeField"
        @click="editCardDetails"
        title="Card details"
        :modelValue="`${card.brand.toUpperCase()} ···· ···· ···· ${card.last4}`"
        readonly
      />
      <StripeField
        ref="stripeField"
        v-show="showStripeField"
        title="Card details"
        v-model="state.card"
        @error="state.error = $event"
      >
        <template v-if="card" #subtitle
          ><Button class="float-right" @click.stop="showStripeField = false"
            >Cancel</Button
          ></template
        >
      </StripeField>

      <Field title="Summary">
        <div class="flex flex-row justify-between my-2">
          <div class="">Plan</div>
          <div class="font-bold">Pro</div>
        </div>

        <div class="flex flex-row justify-between my-2">
          <div class="">Projects</div>
          <div class="font-bold">Unlimited</div>
        </div>

        <div class="flex flex-row justify-between my-2">
          <div class="">Total page views</div>
          <div class="font-bold">Upto 50k</div>
        </div>

        <div class="flex flex-row justify-between my-2">
          <div class="">Total amount</div>
          <div class="font-bold">$4</div>
        </div>

        <div class="text-xs text-gray-400 mt-4">
          You will be charged $4 every month while this subscription is active.
          Cancel any time.
        </div>
      </Field>

      <p
        class="bg-red-100 text-red-800 text-sm my-4 p-4 rounded border border-red-700"
        v-if="state.error"
      >
        {{ state.error }}
      </p>

      <div class="flex flex-row justify-between items-center">
        <Button @click="onBack" :disabled="isBusy">Back</Button>
        <Button type="submit" appearance="primary" :isLoading="isBusy"
          >Next</Button
        >
      </div>
    </form>
  </Layout>
</template>

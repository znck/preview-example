<script lang="ts">
/// <reference types="stripe-v3" />
import { useStripe } from '../stripe'
import Button from './Button.vue'
import Field from './Field.vue'
import {
  defineComponent,
  onMounted,
  ref,
  markRaw,
  getCurrentInstance,
} from 'vue'
import { asyncComputed } from '../utilities'

const style = {
  base: {
    color: '#32325d',
    fontFamily: 'Inter, "Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4',
    },
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a',
  },
}

let stripeCard: stripe.elements.Element

export default defineComponent({
  props: {
    modelValue: {},
  },
  components: { Button, Field },
  methods: {
    focus() {
      if (stripeCard) {
        stripeCard.focus()
      } else {
        setTimeout(() => {
          this.focus()
        }, 250)
      }
    },
  },
  setup(props, { emit }) {
    const stripeAsPromise = useStripe()
    const el = ref<HTMLDivElement | null>(null)

    onMounted(async () => {
      const stripe = await stripeAsPromise
      const elements = stripe.elements()
      stripeCard = elements.create('card', { classes: { base: 'my-4' } })

      emit('update:modelValue', markRaw(stripeCard))
      stripeCard.mount(el.value)
      stripeCard.addEventListener('change', (response) => {
        if (response && response.error) {
          emit('error', response.error.message || 'Unknown error from stripe.')
        } else {
          emit('error', null)
        }
      })
    })

    return {
      card: el,
    }
  },
})
</script>

<template>
  <Field v-bind="$attrs">
    <template v-slot="{ id }">
      <div ref="card" :id="id" />
    </template>
    <template #subtitle>
      <slot name="subtitle" />
    </template>
  </Field>
</template>

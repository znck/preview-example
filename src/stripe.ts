// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="stripe-v3" />
import { ref, watchEffect } from 'vue'

let isScriptInjected = false
const isStripeReadyRef = ref(false)

function getStripeKey(): string {
  const isProd = /^(app\.|)thesemetrics\.org$/.test(document.location.hostname)

  return isProd
    ? 'pk_live_BdCdqNkxB1WyET7G0Gdt8eXR00oTqrUDBe'
    : 'pk_test_1W7nKssSkZCEcLoQ8K7akUj100ZuiI2AUU'
}

const stripeClientPromised = new Promise<stripe.Stripe>((resolve) => {
  watchEffect(() => {
    if (isStripeReadyRef.value) {
      const Stripe: stripe.StripeStatic = (window as any).Stripe
      resolve(Stripe(getStripeKey()))
    }
  })
})

export async function useStripe(): Promise<stripe.Stripe> {
  if (!isScriptInjected) {
    isScriptInjected = true

    const script = document.createElement('script')

    script.src = 'https://js.stripe.com/v3/'
    script.onload = async () => {
      await ensureStripe()
      isStripeReadyRef.value = true
    }

    document.head.appendChild(script)
  }

  return await stripeClientPromised
}

async function ensureStripe(): Promise<void> {
  const handle: (done: () => void) => void = (done) => {
    if ('Stripe' in window && typeof (window as any).Stripe === 'function') {
      done()
    } else {
      setTimeout(handle, 16)
    }
  }

  return new Promise<void>((resolve) => handle(resolve))
}

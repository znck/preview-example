<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { getAPIBaseURL } from '../utilities'

export default defineComponent({
  setup() {
    const token = ref<string | null>(null)
    const isReady = computed(() => !!token.value)

    fetch(getAPIBaseURL() + `/passwordless/csrf`, {
      credentials: 'include',
      mode: 'cors',
    }).then((response) => {
      token.value = response.headers.get('x-csrf-token')
    })

    return { isReady, token, getBaseURL: getAPIBaseURL }
  },
})
</script>

<template>
  <section class="flex flex-col items-center p-4 justify-center text-lg">
    <form
      :action="getBaseURL() + '/passwordless/github?_csrf=' + token"
      method="POST"
      class="my-2 w-full"
    >
      <button
        type="submit"
        style="background-color: #000000; border-color: #000000"
        class="pl-6 pr-10 py-2 w-full rounded text-white flex flex-row items-center border-2 font-display font-black tracking-wide"
        :disabled="!isReady"
      >
        <img
          src="../assets/services/github.svg"
          class="inline-block w-8 mx-2"
        />
        <div class="inline-block -mb-1">Sign in with Github</div>
      </button>
    </form>

    <form
      :action="getBaseURL() + '/passwordless/google?_csrf=' + token"
      method="POST"
      class="my-2 w-full"
    >
      <button
        type="submit"
        style="background-color: #ffffff; border-color: #000000"
        class="pl-6 pr-10 py-2 w-full rounded text-black flex flex-row items-center border-2 font-display font-black tracking-wide"
        :disabled="!isReady"
      >
        <img
          src="../assets/services/google.svg"
          class="inline-block w-8 mx-2"
        />
        <div class="inline-block -mb-1">Sign in with Google</div>
      </button>
    </form>
  </section>
</template>

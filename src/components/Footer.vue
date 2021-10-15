<script lang="ts">
import { defineComponent, watchEffect } from 'vue'
import ExternalLink from './ExternalLink.vue'
export default defineComponent({
  components: { ExternalLink },
})
</script>

<template>
  <div class="flex flex-row flex-wrap">
    <div class="w-full md:w-1/3">
      <RouterLink
        to="/"
        class="font-display text-3xl font-black flex flex-row items-center my-10 cursor-pointer"
      >
        <img
          src="../assets/logo.svg"
          alt="TheseMetrics"
          class="inline-block h-10 w-10 mr-4 mb-1"
        />
        <span>TheseMetrics</span>
      </RouterLink>

      <nav class="hidden md:block -mt-4">
        <ul class="flex flex-row md:flex-col justify-center">
          <li class="mx-4 md:my-2 md:mx-0">
            <ExternalLink href="https://twitter.com/@TheseMetrics"
              >Twitter</ExternalLink
            >
          </li>
          <li class="mx-4 md:my-2 md:mx-0">
            <ExternalLink href="mailto:hey@thesemetrics.org"
              >Contact</ExternalLink
            >
          </li>
        </ul>
      </nav>
    </div>

    <div class="w-1/2 md:w-1/3">
      <nav class="md:mt-16 md:border-l border-gray-200 pl-4">
        <header class="font-display font-black text-2xl">Product</header>

        <ul>
          <li class="my-4">
            <ExternalLink
              href="https://app.thesemetrics.org/dashboard/thesemetrics.org"
              >Demo</ExternalLink
            >
          </li>

          <li class="my-4">
            <ExternalLink href="https://thesemetrics.org/pricing"
              >Pricing</ExternalLink
            >
          </li>

          <li class="my-4">
            <span class="opacity-0 not-sr-only">empty</span>
          </li>
        </ul>
      </nav>
    </div>

    <div class="w-1/2 md:w-1/3">
      <nav class="md:mt-16 md:border-l border-gray-200 pl-4">
        <header class="font-display font-black text-2xl">Privacy</header>

        <ul>
          <li class="my-4">
            <ExternalLink href="https://thesemetrics.org/privacy"
              >Privacy Policy</ExternalLink
            >
          </li>

          <li class="my-4">
            <ExternalLink href="https://thesemetrics.org/what-we-collect"
              >What we collect</ExternalLink
            >
          </li>

          <li class="my-4">
            <ExternalLink href="https://thesemetrics.org/terms"
              >Terms of use</ExternalLink
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>

  <nav class="md:hidden">
    <ul class="flex flex-row md:flex-col justify-start mb-4">
      <li class="mx-4 md:my-2 md:mx-0">
        <ExternalLink href="https://twitter.com/@TheseMetrics"
          >Twitter</ExternalLink
        >
      </li>
      <li class="mx-4 md:my-2 md:mx-0">
        <ExternalLink href="mailto:hey@thesemetrics.org">Contact</ExternalLink>
      </li>
    </ul>
  </nav>

  <div class="text-gray-600 text-sm text-left ml-4 md:ml-0">
    &copy; 2020 TheseMetrics, znck pvt. ltd.
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Footer from '../components/Footer.vue'
import Layout from '../components/Layout.vue'
import LoginForm from '../components/LoginForm.vue'

export default defineComponent({
  components: { Layout, LoginForm, Footer },
  setup() {},
})
</script>

<template>
  <Layout>
    <template #default>
      <div class="mx-auto mt-16 mb-32" style="max-width: 333px">
        <h1 class="text-4xl text-center mb-12">Get started for Free!</h1>

        <LoginForm />
      </div>
    </template>

    <template #footer>
      <Footer />
    </template>
  </Layout>
</template>

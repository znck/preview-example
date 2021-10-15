<script lang="ts">
import { defineComponent } from 'vue'
import Layout from '../components/Layout.vue'
import { useRouter } from 'vue-router'
import { projects } from '../graphql'

export default defineComponent({
  components: { Layout },
  setup() {
    const router = useRouter()
    projects().then((projects) => {
      if (projects.length) {
        router.replace({
          name: 'dashboard',
          params: { domain: projects[0].domain },
        })
      } else {
        router.replace({ name: 'create' })
      }
    })
  },
})
</script>

<template>
  <Layout />
</template>

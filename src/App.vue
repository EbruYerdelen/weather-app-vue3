<template>
  <v-app>
    <Navbar v-if="shouldShow" />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script>
  import { useRoute } from 'vue-router'
  import Navbar from './components/Navbar.vue'
  import { computed } from 'vue'

  export default {
    components: {
      Navbar,
    },
    setup() {
      const route = useRoute()
      const shouldShow = computed(() => {
        return route.path !== '/login' && route.path !== '/'
      })
      return {
        shouldShow,
      }
    },
  }
</script>

<style scoped></style>

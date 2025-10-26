<template>
  <v-navigation-drawer expand-on-hover permanent rail class="bg-pink-lighten-5 text-pink-darken-1">
    <v-list>
      <v-list-item
        :prepend-avatar="butterfly"
        :subtitle="authStore.user?.email"
        :title="'Welcome ' + capitalize(authStore.user?.name || 'User')"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <div>
      <v-list density="compact" nav v-model="selected">
        <v-list-item
          prepend-icon="mdi-account"
          title="My Profile"
          value="myprofile"
          :to="{ path: '/profile' }"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-home"
          title="Home Page"
          value="home"
          :to="{ path: '/home' }"
        ></v-list-item>
      </v-list>

      <div class="pa-4">
        <v-tooltip text="Logout" location="bottom">
          <template v-slot:activator="{ props }">
            <v-icon v-bind="props" @click="handleLogout" class="text-red cursor-pointer">
              mdi-logout
            </v-icon>
          </template>
        </v-tooltip>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
  import { useAuthStore } from '@/stores/auth'
  import { ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { capitalize } from '@/helpers/capitalize'
  import butterfly from '/src/assets/images/butterfly_6639361.png'

  export default {
    setup() {
      const authStore = useAuthStore()
      const router = useRouter()
      const route = useRoute()
      const selected = ref(null)

      const routeToNavMap = {
        '/profile': 'myprofile',
        '/home': 'home',
      }

      const updateSelection = () => {
        selected.value = routeToNavMap[route.path]
      }

      watch(() => route.path, updateSelection, { immediate: true })

      const handleLogout = () => {
        try {
          authStore.logout()
          router.push('/login')
        } catch (error) {
          console.error('Logout failed:', error)
        }
      }

      return {
        authStore,
        selected,
        handleLogout,
        capitalize,
        butterfly,
      }
    },
  }
</script>

<style scoped></style>

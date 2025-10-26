<template>
  <v-navigation-drawer expand-on-hover permanent rail class="bg-pink-lighten-5 text-pink-darken-1">
    <v-list>
      <v-list-item
        prepend-avatar="/src/assets/images/butterfly_6639361.png"
        :subtitle="authStore.user?.email"
        :title="'Welcome ' + (authStore.user?.name || 'User')"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <div>
      <v-list density="compact" nav v-model="selected">
        <v-list-item
          prepend-icon="mdi-account"
          title="My Profile"
          value="myprofile"
          @click="navigateTo('/profile')"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-home"
          title="Home Page"
          value="home"
          @click="navigateTo('/home')"
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
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  export default {
    setup() {
      const authStore = useAuthStore()
      const router = useRouter()
      const selected = ref(null)

      const navigateTo = (path) => {
        router.push(path)
      }

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
        navigateTo,
        selected,
        handleLogout,
      }
    },
  }
</script>

<style scoped></style>

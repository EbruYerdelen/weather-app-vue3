<template>
  <v-row class="home-page" justify="center" align="center">
    <v-col cols="12" md="8" lg="6">
      <v-card class="mb-6 glass-card" elevation="4">
        <v-card-title class="text-pink-darken-1 d-flex align-center justify-space-between">
          <div class="d-flex align-center">
            <v-icon>mdi-account-circle</v-icon>
            <p class="pa-2">
              Hello {{ authStore.user?.name || 'User' }}!
              <span v-if="lastWeatherData">
                Today in {{ lastWeatherData.city }},weather is {{ lastWeatherData.theme }}.
              </span>
              <span v-else>Welcome to your profile.</span>
            </p>
          </div>
          <v-tooltip text="Logout" location="bottom">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" @click="handleLogout" class="text-red cursor-pointer">
                mdi-logout
              </v-icon>
            </template>
          </v-tooltip>
        </v-card-title>
        <v-card-subtitle class="text-pink-darken-1">
          • {{ authStore.user?.name || 'User' }} • {{ authStore.user?.email }}
        </v-card-subtitle>
        <v-card-text v-if="lastWeatherData">
          <div class="text-center mb-4">
            <div class="text-h2 text-pink-darken-1 font-weight-bold">
              {{ lastWeatherData.temperature }}°C
            </div>
          </div>

          <v-list lines="two" density="compact">
            <v-list-item>
              <template v-slot:prepend>
                <v-icon icon="mdi-city"></v-icon>
              </template>
              <v-list-item-title>City</v-list-item-title>
              <v-list-item-subtitle>{{ lastWeatherData.city }}</v-list-item-subtitle>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon icon="mdi-clock-outline"></v-icon>
              </template>
              <v-list-item-title>Last Updated</v-list-item-title>
              <v-list-item-subtitle>
                {{ formatDate(lastWeatherData.timestamp) }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-card-text class="pa-6 text-center" v-else>
          <v-icon icon="mdi-weather-cloudy-alert" size="64" color="grey" class="mb-4"></v-icon>
          <p class="text-body-1 text-grey-darken-1">
            No weather data available. Visit the home page to get current condition of a city.
          </p>
          <v-btn
            variant="tonal"
            color="pink-darken-1"
            prepend-icon="mdi-weather-partly-cloudy"
            @click="$router.push('/home')"
            class="mt-3"
          >
            Get Weather
          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import { useAuthStore } from '@/stores/auth'
  import { useWeatherStore } from '@/stores/weather'
  import { computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'

  export default {
    setup() {
      const authStore = useAuthStore()
      const weatherStore = useWeatherStore()
      const router = useRouter()

      const lastWeatherData = computed(() => {
        return weatherStore.lastWeatherData
      })

      const formatDate = (dateString) => {
        if (!dateString) return 'N/A'

        const date = new Date(dateString)
        return date.toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      }

      const handleLogout = () => {
        try {
          authStore.logout()
          router.push('/login')
        } catch (error) {
          console.error('Logout failed:', error)
        }
      }
      onMounted(() => {
        weatherStore.loadLastWeatherData()
      })

      return {
        authStore,
        weatherStore,
        lastWeatherData,
        formatDate,
        handleLogout,
      }
    },
  }
</script>

<style></style>

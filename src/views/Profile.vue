<template>
  <v-row class="home-page" justify="center" align="center">
    <v-col cols="10" md="7" lg="6">
      <v-card class="mb-6 glass-card" elevation="4">
        <v-card-title
          class="pa-4 text-pink-darken-1 d-flex align-center justify-space-between line-height"
        >
          <v-row>
            <v-col cols="12" sm="10" :class="$vuetify.display.xs && 'profile-title'">
              <div class="d-flex align-center">
                <v-icon v-if="$vuetify.display.smAndUp">mdi-account-circle</v-icon>
                <div class="d-flex flex-wrap ga-1" :class="!$vuetify.display.xs && 'pl-2'">
                  <span>Hello {{ capitalize(authStore.user?.name || 'User') }}!</span>
                  <span v-if="lastWeatherData">Today in {{ lastWeatherData.city }},</span>
                  <span v-if="lastWeatherData">weather is {{ lastWeatherData.theme }}.</span>
                  <span v-else>Welcome.</span>
                </div>
              </div>
            </v-col>
            <v-col
              v-if="$vuetify.display.mdAndUp"
              cols="1"
              sm="2"
              class="d-flex justify-end align-center"
            >
              <v-tooltip text="Logout" location="bottom">
                <template v-slot:activator="{ props }">
                  <v-icon v-bind="props" @click="handleLogout" class="text-red cursor-pointer">
                    mdi-logout
                  </v-icon>
                </template>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-subtitle class="text-pink-darken-1 d-flex ga-1 flex-wrap">
          <span>• {{ authStore.user?.name || 'User' }}</span>
          <span>• {{ authStore.user?.email }}</span>
        </v-card-subtitle>
        <v-card-text v-if="lastWeatherData">
          <div class="text-center mb-4">
            <div
              class="text-pink-darken-1 font-weight-bold"
              :class="$vuetify.display.xs ? 'text-h3' : 'text-h2'"
            >
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
              <v-list-item-subtitle class="d-flex flex-wrap">
                {{ formatDate(lastWeatherData.timestamp) }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-card-text class="pa-6 text-center" v-else>
          <v-icon icon="mdi-weather-cloudy-alert" size="64" color="grey" class="mb-4"></v-icon>
          <p class="text-body-1 text-grey-darken-1" :class="$vuetify.display.xs && 'text-body-2'">
            No weather data available. Visit the home page to get current condition of a city.
          </p>
          <v-btn
            variant="tonal"
            color="pink-darken-1"
            :size="$vuetify.display.xs ? 'small' : 'default'"
            prepend-icon="mdi-weather-partly-cloudy"
            :to="{ path: '/home' }"
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
  import { capitalize } from '@/helpers/capitalize'

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
        capitalize,
      }
    },
  }
</script>

<style scoped>
  .profile-title {
    font-size: 18px !important;
    line-height: 23px;
  }

  .line-height {
    line-height: 23px;
  }
</style>

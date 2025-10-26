<template>
  <div class="home-page d-flex justify-center align-center" :class="`theme-${currentTheme}`">
    <v-container class="py-8">
      <v-row justify="center">
        <v-col cols="12" md="7" lg="6">
          <v-card class="mb-6 glass-card" elevation="4">
            <v-card-title class="text-pink-darken-1">
              <span v-if="!$vuetify.display.xs">Where Do You Want To Fly?</span>
              <span v-if="$vuetify.display.xs" class="d-flex align-center ga-1">
                <span>Let's go</span>
                <v-icon size="xsmall">mdi-butterfly</v-icon>
              </span>
            </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="searchWeather">
                <v-row>
                  <v-col cols="12" sm="9">
                    <v-text-field
                      v-model="citySearch"
                      label="Enter city name"
                      prepend-inner-icon="mdi-magnify"
                      variant="underlined"
                      :loading="weatherStore.loading"
                    />
                  </v-col>
                  <v-col cols="5" sm="3">
                    <v-btn
                      type="submit"
                      variant="tonal"
                      color="pink-darken-1"
                      :size="$vuetify.display.xs ? 'small' : 'default'"
                      :prepend-icon="$vuetify.display.smAndUp ? 'mdi-butterfly' : ''"
                      :loading="weatherStore.loading"
                    >
                      Fly!
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>

          <v-alert
            v-if="weatherStore.error"
            type="error"
            class="mb-6"
            closable
            @click:close="weatherStore.error = null"
          >
            {{ weatherStore.error }}
          </v-alert>

          <v-card v-if="weatherStore.loading" class="pa-6 text-center">
            <v-progress-circular indeterminate size="64" color="primary" />
            <p class="mt-4">Loading weather data...</p>
          </v-card>

          <v-card
            v-else-if="weatherStore.currentWeather"
            class="weather-card glass-card"
            elevation="8"
          >
            <v-card-text class="pa-4 text-pink-darken-1">
              <div class="text-center">
                <h2 :class="$vuetify.display.xs ? 'text-h5' : 'text-h4'">
                  {{ weatherStore.currentWeather.city }}
                </h2>
                <div
                  class="temperature"
                  :class="{
                    'text-h3': $vuetify.display.xs,
                    'text-h2': $vuetify.display.sm,
                    'text-h1': $vuetify.display.smAndUp,
                  }"
                >
                  {{ weatherStore.currentWeather.temperature }}°C
                </div>
                <h3 :class="$vuetify.display.xs ? 'text-subtitle-1' : ''">
                  Weather is {{ capitalize(currentTheme) }}
                </h3>
                <img
                  width="150"
                  :src="weatherStore.currentWeather.icon"
                  :alt="currentTheme + 'icon'"
                />
              </div>
            </v-card-text>
          </v-card>

          <v-card v-else class="pa-6 text-center glass-card">
            <v-icon size="64" class="mb-4">mdi-weather-cloudy</v-icon>
            <h3>No Weather Data</h3>
            <p>Fly to a city to see current weather condition</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import { ref, computed } from 'vue'
  import { useWeatherStore } from '@/stores/weather'
  import { capitalize } from '@/helpers/capitalize'

  export default {
    setup() {
      const weatherStore = useWeatherStore()
      const citySearch = ref('')

      const currentTheme = computed(() => {
        return weatherStore.currentWeather?.theme || 'unknown'
      })

      const searchWeather = async () => {
        if (!citySearch.value.trim()) return

        try {
          const city = await weatherStore.searchCity(citySearch.value.trim())
          await weatherStore.fetchWeather(city.latitude, city.longitude, city.name)
        } catch (error) {
          console.error('Weather search failed:', error)
        }
      }
      return {
        weatherStore,
        citySearch,
        currentTheme,
        searchWeather,
        capitalize,
      }
    },
  }
</script>

<style>
  .home-page {
    min-height: 100vh;
    transition: all 0.5s ease;
  }

  .glass-card {
    background: #f8e6ec !important;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .temperature {
    font-size: 4rem;
    font-weight: 300;
  }

  .weather-details {
    margin-top: 2rem;
  }

  .theme-sunny {
    background: linear-gradient(135deg, #f6d465c9 0%, #fd9f85e1 100%);
  }

  .theme-cloudy {
    background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  }

  .theme-rainy {
    background: linear-gradient(135deg, #9dacd3b4 0%, #025886b7 100%);
  }

  .theme-snowy {
    background: linear-gradient(135deg, #eff4fd 0%, #b5bdc9 100%);
  }

  .theme-stormy {
    background: linear-gradient(135deg, #2c3e50dc 0%, #4a6741c0 100%);
  }
</style>

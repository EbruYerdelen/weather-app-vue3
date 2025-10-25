import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useWeatherStore = defineStore('weather', () => {
  const currentWeather = ref(null)
  const selectedCity = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const weatherThemes = {
    0: { theme: 'sunny' },
    1: { theme: 'sunny' },
    2: { theme: 'cloudy' },
    3: { theme: 'cloudy' },
    45: { theme: 'cloudy' },
    48: { theme: 'cloudy' },
    51: { theme: 'rainy' },
    53: { theme: 'rainy' },
    55: { theme: 'rainy' },
    61: { theme: 'rainy' },
    63: { theme: 'rainy' },
    65: { theme: 'rainy' },
    71: { theme: 'snowy' },
    73: { theme: 'snowy' },
    75: { theme: 'snowy' },
    77: { theme: 'snowy' },
    80: { theme: 'rainy' },
    81: { theme: 'rainy' },
    82: { theme: 'rainy' },
    85: { theme: 'snowy' },
    86: { theme: 'snowy' },
    95: { theme: 'stormy' },
    96: { theme: 'stormy' },
    99: { theme: 'stormy' },
  }

  async function searchCity(cityName) {
    try {
      loading.value = true
      error.value = null

      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`
      )
      const data = await response.json()

      if (data.results && data.results.length > 0) {
        return data.results[0]
      } else {
        throw new Error('City not found')
      }
    } catch (err) {
      error.value = 'Failed to search city'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchWeather(latitude, longitude, cityName) {
    try {
      loading.value = true
      error.value = null

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
      )
      const data = await response.json()

      const weatherCode = data.current.weather_code
      const theme = weatherThemes[weatherCode] || { theme: 'unknown' }

      currentWeather.value = {
        temperature: data.current.temperature_2m,
        weatherCode: weatherCode,
        theme: theme.theme,
        city: cityName,
        timestamp: new Date().toISOString(),
      }

      selectedCity.value = cityName
    } catch (err) {
      error.value = 'Failed to fetch weather data'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    currentWeather,
    selectedCity,
    loading,
    error,
    searchCity,
    fetchWeather,
  }
})

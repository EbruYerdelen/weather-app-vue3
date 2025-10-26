import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useWeatherStore = defineStore('weather', () => {
  const currentWeather = ref(null)
  const lastWeatherData = ref(null)
  const selectedCity = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const weatherThemes = {
    0: { theme: 'sunny', icon: '/src/assets/images/sunny.png' },
    1: { theme: 'sunny', icon: '/src/assets/images/sunny.png' },
    2: { theme: 'cloudy', icon: '/src/assets/images/cloudy.png' },
    3: { theme: 'cloudy', icon: '/src/assets/images/cloudy.png' },
    45: { theme: 'cloudy', icon: '/src/assets/images/cloudy.png' },
    48: { theme: 'cloudy', icon: '/src/assets/images/cloudy.png' },
    51: { theme: 'rainy', icon: '/src/assets/images/rainy.png' },
    53: { theme: 'rainy', icon: '/src/assets/images/rainy.png' },
    55: { theme: 'rainy', icon: '/src/assets/images/rainy.png' },
    61: { theme: 'rainy', icon: '/src/assets/images/rainy.png' },
    63: { theme: 'rainy', icon: '/src/assets/images/rainy.png' },
    65: { theme: 'rainy', icon: '/src/assets/images/rainy.png' },
    71: { theme: 'snowy', icon: '/src/assets/images/snowy.png' },
    73: { theme: 'snowy', icon: '/src/assets/images/snowy.png' },
    75: { theme: 'snowy', icon: '/src/assets/images/snowy.png' },
    77: { theme: 'snowy', icon: '/src/assets/images/snowy.png' },
    80: { theme: 'rainy', icon: '/src/assets/images/rainy.png' },
    81: { theme: 'rainy', icon: '/src/assets/images/rainy.png' },
    82: { theme: 'rainy', icon: '/src/assets/images/rainy.png' },
    85: { theme: 'snowy', icon: '/src/assets/images/snowy.png' },
    86: { theme: 'snowy', icon: '/src/assets/images/snowy.png' },
    95: { theme: 'stormy', icon: '/src/assets/images/stormy.png' },
    96: { theme: 'stormy', icon: '/src/assets/images/stormy.png' },
    99: { theme: 'stormy', icon: '/src/assets/images/stormy.png' },
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
      const theme = weatherThemes[weatherCode] || { theme: 'unknown', icon: 'unknown' }

      currentWeather.value = {
        temperature: data.current.temperature_2m,
        weatherCode: weatherCode,
        theme: theme.theme,
        city: cityName,
        icon: theme.icon,
        timestamp: new Date().toISOString(),
      }

      lastWeatherData.value = { ...currentWeather.value }
      localStorage.setItem('lastWeatherData', JSON.stringify(currentWeather.value))
      selectedCity.value = cityName
    } catch (err) {
      error.value = 'Failed to fetch weather data'
      throw err
    } finally {
      loading.value = false
    }
  }

  function loadLastWeatherData() {
    const stored = localStorage.getItem('lastWeatherData')
    if (stored) {
      try {
        lastWeatherData.value = JSON.parse(stored)
      } catch (error) {
        console.error('Failed to parse stored weather data:', error)
        localStorage.removeItem('lastWeatherData')
      }
    }
  }

  return {
    currentWeather,
    lastWeatherData,
    selectedCity,
    loading,
    error,
    searchCity,
    fetchWeather,
    loadLastWeatherData,
  }
})

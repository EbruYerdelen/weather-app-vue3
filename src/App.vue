<template>
  <router-view></router-view>
</template>

<script>
  //if you put setup here in script,it'll export default in the bg
  import { ref, computed, onMounted } from 'vue'
  import { useWeatherStore } from './stores/weather'

  export default {
    setup() {
      const count = ref(0)
      const text = ref('helloo')
      const weatherStore = useWeatherStore()

      const clickme = async () => {
        try {
          const city = await weatherStore.searchCity('London')
          await weatherStore.fetchWeather(city.latitude, city.longitude, city.name)
        } catch (error) {
          console.error('Weather search failed:', error)
        }
      }

      return {
        count,
        text,
        clickme,
      }
    },
  }
</script>

<style scoped></style>

import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(JSON.parse(localStorage.getItem('isAuthenticated') || 'false'))
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))

  function login(email, password, name) {
    if (email === 'test@demo.com' && password === 'Test1234') {
      const userData = {
        name: name,
        email: email,
      }

      isAuthenticated.value = true
      user.value = userData

      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('user', JSON.stringify(userData))

      return true
    }
    return false
  }

  function logout() {
    isAuthenticated.value = false
    user.value = null

    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
  }

  return {
    isAuthenticated,
    user,
    login,
    logout,
  }
})

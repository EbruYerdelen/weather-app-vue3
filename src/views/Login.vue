<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8">
        <v-card elevation="4" class="bg-pink-lighten-5">
          <v-card-title class="d-flex align-center justify-center pa-6">
            <v-avatar size="30">
              <v-img src="/src/assets/images/butterfly_6639361.png" alt="weatherfly-logo" />
            </v-avatar>
            <h2 class="text-pink-darken-1 text-h5 text-md-h4">Welcome To WeatherFly!</h2>
            <v-avatar size="30">
              <v-img src="/src/assets/images/butterfly_6639361.png" alt="weatherfly-logo" />
            </v-avatar>
          </v-card-title>

          <v-form class="pa-8" @submit.prevent="handleLogin">
            <v-text-field
              v-model="name"
              label="Name"
              prepend-inner-icon="mdi-account"
              variant="underlined"
              :error-messages="nameErrors"
              class="mb-3"
            />

            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              prepend-inner-icon="mdi-email"
              variant="underlined"
              :error-messages="emailErrors"
              class="mb-3"
            />

            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              prepend-inner-icon="mdi-lock"
              variant="underlined"
              :error-messages="passwordErrors"
              class="mb-3"
            />

            <v-alert v-if="loginError" type="error" class="mb-3">{{ loginError }}</v-alert>

            <div class="d-flex justify-end">
              <v-btn
                variant="tonal"
                type="submit"
                color="pink-darken-1"
                prepend-icon="mdi-login"
                :loading="loading"
              >
                Login
              </v-btn>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { useAuthStore } from '@/stores/auth'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  export default {
    setup() {
      const router = useRouter()
      const authStore = useAuthStore()

      const email = ref('')
      const name = ref('')
      const password = ref('')
      const loading = ref(false)
      const loginError = ref('')
      const nameErrors = ref([])
      const emailErrors = ref([])
      const passwordErrors = ref([])

      const validateForm = () => {
        emailErrors.value = []
        passwordErrors.value = []

        if (!email.value) {
          emailErrors.value.push('Email is required')
        }

        if (!password.value) {
          passwordErrors.value.push('Password is required')
        }

        if (!name.value) {
          nameErrors.value.push('Name is required')
        }

        return (
          emailErrors.value.length === 0 &&
          passwordErrors.value.length === 0 &&
          nameErrors.value.length === 0
        )
      }

      const handleLogin = async () => {
        if (!validateForm()) return

        loading.value = true
        loginError.value = ''

        try {
          const success = authStore.login(email.value, password.value, name.value)

          if (success) {
            router.push('/home')
          } else {
            loginError.value = 'Invalid email or password'
          }
        } catch (error) {
          loginError.value = 'Login failed. Please try again.'
        } finally {
          loading.value = false
        }
      }

      return {
        email,
        name,
        password,
        loading,
        loginError,
        nameErrors,
        emailErrors,
        passwordErrors,
        handleLogin,
      }
    },
  }
</script>

<style></style>

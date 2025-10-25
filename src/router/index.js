import { useAuthStore } from '@/stores/auth'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Profile from '@/views/Profile.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'App',
    redirect: '/login',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { authRequired: true },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { authRequired: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { authRequired: false },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.authRequired && !authStore.isAuthenticated) {
    next('/login')
  } else if (!to.meta.authRequired && authStore.isAuthenticated) {
    next('/home')
  } else {
    next()
  }
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WeatherInfo from '@/views/WeatherInfo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/weather',
      name: 'weather',
      component: WeatherInfo
    }
  ]
})

export default router

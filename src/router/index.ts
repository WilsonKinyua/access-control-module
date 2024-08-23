import { createRouter, createWebHistory } from 'vue-router'
import store from '../store';
import DashboardView from '@/views/DashboardView.vue'
import AuthView from '@/views/AuthView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
      beforeEnter: (to, from, next) => {
        if (store.getters['auth/isAuthenticated']) {
          next({ name: 'dashboard' })
        } else {
          next()
        }
      }
    }
  ]
})

export default router

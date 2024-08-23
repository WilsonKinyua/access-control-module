import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import DashboardView from '@/views/DashboardView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import UsersView from '@/views/UsersView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
      beforeEnter: (to, from, next) => {
        if (store.getters['auth/isAuthenticated']) {
          next();
        } else {
          next({ name: 'auth' });
        }
      }
    },
    {
      path: '/auth/login',
      name: 'auth',
      component: LoginView,
      beforeEnter: (to, from, next) => {
        if (store.getters['auth/isAuthenticated']) {
          next({ name: 'dashboard' });
        } else {
          next();
        }
      }
    },
    {
      path: '/auth/register',
      name: 'register',
      component: RegisterView,
      beforeEnter: (to, from, next) => {
        if (store.getters['auth/isAuthenticated']) {
          next({ name: 'dashboard' });
        } else {
          next();
        }
      }
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView,
      beforeEnter: (to, from, next) => {
        if (store.getters['auth/isAuthenticated']) {
          next();
        } else {
          next({ name: 'auth' });
        }
      }
    },
  ]
});

export default router;
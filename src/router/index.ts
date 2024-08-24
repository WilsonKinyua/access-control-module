import { createRouter, createWebHistory } from "vue-router";
import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import store from "../store";

const DashboardView = () => import("@/views/DashboardView.vue");
const LoginView = () => import("@/views/LoginView.vue");
const RegisterView = () => import("@/views/RegisterView.vue");
const UsersView = () => import("@/views/UsersView.vue");
const ProjectsView = () => import("@/views/ProjectsView.vue");

const ifAuthenticated = (
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (store.getters["auth/isAuthenticated"]) {
    next();
  } else {
    next({ name: "auth" });
  }
};

const ifNotAuthenticated = (
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (store.getters["auth/isAuthenticated"]) {
    next({ name: "dashboard" });
  } else {
    next();
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: DashboardView,
      beforeEnter: ifAuthenticated,
    },
    {
      path: "/auth/login",
      name: "auth",
      component: LoginView,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: "/auth/register",
      name: "register",
      component: RegisterView,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: "/projects",
      name: "projects",
      component: ProjectsView,
      beforeEnter: ifAuthenticated,
    },
    {
      path: "/users",
      name: "users",
      component: UsersView,
      beforeEnter: ifAuthenticated,
    },
  ],
});

export default router;
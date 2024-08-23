<script setup lang="ts">
import { computed } from "vue";
// @ts-ignore
import { useStore } from "vuex";
import MainNav from "@/components/MainNav.vue";
import ThemeToggle from "@/components/ThemeToggle.vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserNav from "@/components/UserNav.vue";
import UserTable from "@/components/UserTable.vue";

const store = useStore();
const users = computed(() => store.getters["users/allUsers"]);
const userRole = computed(() => store.getters["auth/userRole"]);

// fetch users from the store
const fetchUsers = () => {
  store.dispatch("users/fetchUsers");
};

fetchUsers();
</script>

<template>
  <div class="flex-col flex">
    <div class="border-b">
      <div class="flex h-16 items-center px-4">
        <MainNav class="mx-6" />
        <div class="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </div>
  </div>
  <main class="container mx-auto space-y-4 pt-10">
    <h1 class="text-2xl font-semibold">Dashboard</h1>
    <div class="grid gap-4 lg:grid-cols-2">
      <Card
        class="bg-primary text-white"
        v-if="userRole === 'Admin' || userRole === 'Project Manager'"
      >
        <CardHeader
          class="flex flex-row items-center justify-between space-y-0 pb-2"
        >
          <CardTitle class="text-sm font-medium"> Users </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            class="h-4 w-4 text-white"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ users.length }}
          </div>
        </CardContent>
      </Card>
      <Card class="bg-black text-white">
        <CardHeader
          class="flex flex-row items-center justify-between space-y-0 pb-2"
        >
          <CardTitle class="text-sm font-medium"> Projects </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            class="h-4 w-4 text-white"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ "00" }}
          </div>
        </CardContent>
      </Card>
    </div>
    <div
      class="space-y-5"
      v-if="userRole === 'Admin' || userRole === 'Project Manager'"
    >
      <div class="flex justify-between items-center">
        <h2 class="lg:text-xl font-bold tracking-tight">Latest Users</h2>
      </div>
      <UserTable :limit="5" />
    </div>
  </main>
</template>

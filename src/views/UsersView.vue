<script setup lang="ts">
import { computed } from "vue";
// @ts-ignore
import { useStore } from "vuex";
import MainNav from "@/components/MainNav.vue";
import ThemeToggle from "@/components/ThemeToggle.vue";
import UserNav from "@/components/UserNav.vue";
import UserTable from "@/components/UserTable.vue";
import { TriangleAlert } from "lucide-vue-next";

const store = useStore();
const userRole = computed(() => store.getters["auth/userRole"]);
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
    <div
      class="space-y-5"
      v-if="userRole === 'Admin' || userRole === 'Project Manager'"
    >
      <div class="flex justify-between items-center">
        <h2 class="lg:text-xl font-bold tracking-tight">Users</h2>
      </div>
      <UserTable />
    </div>
    <div v-else class="flex justify-center items-center h-96">
      <div>
        <TriangleAlert class="w-40 h-40 text-red-500 mx-auto" />
        <p class="text-lg text-red-500">
          You do not have permission to view this page
        </p>
      </div>
    </div>
  </main>
</template>

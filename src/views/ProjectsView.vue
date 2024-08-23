<script setup lang="ts">
import MainNav from "@/components/MainNav.vue";
import ThemeToggle from "@/components/ThemeToggle.vue";
import UserNav from "@/components/UserNav.vue";
import ProjectTable from "@/components/ProjectTable.vue";
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
    <div class="space-y-5">
      <div class="flex justify-between items-center">
        <h2 class="lg:text-xl font-bold tracking-tight">Projects</h2>
      </div>
      <ProjectTable />
    </div>
  </main>
</template>

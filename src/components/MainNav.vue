<script setup lang="ts">
import { cn } from "@/lib/utils";
import { RouterLink } from "vue-router";
</script>

<template>
  <nav
    :class="
      cn(
        'flex items-center space-x-4 lg:space-x-8 container',
        $attrs.class ?? ''
      )
    "
  >
    <RouterLink
      to="/"
      class="text-sm font-medium transition-colors hover:text-primary"
    >
      Dashboard
    </RouterLink>
    <RouterLink
      to="/projects"
      class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
      Projects
    </RouterLink>
    <RouterLink
      to="/users"
      class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
      Users
    </RouterLink>
  </nav>
</template>

<template>
  <div class="bg-warm-white text-text-primary min-h-screen flex flex-col">
    <nav class="sticky top-0 bg-warm-white z-20 border-b border-black/10 backdrop-blur-sm">
      <div
        class="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-center gap-x-4 sm:gap-x-6 sm:gap-8 overflow-x-auto scrollbar-hide"
      >
        <RouterLink to="/" class="nav-link whitespace-nowrap">Home</RouterLink>
        <RouterLink to="/about" class="nav-link whitespace-nowrap">About</RouterLink>
        <RouterLink to="/projects" class="nav-link whitespace-nowrap">Interests</RouterLink>
        <RouterLink to="/workshop" class="nav-link whitespace-nowrap">Workshop</RouterLink>
        <RouterLink to="/shorts" class="nav-link whitespace-nowrap">Nubbnubb Shorts</RouterLink>
      </div>
    </nav>

    <div class="flex-1">
      <RouterView />
    </div>

    <AppFooter />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import AppFooter from './components/AppFooter.vue'
</script>

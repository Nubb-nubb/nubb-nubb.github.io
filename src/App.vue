<template>
  <div class="bg-warm-white text-text-primary min-h-screen flex flex-col">
    <nav class="sticky top-0 bg-warm-white z-10 border-b border-black/10 backdrop-blur-sm">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-wrap justify-center gap-x-6 gap-y-2 sm:gap-8">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/about" class="nav-link">About</RouterLink>
        <RouterLink to="/setups" class="nav-link">Setups</RouterLink>
        <RouterLink to="/workshop" class="nav-link">Workshop</RouterLink>
        <RouterLink to="/projects" class="nav-link">Projects</RouterLink>
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

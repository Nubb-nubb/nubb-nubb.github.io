<template>
  <div class="bg-warm-white text-text-primary min-h-screen">
    <nav class="sticky top-0 bg-warm-white z-10 border-b border-black/10 backdrop-blur-sm">
      <div class="max-w-3xl mx-auto px-6 py-4 flex justify-center gap-8">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/about" class="nav-link">About</RouterLink>
        <RouterLink to="/setups" class="nav-link">Setups</RouterLink>
        <RouterLink to="/workshop" class="nav-link">Workshop</RouterLink>
      </div>
    </nav>

    <RouterView />

    <AppFooter />

  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import AppFooter from './components/AppFooter.vue'
</script>

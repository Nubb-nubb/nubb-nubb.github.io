<template>
  <div class="bg-warm-white text-text-primary min-h-screen flex flex-col">
    <nav class="sticky top-0 bg-warm-white z-20 border-b border-black/10 backdrop-blur-sm">
      <div class="px-4 md:px-16 lg:px-32 py-3 md:py-4">
        <!-- Desktop nav -->
        <div class="hidden md:flex items-center">
          <RouterLink
            to="/"
            class="font-display text-lg font-bold text-text-primary hover:text-accent-red transition-colors"
          >
            nubbnubb
          </RouterLink>
          <div class="flex-1 flex justify-center gap-x-6 md:gap-8">
            <RouterLink to="/" class="nav-link whitespace-nowrap">Home</RouterLink>
            <RouterLink to="/about" class="nav-link whitespace-nowrap">About</RouterLink>
            <RouterLink to="/projects" class="nav-link whitespace-nowrap">Interests</RouterLink>
            <RouterLink to="/workshop" class="nav-link whitespace-nowrap">Workshop</RouterLink>
            <RouterLink to="/shorts" class="nav-link whitespace-nowrap">Shorts</RouterLink>
          </div>
          <!-- Invisible spacer to balance the logo -->
          <div class="w-[85px]"></div>
        </div>

        <!-- Mobile nav -->
        <div class="flex md:hidden items-center justify-between">
          <RouterLink to="/" class="font-display text-lg font-bold text-text-primary">
            nubbnubb
          </RouterLink>
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="p-2 -mr-2 text-text-primary hover:text-accent-red transition-colors"
            :aria-expanded="mobileMenuOpen"
            aria-label="Toggle menu"
          >
            <!-- Hamburger icon -->
            <svg
              v-if="!mobileMenuOpen"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- Close icon -->
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Mobile menu dropdown (overlay) -->
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <div
            v-if="mobileMenuOpen"
            class="md:hidden absolute left-4 right-4 top-full mt-2 bg-warm-white border border-black/10 rounded-xl shadow-lg flex flex-col px-4 py-4 z-50"
          >
            <RouterLink to="/" class="nav-link py-2 w-fit" @click="mobileMenuOpen = false"
              >Home</RouterLink
            >
            <RouterLink to="/about" class="nav-link py-2 w-fit" @click="mobileMenuOpen = false"
              >About</RouterLink
            >
            <RouterLink to="/projects" class="nav-link py-2 w-fit" @click="mobileMenuOpen = false"
              >Interests</RouterLink
            >
            <RouterLink to="/workshop" class="nav-link py-2 w-fit" @click="mobileMenuOpen = false"
              >Workshop</RouterLink
            >
            <RouterLink to="/shorts" class="nav-link py-2 w-fit" @click="mobileMenuOpen = false"
              >Nubbnubb Shorts</RouterLink
            >
          </div>
        </Transition>
      </div>
    </nav>

    <div class="flex-1">
      <RouterView />
    </div>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import AppFooter from './components/AppFooter.vue'

const mobileMenuOpen = ref(false)
</script>

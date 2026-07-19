<template>
  <section class="hero">
    <div class="max-w-3xl mx-auto">
      <div
        class="relative left-1/2 -translate-x-1/2 w-[min(92vw,72rem)] mb-12 bg-gradient-to-br from-gray-300 to-gray-400 rounded-sm overflow-hidden"
        style="display: flex; align-items: center; justify-content: center;"
      >
        <img
          v-if="!showHeroPlaceholder"
          :src="heroImageSrc"
          alt="July 2026 desk setup"
          class="w-full h-auto object-contain"
          @error="showHeroPlaceholder = true"
        />
        <div v-if="showHeroPlaceholder" class="text-center text-gray-600">
          <p class="text-sm">
            Add your July 2026 setup photo to
            <code class="bg-gray-200 px-2 py-1 rounded">public/images/july-2026-setup.jpg</code>
          </p>
        </div>
      </div>

      <h1 class="text-5xl font-display font-bold mb-8">
        I'm in a chinese era of my life
      </h1>
      <p class="text-xl text-text-secondary">
        sometimes.
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const showHeroPlaceholder = ref(false)
const heroImageSrc = `${import.meta.env.BASE_URL}images/july-2026-setup.jpg`
</script>

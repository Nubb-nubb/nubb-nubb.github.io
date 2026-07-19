<template>
  <section class="hero">
    <div class="max-w-3xl mx-auto">
      <div
        class="relative left-1/2 -translate-x-1/2 w-[min(78.7vw,61.6rem)] mb-12 rounded-sm overflow-hidden"
        style="aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center;"
      >
        <!-- Carousel Container -->
        <div class="relative w-full h-full overflow-hidden">
          <div
            class="flex h-full transition-transform duration-1000 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <img
              v-for="(src, i) in carouselImages"
              :key="i"
              :src="src"
              :alt="`Setup photo ${i + 1}`"
              class="w-full h-full object-cover shrink-0"
              @error="showHeroPlaceholder = true"
            />

          </div>
          <div v-if="showHeroPlaceholder" class="text-center text-gray-600 p-8">
            <p class="text-sm">
              Add carousel photos to
              <code class="bg-gray-200 px-2 py-1 rounded">public/images/</code>
            </p>
          </div>

          <!-- Carousel Indicators -->
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            <button
              v-for="(_, index) in carouselImages"
              :key="index"
              @click="currentSlide = index"
              :class="[
                'w-2 h-2 rounded-full transition-all',
                index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
              ]"
              :aria-label="`Go to slide ${index + 1}`"
            />
          </div>
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
import { ref, onMounted, onUnmounted } from 'vue'

const showHeroPlaceholder = ref(false)
const currentSlide = ref(0)

const carouselImages = [
`${import.meta.env.BASE_URL}images/aboutme-2.jpg`,  
  `${import.meta.env.BASE_URL}images/july-2026-setup.jpg`,
  `${import.meta.env.BASE_URL}images/homepage-3.jpg`,
  `${import.meta.env.BASE_URL}images/homepage-2.jpg`,
]

let autoScrollInterval

onMounted(() => {
  autoScrollInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % carouselImages.length
  }, 4000) // auto-scroll every 4 seconds
})

onUnmounted(() => {
  clearInterval(autoScrollInterval)
})
</script>



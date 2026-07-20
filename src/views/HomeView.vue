<template>
  <section class="hero">
    <div class="w-full max-w-3xl mx-auto">
      <div
        class="w-full max-w-[61.6rem] mx-auto mb-8 md:mb-12 rounded-sm overflow-hidden cursor-pointer"
        style="aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center;"
        @click="openPreview(carouselImages[currentSlide])"
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

      <h1 class="text-4xl md:text-5xl font-display font-bold mb-6 md:mb-8 leading-tight">
        I'm in such a chinese era of my life
      </h1>
      <p class="text-lg md:text-xl text-text-secondary">
        hey meta, take his drawls off.
      </p>
    </div>

    <div
      v-if="previewImage"
      class="fixed inset-0 z-50 bg-black/85 p-4 md:p-8 flex items-center justify-center"
      @click="closePreview"
    >
      <button
        type="button"
        class="absolute top-4 right-4 md:top-6 md:right-6 text-white text-3xl leading-none"
        @click.stop="closePreview"
        aria-label="Close preview"
      >
        ×
      </button>

      <img
        :src="previewImage"
        alt="Preview"
        class="max-w-[94vw] max-h-[92vh] w-auto h-auto object-contain rounded-sm shadow-2xl"
        @click.stop
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useImagePreview } from '../composables/useImagePreview'

const showHeroPlaceholder = ref(false)
const currentSlide = ref(0)
const { previewImage, openPreview, closePreview } = useImagePreview()

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

<style scoped>
.hero {
  min-height: calc(100vh - 8rem);
}

@media (max-width: 430px) {
  .hero {
    min-height: calc(100vh - 4rem);
  }
}
</style>



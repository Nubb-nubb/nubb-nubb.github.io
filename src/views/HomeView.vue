<template>
  <section class="hero">
    <div class="w-full max-w-3xl mx-auto">
      <div
        class="group w-full max-w-[61.6rem] mx-auto mb-8 md:mb-12 rounded-sm overflow-hidden cursor-pointer"
        style="aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center"
        @click="openCurrentSlidePreview"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
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

          <!-- Carousel Arrows (desktop/tablet) -->
          <button
            type="button"
            class="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-black/35 text-white opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
            @click.stop="goToPreviousSlide"
            aria-label="Previous slide"
          >
            <span aria-hidden="true">&#10094;</span>
          </button>
          <button
            type="button"
            class="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-black/35 text-white opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
            @click.stop="goToNextSlide"
            aria-label="Next slide"
          >
            <span aria-hidden="true">&#10095;</span>
          </button>

          <!-- Carousel Indicators -->
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            <button
              v-for="(_, index) in carouselImages"
              :key="index"
              @click.stop="goToSlide(index)"
              :class="[
                'w-2 h-2 rounded-full transition-all',
                index === currentSlide ? 'bg-white w-6' : 'bg-white/50',
              ]"
              :aria-label="`Go to slide ${index + 1}`"
            />
          </div>
        </div>
      </div>

      <h1 class="text-4xl md:text-5xl font-display font-bold mb-6 md:mb-8 leading-tight">
        I'm in such a chinese era of my life
      </h1>
      <p class="text-lg md:text-xl text-text-secondary">hey meta, take his drawls off.</p>
    </div>

    <ImagePreviewModal :preview-image="previewImage" :base-path="false" @close="closePreview" />
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useImagePreview } from '../composables/useImagePreview'
import ImagePreviewModal from '../components/ImagePreviewModal.vue'

const showHeroPlaceholder = ref(false)
const currentSlide = ref(0)
const { previewImage, openPreview, closePreview } = useImagePreview()
const touchStartX = ref(0)
const touchEndX = ref(0)
const hasSwiped = ref(false)
const SWIPE_THRESHOLD = 40

const carouselImages = [
  `${import.meta.env.BASE_URL}images/aboutme-2.jpg`,
  `${import.meta.env.BASE_URL}images/july-2026-setup.jpg`,
  `${import.meta.env.BASE_URL}images/homepage-3.jpg`,
  `${import.meta.env.BASE_URL}images/homepage-2.jpg`,
]

let autoScrollInterval

const startAutoScroll = () => {
  autoScrollInterval = setInterval(() => {
    nextSlide()
  }, 4000) // auto-scroll every 4 seconds
}

const resetAutoScroll = () => {
  clearInterval(autoScrollInterval)
  startAutoScroll()
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + carouselImages.length) % carouselImages.length
}

const goToPreviousSlide = () => {
  prevSlide()
  resetAutoScroll()
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % carouselImages.length
}

const goToNextSlide = () => {
  nextSlide()
  resetAutoScroll()
}

const goToSlide = (index) => {
  currentSlide.value = index
  resetAutoScroll()
}

const openCurrentSlidePreview = () => {
  if (hasSwiped.value) {
    hasSwiped.value = false
    return
  }

  openPreview(carouselImages[currentSlide.value])
}

const handleTouchStart = (event) => {
  touchStartX.value = event.changedTouches[0].clientX
  touchEndX.value = touchStartX.value
}

const handleTouchMove = (event) => {
  touchEndX.value = event.changedTouches[0].clientX
}

const handleTouchEnd = () => {
  const delta = touchStartX.value - touchEndX.value

  if (Math.abs(delta) < SWIPE_THRESHOLD) {
    return
  }

  hasSwiped.value = true
  if (delta > 0) {
    goToNextSlide()
  } else {
    goToPreviousSlide()
  }
}

onMounted(() => {
  startAutoScroll()
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

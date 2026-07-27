<template>
  <div>
    <h3 class="text-2xl font-display font-bold mb-6 text-wood-dark">Butterfly Knife Tricks 2025</h3>

    <!-- Carousel -->
    <div
      class="group w-full max-w-4xl mx-auto mb-8 rounded-sm overflow-hidden cursor-pointer"
      style="aspect-ratio: 16/9"
      @click="openCurrentSlidePreview"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <div class="relative w-full h-full overflow-hidden">
        <div
          class="flex h-full transition-transform duration-1000 ease-in-out"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
        >
          <img
            v-for="(src, i) in carouselImages"
            :key="i"
            :src="toPublicPath(src)"
            :alt="`Butterfly knife photo ${i + 1}`"
            class="w-full h-full object-cover shrink-0"
          />
        </div>

        <!-- Carousel Arrows -->
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

    <PillTabs :tabs="subTabs" v-model="subTab" />

    <div class="grid gap-4 grid-cols-2">
      <div v-for="entry in subTab === 'trainers' ? trainers : liveBlades" :key="entry.src">
        <VideoThumbnail
          :src="toPublicPath(entry.src)"
          height="auto"
          @click="openPreview(entry.src, 'video')"
        />
        <p class="text-xs font-mono uppercase tracking-wide text-accent-red mt-2 mb-1">
          {{ entry.label }}
        </p>
        <p class="text-xs text-text-secondary">
          {{ entry.description }}
        </p>
      </div>
    </div>

    <ImagePreviewModal
      :preview-image="previewImage"
      :preview-type="previewType"
      :preview-items="previewItems"
      :preview-index="previewIndex"
      @close="closePreview"
      @next="nextPreview"
      @previous="previousPreview"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMediaUtils } from '../../composables/useMediaUtils'
import { useImagePreview } from '../../composables/useImagePreview'
import { useCarousel } from '../../composables/useCarousel'
import VideoThumbnail from '../../components/VideoThumbnail.vue'
import ImagePreviewModal from '../../components/ImagePreviewModal.vue'
import PillTabs from '../../components/PillTabs.vue'

const { toPublicPath } = useMediaUtils()
const {
  previewImage,
  previewType,
  previewItems,
  previewIndex,
  openPreview,
  closePreview,
  nextPreview,
  previousPreview,
} = useImagePreview()

const carouselImages = [
  'images/butterfly_all1.jpg',
  'images/butterfly_all2.jpg',
  'images/butterfly_all3.jpg',
  'images/butterfly_all4.jpg',
  'images/butterfly_all5.jpg',
]

const {
  currentSlide,
  goToPreviousSlide,
  goToNextSlide,
  goToSlide,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
} = useCarousel(carouselImages, 4000)

const openCurrentSlidePreview = () => {
  openPreview(carouselImages[currentSlide.value], 'image', carouselImages, currentSlide.value)
}

const subTab = ref('trainers')
const subTabs = [
  { key: 'trainers', label: 'Trainers' },
  { key: 'live-blades', label: 'Live Blades' },
]

const trainers = [
  {
    src: 'images/butterfly_1.MP4',
    label: 'Squiddy Trainer',
    description: 'My first butterfly knife',
  },
  { src: 'images/butterfly_2.MP4', label: 'Nabalis Cheese', description: '' },
]

const liveBlades = [
  { src: 'images/butterfly_3.MP4', label: 'Squid Industries Tsunami Clone', description: '' },
  {
    src: 'images/butterfly_4.MP4',
    label: 'BRS Replicant',
    description: 'I got cooked in this one, but its lowkey my favorite knife',
  },
]
</script>

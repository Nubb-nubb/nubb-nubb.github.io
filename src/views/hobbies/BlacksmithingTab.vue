<template>
  <div>
    <h3 class="text-2xl font-display font-bold mb-6 text-wood-dark">Blacksmithing Projects</h3>

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
            :alt="`Knife photo ${i + 1}`"
            class="w-full h-full object-cover shrink-0"
            decoding="async"
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

    <!-- Top-level knife type albums -->
    <div v-if="!selectedKnifeType" class="space-y-4">
      <p class="text-sm text-text-secondary">Knives I made from October 2025 - August 2026</p>
      <div class="grid gap-4 grid-cols-2 sm:grid-cols-3">
        <button
          v-for="knife in knifeTypes"
          :key="knife.key"
          type="button"
          class="group text-left"
          @click="selectedKnifeType = knife"
        >
          <div
            class="relative aspect-square rounded-lg overflow-hidden bg-surface shadow-md transition-transform group-hover:scale-[1.02]"
          >
            <img
              :src="toPublicPath(knife.thumbnail)"
              :alt="knife.label"
              class="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </div>
          <p class="mt-2 text-sm font-medium text-text-primary truncate">{{ knife.label }}</p>
          <p class="text-xs text-text-secondary">{{ knife.albums.length }} albums</p>
        </button>
      </div>
    </div>

    <!-- Selected knife type: show its sub-albums -->
    <div v-else class="space-y-4">
      <!-- Back to projects (when viewing sub-albums list) -->
      <button
        v-if="!insideSubAlbum"
        type="button"
        class="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors"
        @click="selectedKnifeType = null"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to projects
      </button>
      <!-- Back to albums (when viewing photos inside a sub-album) -->
      <button
        v-else
        type="button"
        class="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors"
        @click="albumGridRef?.deselectAlbum()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to albums
      </button>

      <h4 class="text-lg font-semibold text-text-primary">{{ selectedKnifeType.label }}</h4>

      <AlbumGrid
        ref="albumGridRef"
        :albums="selectedKnifeType.albums"
        :hide-back-button="true"
        @preview="(src) => $emit('preview', src, isVideo(src) ? 'video' : 'image')"
        @albumSelected="(album) => (insideSubAlbum = !!album)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMediaUtils } from '../../composables/useMediaUtils'
import { useCarousel } from '../../composables/useCarousel'
import AlbumGrid from '../../components/AlbumGrid.vue'

const emit = defineEmits(['preview'])

const { toPublicPath, isVideo } = useMediaUtils()

const carouselImages = [
  'images/3 in 1 1.JPG',
  'images/3 in 1 2.JPG',
  'images/3 in 1 3.JPG',
  'images/homepage-3.jpg',
  'images/knife_3.jpg',
  'images/knife_4.jpg',
  'images/knife_5.jpg',
  'images/knife-6.jpg',
]

// Currently selected knife type (null = showing top-level albums)
const selectedKnifeType = ref(null)
// Track if we're inside a sub-album (to hide back-to-projects button)
const insideSubAlbum = ref(false)
// Ref to AlbumGrid for calling deselectAlbum
const albumGridRef = ref(null)

const huntingKnifeAlbums = [
  {
    key: 'shaping',
    label: 'Shaping',
    media: [
      'images/blacksmith_7.MOV',
      'images/blacksmith_8.MP4',
      'images/blacksmith_5.JPEG',
      'images/blacksmith_6.JPEG',
      'images/blacksmith_9 .mp4',
      'images/1x30 sander.mp4',
      'images/Grinded_Knife.JPG',
    ],
  },
  {
    key: 'heat-treatment',
    label: 'Heat Treatment',
    media: ['images/forge_1.mp4', 'images/blacksmith_12.MOV'],
  },
  {
    key: 'handle-finishing',
    label: 'Handle & Finishing',
    media: ['images/blacksmith_11.JPEG', 'images/blacksmith_13.MP4', 'images/blacksmith_15.JPEG'],
  },
  {
    key: 'finished',
    label: 'Finished',
    media: [
      'images/homepage-3.jpg',
      'images/knife_3.jpg',
      'images/knife_5.jpg',
      'images/blacksmith_14 .mp4',
    ],
  },
  {
    key: 'design-materials',
    label: 'Design & Materials',
    media: [
      'images/blacksmith_1.PNG',
      'images/blacksmith_2.JPEG',
      'images/blacksmith_3.MOV',
      'images/blacksmith_4.png',
    ],
  },
]

const koTantoAlbums = [
  {
    key: 'shaping',
    label: 'Shaping',
    media: [
      'images/Kotanto aikuchi koshirae/IMG_0167.JPG',
      'images/Kotanto aikuchi koshirae/IMG_0169.MOV',
      'images/Kotanto aikuchi koshirae/IMG_0171.JPG',
      'images/Kotanto aikuchi koshirae/IMG_0173.JPG',
      'images/Kotanto aikuchi koshirae/IMG_0175.JPG',
      'images/Kotanto aikuchi koshirae/IMG_0178.jpg',
      'images/Kotanto aikuchi koshirae/IMG_0184.JPG',
      'images/Kotanto aikuchi koshirae/IMG_0188.JPG',
    ],
  },
  {
    key: 'tsuka-saya',
    label: 'Tsuka + Saya',
    media: [
      'images/Kotanto aikuchi koshirae/IMG_0206.JPG',
      'images/Kotanto aikuchi koshirae/IMG_0207.JPG',
      'images/Kotanto aikuchi koshirae/IMG_0208.JPG',
      'images/Kotanto aikuchi koshirae/IMG_0209.JPG',
      'images/Kotanto aikuchi koshirae/IMG_0272.JPG',
      'images/Kotanto aikuchi koshirae/IMG_0275.JPG',
      'images/Kotanto aikuchi koshirae/IMG_0281.JPG',
      'images/Kotanto aikuchi koshirae/IMG_0286.JPG',
      'images/Kotanto aikuchi koshirae/IMG_0291.JPG',
      'images/Kotanto aikuchi koshirae/IMG_0299.JPG',
      'images/Kotanto aikuchi koshirae/IMG_0300.JPG',
      'images/Kotanto aikuchi koshirae/IMG_0264.JPG',
      'images/Kotanto aikuchi koshirae/IMG_0265.JPG',
      'images/Kotanto aikuchi koshirae/IMG_0266.JPG',
      'images/Kotanto aikuchi koshirae/IMG_0267.JPG',
      'images/Kotanto aikuchi koshirae/IMG_0268.JPG',
      'images/Kotanto aikuchi koshirae/IMG_0269.JPG',
      'images/Kotanto aikuchi koshirae/IMG_0270.JPG',
    ],
  },
  {
    key: 'finished',
    label: 'Finished',
    media: [
      'images/Kotanto aikuchi koshirae/IMG_0304.JPG',
      'images/Kotanto aikuchi koshirae/IMG_0308.JPG',
      'images/Kotanto aikuchi koshirae/IMG_0311.JPG',
      'images/Kotanto aikuchi koshirae/IMG_0312.JPG',
      'images/Kotanto aikuchi koshirae/IMG_0322.JPG',
    ],
  },
  {
    key: 'design-materials',
    label: 'Design & Materials',
    media: [
      'images/Kotanto aikuchi koshirae/IMG_0166.mov',
      'images/Kotanto aikuchi koshirae/IMG_0195.JPG',
      'images/Kotanto aikuchi koshirae/IMG_0202.JPG',
      'images/Kotanto aikuchi koshirae/IMG_0204.jpg',
      'images/Kotanto aikuchi koshirae/IMG_0205.JPG',
    ],
  },
]

const gyutoAlbums = [
  {
    key: 'shaping',
    label: 'Shaping',
    media: [
      'images/Gyuto/IMG_7644.JPG',
      'images/Gyuto/IMG_7654.MOV',
      'images/Gyuto/IMG_7659.MOV',
      'images/Gyuto/IMG_7667.MOV',
      'images/Gyuto/IMG_7668.MOV',
      'images/Gyuto/IMG_7671.MOV',
      'images/Gyuto/IMG_7672.mov',
      'images/Gyuto/IMG_7675.mov',
      'images/Gyuto/IMG_8110.mov',
      'images/Gyuto/IMG_8113.mov',
    ],
  },
  {
    key: 'handle',
    label: 'Handle',
    media: ['images/Gyuto/IMG_8125.mov'],
  },
  {
    key: 'finished',
    label: 'Finished',
    media: [
      'images/Gyuto/IMG_8126.MOV',
      'images/Gyuto/IMG_8127.MOV',
      'images/knife-6.jpg',
      'images/knife_4.jpg',
    ],
  },
]

// Top-level knife type albums
const knifeTypes = [
  {
    key: 'hunting-knife',
    label: 'Hunting Knife',
    thumbnail: 'images/homepage-3.jpg',
    albums: huntingKnifeAlbums,
  },
  {
    key: 'gyuto',
    label: 'Gyuto',
    thumbnail: 'images/3 in 1 1.JPG',
    albums: gyutoAlbums,
  },
  {
    key: 'ko-tanto',
    label: 'Ko-Tanto',
    thumbnail: 'images/Kotanto aikuchi koshirae/IMG_0311.JPG',
    albums: koTantoAlbums,
  },
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
  emit('preview', carouselImages[currentSlide.value], 'image', carouselImages, currentSlide.value)
}
</script>

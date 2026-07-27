<template>
  <div>
    <h3 class="text-2xl font-display font-bold mb-6 text-wood-dark">Watch Collection 2024–2026</h3>

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
            :alt="`Watch photo ${i + 1}`"
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

    <PillTabs :tabs="tabs" v-model="activeTab" />

    <!-- DIY tab -->
    <div v-if="activeTab === 'diy'">
      <!-- Hero: Featured DIY watches (12, 13, 14) -->
      <div class="grid gap-4 grid-cols-3">
        <div v-for="watch in diyFeatured" :key="watch.image" class="text-center">
          <img
            :src="toPublicPath(watch.image)"
            :alt="watch.name"
            class="w-full aspect-square object-cover rounded-sm cursor-pointer"
            @click="openPreview(watch.image)"
          />
          <p class="mt-2 text-sm text-text-primary">{{ watch.name }}</p>
        </div>
      </div>

      <!-- See how it's made expandable section -->
      <ProcessTimeline
        :entries="diyProcess"
        :collapsible="true"
        :default-open="true"
        @preview="(src, type) => $emit('preview', src, type)"
      />
    </div>

    <!-- Collection tab -->
    <div v-else-if="activeTab === 'collection'" class="grid gap-4 grid-cols-2 sm:grid-cols-3">
      <div v-for="watch in collectionWatches" :key="watch.image">
        <VideoThumbnail
          v-if="isVideo(watch.image)"
          :src="toPublicPath(watch.image)"
          height="h-48"
          @click="openPreview(watch.image, 'video')"
        />
        <img
          v-else
          :src="toPublicPath(watch.image)"
          :alt="watch.name"
          class="w-full h-48 object-cover rounded-sm cursor-pointer"
          @click="openPreview(watch.image)"
        />
        <p class="mt-2 text-sm text-text-primary">{{ watch.name }}</p>
      </div>
    </div>

    <!-- Wishlist tab with sections -->
    <div v-else class="space-y-10">
      <div v-for="section in wishlistSections" :key="section.title">
        <p class="text-xs font-mono uppercase tracking-wide text-accent-red mb-4">
          {{ section.title }}
        </p>
        <div class="grid gap-4 grid-cols-2 sm:grid-cols-3">
          <div v-for="watch in section.watches" :key="watch.image">
            <img
              :src="toPublicPath(watch.image)"
              :alt="watch.name"
              class="w-full h-48 object-cover rounded-sm cursor-pointer"
              @click="openPreview(watch.image)"
            />
            <p class="mt-2 text-sm text-text-primary">{{ watch.name }}</p>
          </div>
        </div>
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
import { useImagePreview } from '../../composables/useImagePreview'
import { useMediaUtils } from '../../composables/useMediaUtils'
import { useCarousel } from '../../composables/useCarousel'
import ImagePreviewModal from '../../components/ImagePreviewModal.vue'
import VideoThumbnail from '../../components/VideoThumbnail.vue'
import PillTabs from '../../components/PillTabs.vue'
import ProcessTimeline from '../../components/ProcessTimeline.vue'

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
const { toPublicPath, isVideo } = useMediaUtils()

const emit = defineEmits(['preview'])

// Carousel images: Teddy first, then DIY watches (Steven, Daniel, Lucas), then collection
const carouselImages = [
  'images/Teddy!!.JPEG',
  'images/diy_14.jpg', // Steven
  'images/diy_12.jpg', // Daniel
  'images/diy_13.jpg', // Lucas
  'images/watch_3.jpg', // DIY Rolex Oyster Perpetual Homage
  'images/watch_4.jpg', // Casio A158WA
  'images/watch_8.jpg', // Citizen Tsuyosa 37mm
  'images/watch_12.jpg', // G-Shock AW-591ML
]

const {
  currentSlide,
  goToSlide,
  goToNextSlide,
  goToPreviousSlide,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
} = useCarousel(carouselImages, 4000)

function openCurrentSlidePreview() {
  openPreview(carouselImages[currentSlide.value], 'image', carouselImages, currentSlide.value)
}

const tabs = [
  { key: 'diy', label: 'DIY' },
  { key: 'collection', label: 'Collection' },
  { key: 'wishlist', label: 'Wishlist' },
]

const activeTab = ref('diy')

// Featured DIY watches (final results)
const diyFeatured = [
  { image: 'images/diy_14.jpg', name: 'Steven' },
  { image: 'images/diy_12.jpg', name: 'Daniel' },
  { image: 'images/diy_13.jpg', name: 'Lucas' },
]

// DIY build process
const diyProcess = [
  { image: 'images/diy_2.jpg', name: 'All the parts came!' },
  {
    image: 'images/diy_3.mp4',
    name: 'Taking out the movement, its an NH35, a mass produced Seiko movement',
  },
  { image: 'images/diy_4.mp4', name: 'Closer look at the NH35' },
  { image: 'images/diy_5.mov', name: 'Putting on the dial!' },
  { image: 'images/diy_6.mov', name: 'Hands!' },
  { image: 'images/diy_7.mov', name: 'Little watch heartbeat' },
  { image: 'images/diy_8.jpg', name: 'Putting on the stem' },
  { image: 'images/diy_9.jpg', name: 'The stem ruined my clippers :(' },
  { image: 'images/diy_10.mov', name: 'Winding the watch!!' },
  { image: 'images/diy_11.jpg', name: 'Checking its beat error' },
  { image: 'images/diy_15.jpg', name: 'Finished!' },
]

const collectionWatches = [
  { image: 'images/watch_3.jpg', name: 'DIY Rolex Oyster Perpetual Homage' },
  { image: 'images/watch_4.jpg', name: 'Casio A158WA' },
  { image: 'images/watch_8.jpg', name: 'Citizen Tsuyosa 37mm' },
  { image: 'images/watch_12.jpg', name: 'G-Shock AW-591ML' },
]

const wishlistSections = [
  {
    title: 'Near Future',
    watches: [
      { image: 'images/watch_6.jpg', name: 'Orient Bambino Small Seconds v7' },
      { image: 'images/watch_5.jpg', name: 'Seiko SPB155 (Baby Alpinist)' },
      { image: 'images/watch_7.jpg', name: '海鷗表 1963 (Seagull 1963)' },
    ],
  },
  {
    title: 'Potential GMT',
    watches: [
      { image: 'images/watch_2.jpg', name: 'Citizen Series 8 GMT Pepsi' },
      { image: 'images/watch_10.jpg', name: 'Timex Q GMT Pepsi' },
    ],
  },
  {
    title: 'Far Future',
    watches: [
      { image: 'images/watch_9.jpg', name: 'Seiko × One Piece Luffy Gear 5' },
      { image: 'images/watch_11.jpg', name: 'Grand Seiko SBGA413 Shunbun' },
    ],
  },
]
</script>

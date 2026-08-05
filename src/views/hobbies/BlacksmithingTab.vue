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

    <PillTabs :tabs="tabs" v-model="activeTab" />

    <div v-if="activeTab === 'hunting-knife'">
      <ProcessTimeline
        :entries="timeline"
        :collapsible="true"
        :default-open="true"
        label-format="sequence"
        @preview="(src, type) => $emit('preview', src, type)"
      />
    </div>

    <div v-else-if="activeTab === 'gyuto'" class="space-y-4">
      <p class="text-sm text-text-secondary">Gyuto project gallery coming soon.</p>
      <div class="grid gap-4 grid-cols-2 sm:grid-cols-3">
        <div v-for="src in gyutoMedia" :key="src" class="rounded-sm overflow-hidden bg-surface">
          <img
            v-if="!isVideo(src)"
            :src="toPublicPath(src)"
            alt="Gyuto media"
            class="w-full h-56 md:h-64 object-cover cursor-pointer"
            decoding="async"
            fetchpriority="high"
            @click="$emit('preview', src, 'image')"
          />
          <VideoThumbnail v-else :src="src" height="md" @click="$emit('preview', src, 'video')" />
        </div>
      </div>
    </div>

    <div v-else-if="activeTab === 'ko-tanto'" class="space-y-4">
      <p class="text-sm text-text-secondary">Ko-Tanto project gallery coming soon.</p>
      <div class="grid gap-4 grid-cols-2 sm:grid-cols-3">
        <div v-for="src in koTantoMedia" :key="src" class="rounded-sm overflow-hidden bg-surface">
          <img
            v-if="!isVideo(src)"
            :src="toPublicPath(src)"
            alt="Ko-Tanto media"
            class="w-full h-56 md:h-64 object-cover cursor-pointer"
            decoding="async"
            fetchpriority="high"
            @click="$emit('preview', src, 'image')"
          />
          <VideoThumbnail v-else :src="src" height="md" @click="$emit('preview', src, 'video')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMediaUtils } from '../../composables/useMediaUtils'
import { useCarousel } from '../../composables/useCarousel'
import ProcessTimeline from '../../components/ProcessTimeline.vue'
import PillTabs from '../../components/PillTabs.vue'
import VideoThumbnail from '../../components/VideoThumbnail.vue'

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

const tabs = [
  { key: 'hunting-knife', label: 'Hunting Knife' },
  { key: 'gyuto', label: 'Gyuto' },
  { key: 'ko-tanto', label: 'Ko-Tanto' },
]

const activeTab = ref('hunting-knife')

const gyutoMedia = [
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
  'images/Gyuto/IMG_8125.mov',
  'images/Gyuto/IMG_8126.MOV',
  'images/Gyuto/IMG_8127.MOV',
]

const koTantoMedia = [
  'images/Kotanto aikuchi koshirae/IMG_0166.mov',
  'images/Kotanto aikuchi koshirae/IMG_0167.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0169.MOV',
  'images/Kotanto aikuchi koshirae/IMG_0171.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0173.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0175.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0178.jpg',
  'images/Kotanto aikuchi koshirae/IMG_0182.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0184.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0188.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0195.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0202.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0204.jpg',
  'images/Kotanto aikuchi koshirae/IMG_0205.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0206.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0207.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0208.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0209.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0212.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0219.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0230.MOV',
  'images/Kotanto aikuchi koshirae/IMG_0239.MOV',
  'images/Kotanto aikuchi koshirae/IMG_0240.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0245.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0259.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0260.MOV',
  'images/Kotanto aikuchi koshirae/IMG_0264.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0265.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0266.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0267.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0268.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0269.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0270.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0272.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0275.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0278.MOV',
  'images/Kotanto aikuchi koshirae/IMG_0281.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0286.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0290.MOV',
  'images/Kotanto aikuchi koshirae/IMG_0291.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0296.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0299.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0300.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0304.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0305.MOV',
  'images/Kotanto aikuchi koshirae/IMG_0306.MOV',
  'images/Kotanto aikuchi koshirae/IMG_0308.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0309.MOV',
  'images/Kotanto aikuchi koshirae/IMG_0310.mov',
  'images/Kotanto aikuchi koshirae/IMG_0311.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0312.JPG',
  'images/Kotanto aikuchi koshirae/IMG_0322.JPG',
]

const preloadedMedia = new Set()

function preloadMedia(src) {
  if (preloadedMedia.has(src)) return
  preloadedMedia.add(src)
  const url = toPublicPath(src)
  if (isVideo(src)) {
    const video = document.createElement('video')
    video.preload = 'metadata'
    video.muted = true
    video.src = `${url}#t=0.1`
  } else {
    const image = new Image()
    image.src = url
  }
}

function preloadGallery(media) {
  media.forEach(preloadMedia)
}

onMounted(() => {
  const preloadDelay = () => {
    preloadGallery(gyutoMedia)
    preloadGallery(koTantoMedia)
  }

  if ('requestIdleCallback' in window) {
    requestIdleCallback(preloadDelay)
  } else {
    setTimeout(preloadDelay, 200)
  }
})

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

const timeline = [
  {
    src: 'images/blacksmith_1.PNG',
    label: 'Knife Template',
    description: 'Knife template that I made on Procreate',
    sequence: '1',
  },
  {
    src: 'images/blacksmith_2.JPEG',
    label: 'Tools',
    description: 'Some machinery I got from Harbor Freight',
    sequence: '2',
  },
  {
    src: 'images/blacksmith_3.MOV',
    label: 'Steel',
    description: 'Steel is 1084 high carbon steel',
    sequence: '3',
  },
  {
    src: 'images/blacksmith_4.png',
    label: 'Template Transfer',
    description: 'Cutting out the template and gluing it onto the steel',
    sequence: '4',
  },
  {
    src: 'images/blacksmith_7.MOV',
    label: 'Safety First',
    description: 'Putting on respirator to prevent eating yucky wucky particles',
    sequence: '5',
  },
  {
    src: 'images/blacksmith_8.MP4',
    label: 'Angle Grinding',
    description: 'Angle grinding out the shape',
    sequence: '6',
  },
  {
    src: 'images/blacksmith_5.JPEG',
    label: 'Rough Cutout',
    description: 'Rough cutout',
    sequence: '7',
  },
  {
    src: 'images/blacksmith_6.JPEG',
    label: 'Cleaned Cutout',
    description: 'Cleaned up cutout',
    sequence: '8',
  },
  {
    src: 'images/blacksmith_9 .mp4',
    label: 'Drilling',
    description: 'Drilling out the holes for pins',
    sequence: '9',
  },
  {
    src: 'images/1x30 sander.mp4',
    label: 'Sanding Bevels',
    description: 'Sanding the bevels',
    sequence: '10',
  },
  {
    src: 'images/Grinded_Knife.JPG',
    label: 'Grinding the Knife',
    description: 'Finished grinding overall shape',
    sequence: '11',
  },
  {
    src: 'images/forge_1.mp4',
    label: 'Heat Treat',
    description:
      'Heat treated to critical temperature (~1475°F), the steel is cherry red and non-magnetic, quenched in canola oil',
    sequence: '12',
  },
  {
    src: 'images/blacksmith_12.MOV',
    label: 'Tempering',
    description: 'Tempering the steel in an oven at 400°F (204°C) for 2 hours, 2 cycles',
    sequence: '13',
  },
  {
    src: 'images/blacksmith_11.JPEG',
    label: 'Pins & Wood',
    description: 'Putting in pins and wood',
    sequence: '14',
  },
  {
    src: 'images/blacksmith_13.MP4',
    label: 'Handle Shaping',
    description: 'Cutting and shaping the handles, gluing it all together with epoxy',
    sequence: '15',
  },
  {
    src: 'images/blacksmith_15.JPEG',
    label: 'Leather Sheath',
    description: 'Making the leather sheath',
    sequence: '16',
  },
  { src: 'images/homepage-3.jpg', label: 'Finished!', description: 'Tadaaaaa', sequence: '17' },
  {
    src: 'images/blacksmith_14 .mp4',
    label: 'Sharpness Test',
    description: 'Testing the sharpness by cutting some paper',
    sequence: '18',
  },
]
</script>

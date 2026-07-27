<template>
  <div>
    <h3 class="text-2xl font-display font-bold mb-6 text-wood-dark">
      Hunting & Kitchen Knife 2025
    </h3>

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

    <ProcessTimeline
      :entries="timeline"
      :collapsible="true"
      :default-open="true"
      label-format="sequence"
      @preview="(src, type) => $emit('preview', src, type)"
    />
  </div>
</template>

<script setup>
import { useMediaUtils } from '../../composables/useMediaUtils'
import { useCarousel } from '../../composables/useCarousel'
import ProcessTimeline from '../../components/ProcessTimeline.vue'

const emit = defineEmits(['preview'])

const { toPublicPath } = useMediaUtils()

const carouselImages = [
  'images/homepage-3.jpg',
  'images/knife_3.jpg',
  'images/knife_4.jpg',
  'images/knife_5.jpg',
  'images/knife-6.jpg',
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
  emit('preview', carouselImages[currentSlide.value])
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
    src: 'images/forge_1.mp4',
    label: 'Heat Treat',
    description:
      'Heat treated to critical temperature (~1475°F), the steel is cherry red and non-magnetic, quenched in canola oil',
    sequence: '11',
  },
  {
    src: 'images/blacksmith_12.MOV',
    label: 'Tempering',
    description: 'Tempering the steel in an oven at 400°F (204°C) for 2 hours, 2 cycles',
    sequence: '12',
  },
  {
    src: 'images/blacksmith_11.JPEG',
    label: 'Pins & Wood',
    description: 'Putting in pins and wood',
    sequence: '13',
  },
  {
    src: 'images/blacksmith_13.MP4',
    label: 'Handle Shaping',
    description: 'Cutting and shaping the handles, gluing it all together with epoxy',
    sequence: '14',
  },
  {
    src: 'images/blacksmith_15.JPEG',
    label: 'Leather Sheath',
    description: 'Making the leather sheath',
    sequence: '15',
  },
  { src: 'images/homepage-3.jpg', label: 'Finished!', description: 'Tadaaaaa', sequence: '16' },
  {
    src: 'images/blacksmith_14 .mp4',
    label: 'Sharpness Test',
    description: 'Testing the sharpness by cutting some paper',
    sequence: '17',
  },
]
</script>

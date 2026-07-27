<template>
  <div>
    <h3 class="text-2xl font-display font-bold mb-6 text-wood-dark">Room Evolution 2022–2026</h3>

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
            :alt="`Setup photo ${i + 1}`"
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

    <CollapsibleControls
      :all-open="allSectionsOpen"
      @open-all="openAllSections"
      @hide-all="hideAllSections"
    />

    <CollapsibleSection
      title="2022–2023"
      v-model="sections['2022-2023']"
      color="accent-red"
      class="mb-4"
    >
      <SetupEntry
        title="My first setup ever"
        :images="[
          'images/setup-2022-2023-1.png',
          'images/setup-2022-2023-2.jpg',
          'images/setup-2022-2023-3.png',
        ]"
        caption="I lowkey miss this walnut desk"
        description="Check out my son (the super awesome cat) and my 3d-printed cosplay slop"
      />
    </CollapsibleSection>

    <CollapsibleSection title="2024" v-model="sections['2024']" color="accent-red" class="mb-4">
      <SetupEntry
        title="diy table + 3d printers"
        :images="['images/setup-2024-1.jpg', 'images/setup-2024-2.jpg', 'images/setup-2024-3.jpg']"
        caption="Wack ass table i built"
        description="The walnut desk was too large, so i got some 2x4's from home depot and made this table... at least it was only like 25$"
      />
    </CollapsibleSection>

    <CollapsibleSection title="2025" v-model="sections['2025']" color="accent-red" class="mb-4">
      <SetupEntry
        title="brothers house setup"
        :images="['images/setup-2025-1.jpg', 'images/setup-2025-2.jpg', 'images/setup-2025-3.jpg']"
        caption="球球 lights, home depot ahh orchid"
        description="isnt this setup lowkey TOUGHHHH"
      />

      <SetupEntry
        title="brothers house setup (decorations)"
        :images="['images/setup-2025-4.jpg', 'images/setup-2025-5.jpg']"
        caption="some decorations :D"
        description=""
      />
    </CollapsibleSection>

    <CollapsibleSection title="2026" v-model="sections['2026']" color="accent-red" class="mb-4">
      <SetupEntry
        era="May–June"
        title="New Apartment!!!"
        :images="['images/setup-may-june-2026-1.png', 'images/setup-may-june-2026-2.png']"
        caption="roommate love triangle completed here."
        description="had my own bathroom for the first time ever, W floating shelf"
      />

      <SetupEntry
        era="July (Current)"
        title="It's not Japandi, its Chinesedi"
        image="images/setup-july-2026-1.png"
        caption="CLEANNN!!!"
        description=""
      />

      <SetupEntry
        era="July (Background)"
        title="Aint it cute"
        :images="['images/setup-july-2026-2.png']"
        caption="CLEANNN!!!"
        description=""
      />
    </CollapsibleSection>

    <ImagePreviewModal
      :preview-image="previewImage"
      :preview-type="previewType"
      :preview-items="previewItems"
      :preview-index="previewIndex"
      :base-path="false"
      @close="closePreview"
      @next="nextPreview"
      @previous="previousPreview"
    />
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import SetupEntry from '../../components/SetupEntry.vue'
import CollapsibleSection from '../../components/CollapsibleSection.vue'
import CollapsibleControls from '../../components/CollapsibleControls.vue'
import ImagePreviewModal from '../../components/ImagePreviewModal.vue'
import { useCarousel } from '../../composables/useCarousel'
import { useImagePreview } from '../../composables/useImagePreview'
import { useMediaUtils } from '../../composables/useMediaUtils'

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
  'images/room setup_new1.jpg',
  'images/room setup_new2.jpg',
  'images/room setup_new3.jpg',
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
  openPreview(
    toPublicPath(carouselImages[currentSlide.value]),
    'image',
    carouselImages.map((image) => ({ src: toPublicPath(image), type: 'image' })),
    currentSlide.value
  )
}

const sections = reactive({
  '2022-2023': true,
  2024: true,
  2025: true,
  2026: true,
})

const allSectionsOpen = computed(() => Object.values(sections).every((v) => v))

function openAllSections() {
  Object.keys(sections).forEach((key) => (sections[key] = true))
}

function hideAllSections() {
  Object.keys(sections).forEach((key) => (sections[key] = false))
}
</script>

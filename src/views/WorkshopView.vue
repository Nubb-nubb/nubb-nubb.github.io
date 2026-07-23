<template>
  <section class="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
    <h2 class="section-title">Workshop</h2>

    <p class="mb-8 text-text-secondary"></p>

    <TabNavigation :tabs="tabs" v-model="activeTab" aria-label="Workshop tabs" />

    <div class="space-y-6 mb-10">
      <div v-if="activeTab === 'current'" class="space-y-4">
        <CollapsibleSection
          v-for="(item, index) in currentWorkshopItems"
          :key="item.title"
          :title="item.title"
          :color="colors[index % colors.length]"
          variant="stripe"
          v-model="openStates[item.title]"
        >
          <div class="space-y-4">
            <p class="text-sm text-text-secondary">
              {{ item.description }}
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div v-for="media in item.media" :key="media.label" class="rounded-sm p-3">
                <img
                  v-if="media.type === 'photo' && media.src"
                  :src="toPublicPath(media.src)"
                  :alt="media.label"
                  class="w-full h-56 md:h-64 object-cover rounded-sm cursor-pointer"
                  @click="openPreview(media.src)"
                />

                <VideoThumbnail
                  v-else-if="media.type === 'video' && media.src"
                  :src="toPublicPath(media.src)"
                  @click="openPreview(media.src, 'video')"
                />

                <div
                  v-else
                  class="h-56 md:h-64 rounded-sm bg-main-bg border border-dashed border-text-secondary/30 flex items-center justify-center text-xs text-text-secondary"
                >
                  Add {{ media.type }} here
                </div>

                <p class="mt-2 text-xs text-text-secondary">{{ media.label }}</p>
              </div>
            </div>
          </div>
        </CollapsibleSection>
      </div>

      <div v-else class="space-y-4">
        <CollapsibleSection
          v-for="(item, index) in dreamWorkshopCards"
          :key="item.title"
          :title="item.title"
          variant="card"
          v-model="dreamOpenStates[item.title]"
        >
          <p class="text-sm text-text-secondary">
            {{ item.description }}
          </p>
        </CollapsibleSection>
      </div>
    </div>

    <p class="italic text-text-secondary">
      {{ activeFooter }}
    </p>

    <ImagePreviewModal
      :preview-image="previewImage"
      :preview-type="previewType"
      @close="closePreview"
    />
  </section>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import CollapsibleSection from '../components/CollapsibleSection.vue'
import TabNavigation from '../components/TabNavigation.vue'
import ImagePreviewModal from '../components/ImagePreviewModal.vue'
import VideoThumbnail from '../components/VideoThumbnail.vue'
import { useImagePreview } from '../composables/useImagePreview'
import { useMediaUtils } from '../composables/useMediaUtils'

const { toPublicPath } = useMediaUtils()

const tabs = [
  { key: 'current', label: 'Current workshop' },
  { key: 'dream', label: 'Dream workshop' },
]

const activeTab = ref('current')
const { previewImage, previewType, openPreview, closePreview } = useImagePreview()

const colors = ['accent-red', 'plant-green', 'wood-light', 'wood-dark']

const currentWorkshopItems = [
  {
    title: '3D Printing Setup',
    description: 'My cute Neptune 3 Pros and Elegoo Centauri Carbon printers',
    media: [
      {
        type: 'photo',
        label: 'Neptune 3 Pro pair',
        src: 'images/neptune-3-pros.jpg',
      },
      {
        type: 'photo',
        label: 'Elegoo Centauri Carbon',
        src: 'images/centauri-carbon.jpg',
      },
    ],
  },
  {
    title: 'Electronics Bench',
    description:
      'My small but mighty soldering station for wiring, repairs, controller work, and electronics',
    media: [
      {
        type: 'photo',
        label: 'Soldering station overview',
        src: 'images/soldering_station.jpg',
      },
      {
        type: 'video',
        label: 'Board repair timelapse',
        src: 'images/Spiderman_Electronics.MP4',
      },
    ],
  },
  {
    title: 'Metal Working Tools',
    description: 'Angle grinder and 1x30 belt sander for cutting and sanding stuff',
    media: [
      {
        type: 'video',
        label: 'Angle grinder',
        src: 'images/angle grinder.mp4',
      },
      {
        type: 'video',
        label: '1x30 sander',
        src: 'images/1x30 sander.mp4',
      },
    ],
  },
  {
    title: 'Forge Corner',
    description: 'Small garage forge for blacksmithing... maybe an anvil one day',
    media: [
      {
        type: 'video',
        label: 'Forge build clip 1',
        src: 'images/forge_1.mp4',
      },
      {
        type: 'video',
        label: 'Forge build clip 2',
        src: 'images/forge_2.MP4',
      },
    ],
  },
  {
    title: 'Coming Soon',
    description: 'New tools and upgrades on the way!',
    media: [
      {
        type: 'photo',
        label: 'Mercury Plus wash & cure',
        src: 'images/mercuryplus.webp',
      },
      {
        type: 'photo',
        label: 'Resin printer',
        src: 'images/resin_printer1.jpg',
      },
    ],
  },
]

// Initialize all workshop items as open by default
const openStates = reactive(
  Object.fromEntries(currentWorkshopItems.map((item) => [item.title, true]))
)

const dreamWorkshopCards = [
  {
    title: 'Seasonal Maker Space',
    description:
      'A workshop with rotating focus seasons: blacksmithing, woodworking, CNC/3D printing, and advanced metalwork.',
  },
  {
    title: 'Open Access Tools',
    description: 'A place where people can access expensive tools without huge upfront costs.',
  },
  {
    title: 'Guides + Mentorship',
    description:
      'Beginner-friendly machine guides plus experienced makers who can help plan projects.',
  },
  {
    title: 'Always Improving',
    description:
      'When tools are out of season, they get serviced, upgraded, and stocked for the next cycle.',
  },
]

// Initialize dream workshop items as closed by default
const dreamOpenStates = reactive(
  Object.fromEntries(dreamWorkshopCards.map((item) => [item.title, false]))
)

const activeFooter = computed(() => {
  if (activeTab.value === 'current') {
    return ''
  }

  return ''
})
</script>

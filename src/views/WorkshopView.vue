<template>
  <section class="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
    <h2 class="section-title">Workshop</h2>

    <p class="mb-8 text-text-secondary">

    </p>

    <TabNavigation
      :tabs="tabs"
      v-model="activeTab"
      aria-label="Workshop tabs"
    />

    <div class="space-y-6 mb-10">
      <div v-if="activeTab === 'current'" class="space-y-4">
        <article
          v-for="(item, index) in currentWorkshopItems"
          :key="item.title"
          class="rounded-sm bg-surface border-l-4"
          :class="colors[index % colors.length]"
        >
          <button
            type="button"
            class="w-full px-5 py-4 flex items-center justify-between text-left"
            :aria-expanded="openItems.has(item.title)"
            @click="toggleItem(item.title)"
          >
            <span class="font-bold text-text-primary">{{ item.title }}</span>
            <span class="text-text-secondary text-sm">
              {{ openItems.has(item.title) ? '−' : '+' }}
            </span>
          </button>

          <div v-if="openItems.has(item.title)" class="px-5 pb-5 space-y-4">
            <p class="text-sm text-text-secondary">
              {{ item.description }}
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                v-for="media in item.media"
                :key="media.label"
                class="rounded-sm p-3"
              >
                <img
                  v-if="media.type === 'photo' && media.src"
                  :src="media.src"
                  :alt="media.label"
                  class="w-full h-56 md:h-64 object-cover rounded-sm cursor-pointer"
                  @click="openPreview(media.src)"
                />

                <div
                  v-else-if="media.type === 'video' && media.src"
                  class="relative w-full h-56 md:h-64 rounded-sm overflow-hidden cursor-pointer bg-black"
                  @click="openPreview(media.src, 'video')"
                >
                  <video
                    :src="media.src"
                    class="w-full h-full object-cover pointer-events-none"
                    muted
                  />
                  <div class="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
                    <div class="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                      <svg class="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>

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
        </article>
      </div>

      <div v-else class="space-y-6">
        <WorkshopCard
          v-for="(item, index) in dreamWorkshopCards"
          :key="item.title"
          :title="item.title"
          :description="item.description"
          :color="colors[index % colors.length]"
        />
      </div>
    </div>

    <p class="italic text-text-secondary">
      {{ activeFooter }}
    </p>

    <ImagePreviewModal
      :preview-image="previewImage"
      :preview-type="previewType"
      :base-path="false"
      @close="closePreview"
    />
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import WorkshopCard from '../components/WorkshopCard.vue'
import TabNavigation from '../components/TabNavigation.vue'
import ImagePreviewModal from '../components/ImagePreviewModal.vue'
import { useImagePreview } from '../composables/useImagePreview'

const tabs = [
  { key: 'current', label: 'Current workshop' },
  { key: 'dream', label: 'Dream workshop' }
]

const activeTab = ref('current')
const { previewImage, previewType, openPreview, closePreview } = useImagePreview()

const colors = [
  'border-accent-red',
  'border-plant-green',
  'border-wood-light',
  'border-wood-dark'
]

const currentWorkshopItems = [
  {
    title: '3D Printing Setup',
    description:
      'My cute Neptune 3 Pros and Elegoo Centauri Carbon printers'
    ,
    media: [
      { type: 'photo', label: 'Neptune 3 Pro pair', src: `${import.meta.env.BASE_URL}images/neptune-3-pros.jpg` },
      { type: 'photo', label: 'Elegoo Centauri Carbon', src: `${import.meta.env.BASE_URL}images/centauri-carbon.jpg` }
    ]
  },
  {
    title: 'Electronics Bench',
    description:
      'My small but mighty soldering station for wiring, repairs, controller work, and electronics',
    media: [
      { type: 'photo', label: 'Soldering station overview', src: `${import.meta.env.BASE_URL}images/soldering_station.jpg` },
      { type: 'video', label: 'Board repair timelapse', src: `${import.meta.env.BASE_URL}images/Spiderman_Electronics.MP4` }
    ]
  },
  {
    title: 'Metal Working Tools',
    description:
      'Angle grinder and 1x30 belt sander for cutting and sanding stuff',
    media: [
      { type: 'video', label: 'Angle grinder', src: `${import.meta.env.BASE_URL}images/angle grinder.mp4` },
      { type: 'video', label: '1x30 sander', src: `${import.meta.env.BASE_URL}images/1x30 sander.mp4` }
    ]
  },
  {
    title: 'Forge Corner',
    description:
      'Small garage forge for blacksmithing... maybe an anvil one day',
    media: [
      { type: 'video', label: 'Forge build clip 1', src: `${import.meta.env.BASE_URL}images/forge_1.mp4` },
      { type: 'video', label: 'Forge build clip 2', src: `${import.meta.env.BASE_URL}images/forge_2.MP4` }
    ]
  },
  {
    title: 'Coming Soon',
    description:
      'New tools and upgrades on the way!',
    media: [
      { type: 'photo', label: 'Mercury Plus wash & cure', src: `${import.meta.env.BASE_URL}images/mercuryplus.webp` },
      { type: 'photo', label: 'Resin printer', src: `${import.meta.env.BASE_URL}images/resin_printer1.jpg` }
    ]
  },
]

// Initialize all workshop items as open by default
const openItems = ref(new Set(currentWorkshopItems.map(item => item.title)))

const dreamWorkshopCards = [
  {
    title: 'Seasonal Maker Space',
    description:
      'A workshop with rotating focus seasons: blacksmithing, woodworking, CNC/3D printing, and advanced metalwork.'
  },
  {
    title: 'Open Access Tools',
    description:
      'A place where people can access expensive tools without huge upfront costs.'
  },
  {
    title: 'Guides + Mentorship',
    description:
      'Beginner-friendly machine guides plus experienced makers who can help plan projects.'
  },
  {
    title: 'Always Improving',
    description:
      'When tools are out of season, they get serviced, upgraded, and stocked for the next cycle.'
  }
]

const toggleItem = (title) => {
  if (openItems.value.has(title)) {
    openItems.value.delete(title)
  } else {
    openItems.value.add(title)
  }
  openItems.value = new Set(openItems.value)
}

const activeFooter = computed(() => {
  if (activeTab.value === 'current') {
    return ''
  }

  return ""
})
</script>

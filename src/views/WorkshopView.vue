<template>
  <section class="max-w-4xl mx-auto px-6 py-20">
    <h2 class="section-title">Workshop</h2>

    <p class="mb-8 text-text-secondary">

    </p>

    <div class="mb-8 border-b border-text-secondary/30">
      <div class="flex flex-wrap gap-3" role="tablist" aria-label="Workshop tabs">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          role="tab"
          type="button"
          :aria-selected="activeTab === tab.key"
          :class="[
            'px-4 py-2 text-sm font-semibold rounded-t-md transition-colors',
            activeTab === tab.key
              ? 'bg-surface text-text-primary border-b-2 border-accent-red'
              : 'text-text-secondary hover:text-text-primary'
          ]"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

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
            :aria-expanded="openItem === item.title"
            @click="toggleItem(item.title)"
          >
            <span class="font-bold text-text-primary">{{ item.title }}</span>
            <span class="text-text-secondary text-sm">
              {{ openItem === item.title ? 'Hide' : 'Show' }}
            </span>
          </button>

          <div v-if="openItem === item.title" class="px-5 pb-5 space-y-4">
            <p class="text-sm text-text-secondary">
              {{ item.description }}
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                v-for="media in item.media"
                :key="media.label"
                class="rounded-sm border border-text-secondary/20 p-3"
              >
                <p class="text-xs uppercase tracking-wide text-text-secondary mb-2">
                  {{ media.type }}
                </p>

                <img
                  v-if="media.type === 'photo' && media.src"
                  :src="media.src"
                  :alt="media.label"
                  class="w-full h-40 object-cover rounded-sm"
                />

                <video
                  v-else-if="media.type === 'video' && media.src"
                  controls
                  class="w-full h-40 object-cover rounded-sm"
                >
                  <source :src="media.src" />
                </video>

                <div
                  v-else
                  class="h-40 rounded-sm bg-main-bg border border-dashed border-text-secondary/30 flex items-center justify-center text-xs text-text-secondary"
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
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import WorkshopCard from '../components/WorkshopCard.vue'

const tabs = [
  { key: 'current', label: 'Current workshop' },
  { key: 'dream', label: 'Dream workshop' }
]

const activeTab = ref('current')

const colors = [
  'border-accent-red',
  'border-plant-green',
  'border-wood-light',
  'border-wood-dark'
]

const openItem = ref('3D Printing Setup')

const currentWorkshopItems = [
  {
    title: '3D Printing Setup',
    description:
      '2x Neptune 3 Pro printers and 1x Elegoo Centauri Carbon for prototypes, fixtures, and small production runs.'
    ,
    media: [
      { type: 'photo', label: 'Neptune 3 Pro pair', src: '' },
      { type: 'photo', label: 'Elegoo Centauri Carbon', src: '' }
    ]
  },
  {
    title: 'Shaping & Finishing',
    description:
      '1x32 belt sander for shaping parts, refining prints, and quick finish work.',
    media: [
      { type: 'photo', label: 'Belt sander station', src: '' },
      { type: 'video', label: 'Sanding workflow clip', src: '' }
    ]
  },
  {
    title: 'Forge Corner',
    description:
      'Small garage forge for blacksmithing experiments and custom metal pieces.',
    media: [
      { type: 'photo', label: 'Garage forge layout', src: '' },
      { type: 'video', label: 'Heating + shaping demo', src: '' }
    ]
  },
  {
    title: 'Electronics Bench',
    description:
      'Soldering station for wiring, repairs, controller work, and electronics integration.',
    media: [
      { type: 'photo', label: 'Soldering station overview', src: '' },
      { type: 'video', label: 'Board repair timelapse', src: '' }
    ]
  },
  {
    title: 'In Progress',
    description:
      'This section can keep growing as I add new tools, machines, and better organization.',
    media: [
      { type: 'photo', label: 'New additions', src: '' },
      { type: 'video', label: 'Shop update walkthrough', src: '' }
    ]
  }
]

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
  openItem.value = openItem.value === title ? '' : title
}

const activeFooter = computed(() => {
  if (activeTab.value === 'current') {
    return ''
  }

  return ""
})
</script>

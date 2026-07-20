<template>
  <section class="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
    <h2 class="section-title">Projects</h2>

    <p class="text-text-secondary mb-8">
      here for some nerd stuff.
    </p>

    <div class="mb-8 border-b border-text-secondary/30">
      <div class="flex flex-wrap gap-3" role="tablist" aria-label="Project tabs">
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

    <div v-if="activeTab === 'blacksmithing'">
      <div class="mb-4 flex items-center gap-2 border-b border-text-secondary/20 pb-2">
        <button
          type="button"
          class="px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-full border transition-colors"
          :class="blacksmithingViewMode === 'timeline'
            ? 'bg-text-primary text-warm-white border-text-primary'
            : 'bg-transparent text-text-secondary border-text-secondary/40 hover:text-text-primary hover:border-text-primary/50'"
          @click="blacksmithingViewMode = 'timeline'"
        >
          Timeline
        </button>
        <button
          type="button"
          class="px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-full border transition-colors"
          :class="blacksmithingViewMode === 'gallery'
            ? 'bg-text-primary text-warm-white border-text-primary'
            : 'bg-transparent text-text-secondary border-text-secondary/40 hover:text-text-primary hover:border-text-primary/50'"
          @click="blacksmithingViewMode = 'gallery'"
        >
          Gallery
        </button>
      </div>

      <SetupEntry
        v-if="blacksmithingViewMode === 'gallery'"
        era="Current"
        title="Blacksmithing Projects"
        :images="blacksmithingMedia"
        :show-sequence-labels="true"
        :start-number="1"
        caption=""
        description=""
      />

      <div v-else class="relative pl-0">
        <div class="absolute left-4 top-0 bottom-0 w-px bg-text-secondary/30 md:left-1/2 md:-translate-x-1/2" />

        <article
          v-for="(entry, index) in blacksmithingTimeline"
          :key="entry.src"
          class="relative pb-6 md:pb-0"
          :class="index !== 0 ? 'md:-mt-24' : ''"
        >
          <!-- Horizontal connector line (desktop only) -->
          <span
            class="hidden md:block absolute top-6 h-px bg-text-secondary/30"
            :class="index % 2 === 0 ? 'left-[calc(50%-1.5rem)] right-1/2' : 'left-1/2 right-[calc(50%-1.5rem)]'"
            aria-hidden="true"
          />

          <!-- Circle marker -->
          <span
            class="absolute left-4 top-4 -translate-x-1/2 h-4 w-4 rounded-full border-2 border-warm-white bg-accent-red md:left-1/2 z-10"
            aria-hidden="true"
          />

          <div
            class="ml-8 md:ml-0 md:w-[calc(50%-1.5rem)]"
            :class="index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'">
            <p class="mb-1.5 text-xs font-mono uppercase tracking-wide text-accent-red">
              {{ entry.label }}
            </p>

            <div class="rounded-sm overflow-hidden bg-[#ebe3d7] border border-black/10">
              <video
                v-if="isVideo(entry.src)"
                :src="toPublicPath(entry.src)"
                class="w-full h-auto object-cover"
                controls
                playsinline
                preload="metadata"
              />
              <img
                v-else
                :src="toPublicPath(entry.src)"
                :alt="entry.label"
                class="w-full h-auto object-cover"
              />
            </div>

            <p class="mt-1 text-xs font-mono text-text-secondary">
              {{ entry.sequence }}
            </p>
          </div>
        </article>
      </div>
    </div>

    <div v-else-if="activeTab === 'butterfly-knife'">
      <SetupEntry
        era="Coming Soon"
        title="Butterfly Knife Projects"
        :images="[]"
        caption="blah blah blah"
        description="Projects will be added here soon!"
      />
    </div>

    <div v-else-if="activeTab === 'coming-soon'">
      <SetupEntry
        era="Future"
        title="More Projects"
        :images="[]"
        caption="blah blah blah"
        description="More projects on the way!"
      />
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import SetupEntry from '../components/SetupEntry.vue'

const tabs = [
  { key: 'blacksmithing', label: 'Blacksmithing' },
  { key: 'butterfly-knife', label: 'Butterfly Knife' },
  { key: 'coming-soon', label: 'Coming Soon' }
]

const activeTab = ref('blacksmithing')
const blacksmithingViewMode = ref('timeline')

const blacksmithingMedia = [
  'images/blacksmith_1.PNG',
  'images/blacksmith_2.JPEG',
  'images/blacksmith_3.MOV',
  'images/blacksmith_4.png',
  'images/blacksmith_5.JPEG',
  'images/blacksmith_6.JPEG',
  'images/blacksmith_7.MOV',
  'images/blacksmith_8.MP4',
  'images/blacksmith_9 .mp4',
  'images/blacksmith_12.MOV',
  'images/blacksmith_11.JPEG',
  'images/blacksmith_13.MP4',
  'images/blacksmith_14.MOV',
  'images/blacksmith_15.JPEG',
  'images/forge_1.mp4',
  'images/homepage-3.jpg'
]

const blacksmithingTimeline = blacksmithingMedia.map((src, index) => ({
  src,
  label: `Point ${index + 1}`,
  sequence: `${index + 1}`
}))

function toPublicPath(path) {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${cleanPath}`
}

function isVideo(path) {
  return /\.(mp4|mov|webm|ogg)$/i.test(path)
}
</script>

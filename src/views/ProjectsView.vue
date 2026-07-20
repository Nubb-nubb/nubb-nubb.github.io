<template>
  <section class="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
    <h2 class="section-title">Hobbies</h2>

    <p class="text-text-secondary mb-8">
      here for some nerd stuff.
    </p>

    <div class="mb-8 border-b border-text-secondary/30">
      <div class="flex flex-wrap gap-3" role="tablist" aria-label="Hobby tabs">
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

    <BlacksmithingTab v-if="activeTab === 'blacksmithing'" @preview="openPreview" />
    <ButterflyKnifeTab v-else-if="activeTab === 'butterfly-knife'" />
    <WatchesTab v-else-if="activeTab === 'watches'" />
    <ComingSoonTab v-else-if="activeTab === 'coming-soon'" />

    <ImagePreviewModal
      :preview-image="previewImage"
      @close="closePreview"
    />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import ImagePreviewModal from '../components/ImagePreviewModal.vue'
import BlacksmithingTab from './hobbies/BlacksmithingTab.vue'
import ButterflyKnifeTab from './hobbies/ButterflyKnifeTab.vue'
import WatchesTab from './hobbies/WatchesTab.vue'
import ComingSoonTab from './hobbies/ComingSoonTab.vue'
import { useImagePreview } from '../composables/useImagePreview'

const { previewImage, openPreview, closePreview } = useImagePreview()

const tabs = [
  { key: 'blacksmithing', label: 'Blacksmithing' },
  { key: 'butterfly-knife', label: 'Butterfly Knife' },
  { key: 'watches', label: 'Watches' },
  { key: 'coming-soon', label: 'Coming Soon' }
]

const activeTab = ref('blacksmithing')
</script>

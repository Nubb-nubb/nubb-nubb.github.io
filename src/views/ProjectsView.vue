<template>
  <section class="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
    <h2 class="section-title">Hobbies</h2>

    <p class="text-text-secondary mb-8">
      here for some nerd stuff.
    </p>

    <TabNavigation
      :tabs="tabs"
      v-model="activeTab"
      aria-label="Hobby tabs"
    />

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
import TabNavigation from '../components/TabNavigation.vue'
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

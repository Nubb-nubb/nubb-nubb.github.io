<template>
  <section class="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
    <h2 class="section-title">Interests</h2>

    <p class="text-text-secondary mb-8">
      here for some nerd stuff.
    </p>

    <TabNavigation
      :tabs="tabs"
      v-model="activeTab"
      aria-label="Interest tabs"
    />

    <SetupsTab v-if="activeTab === 'setups'" />
    <BlacksmithingTab v-else-if="activeTab === 'blacksmithing'" @preview="openPreview" />
    <ButterflyKnifeTab v-else-if="activeTab === 'butterfly-knife'" />
    <WatchesTab v-else-if="activeTab === 'watches'" />
    <ComingSoonTab v-else-if="activeTab === 'coming-soon'" />

    <ImagePreviewModal
      :preview-image="previewImage"
      :preview-type="previewType"
      @close="closePreview"
    />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import ImagePreviewModal from '../components/ImagePreviewModal.vue'
import TabNavigation from '../components/TabNavigation.vue'
import SetupsTab from './hobbies/SetupsTab.vue'
import BlacksmithingTab from './hobbies/BlacksmithingTab.vue'
import ButterflyKnifeTab from './hobbies/ButterflyKnifeTab.vue'
import WatchesTab from './hobbies/WatchesTab.vue'
import ComingSoonTab from './hobbies/ComingSoonTab.vue'
import { useImagePreview } from '../composables/useImagePreview'

const { previewImage, previewType, openPreview, closePreview } = useImagePreview()

const tabs = [
  { key: 'setups', label: 'Setups' },
  { key: 'blacksmithing', label: 'Blacksmithing' },
  { key: 'butterfly-knife', label: 'Butterfly Knife' },
  { key: 'watches', label: 'Watches' },
  { key: 'coming-soon', label: 'Coming Soon' }
]

const activeTab = ref('setups')
</script>

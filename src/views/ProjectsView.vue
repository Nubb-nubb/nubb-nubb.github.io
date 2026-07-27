<template>
  <section class="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
    <h2 class="section-title">
      Interests
      <button
        @click="unlockComingSoon"
        class="inline-flex items-center ml-2 text-warm-white hover:text-accent-red transition-colors text-sm"
        aria-label="Unlock secret tab"
        type="button"
      >
        ᓚ₍ ^. ̫ .^₎
      </button>
    </h2>

    <p class="text-text-secondary mb-8">here for some nerd stuff.</p>

    <TabNavigation :tabs="tabs" v-model="activeTab" aria-label="Interest tabs" />

    <SetupsTab v-if="activeTab === 'setups'" />
    <BlacksmithingTab v-else-if="activeTab === 'blacksmithing'" @preview="openPreview" />
    <ButterflyKnifeTab v-else-if="activeTab === 'butterfly-knife'" />
    <WatchesTab v-else-if="activeTab === 'watches'" />
    <PrintsTab v-else-if="activeTab === '3d-prints'" />
    <ComingSoonTab v-else-if="activeTab === 'coming-soon'" />

    <ImagePreviewModal
      :preview-image="previewImage"
      :preview-type="previewType"
      :preview-items="previewItems"
      :preview-index="previewIndex"
      @close="closePreview"
      @next="nextPreview"
      @previous="previousPreview"
    />
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import ImagePreviewModal from '../components/ImagePreviewModal.vue'
import TabNavigation from '../components/TabNavigation.vue'
import SetupsTab from './hobbies/SetupsTab.vue'
import BlacksmithingTab from './hobbies/BlacksmithingTab.vue'
import ButterflyKnifeTab from './hobbies/ButterflyKnifeTab.vue'
import WatchesTab from './hobbies/WatchesTab.vue'
import PrintsTab from './hobbies/3DPrintsTab.vue'
import ComingSoonTab from './hobbies/ComingSoonTab.vue'
import { useImagePreview } from '../composables/useImagePreview'

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

const showComingSoon = ref(false)

function unlockComingSoon() {
  showComingSoon.value = !showComingSoon.value
}

const tabs = computed(() => {
  const baseTabs = [
    { key: 'setups', label: 'Setups' },
    { key: '3d-prints', label: '3D Prints' },
    { key: 'blacksmithing', label: 'Blacksmithing' },
    { key: 'butterfly-knife', label: 'Butterfly Knife' },
    { key: 'watches', label: 'Watches' },
  ]
  if (showComingSoon.value) {
    baseTabs.push({ key: 'coming-soon', label: 'Coming Soon' })
  }
  return baseTabs
})

const activeTab = ref('setups')
</script>

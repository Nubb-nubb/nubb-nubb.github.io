<template>
  <div>
    <h3 class="text-2xl font-display font-bold mb-6 text-wood-dark">Butterfly Knife Tricks 2025</h3>

    <PillTabs :tabs="subTabs" v-model="subTab" />

    <div class="grid gap-4 grid-cols-2">
      <div v-for="entry in subTab === 'trainers' ? trainers : liveBlades" :key="entry.src">
        <VideoThumbnail
          :src="toPublicPath(entry.src)"
          height="auto"
          @click="openPreview(entry.src, 'video')"
        />
        <p class="text-xs font-mono uppercase tracking-wide text-accent-red mt-2 mb-1">
          {{ entry.label }}
        </p>
        <p class="text-xs text-text-secondary">
          {{ entry.description }}
        </p>
      </div>
    </div>

    <ImagePreviewModal
      :preview-image="previewImage"
      :preview-type="previewType"
      @close="closePreview"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMediaUtils } from '../../composables/useMediaUtils'
import { useImagePreview } from '../../composables/useImagePreview'
import VideoThumbnail from '../../components/VideoThumbnail.vue'
import ImagePreviewModal from '../../components/ImagePreviewModal.vue'
import PillTabs from '../../components/PillTabs.vue'

const { toPublicPath } = useMediaUtils()
const { previewImage, previewType, openPreview, closePreview } = useImagePreview()

const subTab = ref('trainers')
const subTabs = [
  { key: 'trainers', label: 'Trainers' },
  { key: 'live-blades', label: 'Live Blades' },
]

const trainers = [
  {
    src: 'images/butterfly_1.MP4',
    label: 'Squiddy Trainer',
    description: 'My first butterfly knife',
  },
  { src: 'images/butterfly_2.MP4', label: 'Nabalis Cheese', description: '' },
]

const liveBlades = [
  { src: 'images/butterfly_3.MP4', label: 'Squid Industries Tsunami Clone', description: '' },
  {
    src: 'images/butterfly_4.MP4',
    label: 'BRS Replicant',
    description: 'I got cooked in this one, but its lowkey my favorite knife',
  },
]
</script>

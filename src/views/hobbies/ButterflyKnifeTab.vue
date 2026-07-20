<template>
  <div>
    <div class="mb-4 flex items-center gap-2">
      <button
        type="button"
        class="px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-full border transition-colors"
        :class="subTab === 'trainers'
          ? 'bg-text-primary text-warm-white border-text-primary'
          : 'bg-transparent text-text-secondary border-text-secondary/40 hover:text-text-primary hover:border-text-primary/50'"
        @click="subTab = 'trainers'"
      >
        Trainers
      </button>
      <button
        type="button"
        class="px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-full border transition-colors"
        :class="subTab === 'live-blades'
          ? 'bg-text-primary text-warm-white border-text-primary'
          : 'bg-transparent text-text-secondary border-text-secondary/40 hover:text-text-primary hover:border-text-primary/50'"
        @click="subTab = 'live-blades'"
      >
        Live Blades
      </button>
    </div>

    <div class="grid gap-4 grid-cols-2">
      <div
        v-for="entry in (subTab === 'trainers' ? trainers : liveBlades)"
        :key="entry.src"
      >
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

const { toPublicPath } = useMediaUtils()
const { previewImage, previewType, openPreview, closePreview } = useImagePreview()

const subTab = ref('trainers')

const trainers = [
  { src: 'images/butterfly_1.MP4', label: 'Squiddy Trainer', description: 'My first butterfly knife' },
  { src: 'images/butterfly_2.MP4', label: 'Nabalis Cheese', description: '' }
]

const liveBlades = [
  { src: 'images/butterfly_3.MP4', label: 'Squid Industries Tsunami Clone', description: '' },
  { src: 'images/butterfly_4.MP4', label: 'BRS Replicant', description: 'I got cooked in this one, but its lowkey my favorite knife' }
]
</script>

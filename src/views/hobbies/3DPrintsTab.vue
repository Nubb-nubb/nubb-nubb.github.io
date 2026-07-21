<template>
  <div>
    <h3 class="text-2xl font-display font-bold mb-6 text-wood-dark">3D Prints Collection</h3>

    <div class="mb-4 flex items-center gap-2 flex-wrap">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        class="px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-full border transition-colors"
        :class="
          activeTab === tab.key
            ? 'bg-text-primary text-warm-white border-text-primary'
            : 'bg-transparent text-text-secondary border-text-secondary/40 hover:text-text-primary hover:border-text-primary/50'
        "
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- One Piece tab -->
    <div v-if="activeTab === 'one-piece'" class="space-y-4">
      <p class="text-text-secondary text-sm mb-4">Details coming soon...</p>
      <div class="grid gap-4 grid-cols-2 sm:grid-cols-3">
        <div
          v-for="print in onePiecePrints"
          :key="print.image"
          class="bg-surface rounded-sm overflow-hidden"
        >
          <img
            v-if="print.image"
            :src="toPublicPath(print.image)"
            :alt="print.name"
            class="w-full h-48 object-cover cursor-pointer"
            @click="openPreview(print.image)"
          />
          <div
            v-else
            class="w-full h-48 bg-main-bg border border-dashed border-text-secondary/30 flex items-center justify-center text-xs text-text-secondary"
          >
            Add photo
          </div>
          <p class="p-2 text-sm text-text-primary">{{ print.name }}</p>
        </div>
      </div>
    </div>

    <!-- JJK tab -->
    <div v-else-if="activeTab === 'jjk'" class="space-y-4">
      <p class="text-text-secondary text-sm mb-4">Details coming soon...</p>
      <div class="grid gap-4 grid-cols-2 sm:grid-cols-3">
        <div
          v-for="print in jjkPrints"
          :key="print.image"
          class="bg-surface rounded-sm overflow-hidden"
        >
          <img
            v-if="print.image"
            :src="toPublicPath(print.image)"
            :alt="print.name"
            class="w-full h-48 object-cover cursor-pointer"
            @click="openPreview(print.image)"
          />
          <div
            v-else
            class="w-full h-48 bg-main-bg border border-dashed border-text-secondary/30 flex items-center justify-center text-xs text-text-secondary"
          >
            Add photo
          </div>
          <p class="p-2 text-sm text-text-primary">{{ print.name }}</p>
        </div>
      </div>
    </div>

    <!-- Valorant tab -->
    <div v-else-if="activeTab === 'valorant'" class="space-y-4">
      <p class="text-text-secondary text-sm mb-4">Details coming soon...</p>
      <div class="grid gap-4 grid-cols-2 sm:grid-cols-3">
        <div
          v-for="print in valorantPrints"
          :key="print.image"
          class="bg-surface rounded-sm overflow-hidden"
        >
          <img
            v-if="print.image"
            :src="toPublicPath(print.image)"
            :alt="print.name"
            class="w-full h-48 object-cover cursor-pointer"
            @click="openPreview(print.image)"
          />
          <div
            v-else
            class="w-full h-48 bg-main-bg border border-dashed border-text-secondary/30 flex items-center justify-center text-xs text-text-secondary"
          >
            Add photo
          </div>
          <p class="p-2 text-sm text-text-primary">{{ print.name }}</p>
        </div>
      </div>
    </div>

    <!-- Spiderman tab -->
    <div v-else-if="activeTab === 'spiderman'" class="space-y-4">
      <p class="text-text-secondary text-sm mb-4">Details coming soon...</p>
      <div class="grid gap-4 grid-cols-2 sm:grid-cols-3">
        <div
          v-for="print in spidermanPrints"
          :key="print.image"
          class="bg-surface rounded-sm overflow-hidden"
        >
          <img
            v-if="print.image"
            :src="toPublicPath(print.image)"
            :alt="print.name"
            class="w-full h-48 object-cover cursor-pointer"
            @click="openPreview(print.image)"
          />
          <div
            v-else
            class="w-full h-48 bg-main-bg border border-dashed border-text-secondary/30 flex items-center justify-center text-xs text-text-secondary"
          >
            Add photo
          </div>
          <p class="p-2 text-sm text-text-primary">{{ print.name }}</p>
        </div>
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
import { useImagePreview } from '../../composables/useImagePreview'
import { useMediaUtils } from '../../composables/useMediaUtils'
import ImagePreviewModal from '../../components/ImagePreviewModal.vue'

const { previewImage, previewType, openPreview, closePreview } = useImagePreview()
const { toPublicPath } = useMediaUtils()

const tabs = [
  { key: 'one-piece', label: 'One Piece' },
  { key: 'jjk', label: 'JJK' },
  { key: 'valorant', label: 'Valorant' },
  { key: 'spiderman', label: 'Spiderman' },
]

const activeTab = ref('one-piece')

// One Piece prints - add your images here
const onePiecePrints = [{ image: '', name: 'Coming soon...' }]

// Jujutsu Kaisen prints - add your images here
const jjkPrints = [{ image: '', name: 'Coming soon...' }]

// Valorant prints - add your images here
const valorantPrints = [{ image: '', name: 'Coming soon...' }]

// Spiderman prints - add your images here
const spidermanPrints = [{ image: '', name: 'Coming soon...' }]
</script>

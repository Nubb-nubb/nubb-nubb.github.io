<template>
  <div>
    <div class="mb-4 flex items-center gap-2">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        class="px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-full border transition-colors"
        :class="activeTab === tab.key
          ? 'bg-text-primary text-warm-white border-text-primary'
          : 'bg-transparent text-text-secondary border-text-secondary/40 hover:text-text-primary hover:border-text-primary/50'"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="grid gap-6 grid-cols-1 sm:grid-cols-2">
      <div
        v-for="watch in currentWatches"
        :key="watch.image"
      >
        <img
          :src="toPublicPath(watch.image)"
          :alt="watch.name"
          class="w-full h-64 object-cover rounded-sm cursor-pointer"
          @click="openPreview(watch.image)"
        />
        <p class="mt-2 text-sm text-text-primary">{{ watch.name }}</p>
      </div>
    </div>

    <ImagePreviewModal
      :preview-image="previewImage"
      @close="closePreview"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useImagePreview } from '../../composables/useImagePreview'
import { useMediaUtils } from '../../composables/useMediaUtils'
import ImagePreviewModal from '../../components/ImagePreviewModal.vue'

const { previewImage, openPreview, closePreview } = useImagePreview()
const { toPublicPath } = useMediaUtils()

const tabs = [
  { key: 'diy', label: 'DIY' },
  { key: 'collection', label: 'Collection' },
  { key: 'wishlist', label: 'Wishlist' }
]

const activeTab = ref('diy')

const diyWatches = [
  { image: 'images/watch_3.jpg', name: 'DIY Rolex Oyster Perpetual Homage' }
]

const collectionWatches = [
  { image: 'images/watch_3.jpg', name: 'DIY Rolex Oyster Perpetual Homage' },
  { image: 'images/watch_4.jpg', name: 'Casio A158WA' },
  { image: 'images/watch_8.jpg', name: 'Citizen Tsuyosa 37mm' },
  { image: 'images/watch_12.jpg', name: 'G-Shock' }
]

const wishlistWatches = [
  { image: 'images/watch_2.jpg', name: 'Citizen Pepsi' },
  { image: 'images/watch_5.jpg', name: 'Seiko SPB155 (Baby Alpinist)' },
  { image: 'images/watch_6.jpg', name: 'Orient Bambino Small Seconds v7' },
  { image: 'images/watch_7.jpg', name: '海鷗表 1963 (Seagull 1963)' },
  { image: 'images/watch_9.jpg', name: 'Seiko × One Piece Luffy Gear 5' },
  { image: 'images/watch_10.jpg', name: 'Timex Q GMT Pepsi' },
  { image: 'images/watch_11.jpg', name: 'Grand Seiko SBGA413 Shunbun' }
]

const currentWatches = computed(() => {
  if (activeTab.value === 'diy') return diyWatches
  if (activeTab.value === 'collection') return collectionWatches
  return wishlistWatches
})
</script>

<template>
  <div>
    <h3 class="text-2xl font-display font-bold mb-6 text-wood-dark">Watch Collection 2024–2026</h3>

    <PillTabs :tabs="tabs" v-model="activeTab" />

    <!-- DIY tab -->
    <div v-if="activeTab === 'diy'">
      <!-- Hero: Featured DIY watches (12, 13, 14) -->
      <div class="grid gap-4 grid-cols-3">
        <div v-for="watch in diyFeatured" :key="watch.image" class="text-center">
          <img
            :src="toPublicPath(watch.image)"
            :alt="watch.name"
            class="w-full aspect-square object-cover rounded-sm cursor-pointer"
            @click="openPreview(watch.image)"
          />
          <p class="mt-2 text-sm text-text-primary">{{ watch.name }}</p>
        </div>
      </div>

      <!-- See how it's made expandable section -->
      <button
        type="button"
        class="mt-6 flex items-center gap-2 text-sm font-semibold text-accent-red hover:text-accent-red/80 transition-colors"
        @click="showDiyProcess = !showDiyProcess"
      >
        <span>see how it's made</span>
        <span class="transition-transform duration-200" :class="showDiyProcess ? 'rotate-90' : ''">
          →
        </span>
      </button>

      <!-- DIY process timeline -->
      <div v-show="showDiyProcess" class="mt-6 relative pl-0">
        <div
          class="absolute left-4 top-0 bottom-0 w-px bg-text-secondary/30 md:left-1/2 md:-translate-x-1/2"
        />

        <article
          v-for="(entry, index) in diyProcess"
          :key="entry.image"
          class="relative pb-6 md:pb-0"
          :class="index !== 0 ? 'md:-mt-24' : ''"
        >
          <!-- Horizontal connector line (desktop only) -->
          <span
            class="hidden md:block absolute top-6 h-px bg-text-secondary/30"
            :class="
              index % 2 === 0
                ? 'left-[calc(50%-1.5rem)] right-1/2'
                : 'left-1/2 right-[calc(50%-1.5rem)]'
            "
            aria-hidden="true"
          />

          <!-- Circle marker -->
          <span
            class="absolute left-4 top-4 -translate-x-1/2 h-4 w-4 rounded-full border-2 border-warm-white bg-accent-red md:left-1/2 z-10"
            aria-hidden="true"
          />

          <div
            class="ml-8 md:ml-0 md:w-[calc(50%-1.5rem)]"
            :class="index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'"
          >
            <p class="mb-1.5 text-xs font-mono uppercase tracking-wide text-accent-red">
              Step {{ index + 1 }}
            </p>

            <div class="rounded-sm overflow-hidden bg-[#ebe3d7] border border-black/10">
              <VideoThumbnail
                v-if="isVideo(entry.image)"
                :src="toPublicPath(entry.image)"
                height="auto"
                @click="openPreview(entry.image, 'video')"
              />
              <img
                v-else
                :src="toPublicPath(entry.image)"
                :alt="entry.name"
                class="w-full h-auto object-cover cursor-pointer"
                @click="openPreview(entry.image)"
              />
            </div>

            <p class="mt-2 text-sm text-text-secondary">
              {{ entry.name }}
            </p>
          </div>
        </article>
      </div>
    </div>

    <!-- Collection tab -->
    <div v-else-if="activeTab === 'collection'" class="grid gap-4 grid-cols-2 sm:grid-cols-3">
      <div v-for="watch in collectionWatches" :key="watch.image">
        <VideoThumbnail
          v-if="isVideo(watch.image)"
          :src="toPublicPath(watch.image)"
          height="h-48"
          @click="openPreview(watch.image, 'video')"
        />
        <img
          v-else
          :src="toPublicPath(watch.image)"
          :alt="watch.name"
          class="w-full h-48 object-cover rounded-sm cursor-pointer"
          @click="openPreview(watch.image)"
        />
        <p class="mt-2 text-sm text-text-primary">{{ watch.name }}</p>
      </div>
    </div>

    <!-- Wishlist tab with sections -->
    <div v-else class="space-y-10">
      <div v-for="section in wishlistSections" :key="section.title">
        <p class="text-xs font-mono uppercase tracking-wide text-accent-red mb-4">
          {{ section.title }}
        </p>
        <div class="grid gap-4 grid-cols-2 sm:grid-cols-3">
          <div v-for="watch in section.watches" :key="watch.image">
            <img
              :src="toPublicPath(watch.image)"
              :alt="watch.name"
              class="w-full h-48 object-cover rounded-sm cursor-pointer"
              @click="openPreview(watch.image)"
            />
            <p class="mt-2 text-sm text-text-primary">{{ watch.name }}</p>
          </div>
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
import VideoThumbnail from '../../components/VideoThumbnail.vue'
import PillTabs from '../../components/PillTabs.vue'

const { previewImage, previewType, openPreview, closePreview } = useImagePreview()
const { toPublicPath, isVideo } = useMediaUtils()

const tabs = [
  { key: 'diy', label: 'DIY' },
  { key: 'collection', label: 'Collection' },
  { key: 'wishlist', label: 'Wishlist' },
]

const activeTab = ref('diy')
const showDiyProcess = ref(false)

// Featured DIY watches (final results)
const diyFeatured = [
  { image: 'images/diy_14.jpg', name: 'Steven' },
  { image: 'images/diy_12.jpg', name: 'Daniel' },
  { image: 'images/diy_13.jpg', name: 'Lucas' },
]

// DIY build process
const diyProcess = [
  { image: 'images/diy_2.jpg', name: 'All the parts came!' },
  {
    image: 'images/diy_3.mp4',
    name: 'Taking out the movement, its an NH35, a mass produced Seiko movement',
  },
  { image: 'images/diy_4.mp4', name: 'Closer look at the NH35' },
  { image: 'images/diy_5.mov', name: 'Putting on the dial!' },
  { image: 'images/diy_6.mov', name: 'Hands!' },
  { image: 'images/diy_7.mov', name: 'Little watch heartbeat' },
  { image: 'images/diy_8.jpg', name: 'Putting on the stem' },
  { image: 'images/diy_9.jpg', name: 'The stem ruined my clippers :(' },
  { image: 'images/diy_10.mov', name: 'Winding the watch!!' },
  { image: 'images/diy_11.jpg', name: 'Checking its beat error' },
  { image: 'images/diy_15.jpg', name: 'Finished!' },
]

const collectionWatches = [
  { image: 'images/watch_3.jpg', name: 'DIY Rolex Oyster Perpetual Homage' },
  { image: 'images/watch_4.jpg', name: 'Casio A158WA' },
  { image: 'images/watch_8.jpg', name: 'Citizen Tsuyosa 37mm' },
  { image: 'images/watch_12.jpg', name: 'G-Shock AW-591ML' },
]

const wishlistSections = [
  {
    title: 'Near Future',
    watches: [
      { image: 'images/watch_6.jpg', name: 'Orient Bambino Small Seconds v7' },
      { image: 'images/watch_5.jpg', name: 'Seiko SPB155 (Baby Alpinist)' },
      { image: 'images/watch_7.jpg', name: '海鷗表 1963 (Seagull 1963)' },
    ],
  },
  {
    title: 'Potential GMT',
    watches: [
      { image: 'images/watch_2.jpg', name: 'Citizen Series 8 GMT Pepsi' },
      { image: 'images/watch_10.jpg', name: 'Timex Q GMT Pepsi' },
    ],
  },
  {
    title: 'Far Future',
    watches: [
      { image: 'images/watch_9.jpg', name: 'Seiko × One Piece Luffy Gear 5' },
      { image: 'images/watch_11.jpg', name: 'Grand Seiko SBGA413 Shunbun' },
    ],
  },
]
</script>

<template>
  <div>
    <!-- Album grid view -->
    <div v-if="!selectedAlbum" class="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
      <button
        v-for="album in albums"
        :key="album.key"
        type="button"
        class="group text-left"
        @click="selectAlbum(album)"
      >
        <div
          class="relative aspect-square rounded-lg overflow-hidden bg-surface shadow-md transition-transform group-hover:scale-[1.02]"
        >
          <video
            v-if="isVideoOnlyAlbum(album)"
            :src="getAlbumThumbnail(album) + '#t=0.1'"
            class="w-full h-full object-cover pointer-events-none"
            muted
            playsinline
            preload="metadata"
          />
          <img
            v-else
            :src="getAlbumThumbnail(album)"
            :alt="album.label"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </div>
        <p class="mt-2 text-sm font-medium text-text-primary truncate">{{ album.label }}</p>
        <p class="text-xs text-text-secondary">{{ album.media.length }} items</p>
      </button>
    </div>

    <!-- Selected album content -->
    <div v-else>
      <button
        type="button"
        class="mb-4 flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors"
        @click="selectedAlbum = null"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to albums
      </button>

      <h4 class="text-lg font-semibold text-text-primary mb-4">{{ selectedAlbum.label }}</h4>

      <div class="grid gap-4 grid-cols-2 sm:grid-cols-3">
        <div
          v-for="media in selectedAlbum.media"
          :key="media"
          class="bg-surface rounded-sm overflow-hidden"
        >
          <VideoThumbnail
            v-if="isVideo(media)"
            :src="toPublicPath(media)"
            height="md"
            @click="$emit('preview', media)"
          />
          <img
            v-else
            :src="toPublicPath(media)"
            :alt="selectedAlbum.label"
            class="w-full h-48 object-cover cursor-pointer"
            @click="$emit('preview', media)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMediaUtils } from '../composables/useMediaUtils'
import VideoThumbnail from './VideoThumbnail.vue'

const props = defineProps({
  albums: {
    type: Array,
    required: true,
    // Each album: { key: string, label: string, media: string[], thumbnail?: string }
  },
})

defineEmits(['preview'])

const { toPublicPath, isVideo } = useMediaUtils()

const selectedAlbum = ref(null)

function isVideoOnlyAlbum(album) {
  return album.media.every((m) => isVideo(m))
}

function getAlbumThumbnail(album) {
  // Use explicit thumbnail if provided
  if (album.thumbnail) {
    return toPublicPath(album.thumbnail)
  }
  // Find first non-video media item for thumbnail
  const firstImage = album.media.find((m) => !isVideo(m))
  // If no images, use first video
  return toPublicPath(firstImage || album.media[0])
}

function selectAlbum(album) {
  selectedAlbum.value = album
}
</script>

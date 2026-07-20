<template>
  <div class="mb-16">
    <div class="date-label">{{ era }}</div>
    <h3 class="text-2xl font-display font-bold mt-2 mb-4 text-wood-dark">{{ title }}</h3>

    <div v-if="imageList.length === 1" class="rounded-sm overflow-hidden mb-4 bg-[#ebe3d7]">
      <img
        v-if="!isFailed(imageList[0])"
        :src="toPublicPath(imageList[0])"
        :alt="title"
        class="w-full h-auto object-contain max-h-[760px] cursor-pointer"
        @error="markFailed(imageList[0])"
        @click="openPreview(imageList[0])"
      />
      <div v-else class="text-center text-gray-600 text-sm py-12">
        <p>Photo: {{ era }}</p>
        <p class="text-xs mt-1">Add to <code class="bg-gray-200 px-1">public/images/</code></p>
      </div>
    </div>

    <div v-else-if="imageList.length === 3" class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
      <div
        class="rounded-sm overflow-hidden bg-[#ebe3d7] md:row-span-2 min-h-[280px] md:min-h-[560px]"
      >
        <img
          v-if="!isFailed(imageList[0])"
          :src="toPublicPath(imageList[0])"
          :alt="`${title} 1`"
          class="w-full h-full object-cover cursor-pointer"
          @error="markFailed(imageList[0])"
          @click="openPreview(imageList[0])"
        />
        <div
          v-else
          class="text-center text-gray-600 text-sm h-full flex items-center justify-center px-4"
        >
          <p>Missing: {{ imageList[0] }}</p>
        </div>
      </div>

      <div class="rounded-sm overflow-hidden bg-[#ebe3d7] min-h-[220px] md:min-h-[274px]">
        <img
          v-if="!isFailed(imageList[1])"
          :src="toPublicPath(imageList[1])"
          :alt="`${title} 2`"
          class="w-full h-full object-cover cursor-pointer"
          @error="markFailed(imageList[1])"
          @click="openPreview(imageList[1])"
        />
        <div
          v-else
          class="text-center text-gray-600 text-sm h-full flex items-center justify-center px-4"
        >
          <p>Missing: {{ imageList[1] }}</p>
        </div>
      </div>

      <div class="rounded-sm overflow-hidden bg-[#ebe3d7] min-h-[220px] md:min-h-[274px]">
        <img
          v-if="!isFailed(imageList[2])"
          :src="toPublicPath(imageList[2])"
          :alt="`${title} 3`"
          class="w-full h-full object-cover cursor-pointer"
          @error="markFailed(imageList[2])"
          @click="openPreview(imageList[2])"
        />
        <div
          v-else
          class="text-center text-gray-600 text-sm h-full flex items-center justify-center px-4"
        >
          <p>Missing: {{ imageList[2] }}</p>
        </div>
      </div>
    </div>

    <div v-else class="columns-1 sm:columns-2 gap-3 mb-4">
      <div
        v-for="(entryMedia, mediaIndex) in imageList"
        :key="entryMedia"
        class="mb-3 break-inside-avoid rounded-sm overflow-hidden bg-[#ebe3d7]"
      >
        <template v-if="!isFailed(entryMedia)">
          <VideoThumbnail
            v-if="isVideo(entryMedia)"
            :src="toPublicPath(entryMedia)"
            height="auto"
            @click="openPreview(entryMedia, 'video')"
          />
          <img
            v-else
            :src="toPublicPath(entryMedia)"
            :alt="title"
            class="w-full h-auto object-cover cursor-pointer"
            @error="markFailed(entryMedia)"
            @click="openPreview(entryMedia)"
          />
        </template>
        <div v-else class="text-center text-gray-600 text-sm py-10 px-4">
          <p>Missing: {{ entryMedia }}</p>
        </div>

        <p
          v-if="showSequenceLabels"
          class="px-3 py-2 text-xs font-mono text-text-secondary border-t border-black/10 bg-warm-white/70"
        >
          {{ sequenceLabel(mediaIndex) }}
        </p>
      </div>
    </div>

    <p class="caption">"{{ caption }}"</p>
    <p class="text-sm text-text-secondary">
      {{ description }}
    </p>

    <ImagePreviewModal
      :preview-image="previewImage"
      :preview-type="previewType"
      @close="closePreview"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useImagePreview } from '../composables/useImagePreview'
import { useMediaUtils } from '../composables/useMediaUtils'
import ImagePreviewModal from './ImagePreviewModal.vue'
import VideoThumbnail from './VideoThumbnail.vue'

const props = defineProps({
  era: String,
  title: String,
  image: String,
  images: {
    type: Array,
    default: () => [],
  },
  showSequenceLabels: {
    type: Boolean,
    default: false,
  },
  startNumber: {
    type: Number,
    default: 1,
  },
  caption: String,
  description: String,
})

const failed = ref(new Set())
const { previewImage, previewType, openPreview, closePreview } = useImagePreview()
const { toPublicPath, isVideo } = useMediaUtils()

const imageList = computed(() => {
  if (Array.isArray(props.images) && props.images.length > 0) {
    return props.images
  }
  if (props.image) {
    return [props.image]
  }
  return []
})

function markFailed(path) {
  failed.value.add(path)
}

function isFailed(path) {
  return failed.value.has(path)
}

function sequenceLabel(index) {
  return `${props.startNumber + index}`
}
</script>

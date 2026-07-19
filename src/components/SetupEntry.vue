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
      <div class="rounded-sm overflow-hidden bg-[#ebe3d7] md:row-span-2 min-h-[280px] md:min-h-[560px]">
        <img
          v-if="!isFailed(imageList[0])"
          :src="toPublicPath(imageList[0])"
          :alt="`${title} 1`"
          class="w-full h-full object-cover cursor-pointer"
          @error="markFailed(imageList[0])"
          @click="openPreview(imageList[0])"
        />
        <div v-else class="text-center text-gray-600 text-sm h-full flex items-center justify-center px-4">
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
        <div v-else class="text-center text-gray-600 text-sm h-full flex items-center justify-center px-4">
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
        <div v-else class="text-center text-gray-600 text-sm h-full flex items-center justify-center px-4">
          <p>Missing: {{ imageList[2] }}</p>
        </div>
      </div>
    </div>

    <div v-else class="columns-1 sm:columns-2 gap-3 mb-4">
      <div
        v-for="entryImage in imageList"
        :key="entryImage"
        class="mb-3 break-inside-avoid rounded-sm overflow-hidden bg-[#ebe3d7]"
      >
        <img
          v-if="!isFailed(entryImage)"
          :src="toPublicPath(entryImage)"
          :alt="title"
          class="w-full h-auto object-cover cursor-pointer"
          @error="markFailed(entryImage)"
          @click="openPreview(entryImage)"
        />
        <div v-else class="text-center text-gray-600 text-sm py-10 px-4">
          <p>Missing: {{ entryImage }}</p>
        </div>
      </div>
    </div>

    <p class="caption">"{{ caption }}"</p>
    <p class="text-sm text-text-secondary">
      {{ description }}
    </p>

    <div
      v-if="previewImage"
      class="fixed inset-0 z-50 bg-black/85 p-4 md:p-8 flex items-center justify-center"
      @click="closePreview"
    >
      <button
        type="button"
        class="absolute top-4 right-4 md:top-6 md:right-6 text-white text-3xl leading-none"
        @click.stop="closePreview"
        aria-label="Close preview"
      >
        ×
      </button>

      <img
        :src="toPublicPath(previewImage)"
        :alt="title"
        class="max-w-[94vw] max-h-[92vh] w-auto h-auto object-contain rounded-sm shadow-2xl"
        @click.stop
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useImagePreview } from '../composables/useImagePreview'

const props = defineProps({
  era: String,
  title: String,
  image: String,
  images: {
    type: Array,
    default: () => []
  },
  caption: String,
  description: String
})

const failed = ref(new Set())
const { previewImage, openPreview, closePreview } = useImagePreview()

const imageList = computed(() => {
  if (Array.isArray(props.images) && props.images.length > 0) {
    return props.images
  }
  if (props.image) {
    return [props.image]
  }
  return []
})

function toPublicPath(path) {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${cleanPath}`
}

function markFailed(path) {
  failed.value.add(path)
}

function isFailed(path) {
  return failed.value.has(path)
}
</script>

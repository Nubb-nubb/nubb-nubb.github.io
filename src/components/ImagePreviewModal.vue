<template>
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

    <button
      v-if="canNavigate"
      type="button"
      class="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white text-xl shadow-lg transition hover:bg-black/70"
      @click.stop="emit('previous')"
      aria-label="Previous media"
    >
      ‹
    </button>

    <button
      v-if="canNavigate"
      type="button"
      class="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white text-xl shadow-lg transition hover:bg-black/70"
      @click.stop="emit('next')"
      aria-label="Next media"
    >
      ›
    </button>

    <div
      v-if="canNavigate"
      class="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-sm text-white"
    >
      {{ currentIndex + 1 }} / {{ totalItems }}
    </div>

    <video
      v-if="isVideoSrc"
      controls
      autoplay
      class="max-w-[94vw] max-h-[92vh] w-auto h-auto object-contain rounded-sm shadow-2xl"
      @click.stop
    >
      <source :src="mediaSrc" />
    </video>

    <img
      v-else
      :src="mediaSrc"
      alt="Preview"
      class="max-w-[94vw] max-h-[92vh] w-auto h-auto object-contain rounded-sm shadow-2xl"
      @click.stop
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  previewImage: {
    type: String,
    default: '',
  },
  previewType: {
    type: String,
    default: 'image', // 'image' or 'video'
  },
  previewItems: {
    type: Array,
    default: () => [],
  },
  previewIndex: {
    type: Number,
    default: -1,
  },
  basePath: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['close', 'next', 'previous'])

const mediaSrc = computed(() => {
  if (!props.previewImage) return ''
  if (!props.basePath) return props.previewImage
  const cleanPath = props.previewImage.startsWith('/')
    ? props.previewImage.slice(1)
    : props.previewImage
  return `${import.meta.env.BASE_URL}${cleanPath}`
})

const isVideoSrc = computed(() => {
  if (props.previewType === 'video') return true
  return /\.(mp4|mov|webm|ogg)$/i.test(props.previewImage)
})

const currentIndex = computed(() => {
  if (props.previewIndex >= 0) return props.previewIndex
  return props.previewItems.length > 0 ? 0 : -1
})

const totalItems = computed(() => props.previewItems.length || 1)
const canNavigate = computed(() => props.previewItems.length > 1)

function closePreview() {
  emit('close')
}
</script>

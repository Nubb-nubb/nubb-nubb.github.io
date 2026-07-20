<template>
  <div
    class="relative w-full rounded-sm overflow-hidden cursor-pointer bg-black"
    :class="heightClass"
    @click="$emit('click')"
  >
    <!-- Canvas-captured thumbnail for mobile compatibility -->
    <img
      v-if="thumbnailUrl"
      :src="thumbnailUrl"
      alt="Video thumbnail"
      class="w-full h-full object-cover"
    />
    <!-- Fallback while loading -->
    <div v-else class="w-full h-full bg-neutral-800 flex items-center justify-center">
      <div class="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
    </div>
    <!-- Hidden video for thumbnail extraction -->
    <video
      ref="videoRef"
      :src="src"
      class="hidden"
      muted
      playsinline
      preload="metadata"
      crossorigin="anonymous"
      @loadeddata="captureFrame"
    />
    <div class="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
      <div class="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
        <svg class="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  height: {
    type: String,
    default: 'md' // 'sm', 'md', 'lg', 'auto'
  }
})

defineEmits(['click'])

const videoRef = ref(null)
const thumbnailUrl = ref(null)

const heightClass = computed(() => {
  const heights = {
    sm: 'h-40 md:h-48',
    md: 'h-56 md:h-64',
    lg: 'h-64 md:h-80',
    auto: 'h-auto'
  }
  return heights[props.height] || heights.md
})

function captureFrame() {
  const video = videoRef.value
  if (!video || video.readyState < 2) return

  try {
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    thumbnailUrl.value = canvas.toDataURL('image/jpeg', 0.8)
  } catch (e) {
    // CORS or other error - fallback to showing video element
    console.warn('Could not capture video frame:', e)
  }
}

// Re-capture if src changes
watch(() => props.src, () => {
  thumbnailUrl.value = null
})

onBeforeUnmount(() => {
  // Clean up blob URL if we created one
  if (thumbnailUrl.value?.startsWith('blob:')) {
    URL.revokeObjectURL(thumbnailUrl.value)
  }
})
</script>

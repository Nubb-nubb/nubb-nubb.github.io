<template>
  <div
    ref="containerRef"
    class="group relative w-full rounded-sm overflow-hidden cursor-pointer bg-black"
    :class="heightClass"
    @click="$emit('click')"
  >
    <video
      v-if="isVisible"
      :src="src + '#t=0.1'"
      class="w-full h-full object-cover pointer-events-none"
      muted
      playsinline
      preload="metadata"
    />
    <!-- Placeholder while not visible / loading -->
    <div v-else class="w-full h-full bg-neutral-800" />
    <div
      class="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors"
    >
      <div
        class="w-14 h-14 rounded-full bg-white/50 group-hover:bg-white/90 flex items-center justify-center transition-colors"
      >
        <svg class="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    default: 'md', // 'sm', 'md', 'lg', 'auto'
  },
})

defineEmits(['click'])

const containerRef = ref(null)
const isVisible = ref(false)
let observer = null

const heightClass = computed(() => {
  const heights = {
    sm: 'h-40 md:h-48',
    md: 'h-56 md:h-64',
    lg: 'h-64 md:h-80',
    auto: 'h-auto',
  }
  return heights[props.height] || heights.md
})

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        isVisible.value = true
        observer.disconnect()
      }
    },
    { rootMargin: '200px' } // Start loading 200px before entering viewport
  )
  if (containerRef.value) {
    observer.observe(containerRef.value)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

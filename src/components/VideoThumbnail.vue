<template>
  <div
    class="group relative w-full rounded-sm overflow-hidden cursor-pointer bg-black"
    :class="heightClass"
    @click="$emit('click')"
  >
    <video
      :src="src + '#t=0.1'"
      class="w-full h-full object-cover pointer-events-none"
      muted
      playsinline
      preload="metadata"
    />
    <div class="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
      <div class="w-14 h-14 rounded-full bg-white/50 group-hover:bg-white/90 flex items-center justify-center transition-colors">
        <svg class="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

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

const heightClass = computed(() => {
  const heights = {
    sm: 'h-40 md:h-48',
    md: 'h-56 md:h-64',
    lg: 'h-64 md:h-80',
    auto: 'h-auto'
  }
  return heights[props.height] || heights.md
})
</script>

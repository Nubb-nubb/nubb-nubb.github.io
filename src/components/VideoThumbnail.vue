<template>
  <div
    class="relative w-full rounded-sm overflow-hidden cursor-pointer bg-black"
    :class="heightClass"
    @click="$emit('click')"
  >
    <video
      :src="src"
      class="w-full h-full object-cover pointer-events-none"
      muted
      preload="metadata"
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

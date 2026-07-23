<template>
  <div class="relative mb-4 -mx-4 sm:mx-0">
    <!-- Scroll fade indicator (mobile only) -->
    <div
      v-if="showRightFade"
      class="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-warm-white to-transparent pointer-events-none z-10 sm:hidden"
      aria-hidden="true"
    />

    <div
      ref="scrollContainer"
      class="flex items-center gap-2 overflow-x-auto scrollbar-hide px-4 sm:px-0 pb-2"
      @scroll="handleScroll"
    >
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        class="px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-full border transition-colors whitespace-nowrap flex-shrink-0"
        :class="
          modelValue === tab.key
            ? 'bg-text-primary text-warm-white border-text-primary'
            : 'bg-transparent text-text-secondary border-text-secondary/40 hover:text-text-primary hover:border-text-primary/50'
        "
        @click="$emit('update:modelValue', tab.key)"
      >
        {{ tab.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const scrollContainer = ref(null)
const showRightFade = ref(true)

function handleScroll() {
  if (!scrollContainer.value) return
  const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value
  // Hide fade when scrolled to the end (within 8px tolerance)
  showRightFade.value = scrollLeft + clientWidth < scrollWidth - 8
}

onMounted(() => {
  // Check initial scroll state
  handleScroll()
})

defineProps({
  tabs: {
    type: Array,
    required: true,
    validator: (tabs) => tabs.every((tab) => tab.key && tab.label),
  },
  modelValue: {
    type: String,
    required: true,
  },
})

defineEmits(['update:modelValue'])
</script>

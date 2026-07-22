<template>
  <div class="p-6 rounded-sm bg-surface" :class="{ [colorClass]: true }">
    <h4 class="font-bold mb-2 text-text-primary">{{ title }}</h4>
    <p class="text-sm text-text-secondary">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'accent-red',
  },
  description: {
    type: String,
    default: '',
  },
})

const colorClass = computed(() => {
  const colorMap = {
    'accent-red': 'border-l-4 border-accent-red',
    'plant-green': 'border-l-4 border-plant-green',
    'wood-light': 'border-l-4 border-wood-light',
    'wood-dark': 'border-l-4 border-wood-dark',
  }
  return colorMap[props.color] || 'border-l-4 border-accent-red'
})
</script>

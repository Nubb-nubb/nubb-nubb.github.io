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
  title: String,
  color: String,
  description: String,
})

const colorClass = computed(() => {
  const colorMap = {
    'border-accent-red': 'border-l-4 border-accent-red',
    'border-plant-green': 'border-l-4 border-plant-green',
    'border-wood-light': 'border-l-4 border-wood-light',
    'border-wood-dark': 'border-l-4 border-wood-dark',
  }
  return colorMap[props.color] || 'border-l-4 border-accent-red'
})
</script>

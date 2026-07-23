<template>
  <!-- Card variant -->
  <div
    v-if="variant === 'card'"
    class="bg-warm-white rounded-lg shadow-[0_-2px_4px_-1px_rgba(0,0,0,0.07),0_4px_6px_-1px_rgba(0,0,0,0.08),0_2px_4px_-1px_rgba(0,0,0,0.04)] overflow-hidden"
  >
    <button
      type="button"
      @click="toggle"
      class="w-full text-left px-4 py-3 transition-colors flex items-center justify-between hover:bg-amber-50"
      :aria-expanded="isOpen"
    >
      <span class="font-mono text-sm text-accent-red uppercase tracking-wide">{{ title }}</span>
      <span class="text-sm text-accent-red">{{ isOpen ? '−' : '+' }}</span>
    </button>
    <div v-if="isOpen" class="p-4">
      <slot />
    </div>
  </div>

  <!-- Stripe variant -->
  <div v-else class="rounded-sm bg-surface border-l-4" :class="borderColorClass">
    <button
      type="button"
      @click="toggle"
      class="w-full px-5 py-4 flex items-center justify-between text-left"
      :aria-expanded="isOpen"
    >
      <span class="font-bold text-text-primary">{{ title }}</span>
      <span class="text-sm text-text-secondary">{{ isOpen ? '−' : '+' }}</span>
    </button>
    <div v-if="isOpen" class="px-5 pb-5">
      <slot />
    </div>
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
  variant: {
    type: String,
    default: 'card',
    validator: (v) => ['card', 'stripe'].includes(v),
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const isOpen = computed(() => props.modelValue)

function toggle() {
  emit('update:modelValue', !props.modelValue)
}

// Use explicit class mappings to ensure Tailwind JIT includes these classes
const colorClasses = {
  'accent-red': {
    border: 'border-accent-red',
    hover: 'hover:text-accent-red',
  },
  'plant-green': {
    border: 'border-plant-green',
    hover: 'hover:text-plant-green',
  },
  'wood-light': {
    border: 'border-wood-light',
    hover: 'hover:text-wood-light',
  },
  'wood-dark': {
    border: 'border-wood-dark',
    hover: 'hover:text-wood-dark',
  },
  surface: {
    border: 'border-surface',
    hover: 'hover:text-text-secondary',
  },
}

const borderColorClass = computed(() => colorClasses[props.color]?.border || 'border-accent-red')
const hoverColorClass = computed(() => colorClasses[props.color]?.hover || 'hover:text-accent-red')
</script>

<template>
  <div class="border-l-4 pl-4" :class="borderColorClass">
    <button
      type="button"
      @click="toggle"
      class="w-full text-left py-3 font-semibold transition-colors flex items-center justify-between"
      :class="hoverColorClass"
      :aria-expanded="isOpen"
    >
      <span class="text-text-primary">{{ title }}</span>
      <span class="text-sm text-text-secondary">{{ isOpen ? '−' : '+' }}</span>
    </button>
    <div v-if="isOpen" class="pb-4">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'accent-red'
  },
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = computed(() => props.modelValue)

function toggle() {
  emit('update:modelValue', !props.modelValue)
}

const borderColorClass = computed(() => `border-${props.color}`)
const hoverColorClass = computed(() => `hover:text-${props.color}`)
</script>

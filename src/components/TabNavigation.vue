<template>
  <div class="mb-8 border-b border-text-secondary/30">
    <div class="flex flex-wrap gap-3" role="tablist" :aria-label="ariaLabel">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        role="tab"
        type="button"
        :aria-selected="modelValue === tab.key"
        :class="[
          'px-4 py-2 text-sm font-semibold rounded-t-md transition-colors',
          modelValue === tab.key
            ? 'bg-surface text-text-primary border-b-2 border-accent-red'
            : 'text-text-secondary hover:text-text-primary',
        ]"
        @click="$emit('update:modelValue', tab.key)"
      >
        {{ tab.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
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
  ariaLabel: {
    type: String,
    default: 'Navigation tabs',
  },
})

defineEmits(['update:modelValue'])
</script>

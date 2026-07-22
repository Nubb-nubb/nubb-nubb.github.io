<template>
  <div class="mb-4">
    <div
      class="flex gap-4 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 border-b border-text-secondary/30 pb-2"
      role="tablist"
      :aria-label="ariaLabel"
    >
      <button
        v-for="tab in tabs"
        :key="tab.key"
        role="tab"
        type="button"
        :aria-selected="modelValue === tab.key"
        :class="[
          'px-1 py-1 text-xs sm:text-sm font-medium transition-all relative whitespace-nowrap flex-shrink-0',
          modelValue === tab.key
            ? 'text-text-primary'
            : 'text-text-secondary hover:text-text-primary',
        ]"
        @click="$emit('update:modelValue', tab.key)"
      >
        {{ tab.label }}
        <span
          v-if="modelValue === tab.key"
          class="absolute left-0 right-0 -bottom-2 h-0.5 bg-accent-red rounded-full"
        />
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
    default: 'Sub-navigation tabs',
  },
})

defineEmits(['update:modelValue'])
</script>

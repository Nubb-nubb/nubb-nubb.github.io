<template>
  <div class="flex justify-end mb-2 text-xs text-text-secondary">
    <button
      v-if="allOpen"
      type="button"
      class="hover:text-accent-red transition-colors"
      @click="$emit('hideAll')"
    >
      hide all
    </button>
    <button
      v-else
      type="button"
      class="hover:text-accent-red transition-colors"
      @click="$emit('openAll')"
    >
      open all
    </button>
  </div>
</template>

<script setup>
defineProps({
  allOpen: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['openAll', 'hideAll'])
</script>

<template>
  <div
    v-if="previewImage"
    class="fixed inset-0 z-50 bg-black/85 p-4 md:p-8 flex items-center justify-center"
    @click="closePreview"
  >
    <button
      type="button"
      class="absolute top-4 right-4 md:top-6 md:right-6 text-white text-3xl leading-none"
      @click.stop="closePreview"
      aria-label="Close preview"
    >
      ×
    </button>

    <img
      :src="imageSrc"
      alt="Preview"
      class="max-w-[94vw] max-h-[92vh] w-auto h-auto object-contain rounded-sm shadow-2xl"
      @click.stop
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  previewImage: {
    type: String,
    default: ''
  },
  basePath: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['close'])

const imageSrc = computed(() => {
  if (!props.previewImage) return ''
  if (!props.basePath) return props.previewImage
  const cleanPath = props.previewImage.startsWith('/') ? props.previewImage.slice(1) : props.previewImage
  return `${import.meta.env.BASE_URL}${cleanPath}`
})

function closePreview() {
  emit('close')
}
</script>

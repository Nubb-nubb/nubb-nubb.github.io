import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useImagePreview() {
  const previewImage = ref('')
  const previewType = ref('image') // 'image' or 'video'

  function openPreview(src, type = 'image') {
    previewImage.value = src
    previewType.value = type
  }

  function closePreview() {
    previewImage.value = ''
    previewType.value = 'image'
  }

  function onKeydown(event) {
    if (event.key === 'Escape') {
      closePreview()
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', onKeydown)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeydown)
  })

  return {
    previewImage,
    previewType,
    openPreview,
    closePreview,
  }
}

import { ref, onMounted, onBeforeUnmount } from 'vue'

function normalizePreviewItems(items, fallbackSrc, fallbackType) {
  if (!items || !items.length) {
    return [{ src: fallbackSrc, type: fallbackType }]
  }

  return items.map((item) => {
    if (typeof item === 'string') {
      return { src: item, type: 'image' }
    }

    return {
      src: item.src || '',
      type: item.type || 'image',
    }
  })
}

export function useImagePreview() {
  const previewImage = ref('')
  const previewType = ref('image') // 'image' or 'video'
  const previewItems = ref([])
  const previewIndex = ref(-1)

  function setCurrentItem(item) {
    previewImage.value = item?.src || ''
    previewType.value = item?.type || 'image'
  }

  function openPreview(src, type = 'image', items = [], index = -1) {
    const normalizedItems = normalizePreviewItems(items, src, type)
    previewItems.value = normalizedItems

    const resolvedIndex =
      index >= 0 && index < normalizedItems.length
        ? index
        : normalizedItems.findIndex((item) => item.src === src && item.type === type)

    previewIndex.value = resolvedIndex >= 0 ? resolvedIndex : 0
    setCurrentItem(normalizedItems[previewIndex.value] || normalizedItems[0])
  }

  function closePreview() {
    previewImage.value = ''
    previewType.value = 'image'
    previewItems.value = []
    previewIndex.value = -1
  }

  function goToPreview(delta) {
    if (!previewItems.value.length) return

    const nextIndex =
      (previewIndex.value + delta + previewItems.value.length) % previewItems.value.length

    previewIndex.value = nextIndex
    setCurrentItem(previewItems.value[nextIndex])
  }

  function nextPreview() {
    goToPreview(1)
  }

  function previousPreview() {
    goToPreview(-1)
  }

  function onKeydown(event) {
    if (!previewImage.value) return

    if (event.key === 'Escape') {
      closePreview()
    } else if (event.key === 'ArrowRight') {
      nextPreview()
    } else if (event.key === 'ArrowLeft') {
      previousPreview()
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
    previewItems,
    previewIndex,
    openPreview,
    closePreview,
    nextPreview,
    previousPreview,
  }
}

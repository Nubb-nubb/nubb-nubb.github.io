import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Composable for carousel functionality with auto-scroll and touch swipe support
 * @param {Array} images - Array of image sources
 * @param {number} autoScrollInterval - Auto-scroll interval in ms (default: 4000)
 */
export function useCarousel(images, autoScrollInterval = 4000) {
  const currentSlide = ref(0)
  const touchStartX = ref(0)
  const touchEndX = ref(0)
  const hasSwiped = ref(false)
  const SWIPE_THRESHOLD = 40

  let autoScroll = null

  const startAutoScroll = () => {
    autoScroll = setInterval(() => {
      currentSlide.value = (currentSlide.value + 1) % images.length
    }, autoScrollInterval)
  }

  const resetAutoScroll = () => {
    clearInterval(autoScroll)
    startAutoScroll()
  }

  const goToPreviousSlide = () => {
    currentSlide.value = (currentSlide.value - 1 + images.length) % images.length
    resetAutoScroll()
  }

  const goToNextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % images.length
    resetAutoScroll()
  }

  const goToSlide = (index) => {
    currentSlide.value = index
    resetAutoScroll()
  }

  const handleTouchStart = (event) => {
    touchStartX.value = event.changedTouches[0].clientX
    touchEndX.value = touchStartX.value
  }

  const handleTouchMove = (event) => {
    touchEndX.value = event.changedTouches[0].clientX
  }

  const handleTouchEnd = () => {
    const delta = touchStartX.value - touchEndX.value
    if (Math.abs(delta) < SWIPE_THRESHOLD) return
    hasSwiped.value = true
    if (delta > 0) {
      goToNextSlide()
    } else {
      goToPreviousSlide()
    }
  }

  /**
   * Returns true if we just swiped (to prevent click-through)
   * Resets the flag after checking
   */
  const consumeSwipe = () => {
    if (hasSwiped.value) {
      hasSwiped.value = false
      return true
    }
    return false
  }

  onMounted(() => {
    startAutoScroll()
  })

  onUnmounted(() => {
    clearInterval(autoScroll)
  })

  return {
    currentSlide,
    goToPreviousSlide,
    goToNextSlide,
    goToSlide,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    consumeSwipe,
  }
}

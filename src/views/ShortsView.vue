<template>
  <div class="brainrot-container" :class="{ 'light-mode': !isDarkMode }" ref="containerRef">
    <!-- Dark mode toggle -->
    <button class="mode-toggle" @click="isDarkMode = !isDarkMode">
      <svg
        v-if="isDarkMode"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-6 h-6"
      >
        <path
          d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-6 h-6"
      >
        <path
          fill-rule="evenodd"
          d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <div
      v-for="(video, index) in shuffledVideos"
      :key="video"
      class="video-slide"
      :data-index="index"
    >
      <div class="video-wrapper">
        <!-- Loading indicator -->
        <div v-if="loadingStates[index]" class="video-loading">
          <div class="loading-spinner"></div>
        </div>
        <video
          :ref="
            (el) => {
              videoRefs[index] = el
              if (el) el.volume = 0.5
            }
          "
          :src="toPublicPath(video)"
          class="video-player"
          :class="{ 'video-ready': !loadingStates[index] }"
          loop
          :muted="isMuted"
          playsinline
          preload="auto"
          @click="togglePlay(index)"
          @loadeddata="onVideoLoaded(index)"
          @waiting="loadingStates[index] = true"
          @playing="loadingStates[index] = false"
          @error="onVideoError(index)"
        />
        <!-- Play/Pause overlay -->
        <div v-if="pausedStates[index]" class="play-overlay" @click="togglePlay(index)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-20 h-20"
          >
            <path
              fill-rule="evenodd"
              d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <!-- Side action buttons -->
        <div class="side-actions">
          <!-- Click me hint -->
          <div v-if="showClickHint" class="click-me-hint">
            <span>click me!</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-5 h-5"
            >
              <path
                fill-rule="evenodd"
                d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <!-- Like button -->
          <button
            class="action-button like-button"
            :class="{ liked: likedStates[index], popping: heartPop[index] }"
            @click.stop="toggleLike(index)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              :fill="likedStates[index] ? 'currentColor' : 'none'"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              class="w-7 h-7 heart-icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <span class="action-label">{{ likeCounts[index] }}</span>
            <!-- Heart burst animation -->
            <div v-if="heartBurst[index]" class="heart-burst">
              <span v-for="n in 6" :key="n" class="burst-heart">❤️</span>
            </div>
          </button>
          <!-- Mute toggle -->
          <button
            class="action-button mute-toggle"
            @click.stop="toggleMute()"
            :title="isMuted ? 'Unmute' : 'Mute'"
          >
            <svg
              v-if="isMuted"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path
                d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 001.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L20.56 12l1.72-1.72a.75.75 0 00-1.06-1.06l-1.72 1.72-1.72-1.72z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path
                d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z"
              />
              <path
                d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z"
              />
            </svg>
            <span class="action-label">{{ isMuted ? 'Muted' : 'Sound' }}</span>
          </button>
        </div>
      </div>

      <!-- Swipe gesture indicator -->
      <div v-if="currentIndex === index && showSwipeHint" class="swipe-gesture">
        <div class="swipe-arrow-top">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M11.47 4.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 6.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <span class="swipe-text">Swipe</span>
        <div class="swipe-arrow-bottom">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue'
import { useMediaUtils } from '../composables/useMediaUtils'

const { toPublicPath } = useMediaUtils()

// All available videos
const allVideos = [
  'images/3dprint stuff/Enma/enma_new_1.mov',
  'images/3dprint stuff/Enma/enma_new_2.mov',
  'images/3dprint stuff/Inverted_Spear/IMG_9031.MOV',
  'images/3dprint stuff/Inverted_Spear/IMG_9045.MOV',
  'images/3dprint stuff/Inverted_Spear/IMG_9048.MOV',
  'images/3dprint stuff/Inverted_Spear/IMG_9050.MOV',
  'images/3dprint stuff/Inverted_Spear/IMG_9051.MOV',
  'images/3dprint stuff/Inverted_Spear/IMG_9082.MOV',
  'images/3dprint stuff/Jett_Knife/jett_knife.MOV',
  'images/3dprint stuff/Naruto_asuma/Naruto_Kunai.MOV',
  'images/3dprint stuff/Oni_Katana/Oni_pre-saya_paint.MOV',
  'images/3dprint stuff/Oni_Katana/oni_video.MOV',
  'images/3dprint stuff/Prime_Karambit/4F844A2B-AA50-40EA-8EFF-83CC0B9854C0.mov',
  'images/3dprint stuff/Reaver_Operator/reaver_operator_vid.MP4',
  'images/3dprint stuff/Rengoku_Katana/rengoku_10.mov',
  'images/3dprint stuff/Rengoku_Katana/rengoku_11.mov',
  'images/3dprint stuff/Rengoku_Katana/rengoku_12.mov',
  'images/3dprint stuff/Rengoku_Katana/rengoku_4.mov',
  'images/3dprint stuff/Rengoku_Katana/rengoku_5.mov',
  'images/3dprint stuff/Rengoku_Katana/rengoku_6.mov',
  'images/3dprint stuff/Rengoku_Katana/rengoku_7.mov',
  'images/3dprint stuff/Rengoku_Katana/rengoku_8.mov',
  'images/3dprint stuff/Rengoku_Katana/rengoku_9.mov',
  'images/3dprint stuff/Spectrum_classic/spectrum_classic2.mov',
  'images/3dprint stuff/Spiderman/IMG_7102.MOV',
  'images/3dprint stuff/Spiderman/IMG_7106.MOV',
  'images/3dprint stuff/Spiderman/IMG_7112.MOV',
  'images/3dprint stuff/Spiderman/IMG_7120.MOV',
  'images/3dprint stuff/Spiderman/IMG_7123.MOV',
  'images/3dprint stuff/Spiderman/IMG_7155.MOV',
  'images/3dprint stuff/Spiderman/IMG_7156.MOV',
  'images/3dprint stuff/Spiderman/IMG_7159.MOV',
  'images/3dprint stuff/Spiderman/IMG_7166.MOV',
  'images/3dprint stuff/Spiderman/IMG_7180.MOV',
  'images/3dprint stuff/Spiderman/IMG_7191.MOV',
  'images/3dprint stuff/Wado_Ichimonji/Wado_Ichimonji_vid.MP4',
  'images/blacksmith_15/iCloud Photos/IMG_7599.MOV',
  'images/1x30 sander.mp4',
  'images/angle grinder.mp4',
  'images/blacksmith_12.MOV',
  'images/blacksmith_13.MP4',
  'images/blacksmith_14 .mp4',
  'images/blacksmith_3.MOV',
  'images/blacksmith_7.MOV',
  'images/blacksmith_8.MP4',
  'images/blacksmith_9 .mp4',
  'images/butterfly_1.MP4',
  'images/butterfly_2.MP4',
  'images/butterfly_3.MP4',
  'images/butterfly_4.MP4',
  'images/diy_10.mov',
  'images/diy_3.mp4',
  'images/diy_4.mp4',
  'images/diy_5.mov',
  'images/diy_6.mov',
  'images/diy_7.mov',
  'images/forge_1.mp4',
  'images/forge_2.MP4',
  'images/Spiderman_Electronics.MP4',
]

// Shuffle function
function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const shuffledVideos = ref(shuffleArray(allVideos))
const containerRef = ref(null)
const videoRefs = reactive({})
const currentIndex = ref(0)
const pausedStates = reactive({})
const isMuted = ref(true) // Start muted for autoplay policy compliance
const likedStates = reactive({})
const likeCounts = reactive({})
const heartBurst = reactive({})
const heartPop = reactive({})
const showSwipeHint = ref(true)
const showClickHint = ref(true)
const isDarkMode = ref(true)
const loadingStates = reactive({})
const videoErrors = reactive({})

// Initialize states
shuffledVideos.value.forEach((_, index) => {
  pausedStates[index] = true
  likedStates[index] = false
  likeCounts[index] = 0
  heartBurst[index] = false
  heartPop[index] = false
  loadingStates[index] = true
  videoErrors[index] = false
})

function onVideoLoaded(index) {
  loadingStates[index] = false
  videoErrors[index] = false
}

function onVideoError(index) {
  loadingStates[index] = false
  videoErrors[index] = true
  console.warn(`Video ${index} failed to load`)
}

async function safePlay(video, index) {
  if (!video) return false
  try {
    await video.play()
    pausedStates[index] = false
    return true
  } catch (err) {
    // Autoplay was prevented - show play button
    console.log('Autoplay prevented:', err.name)
    pausedStates[index] = true
    return false
  }
}

async function togglePlay(index) {
  const video = videoRefs[index]
  if (!video) return

  if (video.paused) {
    await safePlay(video, index)
  } else {
    video.pause()
    pausedStates[index] = true
  }
}

function toggleMute() {
  isMuted.value = !isMuted.value
  // Apply to all videos
  Object.values(videoRefs).forEach((video) => {
    if (video) video.muted = isMuted.value
  })
}

function toggleLike(index) {
  // Cookie clicker style - always increment and animate
  likedStates[index] = true
  likeCounts[index]++
  showClickHint.value = false
  // Trigger heart pop animation
  heartPop[index] = true
  setTimeout(() => {
    heartPop[index] = false
  }, 200)
  // Trigger heart burst animation
  heartBurst[index] = true
  setTimeout(() => {
    heartBurst[index] = false
  }, 300) // Faster reset so you can spam clicks
}

function handleIntersection(entries) {
  entries.forEach((entry) => {
    const index = parseInt(entry.target.dataset.index)
    const video = videoRefs[index]

    if (!video) return

    if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
      currentIndex.value = index
      safePlay(video, index)
      // Hide swipe hint after first scroll
      if (index > 0) {
        showSwipeHint.value = false
      }
    } else {
      video.pause()
      pausedStates[index] = true
    }
  })
}

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(handleIntersection, {
    root: containerRef.value,
    threshold: 0.5,
  })

  // Observe all video slides after a tick
  setTimeout(() => {
    const slides = containerRef.value?.querySelectorAll('.video-slide')
    slides?.forEach((slide) => observer.observe(slide))

    // Try to autoplay the first video immediately
    // The IntersectionObserver may not fire for already-visible elements
    const firstVideo = videoRefs[0]
    if (firstVideo) {
      safePlay(firstVideo, 0)
    }
  }, 100)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.brainrot-container {
  /* Use dvh (dynamic viewport height) for mobile browser chrome, fallback to vh */
  height: calc(100dvh - 60px);
  height: calc(100vh - 60px); /* Fallback for older browsers */
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  background-color: #000;
  position: relative;
  /* Prevent overscroll on iOS */
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}

@supports (height: 100dvh) {
  .brainrot-container {
    height: calc(100dvh - 60px);
  }
}

.brainrot-container.light-mode {
  background-color: #f5f5f5;
}

/* Mode toggle button */
.mode-toggle {
  position: fixed;
  top: 80px;
  left: 16px;
  z-index: 100;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  border: none;
  color: white;
  padding: 12px;
  border-radius: 50%;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.2s;
}

.mode-toggle:hover {
  transform: scale(1.1);
  background: rgba(0, 0, 0, 0.8);
}

.light-mode .mode-toggle {
  background: transparent;
  color: #000;
}

.light-mode .mode-toggle:hover {
  background: transparent;
}

.video-slide {
  /* Use dvh for mobile browser chrome compatibility */
  height: calc(100dvh - 60px);
  height: calc(100vh - 60px); /* Fallback */
  scroll-snap-align: start;
  scroll-snap-stop: always;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
}

@supports (height: 100dvh) {
  .video-slide {
    height: calc(100dvh - 60px);
  }
}

.light-mode .video-slide {
  background-color: #f5f5f5;
}

.video-wrapper {
  position: relative;
  max-width: 100%;
  max-height: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.video-player {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  cursor: pointer;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  /* Prevent flicker during load */
  background-color: #1a1a1a;
}

.video-player.video-ready {
  background-color: transparent;
}

/* Loading indicator */
.video-loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (min-width: 768px) {
  .video-wrapper {
    padding: 24px;
  }

  .video-player {
    border-radius: 32px;
    max-height: calc(100dvh - 108px);
    max-height: calc(100vh - 108px); /* Fallback */
  }

  @supports (height: 100dvh) {
    .video-player {
      max-height: calc(100dvh - 108px);
    }
  }
}

.play-overlay {
  position: absolute;
  inset: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  cursor: pointer;
  transition: opacity 0.2s;
  border-radius: 24px;
}

@media (min-width: 768px) {
  .play-overlay {
    inset: 24px;
    border-radius: 32px;
  }
}

.play-overlay:hover {
  background-color: rgba(0, 0, 0, 0.4);
}

/* Side action buttons container */
.side-actions {
  position: absolute;
  right: -60px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

@media (max-width: 500px) {
  .side-actions {
    right: 8px;
    top: auto;
    bottom: 24px;
    transform: none;
  }
}

.click-me-hint {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-size: 12px;
  font-weight: 600;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  animation: hintBounce 1s ease-in-out infinite;
  margin-bottom: -12px;
}

.click-me-hint svg {
  margin-top: -2px;
}

@keyframes hintBounce {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.8;
  }
  50% {
    transform: translateY(4px);
    opacity: 1;
  }
}

.action-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  border: none;
  color: white;
  cursor: pointer;
  transition:
    transform 0.2s,
    background 0.2s;
  padding: 12px;
  border-radius: 50%;
}

.action-button:hover {
  transform: scale(1.1);
  background: rgba(0, 0, 0, 0.7);
}

.action-label {
  font-size: 11px;
  font-weight: 600;
  margin-top: 2px;
  white-space: nowrap;
}

.like-button.liked {
  color: #ff2d55;
}

.like-button.popping .heart-icon {
  animation: heartPop 0.2s ease-out;
}

@keyframes heartPop {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1);
  }
}

/* Heart burst animation */
.heart-burst {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}

.burst-heart {
  position: absolute;
  font-size: 16px;
  animation: burstOut 0.7s ease-out forwards;
}

.burst-heart:nth-child(1) {
  animation-delay: 0ms;
}
.burst-heart:nth-child(2) {
  animation-delay: 50ms;
}
.burst-heart:nth-child(3) {
  animation-delay: 100ms;
}
.burst-heart:nth-child(4) {
  animation-delay: 150ms;
}
.burst-heart:nth-child(5) {
  animation-delay: 200ms;
}
.burst-heart:nth-child(6) {
  animation-delay: 250ms;
}

@keyframes burstOut {
  0% {
    opacity: 1;
    transform: translate(0, 0) scale(0.5);
  }
  100% {
    opacity: 0;
    transform: translate(var(--tx, 20px), var(--ty, -40px)) scale(1);
  }
}

.burst-heart:nth-child(1) {
  --tx: -30px;
  --ty: -50px;
}
.burst-heart:nth-child(2) {
  --tx: 30px;
  --ty: -45px;
}
.burst-heart:nth-child(3) {
  --tx: -20px;
  --ty: -60px;
}
.burst-heart:nth-child(4) {
  --tx: 25px;
  --ty: -55px;
}
.burst-heart:nth-child(5) {
  --tx: -35px;
  --ty: -40px;
}
.burst-heart:nth-child(6) {
  --tx: 35px;
  --ty: -35px;
}

/* Swipe gesture indicator */
.swipe-gesture {
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  opacity: 0.9;
  animation: swipePulse 1.5s ease-in-out infinite;
}

.swipe-arrow-top {
  animation: arrowBounceUp 1.5s ease-in-out infinite;
}

.swipe-arrow-bottom {
  margin-top: 4px;
  animation: arrowBounceDown 1.5s ease-in-out infinite;
}

.swipe-text {
  font-size: 14px;
  font-weight: 500;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  margin: -2px 0;
}

@keyframes swipePulse {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

@keyframes arrowBounceUp {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-6px);
    opacity: 1;
  }
}

@keyframes arrowBounceDown {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.6;
  }
  50% {
    transform: translateY(6px);
    opacity: 1;
  }
}

/* Light mode styles */
.light-mode .play-overlay {
  background-color: rgba(255, 255, 255, 0.4);
  color: #000;
}

.light-mode .play-overlay:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.light-mode .click-me-hint {
  color: #000;
  text-shadow: 0 1px 3px rgba(255, 255, 255, 0.5);
}

.light-mode .action-button {
  background: transparent;
  color: #000;
}

.light-mode .action-button:hover {
  background: transparent;
  transform: scale(1.1);
}

.light-mode .like-button.liked {
  color: #ff2d55;
}

.light-mode .swipe-gesture {
  color: #000;
}

.light-mode .swipe-text {
  text-shadow: 0 1px 3px rgba(255, 255, 255, 0.5);
}

.light-mode .loading-spinner {
  border-color: rgba(0, 0, 0, 0.2);
  border-top-color: #000;
}

.light-mode .video-player {
  background-color: #e5e5e5;
}

.light-mode .video-player.video-ready {
  background-color: transparent;
}

.light-mode .video-player {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

/* Hide scrollbar */
.brainrot-container::-webkit-scrollbar {
  display: none;
}

.brainrot-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

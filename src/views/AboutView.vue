<template>
  <section class="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
    <h2 class="section-title mb-12">
      About
      <button
        @click="playAboutSound"
        class="inline-flex items-center ml-2 text-warm-white hover:text-accent-red transition-colors"
        aria-label="Play pronunciation"
        type="button"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
        </svg>
      </button>
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      <!-- Image -->
      <div class="rounded-sm overflow-hidden cursor-pointer" @click="openPreview(aboutmeImage)">
        <img :src="aboutmeImage" alt="About me" class="w-full h-auto object-cover" />
      </div>

      <!-- Text Sections -->
      <div class="space-y-4">
        <!-- Quick About Me -->
        <CollapsibleSection title="Quick About Me" color="accent-red" v-model="quickExpanded">
          <p class="text-text-secondary text-sm leading-relaxed">
            L tiktok brainrot, doesn't wanna read about me :/
          </p>
        </CollapsibleSection>

        <!-- Long About Me -->
        <CollapsibleSection title="Long About Me" color="plant-green" v-model="longExpanded">
          <div class="text-text-secondary text-sm leading-relaxed space-y-3">
            <p>
              I was 7 when I started learning origami, 15 when I started learning butterfly knife
              tricks, and... also 15 when I started memorizing Rubik's cube permutations. For years,
              I called it passion. I loved the feeling of going from knowing nothing to being good
              at something, but eventually, the making became hiding. One more video edit, one more
              PC upgrade, one more game of League while deadlines and expectations loomed. In
              college, the guilt was constant and suffocating. I had a future I was supposed to
              want, but I couldnt stop hiding in my projects.
            </p>
            <p>
              Looking back, I think I kinda know when it changed. Of course... it helped that I
              graduated.... but I noticed that when I would crochet, blacksmith, 3D print props, I
              would feel more fulfilled. I wouldn't make things to escape a sense of impending
              dread. Instead, I found myself being proud of creating something tangible, lasting,
              and uniquely mine. I still love learning and grinding until I'm good at what I do, but
              now I do it because it's so awesome to make things.
            </p>
            <p>
              One day, I'm gonna have that 200lbs anvil, a CNC machine, a workshop where I can build
              shit like guitars, furniture, whatever I want.
            </p>
          </div>
        </CollapsibleSection>
      </div>
    </div>

    <ImagePreviewModal :preview-image="previewImage" :base-path="false" @close="closePreview" />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useImagePreview } from '../composables/useImagePreview'
import { useMediaUtils } from '../composables/useMediaUtils'
import CollapsibleSection from '../components/CollapsibleSection.vue'
import ImagePreviewModal from '../components/ImagePreviewModal.vue'

const { toPublicPath } = useMediaUtils()
const quickExpanded = ref(false)
const longExpanded = ref(false)
const { previewImage, openPreview, closePreview } = useImagePreview()
const aboutmeImage = toPublicPath('images/aboutme-1.jpg')
const aboutSound = toPublicPath('images/abouta.wav')

function playAboutSound() {
  const audio = new Audio(aboutSound)
  audio.onerror = () => {
    console.error('Failed to load audio file:', aboutSound)
  }
  audio.play().catch((err) => {
    console.error('Failed to play audio:', err)
  })
}
</script>

<template>
  <section class="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
    <h2 class="section-title mb-8">About</h2>

    <TabNavigation :tabs="aboutTabs" v-model="activeTab" />

    <!-- About Steven -->
    <div v-if="activeTab === 'steven'">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <!-- Image -->
        <div class="rounded-sm overflow-hidden cursor-pointer" @click="openPreview(aboutmeImage)">
          <img :src="aboutmeImage" alt="About me" class="w-full h-auto object-cover" />
        </div>

        <!-- Text Sections -->
        <div class="space-y-4">
          <CollapsibleControls
            :all-open="allSectionsOpen"
            @open-all="openAllSections"
            @hide-all="hideAllSections"
          />
          <!-- Quick About Me -->
          <CollapsibleSection
            title="Quick About Me"
            color="accent-red"
            variant="stripe"
            v-model="quickExpanded"
          >
            <p class="text-text-secondary text-sm leading-relaxed">
              L tiktok brainrot, doesn't wanna read about me :/
            </p>
          </CollapsibleSection>

          <!-- Long About Me -->
          <CollapsibleSection
            title="Long About Me"
            color="plant-green"
            variant="stripe"
            v-model="longExpanded"
          >
            <div class="text-text-secondary text-sm leading-relaxed space-y-3">
              <p>
                I was 7 when I started learning origami, 15 when I started learning butterfly knife
                tricks, and... also 15 when I started memorizing Rubik's cube permutations. For
                years, I called it passion. I loved the feeling of going from knowing nothing to
                being good at something, but eventually, the making became hiding. One more video
                edit, one more PC upgrade, one more game of League while deadlines and expectations
                loomed. In college, the guilt was constant and suffocating. I had a future I was
                supposed to want, but I couldnt stop hiding in my projects.
              </p>
              <p>
                Looking back, I think I kinda know when it changed. Of course... it helped that I
                graduated.... but I noticed that when I would crochet, blacksmith, 3D print props, I
                would feel more fulfilled. I wouldn't make things to escape a sense of impending
                dread. Instead, I found myself being proud of creating something tangible, lasting,
                and uniquely mine. I still love learning and grinding until I'm good at what I do,
                but now I do it because it's so awesome to make things.
              </p>
              <p>
                One day, I'm gonna have that 200lbs anvil, a CNC machine, a workshop where I can
                build shit like guitars, furniture, whatever I want.
              </p>
            </div>
          </CollapsibleSection>

          <!-- Sound Button -->
          <div class="pt-4">
            <button
              @click="playAboutSound"
              class="inline-flex items-center gap-2 text-text-secondary hover:text-accent-red transition-colors text-sm"
              aria-label="Play pronunciation"
              type="button"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              </svg>
              <span>How to pronounce my name</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- About Clementine -->
    <div v-else-if="activeTab === 'clementine'" class="flex flex-col items-center">
      <div class="text-center max-w-md">
        <h3 class="text-xl font-semibold text-text-primary mb-4">Clementine</h3>
        <p class="text-text-secondary text-sm mb-8">click bro</p>
      </div>

      <!-- Watermelon Cat Clicker -->
      <button
        type="button"
        class="select-none transition-transform duration-150"
        :class="{ 'animate-bubble': isBubbling }"
        @click="clickCat"
      >
        <img
          :src="toPublicPath('images/watermelon_cat.JPEG')"
          alt="Clementine the Watermelon Cat"
          class="w-48 h-48 object-cover rounded-full shadow-lg"
        />
      </button>
      <p class="mt-4 text-lg text-text-secondary font-mono">{{ catClicks }} pets</p>
    </div>

    <ImagePreviewModal :preview-image="previewImage" :base-path="false" @close="closePreview" />
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useImagePreview } from '../composables/useImagePreview'
import { useMediaUtils } from '../composables/useMediaUtils'
import CollapsibleSection from '../components/CollapsibleSection.vue'
import CollapsibleControls from '../components/CollapsibleControls.vue'
import ImagePreviewModal from '../components/ImagePreviewModal.vue'
import TabNavigation from '../components/TabNavigation.vue'

const { toPublicPath } = useMediaUtils()

// Tab state
const activeTab = ref('steven')
const aboutTabs = [
  { key: 'steven', label: 'About Steven' },
  { key: 'clementine', label: 'About Clementine' },
]

const quickExpanded = ref(false)
const longExpanded = ref(false)

// Watermelon cat clicker
const catClicks = ref(0)
const isBubbling = ref(false)

function clickCat() {
  catClicks.value++
  isBubbling.value = true
  setTimeout(() => {
    isBubbling.value = false
  }, 150)
}

const allSectionsOpen = computed(() => quickExpanded.value && longExpanded.value)

function openAllSections() {
  quickExpanded.value = true
  longExpanded.value = true
}

function hideAllSections() {
  quickExpanded.value = false
  longExpanded.value = false
}
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

<style scoped>
.animate-bubble {
  animation: bubble 150ms ease-out;
}

@keyframes bubble {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
</style>

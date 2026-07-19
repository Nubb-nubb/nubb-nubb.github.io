<template>
  <section class="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
    <h2 class="section-title mb-12">About</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      <!-- Image -->
      <div class="rounded-sm overflow-hidden cursor-pointer" @click="openPreview(aboutmeImage)">
        <img
          :src="aboutmeImage"
          alt="About me"
          class="w-full h-auto object-cover"
        />
      </div>

      <!-- Text Sections -->
      <div class="space-y-4">
        <!-- Quick About Me -->
        <CollapsibleSection
          title="Quick About Me"
          color="accent-red"
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
          v-model="longExpanded"
        >
          <div class="text-text-secondary text-sm leading-relaxed space-y-3">
            <p>
              I was 7 when I started learning origami, 15 when I started learning butterfly knife tricks, and... also 15 when I started memorizing Rubik's cube permutations. For years, I called it passion. I loved the feeling of going from knowing nothing to being good at something, but eventually, the making became hiding. One more video edit, one more PC upgrade, one more game of League while deadlines and expectations loomed. 
              In college, the guilt was constant and suffocating. I had a future I was supposed to want, but I couldnt stop hiding in my projects.
            </p>
            <p>
              Looking back, I think I kinda know when it changed. Of course... it helped that I graduated.... but I noticed that when I would crochet, blacksmith, 3D print props, I would feel more fulfilled. I wouldn't make things to escape a sense of impending dread. Instead, I found myself being proud of creating something tangible, lasting, and uniquely mine. I still love learning and grinding until I'm good at what I do, but now I do it because it's so awesome to make things.
            </p>
            <p>
              One day, I'm gonna have that 200lbs anvil, a CNC machine, a workshop where I can build shit like guitars, furniture, whatever I want. 
            </p>
          </div>
        </CollapsibleSection>
      </div>
    </div>

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
        :src="previewImage"
        alt="Preview"
        class="max-w-[94vw] max-h-[92vh] w-auto h-auto object-contain rounded-sm shadow-2xl"
        @click.stop
      />
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useImagePreview } from '../composables/useImagePreview'
import CollapsibleSection from '../components/CollapsibleSection.vue'

const quickExpanded = ref(false)
const longExpanded = ref(false)
const { previewImage, openPreview, closePreview } = useImagePreview()
const aboutmeImage = `${import.meta.env.BASE_URL}images/aboutme-1.jpg`
</script>

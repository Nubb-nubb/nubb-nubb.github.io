<template>
  <section class="max-w-5xl mx-auto px-6 py-20">
    <h2 class="section-title mb-12">About</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      <!-- Image -->
      <div class="rounded-sm overflow-hidden">
        <img
          :src="aboutmeImage"
          alt="About me"
          class="w-full h-auto object-cover"
        />
      </div>

      <!-- Text Sections -->
      <div class="space-y-4">
        <!-- Quick About Me -->
        <div class="border-l-4 border-accent-red pl-4">
          <button
            @click="quickExpanded = !quickExpanded"
            class="w-full text-left py-3 font-semibold hover:text-accent-red transition-colors flex items-center justify-between"
          >
            <span>Quick About Me</span>
            <span class="text-sm">{{ quickExpanded ? '−' : '+' }}</span>
          </button>
          <div
            v-if="quickExpanded"
            class="text-text-secondary text-sm leading-relaxed"
          >
            <p>
              L tiktok brainrot, doesn't wanna read about me :/
            </p>
          </div>
        </div>

        <!-- Long About Me -->
        <div class="border-l-4 border-plant-green pl-4">
          <button
            @click="longExpanded = !longExpanded"
            class="w-full text-left py-3 font-semibold hover:text-plant-green transition-colors flex items-center justify-between"
          >
            <span>Long About Me</span>
            <span class="text-sm">{{ longExpanded ? '−' : '+' }}</span>
          </button>
          <div
            v-if="longExpanded"
            class="text-text-secondary text-sm leading-relaxed space-y-3"
          >
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
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const quickExpanded = ref(false)
const longExpanded = ref(false)
const aboutmeImage = `${import.meta.env.BASE_URL}images/aboutme-1.jpg`
</script>

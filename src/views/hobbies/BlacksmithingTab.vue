<template>
  <div>
    <h3 class="text-2xl font-display font-bold mb-6 text-wood-dark">Hunting & Kitchen Knife 2025</h3>

    <div class="relative pl-0">
      <div class="absolute left-4 top-0 bottom-0 w-px bg-text-secondary/30 md:left-1/2 md:-translate-x-1/2" />

    <article
      v-for="(entry, index) in timeline"
      :key="entry.src"
      class="relative pb-6 md:pb-0"
      :class="index !== 0 ? 'md:-mt-24' : ''"
    >
      <!-- Horizontal connector line (desktop only) -->
      <span
        class="hidden md:block absolute top-6 h-px bg-text-secondary/30"
        :class="index % 2 === 0 ? 'left-[calc(50%-1.5rem)] right-1/2' : 'left-1/2 right-[calc(50%-1.5rem)]'"
        aria-hidden="true"
      />

      <!-- Circle marker -->
      <span
        class="absolute left-4 top-4 -translate-x-1/2 h-4 w-4 rounded-full border-2 border-warm-white bg-accent-red md:left-1/2 z-10"
        aria-hidden="true"
      />

      <div
        class="ml-8 md:ml-0 md:w-[calc(50%-1.5rem)]"
        :class="index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'">
        <p class="mb-1.5 text-xs font-mono uppercase tracking-wide text-accent-red">
          {{ entry.sequence }}. {{ entry.label }}
        </p>

        <div class="rounded-sm overflow-hidden bg-[#ebe3d7] border border-black/10">
          <VideoThumbnail
            v-if="isVideo(entry.src)"
            :src="toPublicPath(entry.src)"
            height="auto"
            @click="$emit('preview', entry.src, 'video')"
          />
          <img
            v-else
            :src="toPublicPath(entry.src)"
            :alt="entry.label"
            class="w-full h-auto object-cover cursor-pointer"
            @click="$emit('preview', entry.src)"
          />
        </div>

        <p class="mt-2 text-sm text-text-secondary">
          {{ entry.description }}
        </p>
      </div>
    </article>
    </div>
  </div>
</template>

<script setup>
import { useMediaUtils } from '../../composables/useMediaUtils'
import VideoThumbnail from '../../components/VideoThumbnail.vue'

defineEmits(['preview'])

const { toPublicPath, isVideo } = useMediaUtils()

const timeline = [
  { src: 'images/blacksmith_1.PNG', label: 'Knife Template', description: 'Knife template that I made on Procreate', sequence: '1' },
  { src: 'images/blacksmith_2.JPEG', label: 'Tools', description: 'Some machinery I got from Harbor Freight', sequence: '2' },
  { src: 'images/blacksmith_3.MOV', label: 'Steel', description: 'Steel is 1084 high carbon steel', sequence: '3' },
  { src: 'images/blacksmith_4.png', label: 'Template Transfer', description: 'Cutting out the template and gluing it onto the steel', sequence: '4' },
  { src: 'images/blacksmith_7.MOV', label: 'Safety First', description: 'Putting on respirator to prevent eating yucky wucky particles', sequence: '5' },
  { src: 'images/blacksmith_8.MP4', label: 'Angle Grinding', description: 'Angle grinding out the shape', sequence: '6' },
  { src: 'images/blacksmith_5.JPEG', label: 'Rough Cutout', description: 'Rough cutout', sequence: '7' },
  { src: 'images/blacksmith_6.JPEG', label: 'Cleaned Cutout', description: 'Cleaned up cutout', sequence: '8' },
  { src: 'images/blacksmith_9 .mp4', label: 'Drilling', description: 'Drilling out the holes for pins', sequence: '9' },
  { src: 'images/1x30 sander.mp4', label: 'Sanding Bevels', description: 'Sanding the bevels', sequence: '10' },
  { src: 'images/forge_1.mp4', label: 'Heat Treat', description: 'Heat treated to critical temperature (~1475°F), the steel is cherry red and non-magnetic, quenched in canola oil', sequence: '11' },
  { src: 'images/blacksmith_12.MOV', label: 'Tempering', description: 'Tempering the steel in an oven at 400°F (204°C) for 2 hours, 2 cycles', sequence: '12' },
  { src: 'images/blacksmith_11.JPEG', label: 'Pins & Wood', description: 'Putting in pins and wood', sequence: '13' },
  { src: 'images/blacksmith_13.MP4', label: 'Handle Shaping', description: 'Cutting and shaping the handles, gluing it all together with epoxy', sequence: '14' },
  { src: 'images/blacksmith_15.JPEG', label: 'Leather Sheath', description: 'Making the leather sheath', sequence: '15' },
  { src: 'images/homepage-3.jpg', label: 'Finished!', description: 'Tadaaaaa', sequence: '16' },
  { src: 'images/blacksmith_14 .mp4', label: 'Sharpness Test', description: 'Testing the sharpness by cutting some paper', sequence: '17' }
]
</script>

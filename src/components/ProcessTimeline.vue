<template>
  <div>
    <!-- Toggle button (when collapsible) -->
    <button
      v-if="collapsible"
      type="button"
      class="mt-6 flex items-center gap-2 text-sm font-semibold text-accent-red hover:text-accent-red/80 transition-colors"
      @click="isOpen = !isOpen"
    >
      <span>see how it's made</span>
      <span class="transition-transform duration-200" :class="isOpen ? 'rotate-90' : ''"> → </span>
    </button>

    <!-- Timeline -->
    <div v-show="!collapsible || isOpen" :class="collapsible ? 'mt-6' : ''" class="relative pl-0">
      <div
        class="absolute left-4 top-0 bottom-0 w-px bg-text-secondary/30 md:left-1/2 md:-translate-x-1/2"
      />

      <article
        v-for="(entry, index) in entries"
        :key="entry.src || entry.image"
        class="relative pb-6 md:pb-0"
        :class="index !== 0 ? 'md:-mt-24' : ''"
      >
        <!-- Horizontal connector line (desktop only) -->
        <span
          class="hidden md:block absolute top-6 h-px bg-text-secondary/30"
          :class="
            index % 2 === 0
              ? 'left-[calc(50%-1.5rem)] right-1/2'
              : 'left-1/2 right-[calc(50%-1.5rem)]'
          "
          aria-hidden="true"
        />

        <!-- Circle marker -->
        <span
          class="absolute left-4 top-4 -translate-x-1/2 h-4 w-4 rounded-full border-2 border-warm-white bg-accent-red md:left-1/2 z-10"
          aria-hidden="true"
        />

        <div
          class="ml-8 md:ml-0 md:w-[calc(50%-1.5rem)]"
          :class="index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'"
        >
          <p class="mb-1.5 text-xs font-mono uppercase tracking-wide text-accent-red">
            {{ formatLabel(entry, index) }}
          </p>

          <div class="rounded-sm overflow-hidden bg-[#ebe3d7] border border-black/10">
            <VideoThumbnail
              v-if="isVideo(mediaSrc(entry))"
              :src="toPublicPath(mediaSrc(entry))"
              height="auto"
              @click="
                $emit(
                  'preview',
                  mediaSrc(entry),
                  'video',
                  entries.map((timelineEntry) => ({
                    src: mediaSrc(timelineEntry),
                    type: isVideo(mediaSrc(timelineEntry)) ? 'video' : 'image',
                  })),
                  index
                )
              "
            />
            <img
              v-else
              :src="toPublicPath(mediaSrc(entry))"
              :alt="entry.label || entry.name"
              class="w-full h-auto object-cover cursor-pointer"
              loading="lazy"
              decoding="async"
              @click="
                $emit(
                  'preview',
                  mediaSrc(entry),
                  'image',
                  entries.map((timelineEntry) => ({
                    src: mediaSrc(timelineEntry),
                    type: isVideo(mediaSrc(timelineEntry)) ? 'video' : 'image',
                  })),
                  index
                )
              "
            />
          </div>

          <p class="mt-2 text-sm text-text-secondary">
            {{ entry.description || entry.name }}
          </p>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMediaUtils } from '../composables/useMediaUtils'
import VideoThumbnail from './VideoThumbnail.vue'

const props = defineProps({
  entries: {
    type: Array,
    required: true,
  },
  collapsible: {
    type: Boolean,
    default: false,
  },
  defaultOpen: {
    type: Boolean,
    default: false,
  },
  labelFormat: {
    type: String,
    default: 'step', // 'step' = "Step 1", 'sequence' = "1. Label"
  },
})

defineEmits(['preview'])

const { toPublicPath, isVideo } = useMediaUtils()
const isOpen = ref(props.defaultOpen)

// Support both { src } and { image } formats
function mediaSrc(entry) {
  return entry.src || entry.image
}

function formatLabel(entry, index) {
  if (props.labelFormat === 'sequence' && entry.sequence) {
    return `${entry.sequence}. ${entry.label}`
  }
  return `Step ${index + 1}`
}
</script>

<template>
  <div class="mb-8 border-b border-text-secondary/30">
    <!-- Desktop: show all tabs -->
    <div class="hidden sm:flex gap-3" role="tablist" :aria-label="ariaLabel">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        role="tab"
        type="button"
        :aria-selected="modelValue === tab.key"
        :class="[
          'px-4 py-2 text-sm font-semibold rounded-t-md transition-colors whitespace-nowrap flex-shrink-0',
          modelValue === tab.key
            ? 'bg-surface text-text-primary border-b-2 border-accent-red'
            : 'text-text-secondary hover:text-text-primary',
        ]"
        @click="$emit('update:modelValue', tab.key)"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Mobile: show visible tabs + "More" chip -->
    <div class="flex sm:hidden gap-1.5 items-center" role="tablist" :aria-label="ariaLabel">
      <button
        v-for="tab in visibleTabs"
        :key="tab.key"
        role="tab"
        type="button"
        :aria-selected="modelValue === tab.key"
        :class="[
          'px-2.5 py-1.5 text-xs font-semibold rounded-t-md transition-colors whitespace-nowrap flex-shrink-0',
          modelValue === tab.key
            ? 'bg-surface text-text-primary border-b-2 border-accent-red'
            : 'text-text-secondary hover:text-text-primary',
        ]"
        @click="$emit('update:modelValue', tab.key)"
      >
        {{ tab.label }}
      </button>

      <!-- More chip -->
      <div v-if="overflowTabs.length > 0" class="relative flex-shrink-0" ref="moreMenuRef">
        <button
          type="button"
          class="px-2.5 py-1.5 text-xs font-semibold rounded-t-md transition-colors whitespace-nowrap flex items-center gap-0.5"
          :class="[
            isOverflowTabActive
              ? 'bg-surface text-text-primary border-b-2 border-accent-red'
              : 'text-text-secondary hover:text-text-primary',
          ]"
          @click="moreMenuOpen = !moreMenuOpen"
          :aria-expanded="moreMenuOpen"
        >
          <span v-if="isOverflowTabActive">{{ activeOverflowTab?.label }}</span>
          <span v-else>+{{ overflowTabs.length }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3.5 w-3.5 transition-transform"
            :class="{ 'rotate-180': moreMenuOpen }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- Dropdown menu -->
        <Transition
          enter-active-class="transition duration-150 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="moreMenuOpen"
            class="absolute top-full right-0 mt-1 bg-surface border border-text-secondary/20 rounded-lg shadow-lg py-1 min-w-[140px] z-50"
          >
            <button
              v-for="tab in overflowTabs"
              :key="tab.key"
              type="button"
              class="w-full px-4 py-2 text-left text-sm font-medium transition-colors"
              :class="[
                modelValue === tab.key
                  ? 'bg-accent-red/10 text-accent-red'
                  : 'text-text-secondary hover:bg-text-primary/5 hover:text-text-primary',
              ]"
              @click="selectOverflowTab(tab.key)"
            >
              {{ tab.label }}
            </button>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
    validator: (tabs) => tabs.every((tab) => tab.key && tab.label),
  },
  modelValue: {
    type: String,
    required: true,
  },
  ariaLabel: {
    type: String,
    default: 'Navigation tabs',
  },
  mobileVisibleCount: {
    type: Number,
    default: 3,
  },
})

const emit = defineEmits(['update:modelValue'])

const moreMenuOpen = ref(false)
const moreMenuRef = ref(null)
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 400)

// Dynamically adjust visible count based on screen width
const dynamicVisibleCount = computed(() => {
  if (windowWidth.value < 320) return 1 // Very small screens
  if (windowWidth.value < 375) return 2 // iPhone SE and similar
  return props.mobileVisibleCount
})

const visibleTabs = computed(() => props.tabs.slice(0, dynamicVisibleCount.value))
const overflowTabs = computed(() => props.tabs.slice(dynamicVisibleCount.value))

const isOverflowTabActive = computed(() =>
  overflowTabs.value.some((tab) => tab.key === props.modelValue)
)

const activeOverflowTab = computed(() =>
  overflowTabs.value.find((tab) => tab.key === props.modelValue)
)

function selectOverflowTab(key) {
  emit('update:modelValue', key)
  moreMenuOpen.value = false
}

function handleResize() {
  windowWidth.value = window.innerWidth
}

function handleClickOutside(event) {
  if (moreMenuRef.value && !moreMenuRef.value.contains(event.target)) {
    moreMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('click', handleClickOutside)
})
</script>

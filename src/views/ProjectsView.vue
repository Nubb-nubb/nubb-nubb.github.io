<template>
  <section class="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
    <h2 class="section-title">Projects</h2>

    <p class="text-text-secondary mb-8">
      A collection of things I've made, stuff I've done.
    </p>

    <div class="mb-8 border-b border-text-secondary/30">
      <div class="flex flex-wrap gap-3" role="tablist" aria-label="Project tabs">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          role="tab"
          type="button"
          :aria-selected="activeTab === tab.key"
          :class="[
            'px-4 py-2 text-sm font-semibold rounded-t-md transition-colors',
            activeTab === tab.key
              ? 'bg-surface text-text-primary border-b-2 border-accent-red'
              : 'text-text-secondary hover:text-text-primary'
          ]"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div v-if="activeTab === 'blacksmithing'">
      <SetupEntry
        era="Coming Soon"
        title="Blacksmithing Projects"
        :images="[]"
        caption="Forged creations"
        description="Projects will be added here soon!"
      />
    </div>

    <div v-else-if="activeTab === 'butterfly-knife'">
      <SetupEntry
        era="Coming Soon"
        title="Butterfly Knife Projects"
        :images="[]"
        caption="Flipping and modding"
        description="Projects will be added here soon!"
      />
    </div>

    <div v-else-if="activeTab === 'coming-soon'">
      <SetupEntry
        era="Future"
        title="More Projects"
        :images="[]"
        caption="Stay tuned"
        description="More projects on the way!"
      />
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import SetupEntry from '../components/SetupEntry.vue'

const tabs = [
  { key: 'blacksmithing', label: 'Blacksmithing' },
  { key: 'butterfly-knife', label: 'Butterfly Knife' },
  { key: 'coming-soon', label: 'Coming Soon' }
]

const activeTab = ref('blacksmithing')
</script>

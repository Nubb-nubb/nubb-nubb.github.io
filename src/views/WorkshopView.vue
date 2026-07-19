<template>
  <section class="max-w-3xl mx-auto px-6 py-20">
    <h2 class="section-title">The Workshop Dream</h2>

    <p class="mb-8 text-text-secondary">
      What if there was a place like a library, but for making things?
    </p>

    <div class="space-y-6 mb-12">
      <WorkshopCard
        title="Seasonal Focus"
        color="border-accent-red"
        description="Winter: Blacksmithing. Spring: Woodworking. Summer: CNC & 3D printing. Fall: Metalwork experiments. Each season goes deep."
      />

      <WorkshopCard
        title="Accessible"
        color="border-plant-green"
        description="Free or library-subscription model. No scarcity. If you have an idea, you should be able to build it."
      />

      <WorkshopCard
        title="Guided, Not Gatekept"
        color="border-wood-light"
        description="Clear documentation on every tool. Experts who listen to your idea and tell you what you'll need. Community over gatekeeping."
      />

      <WorkshopCard
        title="Continuously Evolving"
        color="border-wood-dark"
        description="Downtime is for maintenance and renovation. The space itself is a project. Machines get upgraded. New tools arrive."
      />
    </div>

    <p class="italic text-text-secondary">
      maybe ill be a millionaire one day and i can do this.
    </p>
  </section>
</template>

<script setup>
import WorkshopCard from '../components/WorkshopCard.vue'
</script>

<template>
  <section class="max-w-3xl mx-auto px-6 py-20">
    <h2 class="section-title">Steven's Dream Workshop</h2>

    <p class="mb-8 text-text-secondary">
      what if a makerspace was like a seasonal battlepass? or maybe its more like a valorant act? 3 months of one thing, then it switches. except instead of maps coming in rotation... a fab lab does.
    </p>

    <div class="space-y-6 mb-12">
      <WorkshopCard
        title="Seasons?"
        color="border-accent-red"
        description="my idea is to make machines a seasonal rotation. first 3 months will be blacksmithing tools. Next season will be woodworking, then CNC & 3D printing, then metalwork experiments. and then it loops."
      />

      <WorkshopCard
        title="Accessible"
        color="border-plant-green"
        description="maybe it's free, maybe it's subscription a month. but this way, people can come in and they can use any of the tools. woodworking, metalworking, 3d printing, cnc, laser cutter, acrylic, electrical stations...etc"
      />

      <WorkshopCard
        title="Instructions"
        color="border-wood-light"
        description="i want detailed guides on how to use each machine that are also beginner friendly. i also want experts around that will hear your ideas and let you know what they think tools or machines you'll need to use."
      />

      <WorkshopCard
        title="Continuously Evolving"
        color="border-wood-dark"
        description="the idea is that while they are not in use (not in season), the machines get cleaned, stocked, new tools ordered... and when its in season, they are ready to go!"
      />
    </div>

    <p class="italic text-text-secondary">
      maybe i'll be a millionaire one day and i can do this.
    </p>
  </section>
</template>

<script setup>
import WorkshopCard from '../components/WorkshopCard.vue'
</script>

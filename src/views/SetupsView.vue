<template>
  <section class="max-w-3xl mx-auto px-6 py-20">
    <h2 class="section-title">Room Evolution 2022–2026</h2>

    <SetupEntry
      era="2022–2023"
      title="My first setup ever"
      :images="[
        'images/setup-2022-2023-1.png',
        'images/setup-2022-2023-2.jpg',
        'images/setup-2022-2023-3.png'
      ]"
      caption="I lowkey miss this walnut desk"
      description="Check out my son (the super awesome cat) and my 3d-printed cosplay slop"
    />

    <SetupEntry
      era="2024"
      title="diy table + 3d printers"
      :images="[
        'images/setup-2024-1.jpg',
        'images/setup-2024-2.jpg',
        'images/setup-2024-3.jpg'
      ]"
      caption="Wack ass table i built"
      description="The walnut desk was too large, so i got some 2x4's from home depot and made this table... at least it was only like 25$"
    />

    <SetupEntry
      era="2025"
      title="brothers house setup"
      :images="[
        'images/setup-2025-1.jpg',
        'images/setup-2025-2.jpg',
        'images/setup-2025-3.jpg'
      ]"
      caption="球球 lights, home depot ahh orchid"
      description="isnt this setup lowkey TOUGHHHH"
    />

    <SetupEntry
      era="2025"
      title="brothers house setup (decorations)"
      :images="[
        'images/setup-2025-4.jpg',
        'images/setup-2025-5.jpg'
      ]"
      caption="some decorations :D"
      description=""
    />

    <SetupEntry
      era="May–June 2026"
      title="New Apartment!!!"
      :images="[
        'images/setup-may-june-2026-1.png',
        'images/setup-may-june-2026-2.png'
      ]"
      caption="roommate love triangle completed here."
      description="had my own bathroom for the first time ever, W floating shelf"
    />

    <SetupEntry
      era="July 2026 (Current)"
      title="It's not Japandi, its Chinesedi"
      image="images/setup-july-2026-1.png"
      caption="CLEANNN!!!"
      description=""
    />

    <SetupEntry
      era="July 2026 (Background)"
      title="Aint it cute"
      :images="[
        'images/setup-july-2026-2.png'
      ]"
      caption="CLEANNN!!!"
      description=""
    />
  </section>
</template>

<script setup>
import SetupEntry from '../components/SetupEntry.vue'
</script>

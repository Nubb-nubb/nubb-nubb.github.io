<template>
  <div>
    <h3 class="text-2xl font-display font-bold mb-6 text-wood-dark">Room Evolution 2022–2026</h3>

    <CollapsibleSection
      title="2022–2023"
      v-model="sections['2022-2023']"
      color="accent-red"
      class="mb-4"
    >
      <SetupEntry
        title="My first setup ever"
        :images="[
          'images/setup-2022-2023-1.png',
          'images/setup-2022-2023-2.jpg',
          'images/setup-2022-2023-3.png',
        ]"
        caption="I lowkey miss this walnut desk"
        description="Check out my son (the super awesome cat) and my 3d-printed cosplay slop"
      />
    </CollapsibleSection>

    <CollapsibleSection title="2024" v-model="sections['2024']" color="accent-red" class="mb-4">
      <SetupEntry
        title="diy table + 3d printers"
        :images="['images/setup-2024-1.jpg', 'images/setup-2024-2.jpg', 'images/setup-2024-3.jpg']"
        caption="Wack ass table i built"
        description="The walnut desk was too large, so i got some 2x4's from home depot and made this table... at least it was only like 25$"
      />
    </CollapsibleSection>

    <CollapsibleSection title="2025" v-model="sections['2025']" color="accent-red" class="mb-4">
      <SetupEntry
        title="brothers house setup"
        :images="['images/setup-2025-1.jpg', 'images/setup-2025-2.jpg', 'images/setup-2025-3.jpg']"
        caption="球球 lights, home depot ahh orchid"
        description="isnt this setup lowkey TOUGHHHH"
      />

      <SetupEntry
        title="brothers house setup (decorations)"
        :images="['images/setup-2025-4.jpg', 'images/setup-2025-5.jpg']"
        caption="some decorations :D"
        description=""
      />
    </CollapsibleSection>

    <CollapsibleSection title="2026" v-model="sections['2026']" color="accent-red" class="mb-4">
      <SetupEntry
        era="May–June"
        title="New Apartment!!!"
        :images="['images/setup-may-june-2026-1.png', 'images/setup-may-june-2026-2.png']"
        caption="roommate love triangle completed here."
        description="had my own bathroom for the first time ever, W floating shelf"
      />

      <SetupEntry
        era="July (Current)"
        title="It's not Japandi, its Chinesedi"
        image="images/setup-july-2026-1.png"
        caption="CLEANNN!!!"
        description=""
      />

      <SetupEntry
        era="July (Background)"
        title="Aint it cute"
        :images="['images/setup-july-2026-2.png']"
        caption="CLEANNN!!!"
        description=""
      />
    </CollapsibleSection>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import SetupEntry from '../../components/SetupEntry.vue'
import CollapsibleSection from '../../components/CollapsibleSection.vue'

const sections = reactive({
  '2022-2023': true,
  2024: true,
  2025: true,
  2026: true,
})
</script>

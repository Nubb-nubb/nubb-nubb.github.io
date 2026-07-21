<template>
  <div>
    <h3 class="text-2xl font-display font-bold mb-6 text-wood-dark">3D Prints Collection</h3>

    <div class="mb-4 flex items-center gap-2 flex-wrap">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        class="px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-full border transition-colors"
        :class="
          activeTab === tab.key
            ? 'bg-text-primary text-warm-white border-text-primary'
            : 'bg-transparent text-text-secondary border-text-secondary/40 hover:text-text-primary hover:border-text-primary/50'
        "
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- One Piece tab -->
    <div v-if="activeTab === 'one-piece'">
      <AlbumGrid :albums="onePieceAlbums" @preview="openPreview" />
    </div>

    <!-- JJK tab -->
    <div v-else-if="activeTab === 'jjk'">
      <AlbumGrid :albums="jjkAlbums" @preview="openPreview" />
    </div>

    <!-- Valorant tab -->
    <div v-else-if="activeTab === 'valorant'">
      <AlbumGrid :albums="valorantAlbums" @preview="openPreview" />
    </div>

    <!-- Spiderman tab -->
    <div v-else-if="activeTab === 'spiderman'">
      <AlbumGrid :albums="spidermanAlbums" @preview="openPreview" />
    </div>

    <!-- Other tab -->
    <div v-else-if="activeTab === 'other'">
      <AlbumGrid :albums="otherAlbums" @preview="openPreview" />
    </div>

    <ImagePreviewModal
      :preview-image="previewImage"
      :preview-type="previewType"
      @close="closePreview"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useImagePreview } from '../../composables/useImagePreview'
import ImagePreviewModal from '../../components/ImagePreviewModal.vue'
import AlbumGrid from '../../components/AlbumGrid.vue'

const { previewImage, previewType, openPreview, closePreview } = useImagePreview()

const tabs = [
  { key: 'one-piece', label: 'One Piece' },
  { key: 'jjk', label: 'JJK' },
  { key: 'valorant', label: 'Valorant' },
  { key: 'spiderman', label: 'Spiderman' },
  { key: 'other', label: 'Other' },
]

const activeTab = ref('one-piece')

// One Piece albums
const onePieceAlbums = [
  {
    key: 'zoros-katanas',
    label: "Zoro's Katanas",
    media: [
      'images/3dprint stuff/Zoros_Katanas_Together/IMG_3042.JPEG',
      'images/3dprint stuff/Zoros_Katanas_Together/IMG_3043.JPEG',
      'images/3dprint stuff/Zoros_Katanas_Together/IMG_3044.JPEG',
      'images/3dprint stuff/Zoros_Katanas_Together/IMG_3045.JPEG',
    ],
  },
  {
    key: 'enma',
    label: 'Enma',
    media: [
      'images/3dprint stuff/Enma/IMG_2945.JPEG',
      'images/3dprint stuff/Enma/IMG_2946.JPEG',
      'images/3dprint stuff/Enma/IMG_2951.JPEG',
      'images/3dprint stuff/Enma/IMG_2969.JPEG',
      'images/3dprint stuff/Enma/IMG_2997.JPEG',
      'images/3dprint stuff/Enma/IMG_3002.JPEG',
      'images/3dprint stuff/Enma/IMG_3003.JPEG',
      'images/3dprint stuff/Enma/IMG_3004.JPEG',
      'images/3dprint stuff/Enma/IMG_4070.JPEG',
      'images/3dprint stuff/Enma/IMG_4071.JPEG',
      'images/3dprint stuff/Enma/IMG_4075.JPEG',
      'images/3dprint stuff/Enma/IMG_4076.JPEG',
      'images/3dprint stuff/Enma/IMG_4077.JPEG',
      'images/3dprint stuff/Enma/IMG_4078.JPEG',
      'images/3dprint stuff/Enma/IMG_4079.JPEG',
      'images/3dprint stuff/Enma/IMG_4080.JPEG',
      'images/3dprint stuff/Enma/IMG_9787.JPEG',
      'images/3dprint stuff/Enma/IMG_9789.JPEG',
      'images/3dprint stuff/Enma/IMG_9790.JPEG',
    ],
  },
  {
    key: 'sandai-kitetsu',
    label: 'Sandai Kitetsu',
    media: [
      'images/3dprint stuff/Sandai_Kitetsu/IMG_0542.PNG',
      'images/3dprint stuff/Sandai_Kitetsu/IMG_0543.PNG',
      'images/3dprint stuff/Sandai_Kitetsu/IMG_0544.PNG',
      'images/3dprint stuff/Sandai_Kitetsu/IMG_3539.JPEG',
      'images/3dprint stuff/Sandai_Kitetsu/IMG_3541.JPEG',
      'images/3dprint stuff/Sandai_Kitetsu/IMG_3545.JPEG',
      'images/3dprint stuff/Sandai_Kitetsu/IMG_3546.JPEG',
    ],
  },
  {
    key: 'wado-ichimonji',
    label: 'Wado Ichimonji',
    media: [
      'images/3dprint stuff/Wado_Ichimonji/IMG_0530.PNG',
      'images/3dprint stuff/Wado_Ichimonji/IMG_0531.PNG',
      'images/3dprint stuff/Wado_Ichimonji/IMG_0532.PNG',
      'images/3dprint stuff/Wado_Ichimonji/IMG_2849.JPEG',
      'images/3dprint stuff/Wado_Ichimonji/IMG_2864.JPEG',
      'images/3dprint stuff/Wado_Ichimonji/IMG_2865.JPEG',
      'images/3dprint stuff/Wado_Ichimonji/IMG_2866.JPEG',
      'images/3dprint stuff/Wado_Ichimonji/IMG_2867.JPEG',
      'images/3dprint stuff/Wado_Ichimonji/IMG_2903.JPEG',
      'images/3dprint stuff/Wado_Ichimonji/IMG_2906.JPEG',
      'images/3dprint stuff/Wado_Ichimonji/IMG_2907.JPEG',
      'images/3dprint stuff/Wado_Ichimonji/IMG_2931.JPEG',
      'images/3dprint stuff/Wado_Ichimonji/IMG_3221.JPEG',
      'images/3dprint stuff/Wado_Ichimonji/IMG_3222.JPEG',
      'images/3dprint stuff/Wado_Ichimonji/IMG_3223.JPEG',
      'images/3dprint stuff/Wado_Ichimonji/IMG_3224.JPEG',
      'images/3dprint stuff/Wado_Ichimonji/IMG_3225.JPEG',
      'images/3dprint stuff/Wado_Ichimonji/IMG_3226.JPEG',
      'images/3dprint stuff/Wado_Ichimonji/Wado_Ichimonji_vid.MP4',
    ],
  },
]

// JJK albums
const jjkAlbums = [
  {
    key: 'inverted-spear',
    label: 'Inverted Spear',
    media: [
      'images/3dprint stuff/Inverted_Spear/IMG_0650.png',
      'images/3dprint stuff/Inverted_Spear/IMG_0651.PNG',
      'images/3dprint stuff/Inverted_Spear/IMG_9031.JPG',
      'images/3dprint stuff/Inverted_Spear/IMG_9038.JPEG',
      'images/3dprint stuff/Inverted_Spear/IMG_9039.JPEG',
      'images/3dprint stuff/Inverted_Spear/IMG_9041.JPEG',
      'images/3dprint stuff/Inverted_Spear/IMG_9042.JPEG',
      'images/3dprint stuff/Inverted_Spear/IMG_9043.JPEG',
      'images/3dprint stuff/Inverted_Spear/IMG_9045.JPEG',
      'images/3dprint stuff/Inverted_Spear/IMG_9048.JPEG',
      'images/3dprint stuff/Inverted_Spear/IMG_9051.JPEG',
      'images/3dprint stuff/Inverted_Spear/IMG_9031.MOV',
      'images/3dprint stuff/Inverted_Spear/IMG_9045.MOV',
      'images/3dprint stuff/Inverted_Spear/IMG_9048.MOV',
      'images/3dprint stuff/Inverted_Spear/IMG_9050.MOV',
      'images/3dprint stuff/Inverted_Spear/IMG_9051.MOV',
      'images/3dprint stuff/Inverted_Spear/IMG_9082.MOV',
    ],
  },
]

// Valorant albums
const valorantAlbums = [
  {
    key: 'jett-knife',
    label: 'Jett Knife',
    media: ['images/3dprint stuff/Jett_Knife/jett_knife.MOV'],
  },
  {
    key: 'oni-katana',
    label: 'Oni Katana',
    media: [
      'images/3dprint stuff/Oni_Katana/IMG_4046.JPG',
      'images/3dprint stuff/Oni_Katana/IMG_4056.JPG',
      'images/3dprint stuff/Oni_Katana/IMG_4057.JPG',
      'images/3dprint stuff/Oni_Katana/IMG_4114.JPG',
      'images/3dprint stuff/Oni_Katana/IMG_4336.JPG',
      'images/3dprint stuff/Oni_Katana/IMG_4337.JPG',
      'images/3dprint stuff/Oni_Katana/IMG_4338.JPG',
      'images/3dprint stuff/Oni_Katana/IMG_4342.JPEG',
      'images/3dprint stuff/Oni_Katana/IMG_4343.JPEG',
      'images/3dprint stuff/Oni_Katana/IMG_4344.JPEG',
      'images/3dprint stuff/Oni_Katana/IMG_4352.JPEG',
      'images/3dprint stuff/Oni_Katana/IMG_4353.JPEG',
      'images/3dprint stuff/Oni_Katana/IMG_4356.JPEG',
      'images/3dprint stuff/Oni_Katana/IMG_4357.JPEG',
      'images/3dprint stuff/Oni_Katana/IMG_4358.JPEG',
      'images/3dprint stuff/Oni_Katana/Oni_pre-saya_paint.MOV',
      'images/3dprint stuff/Oni_Katana/oni_video.MOV',
    ],
  },
  {
    key: 'reaver-operator',
    label: 'Reaver Operator',
    media: [
      'images/3dprint stuff/Reaver_Operator/IMG_0234.JPEG',
      'images/3dprint stuff/Reaver_Operator/IMG_4164.JPG',
      'images/3dprint stuff/Reaver_Operator/IMG_4166.JPG',
      'images/3dprint stuff/Reaver_Operator/IMG_4167.JPEG',
      'images/3dprint stuff/Reaver_Operator/IMG_4184.JPG',
      'images/3dprint stuff/Reaver_Operator/IMG_4234.JPG',
      'images/3dprint stuff/Reaver_Operator/IMG_4271.JPG',
      'images/3dprint stuff/Reaver_Operator/reaver_operator_vid.MP4',
    ],
  },
]

// Spiderman albums
const spidermanAlbums = [
  {
    key: 'spiderman',
    label: 'Spiderman',
    media: [
      'images/3dprint stuff/Spiderman/IMG_7101.JPEG',
      'images/3dprint stuff/Spiderman/IMG_7102.MOV',
      'images/3dprint stuff/Spiderman/IMG_7103.JPEG',
      'images/3dprint stuff/Spiderman/IMG_7104.JPEG',
      'images/3dprint stuff/Spiderman/IMG_7105.JPEG',
      'images/3dprint stuff/Spiderman/IMG_7106.MOV',
      'images/3dprint stuff/Spiderman/IMG_7110.JPEG',
      'images/3dprint stuff/Spiderman/IMG_7112.MOV',
      'images/3dprint stuff/Spiderman/IMG_7117.JPEG',
      'images/3dprint stuff/Spiderman/IMG_7118.JPEG',
      'images/3dprint stuff/Spiderman/IMG_7120.MOV',
      'images/3dprint stuff/Spiderman/IMG_7122.JPEG',
      'images/3dprint stuff/Spiderman/IMG_7123.MOV',
      'images/3dprint stuff/Spiderman/IMG_7124.JPEG',
      'images/3dprint stuff/Spiderman/IMG_7125.JPEG',
      'images/3dprint stuff/Spiderman/IMG_7128.JPEG',
      'images/3dprint stuff/Spiderman/IMG_7133.JPEG',
      'images/3dprint stuff/Spiderman/IMG_7135.JPEG',
      'images/3dprint stuff/Spiderman/IMG_7141.JPEG',
      'images/3dprint stuff/Spiderman/IMG_7146.JPEG',
      'images/3dprint stuff/Spiderman/IMG_7148.JPEG',
      'images/3dprint stuff/Spiderman/IMG_7149.JPEG',
      'images/3dprint stuff/Spiderman/IMG_7155.MOV',
      'images/3dprint stuff/Spiderman/IMG_7156.MOV',
      'images/3dprint stuff/Spiderman/IMG_7159.MOV',
      'images/3dprint stuff/Spiderman/IMG_7165.JPEG',
      'images/3dprint stuff/Spiderman/IMG_7166.MOV',
      'images/3dprint stuff/Spiderman/IMG_7180.MOV',
      'images/3dprint stuff/Spiderman/IMG_7190.JPEG',
      'images/3dprint stuff/Spiderman/IMG_7191.MOV',
    ],
  },
]

// Other albums
const otherAlbums = [
  {
    key: 'mushroom-boi',
    label: 'Mushroom Boi',
    media: [
      'images/3dprint stuff/Mushroom_boi/IMG_3283.JPEG',
      'images/3dprint stuff/Mushroom_boi/IMG_3287.JPEG',
      'images/3dprint stuff/Mushroom_boi/IMG_3288.JPEG',
      'images/3dprint stuff/Mushroom_boi/IMG_3289.JPEG',
    ],
  },
]
</script>

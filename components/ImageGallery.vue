<script setup>
  const props = defineProps({
    images: Array,
    folder: String,
  })

</script>

<template>
  <div class="image-gallery">
    <div class="image-gallery-images">
      <div class="col">
        <img v-for="image in images.slice(0,images.length/2)" :src="`${folder}/${image}`" />
      </div>
      <div class="col">
        <img v-for="image in images.slice(images.length/2)" :src="`${folder}/${image}`" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .image-gallery {
    margin-bottom: var(--p-4);
  }
  .image-gallery-images {
    display: grid;
    gap: var(--p-2);
  }
  .image-gallery-images .col img {
    margin-bottom: var(--p-2);
  }
  @media screen and (min-width: 768px) {
    .image-gallery-images {
      grid-template-columns: 50% 50%;
    } 
  }
  @media screen and (min-width: 1350px) {
    .image-gallery {
      max-width: 500px;
    } 
  }
</style>
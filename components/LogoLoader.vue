<script setup>
  const props = defineProps({
    logo: String,
    color: Boolean
  })
  let isImage = computed({
    get() {
      console.log(props.logo);
      if (props.logo == null) {
        return false;
      }
      return props.logo.match(/\.(jpeg|jpg|gif|png)$/) !== null
    }
  }) 
</script>

<template>
  <div class="logo-container" :class="{'color': color}">
    <TravellerspointLogo v-if="props.logo === 'travellerspoint'" />
    <IKTPLogo v-if="props.logo === 'iktp'" />
    <TravelMassiveLogo v-if="props.logo === 'travelmassive'" />
    <WherdleLogo v-if="props.logo === 'wherdle'" />
    <img v-if="isImage" :src="`/img/${logo}`" :alt="logo" />
  </div>
</template>

<style scoped>
  .logo-container {
    filter: grayscale(100%);
    text-align: left;
  }
  .logo-container.color {
    filter: none;
  }
  img {
    max-width: 100%;
    max-height: 60px;
  }
</style>

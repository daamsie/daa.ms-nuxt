<script setup lang="ts">

  interface State {
    showSection: String
  }

  const state: State = reactive(
    { 
      showSection: "",
    }
  )

const sections = [
    {id: 'about' },
    {id: 'travellerspoint' },
    {id: 'travelmassive' },
    {id: 'iwtf' },
    {id: 'iktp' },
    {id: 'charitable' },
    {id: 'wherdle' },
    {id: 'art' },
    {id: 'contact'},
  ] 
</script>

<template>
  <main class="container">
    <div class="options">
      <div v-for="section in sections" @click="state.showSection = section.id">
        <ContentFlyer :show="state.showSection===section.id" :id="section.id" @closed="state.showSection = ''" />
      </div>
    </div>
  </main>
</template>

<style scoped>
  h1 {
    color: var(--color-primary);
  }
  .options {
    display: grid;
    grid-template-columns: 100%;
    gap: var(--p-2);
  }
  .options div {
    background: var(--color-light);
    padding: 0;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media screen and (min-width: 768px) {
    .options {
      grid-template-columns: calc(50% - var(--p-1)) calc(50% - var(--p-1));
    } 
  }

</style>
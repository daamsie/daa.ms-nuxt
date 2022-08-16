
<template>
  <main class="container">
    <div class="options">
      <div>
        <ContentFlyer :show="true" :id="$route.params.slug" />
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
    grid-template-columns: 1fr;
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
      grid-template-columns: 1fr 1fr;
    } 
  }

</style>
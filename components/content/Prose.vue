<template>
  <div class="prose">
    <Markdown :use="$slots.default" />
  </div>
</template>

<style>
  div.prose {
    max-width: 65ch;
    font-size: 1.2rem; 
    line-height: 1.7;
  }
  div.prose h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    line-height: 1.1;
  }
</style>
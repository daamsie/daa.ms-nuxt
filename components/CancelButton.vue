

<template>
  <button aria-label="Close this" @click.stop="$emit('cancelled')">
    <svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
</template>

<style scoped>
   button {
      cursor: pointer;
      position: absolute;
      top: var(--p-2);
      right: var(--p-2);
      background: var(--color-extra-light);
      color: var(--color-dark);
      border: 0;
   }
   button:hover {
    color: var(--color-extra-dark);
   }
</style>
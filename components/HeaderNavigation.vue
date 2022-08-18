<template>
  <nav>
    <div class="container">
      <PeterDaamsLogo />
    </div>
  </nav>
</template>

<style scoped>
  nav {
    background: rgba(var(--color-extra-light-raw), 0.8);
    color: var(--color-dark);
    position: sticky;
    top: 0;
    margin-bottom: 1rem;
    backdrop-filter: blur(5px);
    z-index: 2;
  }
  nav .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-height: 100px;
    padding: var(--p-4);
  }
  .links {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  nav span {
    padding: 1rem 1rem;
    color: var(--color-dark);
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: none;
    border-bottom: 2px solid transparent;
  }
  nav a:hover {
    border-bottom: 2px solid var(--color-light-accent);
    color: var(--color-brand);
  }
  @media(prefers-color-scheme:dark) {
    nav {
      background: rgba(var(--color-dark-raw), 0.8);
      color: var(--color-light);
    } 
    nav span {
      color: var(--color-light);
    }
  }
</style>
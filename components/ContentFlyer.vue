<script setup lang="ts">
  const props = defineProps({
    show: Boolean, 
    id: String
  })
  
  const { data } = await useAsyncData(props.id, () => {
    return queryContent(props.id).only(['title', 'description', 'tech', 'logo', 'url']).findOne()
  } );
  
  let cssVars = ref({
      '--top': `0px`,
      '--bottom': `0px`,
      '--left': `0px`,
      '--right': `0px`,
  });

  if (typeof window !== 'undefined') {
    // This does not happen without JS. 
    // TODO: add a fallback for no JS.. maybe?
    // TODO: move this to a composable function
    const getFlyerRect = () => {
      const rect = document.getElementById(props.id).getBoundingClientRect();
      const top = rect.top;
      const bottom = window.innerHeight - rect.bottom;
      const left = rect.left;
      let right = window.innerWidth-rect.right;
      if (window.innerWidth < 768) { 
        /* Weird situation where the right side is not correct for mobile (Chrome) */ 
        // in this scenario, left and right should be identical.
        right = rect.left;
      }
      return {
        '--top': `${top}px`,
        '--bottom': `${bottom}px`,
        '--left': `${left}px`,
        '--right': `${right}px`,
      }
    }
    
    cssVars.value = getFlyerRect();
    window.addEventListener('resize', () => {
      cssVars.value = getFlyerRect();
    }, true);
    window.addEventListener('scroll', () => {
      cssVars.value = getFlyerRect();
    }, true);
  }

</script>

<template>
  <section :class="{'showing': show}" :style="cssVars" ref="flyer" :id="props.id" >
    <CancelButton v-if="show" @cancelled="$emit('closed')" />

    <h2>
      <img :src="`/assets/${data.logo}`" alt="{{data.title}}" v-if="data.logo != null" />
      <span v-else>{{data.title}}</span>
    </h2>
    <!-- <p v-if="!show">
      {{data.description}}
    </p> -->
    <div class="to-reveal" v-if="show">
      <Prose>
        <ContentDoc :path="props.id" />
      </Prose>
    </div>

    <p class="tech">
      {{data.tech}}
    </p>
  </section>
</template>

<style scoped>
  section {
    box-sizing: border-box;
    cursor: pointer;
    background: var(--color-extra-light);
    padding: 2rem;
    transition: 1s all;
    width: 100%;
    height: 100%;
    position: relative;
    box-shadow: 2px 2px 0 var(--color-light-accent);
    border: 1px solid rgba(var(--color-dark-raw), 0.2);
    overflow-y: auto;
    --expanded-padding: 2rem;
  }
  @media screen and (min-width:768px) {
    section {
      --expanded-padding: 3rem;
    } 
  }
  section:hover {
    z-index: 2;
    box-shadow: 4px 4px 0 var(--color-light-accent);
  }
  h2 {
    margin-bottom: 1rem;
  } 
  h2 img {
    filter: grayscale(100%);
    max-width: 100%;
    max-height: 60px;
  }
  p.tech {
    box-sizing: border-box;
    width: 100%;
    padding-top: 1rem;
    border-top: 1px dashed #ccc;
    font-family: monospace;
    font-size: 1rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  /* .close {
    cursor: pointer;
    position: absolute;
    top: var(--p-2);
    right: var(--p-2);
    animation: fadeIn 1s;
  } */
  section.showing {
    cursor: default;
    position: fixed;
    width: auto;
    height: auto;
    margin: 0 auto;
    padding: var(--expanded-padding);
    left: var(--p-2);
    bottom: var(--p-2);
    top: var(--p-2);
    right: var(--p-2);
    animation: expand 0.3s ease-in forwards;
    box-shadow: 8px 10px 0 var(--color-light-accent);
    z-index: 9;
  }
  section.showing:hover {
    transform: scale(1);
  }
  section.showing h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    animation: grow 0.3s;
  }
  section.showing .to-reveal {
    opacity: 1;
    animation: fadeIn 0.3s;
  }
  @keyframes grow {
    from {
      font-size: 1.5em;
    }
    to {
      font-size: 2.5rem;
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0
    }
    70% {
      opacity: 0;
    }
    100% {
      opacity: 1;
      transform: scaleY(1);
    }
  }
  @keyframes expand {
    from {
      overflow: hidden;
      top: var(--top) ;
      left:  var(--left);
      right:  var(--right);
      bottom:  var(--bottom);
      box-shadow: 4px 4px 0 var(--color-light-accent);
      padding: 2rem;
    }
    70% {
      overflow: hidden;
    }

    100% {
      top: var(--p-2);
      bottom: var(--p-2);
      left:  var(--p-2);
      right:  var(--p-2);
      box-shadow: 8px 10px 0 var(--color-light-accent);
      padding: var(--expanded-padding);
    }
  }
</style>
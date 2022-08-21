<script setup lang="ts">
  const props = defineProps({
    show: Boolean, 
    id: String
  })
  
  const { data } = await useAsyncData(props.id, () => {
    return queryContent(props.id).only(['title', 'description', 'tech', 'logo', 'url', 'images']).findOne()
  } );

  const images  = [];
  
  if (data.images != null) {
    for (let image of data.images) {
      images.push(image);
    }
  };
  
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

    const debounce =(method, delay) => {
      clearTimeout(method._tId);
      method._tId= setTimeout(function(){
          method();
      }, delay);
    }

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
      cssVars.value = {
        '--top': `${top}px`,
        '--bottom': `${bottom}px`,
        '--left': `${left}px`,
        '--right': `${right}px`,
      }
    }
    
    getFlyerRect();
    window.addEventListener('resize', () => {
      debounce(getFlyerRect, 100);
    }, true);
    window.addEventListener('scroll', () => {
      debounce(getFlyerRect, 100);
    }, true);
  }

</script>

<template>
  <section :class="{'showing': show}" :style="cssVars" ref="flyer" :id="props.id" >
    <div class="top-bar">
      <CancelButton v-if="show" @cancelled="$emit('closed')" />
      <h2>
        <LogoLoader :logo="data.logo" :color="show" />
        <span v-if="data.logo == null">{{data.title}}</span>
      </h2>
     </div>
    <div class="to-reveal">
      <Prose>
        <ContentDoc :path="id" />
      </Prose>
      <ImageGallery :images="data.images.split(',')" :folder="`/img/${id}`" v-if="data.images != null" />
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
    transition: 0.5s all;
    width: 100%;
    height: 100%;
    position: relative;
    box-shadow: 2px 2px 0 var(--color-light-accent);
    border: 1px solid rgba(var(--color-dark-raw), 0.2);
    overflow-y: auto;
    --expanded-padding: 2rem;
  }
  section a {
    color: var(--color-dark-accent);
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
    animation: expand 0.2s ease-in forwards;
    box-shadow: 8px 10px 0 var(--color-light-accent);
    z-index: 9;
  }
  section.showing:hover {
    transform: scale(1);
  }
  section.showing .top-bar {
    position: sticky;
    top: calc(var(--expanded-padding) * -1);
    backdrop-filter: blur(15px);
    margin-bottom: 1.5rem;
    height: 80px;
    padding-top: 8px;
  }
  section.showing h2 {
    font-size: 2.5rem;
    margin-bottom: 0;
    animation: grow 0.3s;
  }
  section.showing p.tech {
    overflow: visible;
    white-space: normal;
  }
  section .to-reveal {
    display: none;
  }
  section.showing .to-reveal {
    display: flex;
    flex-wrap: wrap;
    gap: var(--p-4);
    opacity: 1;
    animation: fadeIn 0.3s;
  }
  @media(prefers-color-scheme:dark) {
    section {
      background: var(--color-dark);
      box-shadow: 2px 2px 0 var(--color-light-accent);
      border: 1px solid rgba(var(--color-light-raw), 0.2);
      color: var(--color-light);
    }
  }
  @media(prefers-reduced-motion:reduce) {
    section {
      transition: none;
    }
    section.showing, section.showing .to-reveal, section.showing h2 {
      animation: none;
    }
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
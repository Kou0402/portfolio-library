<template>
  <div>
    <Hero></Hero>
    <nuxt />
  </div>
</template>

<script>
import Hero from '~/components/layouts/Hero.vue'

export default {
  components: {
    Hero
  }
}
</script>

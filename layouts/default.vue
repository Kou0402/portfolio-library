<template>
  <div>
    <Hero></Hero>
    <Menu></Menu>
    <nuxt />
  </div>
</template>

<script>
import Hero from '~/components/layouts/Hero.vue'
import Menu from '~/components/layouts/Menu.vue'

export default {
  components: {
    Hero,
    Menu
  }
}
</script>

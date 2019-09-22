<template>
  <div>
    <header>
      <Hero></Hero>
      <MainMessage></MainMessage>
      <Menu></Menu>
    </header>
    <main>
      <nuxt />
    </main>
  </div>
</template>

<script>
import Hero from '~/components/layouts/Hero.vue'
import MainMessage from '~/components/layouts/MainMessage.vue'
import Menu from '~/components/layouts/Menu.vue'

export default {
  components: {
    Hero,
    MainMessage,
    Menu
  }
}
</script>

<template>
  <div>
    <header>
      <Hero></Hero>
      <MainMessage></MainMessage>
      <Menu class="menu-conponent"></Menu>
    </header>
    <main>
      <nuxt class="main-conponent" />
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

<style lang="scss" scoped>
.menu-conponent {
  margin: 0 10vw;
}
.main-conponent {
  margin: 0 10vw;
}
</style>

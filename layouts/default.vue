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
  margin: 0 9vw;
}
.main-conponent {
  margin: 3vh 9vw;
}

@media screen and (max-width: 896px) {
  .menu-conponent {
    margin: 0;
  }
  .main-conponent {
    margin: 1vh 0;
  }
}
</style>

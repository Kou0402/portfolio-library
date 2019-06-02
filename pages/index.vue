<template>
  <main>
    <section class="contents-area">
      <PortfolioCard></PortfolioCard>
    </section>
  </main>
</template>

<script>
import PortfolioCard from '~/components/pages/PortfolioCard.vue'

export default {
  components: {
    PortfolioCard
  }
}
</script>

<style lang="scss" scoped>
main {
  .contents-area {
    width: 80%;
    margin: 3rem auto 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}

@media screen and (max-width: 896px) {
  main {
    .contents-area {
      width: 100%;
      margin: 0;
    }
  }
}
</style>

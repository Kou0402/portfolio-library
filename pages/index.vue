<template>
  <main>
    <section class="contents-area">
      <PortfolioCard
        v-for="item in portfolioData"
        :key="item.id"
        :portfolio-url="item.url"
        :portfolio-description="item.description"
        :portfolio-capture="item.captureUrl"
      ></PortfolioCard>
    </section>
  </main>
</template>

<script>
import PortfolioCard from '~/components/pages/PortfolioCard.vue'

export default {
  components: {
    PortfolioCard
  },
  data() {
    return {
      portfolioData: []
    }
  },
  async created() {
    await this.$store.dispatch('portfolio/fetchPortfolios')
    this.portfolioData = this.$store.getters['portfolio/portfolios']
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

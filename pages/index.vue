<template>
  <main @scroll="infiniteScroll">
    <section class="contents-area">
      <PortfolioCard
        v-for="item in portfolioData"
        :key="item.id"
        :url="item.url"
        :description="item.description"
        :capture-url="item.captureUrl"
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
      portfolioData: [],
      startScrollYOffset: 0
    }
  },
  created() {
    this.setPortfolio()
  },
  mounted() {
    this.setInfiniteScrollSetting()
  },
  methods: {
    async setPortfolio() {
      await this.$store.dispatch('portfolio/fetchPortfolios')
      this.portfolioData = this.$store.getters['portfolio/portfolios']
    },
    setInfiniteScrollSetting() {
      window.addEventListener('scroll', this.infiniteScroll)
      this.startScrollYOffset = Math.floor(window.innerHeight / 3)
    },
    infiniteScroll() {
      if (window.pageYOffset >= this.startScrollYOffset) {
        this.startScrollYOffset = window.innerHeight + window.pageYOffset
        this.setPortfolio()
      }
    }
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

<template>
  <section class="portfolio-area" @scroll="infiniteScroll">
    <PortfolioCard
      v-for="item in portfolioData"
      :key="item.id"
      :url="item.url"
      :title="item.title"
      :capture-url="item.captureUrl"
      class="portfolio-card-component"
    ></PortfolioCard>
  </section>
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
    this.$store.dispatch('portfolio/initializePortfolios')
    this.$store.dispatch('portfolio/initializeLastData')
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
.portfolio-area {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 0 2vw;
  .portfolio-card-component {
    margin: 2vh;
  }
}

@media screen and (max-width: 896px) {
  .portfolio-area {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 0 2vw;
    .portfolio-card-component {
      margin: 1vh 0;
    }
  }
}
</style>

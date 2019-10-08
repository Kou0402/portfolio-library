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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
  padding: 0 4rem;
  .portfolio-card-component {
    margin: 1.8rem auto;
  }
}

@media screen and (max-width: 896px) {
  .portfolio-area {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    padding: 0 1vw;
    .portfolio-card-component {
      margin: 0.8rem auto;
    }
  }
}
</style>

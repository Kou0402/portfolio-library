<template>
  <main>
    <section class="contents-area">
      <PortfolioCard
        v-for="item in portfolioData"
        :key="item.id"
        :portfolio-url="item.portfolioURL"
      ></PortfolioCard>
    </section>
    <section>
      <router-link to="post" class="link">投稿</router-link>
    </section>
  </main>
</template>

<script>
import PortfolioCard from '~/components/pages/PortfolioCard.vue'
import firebase from '~/plugins/firebase.js'

const db = firebase.firestore()
const portfolioData = []

export default {
  components: {
    PortfolioCard
  },
  data() {
    return {
      portfolioData
    }
  },
  mounted() {
    db.collection('portfolio')
      .get()
      .then(query => {
        query.forEach(documents => {
          const document = documents.data()
          const tempPortfolioData = {}
          tempPortfolioData.id = documents.id
          tempPortfolioData.portfolioDescription = document.portfolioDescription
          tempPortfolioData.portfolioURL = document.portfolioURL
          portfolioData.push(tempPortfolioData)
        })
        console.log(portfolioData)
      })
      .catch(error => {
        console.log(`データの取得に失敗しました (${error})`)
      })
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

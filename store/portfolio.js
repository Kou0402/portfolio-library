import firebase from '~/plugins/firebase.js'
const db = firebase.firestore()

export const state = () => ({
  portfolios: []
})

export const getters = {
  portfolios: state => state.portfolios
}

export const mutations = {
  addPortfolio(state, portfolio) {
    state.portfolios = portfolio
  }
}

export const actions = {
  async fetchPortfolios({ commit }) {
    const portfolioData = []
    await db
      .collection('portfolio')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documents => {
          const document = documents.data()
          const tempData = {}
          tempData.id = documents.id
          tempData.description = document.description
          tempData.url = document.url
          tempData.captureUrl = document.captureUrl
          portfolioData.push(tempData)
        })
      })
      .catch(error => {
        console.log(error)
      })
    commit('addPortfolio', portfolioData)
  }
}

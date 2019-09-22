import firebase from '~/plugins/firebase.js'
const db = firebase.firestore()
let lastDocument = null

export const state = () => ({
  portfolio: '',
  portfolios: []
})

export const getters = {
  portfolio: state => state.portfolio,
  portfolios: state => state.portfolios
}

export const mutations = {
  addPortfolio(state, portfolio) {
    state.portfolio = portfolio
  },
  addPortfolios(state, portfolios) {
    portfolios.forEach(function(portfolio) {
      state.portfolios.push(portfolio)
    })
  }
}

export const actions = {
  async fetchPortfolio({ commit }, uid) {
    const portfolioData = {}
    await db
      .collection('portfolio')
      .where('uid', '==', uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(function(document) {
          portfolioData.description = document.data().description
          portfolioData.url = document.data().url
          portfolioData.docId = document.id
        })
      })
      .catch(error => {
        console.log(error)
      })
    commit('addPortfolio', portfolioData)
  },
  async fetchPortfolios({ commit }, orderBase = 'createdAt', order = 'asc', limit = 9) {
    const portfolioData = []
    await db
      .collection('portfolio')
      .orderBy(orderBase, order)
      .startAfter(lastDocument)
      .limit(limit)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documents => {
          const document = documents.data()
          const tempData = {}
          tempData.docId = documents.id
          tempData.description = document.description
          tempData.url = document.url
          tempData.captureUrl = document.captureUrl
          portfolioData.push(tempData)
        })
        lastDocument = querySnapshot.docs[querySnapshot.docs.length - 1]
      })
      .catch(error => {
        console.log(error)
      })
    commit('addPortfolios', portfolioData)
  },
  async publishPortfolio({ commit }, { portfolioData }) {
    await db
      .collection('portfolio')
      .doc()
      .set({
        uid: portfolioData.uid,
        url: portfolioData.url,
        description: portfolioData.description,
        captureUrl: portfolioData.captureUrl,
        createdAt: new Date()
      })
      .catch(error => {
        console.log(error)
      })
    commit('addPortfolio', portfolioData)
  },
  async updatePortfolio({ commit }, { portfolioData }) {
    await db
      .collection('portfolio')
      .doc(portfolioData.docId)
      .set({
        uid: portfolioData.uid,
        url: portfolioData.url,
        description: portfolioData.description,
        captureUrl: portfolioData.captureUrl,
        createdAt: new Date()
      })
      .catch(error => {
        console.log(error)
      })
    commit('addPortfolio', portfolioData)
  }
}

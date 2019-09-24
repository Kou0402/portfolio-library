import firebase from '~/plugins/firebase.js'
const db = firebase.firestore()

export const state = () => ({
  portfolio: '',
  portfolios: [],
  lastData: null
})

export const getters = {
  portfolio: state => state.portfolio,
  portfolios: state => state.portfolios,
  lastData: state => state.lastData
}

export const mutations = {
  addPortfolio(state, portfolio) {
    state.portfolio = portfolio
  },
  addPortfolios(state, portfolios) {
    portfolios.forEach(function(portfolio) {
      state.portfolios.push(portfolio)
    })
  },
  initializePortfolios(state) {
    state.portfolios = []
  },
  updateLastData(state, lastData) {
    state.lastData = lastData
  },
  initializeLastData(state) {
    state.lastData = null
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
          portfolioData.title = document.data().title
          portfolioData.url = document.data().url
          portfolioData.captureUrl = document.data().captureUrl
          portfolioData.docId = document.id
        })
      })
      .catch(error => {
        console.log(error)
      })
    commit('addPortfolio', portfolioData)
  },
  async fetchPortfolios({ commit, getters }, orderBase = 'createdAt', order = 'asc', limit = 7) {
    const portfolioData = []
    let lastData = getters.lastData
    await db
      .collection('portfolio')
      .orderBy(orderBase, order)
      .startAfter(lastData)
      .limit(limit)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documents => {
          const document = documents.data()
          const tempData = {}
          tempData.docId = documents.id
          tempData.title = document.title
          tempData.url = document.url
          tempData.captureUrl = document.captureUrl
          portfolioData.push(tempData)
        })
        lastData = querySnapshot.docs[querySnapshot.docs.length - 1].data()[orderBase]
        commit('updateLastData', lastData)
      })
      .catch(error => {
        console.log(error)
      })
    commit('addPortfolios', portfolioData)
  },
  initializePortfolios({ commit }) {
    commit('initializePortfolios')
  },
  async publishPortfolio({ commit }, { portfolioData }) {
    await db
      .collection('portfolio')
      .doc()
      .set({
        uid: portfolioData.uid,
        url: portfolioData.url,
        title: portfolioData.title,
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
        title: portfolioData.title,
        captureUrl: portfolioData.captureUrl,
        createdAt: new Date()
      })
      .catch(error => {
        console.log(error)
      })
    commit('addPortfolio', portfolioData)
  },
  initializeLastData({ commit }) {
    commit('initializeLastData')
  }
}

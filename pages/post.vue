<template>
  <section>
    <form class="form-area">
      <h2>あなたのポートフォリオを投稿しよう</h2>
      <h3>説明</h3>
      <input v-model="description" type="text" />
      <p>{{ descriptionCharaCount }} / 60</p>
      <h3>URL<span>*</span></h3>
      <input v-model="url" type="text" name="url" />
      <button type="button" :disabled="isOverCharaCountLimit || isEmptyForm" @click="postPortfolio">
        投稿
      </button>
      <input type="file" accept="image/*" @change="setSelectedFile" />
    </form>
    <router-link to="/" class="link">戻る</router-link>
    <button @click="logOut">ログアウト</button>
  </section>
</template>

<script>
import firebase from '~/plugins/firebase.js'

const uid = firebase.auth().currentUser.uid
let docId = ''
let selectedFileObject = ''

export default {
  data() {
    return {
      description: '',
      url: ''
    }
  },
  computed: {
    descriptionCharaCount: function() {
      return this.description.length
    },
    urlCharaCount: function() {
      return this.url.length
    },
    isOverCharaCountLimit: function() {
      return this.descriptionCharaCount >= 60 || this.urlCharaCount >= 2000
    },
    isEmptyForm: function() {
      return this.description.length === 0 || this.url.length === 0
    }
  },
  async created() {
    await this.$store.dispatch('portfolio/fetchPortfolio', uid)
    const portfolioData = this.$store.getters['portfolio/portfolio']
    this.description = portfolioData.description
    this.url = portfolioData.url
    docId = portfolioData.docId
  },
  methods: {
    async postPortfolio() {
      const captureUrl = await this.uploadCapture()
      const portfolioData = {}
      portfolioData.docId = docId
      portfolioData.uid = uid
      portfolioData.url = this.url
      portfolioData.description = this.description
      portfolioData.captureUrl = captureUrl
      if (docId) {
        await this.$store.dispatch('portfolio/updatePortfolio', { portfolioData })
      } else {
        await this.$store.dispatch('portfolio/publishPortfolio', { portfolioData })
      }
      this.$router.push('/')
    },
    async uploadCapture() {
      if (!selectedFileObject) return ''
      const storageRef = firebase
        .storage()
        .ref('image/portfolio/')
        .child(uid)
      await storageRef.put(selectedFileObject)
      const captureUrl = await storageRef.getDownloadURL()
      return captureUrl
    },
    setSelectedFile(e) {
      const selectedFile = e.target.files
      if (selectedFile.length) {
        selectedFileObject = new File(e.target.files, { type: 'image/jpeg' })
      } else {
        selectedFileObject = ''
      }
    },
    logOut() {
      firebase.auth().signOut()
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped></style>

<template>
  <main>
    <form class="form-area">
      <h2>あなたのポートフォリオを投稿しよう</h2>
      <h3>説明</h3>
      <input v-model="description" type="text" />
      <h3>URL<span>*</span></h3>
      <input v-model="url" type="text" name="url" />
      <button type="button" @click="postPortfolio">投稿</button>
      <input type="file" accept="image/*" @change="setFile" />
    </form>
    <router-link to="/" class="link">戻る</router-link>
    <button @click="logOut">ログアウト</button>
  </main>
</template>

<script>
import firebase from '~/plugins/firebase.js'

const uid = firebase.auth().currentUser.uid

let docId

let selectFileObjct

export default {
  data() {
    return {
      description: '',
      url: ''
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
      let captureUrl = ''
      if (selectFileObjct) {
        captureUrl = await this.uploadCapture()
      }
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
      const storage = firebase.storage()
      const storageRef = storage.ref('images/')
      const uploadRef = storageRef.child(uid)
      await uploadRef.put(selectFileObjct)
      const captureUrl = await uploadRef.getDownloadURL()
      return captureUrl
    },
    setFile(e) {
      const selectFile = e.target.files
      selectFileObjct = new File(selectFile, { type: 'image/jpeg' })
    },
    logOut() {
      firebase.auth().signOut()
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped></style>

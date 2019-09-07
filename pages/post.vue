<template>
  <main>
    <form class="form-area">
      <h2>あなたのポートフォリオを投稿しよう</h2>
      <h3>説明</h3>
      <input v-model="portfolioDescription" type="text" />
      <h3>URL<span>*</span></h3>
      <input v-model="portfolioURL" type="text" name="portfolioURL" />
      <button type="button" @click="postPortfolio">投稿</button>
      <input type="file" accept="image/*" @change="setFile" />
    </form>
    <router-link to="/" class="link">戻る</router-link>
  </main>
</template>

<script>
import firebase from '~/plugins/firebase.js'

const db = firebase.firestore()

const storage = firebase.storage()
const storageRef = storage.ref('images/')
let selectFileObjct
let fileName

export default {
  data() {
    return {
      portfolioDescription: '',
      portfolioURL: ''
    }
  },
  methods: {
    async postPortfolio() {
      const uploadRef = storageRef.child(fileName)
      const uploadRes = await uploadRef.put(selectFileObjct)
      console.log(uploadRes.state)
      const getUrlRes = await uploadRef.getDownloadURL()
      console.log(getUrlRes)
      const captureUrl = getUrlRes

      const dbUpdateRes = await db
        .collection('portfolio')
        .add({
          createdAt: new Date(),
          portfolioDescription: this.portfolioDescription,
          portfolioURL: this.portfolioURL,
          portfolioCapture: captureUrl
        })
        .catch(err => {
          console.error('Error: Add Document', err)
          throw err
        })
      console.log(dbUpdateRes)
      this.$router.push('/')
    },
    setFile(e) {
      const selectFile = e.target.files
      fileName = selectFile[0].name
      selectFileObjct = new File(selectFile, { type: 'image/jpeg' })
    }
  }
}
</script>

<style lang="scss" scoped></style>

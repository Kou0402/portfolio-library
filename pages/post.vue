<template>
  <main>
    <form class="form-area">
      <h2>あなたのポートフォリオを投稿しよう</h2>
      <h3>説明</h3>
      <input v-model="portfolioDescription" type="text" />
      <h3>URL<span>*</span></h3>
      <input v-model="portfolioURL" type="text" name="portfolioURL" />
      <button type="button" @click="postPortfolio">投稿</button>
    </form>
    <router-link to="/" class="link">戻る</router-link>
  </main>
</template>

<script>
import firebase from '~/plugins/firebase.js'

const db = firebase.firestore()

export default {
  data() {
    return {
      portfolioDescription: '',
      portfolioURL: ''
    }
  },
  methods: {
    postPortfolio() {
      db.collection('portfolio')
        .add({
          createdAt: new Date(),
          portfolioDescription: this.portfolioDescription,
          portfolioURL: this.portfolioURL
        })
        .then(res => {
          console.log('Add Document with ID:', res.id)
          this.$router.push('/')
        })
        .catch(err => {
          console.error('Error: Add Document', err)
          throw err
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>

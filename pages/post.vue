<template>
  <main>
    <section class="form-area">
      <h2>あなたのポートフォリオを投稿しよう</h2>
    </section>
  </main>
</template>

<script>
import firebase from '~/plugins/firebase.js'

const db = firebase.firestore()

// データの追加
const addItem = content => {
  return db
    .collection('test')
    .add({
      ...content,
      createdAt: new Date() // createAt フィールドがないとエラーが表示されるっぽい。
    })
    .then(res => {
      console.log('Add Document with ID:', res.id)
      return res.id
    })
    .catch(err => {
      console.error('Error: Add Document', err)
      throw err
    })
}

export default {
  mounted() {
    addItem()
  }
}
</script>

<style lang="scss" scoped></style>

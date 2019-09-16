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
    <!-- <p>{{ user.email }}でログイン中</p> -->
    <button @click="logOut">ログアウト</button>
  </main>
</template>

<script>
import firebase from '~/plugins/firebase.js'

const db = firebase.firestore()

const uid = firebase.auth().currentUser.uid

let docId

const storage = firebase.storage()
const storageRef = storage.ref('images/')
let selectFileObjct

export default {
  data() {
    return {
      portfolioDescription: '',
      portfolioURL: ''
    }
  },
  mounted() {
    const self = this
    console.log(uid)
    db.collection('portfolio')
      .where('uid', '==', uid)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          self.portfolioDescription = doc.data().portfolioDescription
          self.portfolioURL = doc.data().portfolioURL
          docId = doc.id
          console.log('id=' + docId)
        })
      })
  },
  methods: {
    async postPortfolio() {
      let captureUrl = ''
      if (selectFileObjct) {
        const uploadRef = storageRef.child(uid)
        const uploadRes = await uploadRef.put(selectFileObjct)
        console.log(uploadRes.state)
        const getUrlRes = await uploadRef.getDownloadURL()
        console.log(getUrlRes)
        captureUrl = getUrlRes
      }
      let dbUpdateRes
      if (docId) {
        dbUpdateRes = db.collection('portfolio').doc(docId)
      } else {
        dbUpdateRes = db.collection('portfolio').doc()
      }
      await dbUpdateRes
        .set({
          uid: uid,
          url: this.portfolioURL,
          description: this.portfolioDescription,
          captureUrl: captureUrl,
          createdAt: new Date()
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

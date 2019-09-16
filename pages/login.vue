<template>
  <section>
    <p>
      あなたの作ったポートフォリオを投稿して<br />
      みんなで投稿しよう
    </p>
    <p>
      投稿する方は下記からログイン
    </p>

    <section class="container">
      <div v-if="isWaiting">
        <p>読み込み中</p>
      </div>
      <div v-else>
        <div v-if="!isLogin">
          <button @click="googleLogin">Googleでログイン</button>
        </div>
        <div v-else>
          <p>{{ user.email }}でログイン中</p>
          <button @click="logOut">ログアウト</button>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import firebase from '@/plugins/firebase'

export default {
  data() {
    return {
      isWaiting: true,
      isLogin: false,
      user: []
    }
  },
  created: function() {
    firebase.auth().onAuthStateChanged(user => {
      this.isWaiting = false
      if (user) {
        this.isLogin = true
        this.user = user
        this.$router.push('/post')
      } else {
        this.isLogin = false
        this.user = []
      }
    })
  },
  methods: {
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },
    logOut() {
      firebase.auth().signOut()
    }
  }
}
</script>

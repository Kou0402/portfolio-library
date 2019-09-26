<template>
  <section v-if="isWaiting" class="waiting-message-area">
    <p class="waiting-message">ログイン中...</p>
  </section>
  <section v-else class="login-area">
    <div class="login-message-area">
      <h3 class="login-message">
        あなたの作ったポートフォリオを投稿して<br />
        みんなで共有しよう！
      </h3>
      <br />
      <p class="login-message">
        投稿する方は下記からログイン
      </p>
    </div>
    <div class="login-button-area">
      <button class="login-button" @click="googleLogin">Googleでログイン</button>
    </div>
  </section>
</template>

<script>
import firebase from '@/plugins/firebase'

export default {
  data() {
    return {
      isWaiting: true
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.isWaiting = false
        return user
      }
      this.$router.push('/post')
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

<style lang="scss" scoped>
.waiting-message-area {
  align-items: center;
  line-height: 12vh;
  text-align: center;
  .waiting-message {
    color: $main-color2;
    font-weight: 500;
    font-size: 2rem;
    letter-spacing: 0.2vw;
  }
}
.login-area {
  display: flex;
  justify-content: center;
  flex-flow: column;
  .login-message-area {
    line-height: 12vh;
    align-items: center;
    text-align: center;
    margin: 5vh 5vw;
    .login-message {
      color: $main-color2;
      font-weight: 500;
      font-size: 2rem;
      letter-spacing: 0.2vw;
      line-height: normal;
      display: inline-block;
    }
  }
  .login-button-area {
    text-align: center;
    .login-button {
      color: $base-color;
      background: $accent-color1;
      font-size: 1.3rem;
      display: inline-block;
      margin: 1vh 1vw;
      padding: 0.5em 1em;
      text-decoration: none;
      border-bottom: solid 4px $accent-color2;
      border-radius: 3px;
    }
    .login-button:active {
      transform: translateY(4px);
      box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2);
      border-bottom: none;
    }
    .login-button:focus {
      outline: none;
    }
  }
}

@media screen and (max-width: 896px) {
  .waiting-message-area {
    align-items: center;
    line-height: 12vh;
    text-align: center;
    .waiting-message {
      color: $main-color2;
      font-weight: 500;
      font-size: 2rem;
      letter-spacing: 0.2vw;
    }
  }
  .login-area {
    .login-message-area {
      .login-message {
        font-size: 1.7rem;
        letter-spacing: 0.1vw;
      }
    }
  }
}
</style>

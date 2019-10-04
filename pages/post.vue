<template>
  <section v-if="isPosting" class="posting-message-area">
    <p class="posting-message">投稿中...</p>
  </section>
  <section v-else class="post-area">
    <form class="form-area">
      <div class="url-form-area">
        <h3 class="form-title">サイトURL</h3>
        <input v-model="url" type="text" name="url" class="text-form" />
      </div>
      <div class="title-form-area">
        <h3 class="form-title">サイトタイトル</h3>
        <input v-model="title" type="text" class="text-form" />
        <p class="title-chara-count">{{ titleCharaCount }} / 32</p>
      </div>
      <div class="file-form-area">
        <h3 class="form-title">サイト画像</h3>
        <croppa
          v-model="selectedFile"
          :width="300"
          :height="200"
          placeholder="ファイルを選択"
          :placeholder-font-size="16"
          remove-button-color="#464159"
          :prevent-white-space="true"
          class="file-form"
        ></croppa>
        <p class="file-form-notes">
          ※参考：ページスクリーンショットChromeプラグイン<a
            href="https://chrome.google.com/webstore/detail/take-webpage-screenshots
            /mcbpblocgmgfnpjjppndjkmgjaogfceg?hl=ja"
            target="_blank"
            class="file-form-notes-link"
            >『FireShot』</a
          >
        </p>
      </div>
      <button
        type="button"
        :disabled="isOverCharaCountLimit || isEmptyForm"
        class="post-button"
        @click="postPortfolio"
      >
        投稿
      </button>
    </form>
    <button class="logout-button" @click="logout">ログアウト</button>
  </section>
</template>

<script>
import firebase from '~/plugins/firebase.js'
import Vue from 'vue'
import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'
Vue.use(Croppa)

let docId = ''

export default {
  data() {
    return {
      uid: '',
      title: '',
      url: '',
      captureUrl: '',
      selectedFile: {},
      isPosting: false
    }
  },
  computed: {
    titleCharaCount: function() {
      return this.title.length
    },
    urlCharaCount: function() {
      return this.url.length
    },
    isOverCharaCountLimit: function() {
      return this.titleCharaCount > 32 || this.urlCharaCount > 2000
    },
    isEmptyForm: function() {
      return this.title.length === 0 || this.url.length === 0
    }
  },
  async created() {
    this.checkLogin()

    await this.$store.dispatch('portfolio/fetchPortfolio', this.uid)
    const portfolioData = this.$store.getters['portfolio/portfolio']
    if (portfolioData.docId) {
      this.title = portfolioData.title
      this.url = portfolioData.url
      this.captureUrl = portfolioData.captureUrl
      docId = portfolioData.docId
    }
  },
  methods: {
    async postPortfolio() {
      this.isPosting = true
      const captureUrl = await this.uploadCapture()
      const portfolioData = {}
      portfolioData.docId = docId
      portfolioData.uid = this.uid
      portfolioData.url = this.url
      portfolioData.title = this.title
      portfolioData.captureUrl = captureUrl
      if (docId) {
        await this.$store.dispatch('portfolio/updatePortfolio', { portfolioData })
      } else {
        await this.$store.dispatch('portfolio/publishPortfolio', { portfolioData })
      }
      this.$router.push('/')
    },
    async uploadCapture() {
      if (!this.selectedFile.hasImage()) return this.captureUrl
      const selectedFileBlob = await this.selectedFile.promisedBlob('image/jpeg')
      const storageRef = firebase
        .storage()
        .ref('image/portfolio/')
        .child(this.uid)
      await storageRef.put(selectedFileBlob)
      const captureUrl = await storageRef.getDownloadURL()
      return captureUrl
    },
    checkLogin() {
      const currentUser = firebase.auth().currentUser
      if (currentUser) {
        this.uid = currentUser.uid
      } else {
        this.$router.push('/login')
      }
    },
    logout() {
      firebase.auth().signOut()
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.posting-message-area {
  align-items: center;
  line-height: 12vh;
  text-align: center;
  .posting-message {
    color: $main-color1;
    font-weight: 500;
    font-size: 2rem;
    letter-spacing: 0.2vw;
  }
}
.post-area {
  display: flex;
  flex-flow: column;
  .form-area {
    display: flex;
    flex-flow: column;
    .url-form-area,
    .title-form-area,
    .file-form-area,
    .post-button {
      color: $main-color1;
      margin: 1.7vh auto;
      width: 60%;
    }
    .title-chara-count {
      font-size: 1.3rem;
      margin-top: 10px;
    }
    .form-title {
      font-size: 2rem;
      font-weight: 500;
      margin-bottom: 1rem;
    }
    .text-form {
      color: $main-color2;
      height: 30px;
      width: 100%;
      font-size: 1.5rem;
    }
    .file-form {
      background-color: $accent-color2;
    }
    .file-form-notes {
      color: $main-color2;
      font-size: 1.3rem;
      margin-top: 5px;
      .file-form-notes-link {
        color: $accent-color1;
        text-decoration: none;
      }
    }
    .post-button {
      color: $base-color;
      background: $accent-color1;
      font-size: 1.3rem;
      width: 140px;
      display: inline-block;
      padding: 0.5em 1em;
      text-decoration: none;
      border-bottom: solid 4px $accent-color2;
      border-radius: 3px;
    }
    .post-button:active {
      transform: translateY(4px);
      box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2);
      border-bottom: none;
    }
    .post-button:focus {
      outline: none;
    }
    .post-button:disabled {
      color: rgba(0, 0, 0, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-bottom: solid 4px rgba(0, 0, 0, 0.1);
    }
  }
  .logout-button {
    color: $main-color2;
    border: solid 2px $accent-color1;
    border-radius: 3px;
    text-decoration: none;
    transition: 0.4s;
    padding: 0.3em 1em;
    margin: auto;
    display: inline-block;
  }
  .logout-button:hover {
    color: white;
    background: $accent-color1;
  }
}

@media screen and (max-width: 896px) {
  .post-area {
    .form-area {
      .url-form-area,
      .title-form-area,
      .file-form-area,
      .post-button {
        width: 300px;
      }
      .title-chara-count {
        font-size: 1.3rem;
        margin-top: 10px;
      }
      .form-title {
        font-size: 1.8rem;
      }
      .text-form {
        height: 20px;
        width: 100%;
        font-size: 1.3rem;
        border: 1px solid $main-color2;
      }
      .file-form-notes {
        display: none;
      }
      .post-button {
        width: 140px;
      }
    }
  }
}
</style>

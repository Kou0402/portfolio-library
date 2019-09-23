<template>
  <section class="post-area">
    <form class="form-area">
      <div class="url-form-area">
        <h3 class="form-title">サイトURL</h3>
        <input v-model="url" type="text" name="url" class="text-form" />
      </div>
      <div class="title-form-area">
        <h3 class="form-title">サイトタイトル</h3>
        <input v-model="title" type="text" class="text-form" />
        <p class="title-chara-count">{{ titleCharaCount }} / 42</p>
      </div>
      <div class="file-form-area">
        <h3 class="form-title">サイト画像</h3>
        <input type="file" accept="image/*" class="file-form" @change="setSelectedFile" />
        <p class="file-form-notes">
          ※参考：ページスクリーンショットChromeプラグイン<a
            href="https://chrome.google.com/webstore/detail/take-webpage-screenshots/
            mcbpblocgmgfnpjjppndjkmgjaogfceg?hl=ja"
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

const uid = firebase.auth().currentUser.uid
let docId = ''
let selectedFileObject = ''

export default {
  data() {
    return {
      title: '',
      url: ''
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
      return this.titleCharaCount >= 60 || this.urlCharaCount >= 2000
    },
    isEmptyForm: function() {
      return this.title.length === 0 || this.url.length === 0
    }
  },
  async created() {
    await this.$store.dispatch('portfolio/fetchPortfolio', uid)
    const portfolioData = this.$store.getters['portfolio/portfolio']
    this.title = portfolioData.title
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
    logout() {
      firebase.auth().signOut()
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.post-area {
  display: flex;
  flex-flow: column;
  .form-area {
    height: 48vh;
    display: flex;
    flex-flow: column;
    .url-form-area,
    .title-form-area,
    .file-form-area,
    .post-button {
      color: $main-color2;
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
      color: $accent-color2;
      height: 30px;
      width: 100%;
      font-size: 1.5rem;
    }
    .file-form {
      color: $accent-color2;
      font-size: 1.3rem;
    }
    .file-form-notes {
      color: $accent-color2;
      font-size: 1.3rem;
      margin-top: 5px;
      .file-form-notes-link {
        color: $main-color2;
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
  }
  .logout-button {
    margin: auto;
  }
}
</style>

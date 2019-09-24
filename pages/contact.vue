<template>
  <section class="contact-area">
    <h3 class="contact-message">ご連絡はこちらのアカウントよりお受け致します！</h3>
    <a href="https://twitter.com/ko_u_0402" class="twitter-icon">
      <img :src="twitterIconPath" />
    </a>
  </section>
</template>

<script>
export default {
  data() {
    return {
      twitterIconPath: require('~/assets/image/' + 'Twitter_Icon.svg')
    }
  }
}
</script>

<style lang="scss" scoped>
.contact-area {
  text-align: center;
  .contact-message {
    color: $main-color2;
    font-weight: 500;
    font-size: 2rem;
    letter-spacing: 0.2vw;
    margin: 5vh 5vw;
  }
  .twitter-icon img {
    width: 70px;
  }
}
</style>

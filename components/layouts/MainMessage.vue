<template>
  <section class="main-message">
    <h2 class="message">
      あなたのポートフォリオを共有しよう<br />ポートフォリオ共有サイト<br class="message-br" />
      『Portfolio Library』
    </h2>
  </section>
</template>

<style lang="scss" scoped>
.main-message {
  background-color: $base-color;
  height: 19vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .message {
    color: $main-color1;
    text-align: center;
    font-size: 2.2rem;
    letter-spacing: 0.5vw;
    line-height: 6.5vh;
    font-weight: 500;
    .message-br {
      display: none;
    }
  }
}

@media screen and (max-width: 896px) {
  .main-message {
    height: 13vh;
    .message {
      font-size: 1.5rem;
      line-height: 3.5vh;
      .message-br {
        display: initial;
      }
    }
  }
}
</style>

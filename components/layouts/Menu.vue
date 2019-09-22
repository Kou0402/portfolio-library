<template>
  <nav class="menu">
    <div class="link-button-wrapper">
      <nuxt-link class="link-button" to="/">
        Top
      </nuxt-link>
      <nuxt-link class="link-button" to="login">
        Post
      </nuxt-link>
      <nuxt-link class="link-button" to="contact">
        Contact
      </nuxt-link>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.menu {
  background-color: $main-color2;
  margin: 0 10vw;
  padding: 0 20vw;
  .link-button-wrapper {
    height: 9vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .link-button {
      color: $accent-color1;
      font-size: 2.2rem;
      width: 10rem;
      text-align: center;
      text-decoration: none;
      letter-spacing: 0.1vw;
      padding: 1.5rem;
      // box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
    }
    .link-button:hover {
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
    }
    .link-button:active {
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    }
  }
}
</style>

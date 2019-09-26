<template>
  <nav class="menu">
    <div class="link-button-wrapper">
      <nuxt-link to="/" class="link-button">
        Top
      </nuxt-link>
      <nuxt-link to="login" class="link-button">
        Post
      </nuxt-link>
      <nuxt-link to="contact" class="link-button">
        Contact
      </nuxt-link>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.menu {
  background-color: $main-color2;
  padding: 0 20vw;
  .link-button-wrapper {
    height: 8vh;
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
    }
    .link-button:hover {
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
    }
    .link-button:active {
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    }
  }
}

@media screen and (max-width: 896px) {
  .menu {
    padding: 0 5vw;
    .link-button-wrapper {
      .link-button {
        font-size: 1.6rem;
      }
    }
  }
}
</style>

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
  border-radius: 7px;
  .link-button-wrapper {
    height: 8vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .link-button {
      color: $base-color;
      font-size: 2.2rem;
      width: 10rem;
      text-align: center;
      text-decoration: none;
      letter-spacing: 0.1vw;
      padding: 1.5rem;
      position: relative;
      display: inline-block;
    }
    .link-button::after {
      position: absolute;
      bottom: -1px;
      left: 0;
      content: '';
      width: 100%;
      height: 2px;
      background: $base-color;
      transform: scale(0, 1);
      transform-origin: center top;
      transition: transform 0.3s;
    }
    .link-button:hover::after {
      transform: scale(1, 1);
    }
    .nuxt-link-exact-active::after {
      position: absolute;
      bottom: -1px;
      left: 0;
      content: '';
      width: 100%;
      height: 2px;
      background: $base-color;
      transform: scale(1, 1);
      transform-origin: center top;
      transition: transform 0.3s;
    }
  }
}

@media screen and (max-width: 896px) {
  .menu {
    padding: 0 5vw;
    border-radius: initial;
    .link-button-wrapper {
      height: 7vh;
      .link-button {
        font-size: 1.6rem;
      }
    }
  }
}
</style>

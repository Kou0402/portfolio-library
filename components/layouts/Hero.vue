<template>
  <section class="hero">
    <transition name="title-transition" appear>
      <h1 class="title">Portfolio Library</h1>
    </transition>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  background-color: $main-color1;
  height: 15vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .title {
    color: $base-color;
    font-size: 3.7rem;
    letter-spacing: 0.8vw;
  }
}

/* transition */
.title-transition-enter {
  opacity: 0;
}
.title-transition-enter-active {
  transition: opacity 2s;
}

@media screen and (max-width: 896px) {
  .hero {
    height: 18vh;
    .title {
      font-size: 2.8rem;
    }
  }
}
</style>

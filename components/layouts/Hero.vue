<template>
  <section class="hero">
    <h1 class="title">Portfolio Library</h1>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  background-color: $main-color1;
  height: 14vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .title {
    color: $accent-color1;
    font-size: 3.7rem;
    letter-spacing: 0.8vw;
  }
}

@media screen and (max-width: 896px) {
  .hero {
  }
}
</style>

<template>
  <section class="hero">
    <h1 class="title">Portfolio Library</h1>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  background-color: $main-color;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .title {
    color: white;
  }
}

@media screen and (max-width: 896px) {
  .hero {
    height: 10rem;
  }
}
</style>

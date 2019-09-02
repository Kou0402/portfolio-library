<template>
  <a :href="portfolioUrl" class="portfolio-card">
    <div class="portfolio-card-image"></div>
    <p class="portfolio-card-description"></p>
  </a>
</template>

<script>
export default {
  props: {
    portfolioUrl: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.portfolio-card {
  width: 18rem;
  height: 27rem;
  box-shadow: 3px 3px 10px 5px rgba(0, 0, 0, 0.1);
  margin: 3rem;
  padding: 0 1rem 0;
  text-decoration: none;
  .portfolio-card-image {
    width: 90%;
    height: 10rem;
    background-color: aquamarine;
    margin: 1rem auto;
  }
}

@media screen and (max-width: 896px) {
  .portfolio-card {
    width: 100%;
    height: 7rem;
    box-shadow: initial;
    margin: 0;
    border-bottom: solid 3px $main-color;
    padding: 0;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-between;
    .portfolio-card-image {
      width: 40%;
      height: 90%;
      margin: 0 0.3rem;
    }
    .portfolio-card-description {
      margin: 0.3rem;
    }
  }
}
</style>

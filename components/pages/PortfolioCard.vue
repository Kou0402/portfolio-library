<template>
  <a :href="url" class="portfolio-card">
    <img :src="captureUrl" class="portfolio-capture" />
    <p class="portfolio-title">{{ title }}</p>
  </a>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    captureUrl: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.portfolio-card {
  width: 340px;
  height: 240px;
  box-shadow: 3px 3px 10px 5px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  .portfolio-capture {
    width: 100%;
    height: 75%;
  }
  .portfolio-title {
    color: $accent-color1;
    font-size: 1.5rem;
    padding: 10px;
    line-height: 2rem;
  }
}
.portfolio-card:hover {
  box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.1);
}

@media screen and (max-width: 896px) {
}
</style>

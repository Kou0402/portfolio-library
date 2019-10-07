<template>
  <a :href="url" class="portfolio-card">
    <img v-if="captureUrl" :src="captureUrl" :alt="title" class="portfolio-capture" />
    <div v-else class="no-image">
      <h3 class="no-image-message">No image</h3>
    </div>
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
  width: 300px;
  height: 260px;
  box-shadow: 3px 3px 10px 5px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  .portfolio-capture {
    width: 300px;
    height: 200px;
  }
  .no-image {
    background-color: $accent-color2;
    width: 300px;
    height: 200px;
    .no-image-message {
      color: $base-color;
      text-align: center;
      line-height: 200px;
      font-size: 2rem;
      letter-spacing: 0.4vw;
    }
  }
  .portfolio-title {
    color: $main-color1;
    font-size: 1.5rem;
    padding: 10px;
    line-height: 2rem;
  }
}
.portfolio-card:hover {
  box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.1);
}

@media screen and (max-width: 896px) {
  .portfolio-card {
    width: 170px;
    height: 143px;
    box-shadow: 2px 2px 7px 3px rgba(0, 0, 0, 0.2);
    .portfolio-capture {
      width: 170px;
      height: 113px;
    }
    .no-image {
      width: 170px;
      height: 113px;
      .no-image-message {
        line-height: 113px;
      }
    }
    .portfolio-title {
      font-size: 1rem;
      padding: 4px;
      line-height: 1rem;
    }
  }
}
</style>

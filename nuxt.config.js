export default {
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: {
    title: 'PortfolioLibrary',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'PortfolioLibrary(ポートフォリオライブラリ)はエンジニア・デザイナーのための' +
          'ポートフォリオ共有サイトです。あなたの作成したポートフォリオを公開したり、' +
          '他の人が公開しているポートフォリオを見ることができます。'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['@/assets/style/reset.css', '@/assets/style/style.scss'],

  /*
   ** Style Resources
   */
  styleResources: {
    scss: ['@/assets/style/style.scss']
  },

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/firebase'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  router: {
    middleware: ['auth']
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    quiet: false,
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

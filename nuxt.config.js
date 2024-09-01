export default {

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'anysoft',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    './assets/scss/main.scss',
    'leaflet/dist/leaflet.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '~/plugins/axios',
    '~/plugins/moment.js',
    { src: '~/plugins/vue-apexcharts.js', mode: 'client' }
  ],

  axios: {
    // Axios konfiguratsiyalari
    baseURL: process.env.NUXT_APP_BASE_URL
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],

  env: {
    NUXT_APP_BASE_URL: process.env.NUXT_APP_BASE_URL || 'default_base_url',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/,/axios/],
  },

  server: {
    port: 3000,
    host: "0.0.0.0"
  },

}

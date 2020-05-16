const bodyParser = require('body-parser');
const axios = require('axios');

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Cool blog' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fa923f', height: '4px', duration: 5000 },
  loadingIndicator: {
    name: 'circle',
    color: '#fa923f'
  },
  /*
  ** Global CSS
  */
  css: [
    '~assets/styles/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/core-components.js',
    '~plugins/date-filter.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/firebase'
  ],
  axios: {
    baseURL: process.env.BASE_URL || 'https://nuxt-firebase-226d5.firebaseio.com',
    credentials: false
  },
  firebase: {
    config: {
      apiKey: "AIzaSyAQjUIrfxJh0sESizjpcJ4kZ1cGI31ZQko",
      authDomain: "nuxt-firebase-226d5.firebaseapp.com",
      databaseURL: "https://nuxt-firebase-226d5.firebaseio.com",
      projectId: "nuxt-firebase-226d5",
      storageBucket: "nuxt-firebase-226d5.appspot.com",
      messagingSenderId: "723156868689",
      appId: "1:723156868689:web:8ca3db111cb369e5bf6270",
      measurementId: "G-V13P5DWGFL"
    },
    services: {
      auth: {
        initialize: {
          ssr: true
        },
        ssr: {
          serverLogin: true
        }
      },
      firestore: true
    }
  },
  pwa: {

  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  env: {
    BASE_URL: process.env.BASE_URL || 'https://nuxt-firebase-226d5.firebaseio.com',
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY || 'AIzaSyAQjUIrfxJh0sESizjpcJ4kZ1cGI31ZQko'
  },
  pageTransition: {
    name: 'fade',
    mode: 'out-in'
  },
  serverMiddleware: [
    bodyParser.json(),
    '~/api'
  ],
  generate: {
    routes: function () {
      return axios.get('https://nuxt-firebase-226d5.firebaseio.com/posts.json')
        .then((res) => {
          const routes = [];
          for (const key in res.data) {
            routes.push({
              route: '/posts/' + key,
              payload: { postData: res.data[key] }
            });
          }
          return routes
        })
    }
  }
}

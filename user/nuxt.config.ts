// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: 'dt-dev-blog',
      htmlAttrs: { lang: 'vi' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'robots', content: 'noindex, nofollow' },
        { name: 'description', content: 'Thao Blog' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;900&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
          // integrity: 'sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5KwNYe/FzcwFLX/AnuYHv2K6gCyY/4WVE/i2M6PZgByJ7/kKx+yA==', // Recommended for CDN for security
          // crossorigin: 'anonymous', // Recommended for CDN for security
          // referrerpolicy: 'no-referrer' // Recommended for CDN for security
        },
      ],
    },
  },

  // Add more config vite here
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/abstracts/_index.scss";',
        },
      },
    },
    resolve: {
      alias: {
        'ant-design-vue/es': 'ant-design-vue/es',
        'ant-design-vue': 'ant-design-vue/es',
      },
    },
  },

  css: ['~/assets/scss/main.scss'],

  runtimeConfig: {
    // Keys within public, will be also exposed to the client-side
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
      API_SAKE_BA: process.env.API_SAKE_BA,
      FE_ENVIRONMENT: process.env.FE_ENVIRONMENT,
      FE_BATCH_ENVIRONMENT: process.env.FE_BATCH_ENVIRONMENT,
    },
  },

  // Add more import config here
  imports: {
    dirs: ['stores'],
  },

  // Add more modules here
  modules: [
    '@nuxtjs/eslint-module', // https://nuxt.com/modules/eslint
    '@pinia/nuxt', // https://nuxt.com/modules/pinia
    '@vueuse/nuxt', // https://vueuse.org/guide/index.html#nuxt
    '@ant-design-vue/nuxt', // https://nuxt.com/modules/ant-design-vue
    'nuxt-svgo', // https://nuxt.com/modules/nuxt-svgo
    '@kgierke/nuxt-basic-auth', // https://nuxt.com/modules/nuxt-basic-auth,
    '@nuxt/image',
  ],

  antd: {
    extractStyle: true,
  },

  // @nuxt/image options
  image: {
    format: ['webp'],
    domains: [process.env.WINE_IMAGE_HOST, process.env.SAKE_IMAGE_HOST],
    // The screen sizes predefined by `@nuxt/image`:
    screens: {
      xs: 414, // redefined from 320 to 414
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536,
    },
  },

  devtools: { enabled: true },
})

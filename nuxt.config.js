/*
 * @Author: YiKang
 * @Date: 2020-12-17 15:10:36
 * @LastEditTime: 2021-03-04 10:02:16
 * @LastEditors: FeikeQ
 * @FilePath: /nami-pc/nuxt.config.js
 * @Description: 
 */
export default {
    env: {
        BASE_URL: process.env.BASE_URL || 'http://192.168.1.17:8080',
        BASE_URL: process.env.BASE_URL || 'https://ti-api.inkr.xyz',
        NODE_ENV: process.env.NODE_ENV
      },
  server: {
    port: 4000, // default: 3000
    host: "0.0.0.0"
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "纳米电竞",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      // { rel: "stylesheet", href: "/css/common.css" }
    ],
    script: [

    ]
  },
//   router: {
//     scrollBehavior(to, from, savedPosition) {
//       return { x: 0, y: 0 };
//     }
//   },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["element-ui/lib/theme-chalk/index.css","swiper/swiper.min.css",'video.js/dist/video-js.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)

  plugins: [
    // ssr: Boolean (默认为 true) 如果值为 false，该文件只会在客户端被打包引入
    { src: "@/plugins/echarts-ui.js", ssr: true },
    { src: "@/plugins/element-ui.js", ssr: true },
    { src: "@/plugins/components-register", ssr: true },
    { src: "@/plugins/video-player", ssr: false },
    { src: "@/plugins/vue-swiper.js", ssr: true },
    { src: '@/plugins/cnzz.js', ssr: false }, // 统计 byFeikeQ
  ],
  loading: {
    color: "#1c71da",
  },

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ["@nuxtjs/axios", "@nuxtjs/proxy"],
  axios: {
    proxyHeaders: true
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    publicPath:(process.env.NODE_ENV==='production') ? 'https://pc-static.t1play.com/' : "/_nuxt/", // Nuxt.js 允许您将dist文件上传到 CDN 来获得最快渲染性能，只需将publicPath设置为 CDN 即可。
    vendor: ["element-ui"] // 添加模块，配置只打包一次，减少应用bundle的体积
  },
  //本地开发环境代理
  proxy: {
    '/api': {
      target: 'https://ti-api.inkr.xyz', // 目标接口域名
      changeOrigin: true, // 表示是否跨域
      pathRewrite: {
        '^/api': '', // 把 /api 替换成‘’
      }
    }
  }
};

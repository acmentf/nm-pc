import Vue from 'vue'

const VueVideoPlay = require('vue-video-player/dist/ssr')
const hls = require('videojs-contrib-hls')
Vue.use(hls)
Vue.use(VueVideoPlay)

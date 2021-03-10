<!--
 * @Author: FeikeQ
 * @Date: 2021-02-24 10:09:17
 * @LastEditTime: 2021-02-27 17:08:30
 * @LastEditors: FeikeQ
 * @FilePath: /nami-pc/components/common/animateLive/index.vue
 * @Description: 
-->
<template>
  <iframe :src="src" width="796" frameborder="0" scrolling="no"></iframe>
</template>

<script>
export default {
  name: "TiIframe",
  props: {
     src: {
      type: String,
      default:
        ""
    },
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less">
iframe {
  min-height: 488px;
  margin-top: -40px;
}
</style>

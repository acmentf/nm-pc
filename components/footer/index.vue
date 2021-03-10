<!--
 * @Author: YangYiKang
 * @Date: 2020-12-07 10:47:09
 * @LastEditors: FeikeQ
 * @LastEditTime: 2021-02-06 15:36:32
 * @FilePath: /ti-pc/components/footer/index.vue
 * @Description: 
-->
<!--  -->
<template>
  <div class="footer-box">
    <nav>
      <a href="/about?nav=map">联系我们</a>
      <!-- <nuxt-link to="/about?nav=map">意见反馈</nuxt-link> -->
      <a href="/about?nav=info">公司简介</a>
      <a href="/about?nav=privacy">隐私条款</a>
      <a href="/about?nav=service">服务条款</a>
    </nav>
    <p class="p1">钛电竞数据版权所有 Copyright © 2002-2020</p>
    <p>经营许可证：粤B1 B2-20060626 粤ICP备09088851号</p>
  </div>
</template>

<script>
export default {
  name: "footer-box",
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {
    $route: {
      handler(to, from) {
        if (from.path === "/user") {
          this.$store.dispatch("common/dispatchBreadcrumbState", false);
        } else {
          this.$store.dispatch("common/dispatchBreadcrumbState", true);
        }
      },
      // 深度观察监听
      deep: true
    }
  },
  mounted() {
  
   let {type} = this.$route.query
   console.log('type',type)
   let breadcrumbState = type !=='1' ? true : false;
   console.log('breadcrumbState',breadcrumbState)
   this.$store.dispatch("common/dispatchBreadcrumbState", breadcrumbState);
  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
.footer-box {
  width: 1200px;
  margin: auto;
  text-align: center;
  padding: 14px;
  nav a {
    height: 24px;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    color: #bbb;
    margin: 0 30px;
    &:hover {
      color: #fff;
    }
  }
  p {
    font-size: 12px;
    line-height: 20px;
    color: #777;
  }
  .p1 {
    margin: 8px 0 0 0;
  }
}
</style>
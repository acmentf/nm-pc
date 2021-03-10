<!--
  功能：面包屑item
  作者：acmentf
  邮箱：985881328@qq.com
  时间：2020年12月15日 11:54:34
-->
<template>
  <div class="breadcrunb-item flex">
    <i class="el-icon-arrow-right"></i>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BreadcrunbItem",
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang='less' scoped>
  .breadcrunb-item{
    .el-icon-arrow-right{
      margin: 0 12px;
    }
  }
</style>
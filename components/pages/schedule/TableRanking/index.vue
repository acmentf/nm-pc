<!--
  功能：功能描述
  作者：acmentf
  邮箱：985881328@qq.com
  时间：2021年01月30日 13:41:53
-->
<template>
  <div class="wrapper flex">
    <span class="table-ranking text" v-if="ranking>=4">{{ranking}}</span>
    <span class="table-ranking" v-else :class="'ranking-'+ranking"></span>
  </div>
</template>

<script>
export default {
  props: {
    ranking: {
      type: Number,
      default: 1
    }
  },
  name: "table-ranking",
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
.table-ranking {
  width: 24px;
  height: 24px;

  text-align: center;
  line-height: 24px;
  &.text {
    width: 30px;
  }
  &.ranking-1 {
    background: url("/images/1.png") no-repeat 0 0;
    background-size: 100% 100%;
  }
  &.ranking-2 {
    background: url("/images/2.png") no-repeat 0 0;
    background-size: 100% 100%;
  }
  &.ranking-3 {
    background: url("/images/3.png") no-repeat 0 0;
    background-size: 100% 100%;
  }
}
</style>
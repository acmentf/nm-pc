<!--
  功能：默认占位图
  作者：acmentf
  邮箱：985881328@qq.com
  时间：2020年12月11日 11:12:57
-->
<template>
  <div class="default-image">
    <img :src="defaultImg" alt :width="size" />
  </div>
</template>

<script>
const DEFAULT_TEAM = require("./images/default-team.png");
const DEFAULT_SCHEDULE = require("./images/default-schedule.png");
export default {
  props: {
    //1 战队图标
    type: {
      type: String | Number,
      default: "1"
    },
    size: {
      type: Number,
      default: 24
    }
  },
  name: "DefaultImage",
  components: {},
  data() {
    return {
      defaultImg: ""
    };
  },
  computed: {},
  watch: {},
  methods: {
    switchImage() {
      switch (this.type) {
        case "1":
          this.defaultImg = DEFAULT_TEAM;
          break;
        case "2":
          this.defaultImg = DEFAULT_SCHEDULE;
          break;
      }
    }
  },
  created() {},
  mounted() {
    this.switchImage();
  }
};
</script>
<style lang='scss' scoped>
</style>
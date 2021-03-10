<!--  -->
<template>
  <div class="default-box">
    <img :width="wdith" :height="height" :src="src" />
    <p class="title-box">
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: "empty-img",
  components: {},
  props: {
    wdith: {
      type: String,
      default: ""
    },
    height: {
      type: String,
      default: ""
    },
    src: {
      type: String,
      default: ""
    }
  },
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
.default-box {
  text-align: center;
  .title-box {
    margin-top: 10px;
    font-size: 14px;
    font-weight: 400;
    line-height: 19px;
    color: #a1a1a1;
  }
}
</style>
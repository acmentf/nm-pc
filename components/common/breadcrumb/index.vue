<!--
 * @Author: acmentf
 * @Date: 2020-12-11 16:41:30
 * @mail: 985881328@qq.com
 * @LastEditTime: 2021-02-25 11:05:37
 * @LastEditors: FeikeQ
 * @FilePath: /nami-pc/components/common/breadcrumb/index.vue
 * @Description: 面包屑
-->
<template>
  <div class="breadcrumb">
    <i class="back-icon"></i>
    <div class="back cursor-pointer" slot="reference" @click="handleClick()">
      <popover-content class="content" v-show="$store.state.common.isBreadcrumbShow"/>
      返回上一级
    </div>
    <slot></slot>
  </div>
</template>
<script>
import PopoverContent from "../popoverContent";
export default {
  porps: {
    routeList: {
      type: Array,
      default: []
    }
  },
  name: "Breadcrumb",
  components: { PopoverContent },
  data() {
    return {
      isShow: true
    };
  },
  computed: {},
  watch: {
    
  },
  methods: {
    handleClick() {
      this.$router.go(-1);
    }
  },
  created() {
   
  },
  mounted() {}
};
</script>
<style lang='less' scoped>
.breadcrumb {
  display: flex;
  font-size: 14px;
  align-items: center;
  color: #666;
  position: relative;
  height: 40px;
  .back-icon {
    width: 18px;
    height: 18px;
    background: url("./back-icon.png") 0 0 no-repeat;
    background-size: 100% 100%;
  }
  .content {
    display: none;
    position: absolute;
    top: 40px;
    left: 0;
    z-index: 100;
  }
  .back {
    color: #6521D7;
    height: 40px;
    padding-left: 4px;
    line-height: 40px;
  }
  .cursor-pointer:hover {
    .content {
      display: inline-block;
    }
  }
}
</style>
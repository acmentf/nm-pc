<!--
 * @Author: acmentf
 * @Date: 2021-01-30 14:51:03
 * @LastEditTime: 2021-03-02 15:59:17
 * @LastEditors: FeikeQ
 * @FilePath: /nami-pc/components/pages/schedule/TableSelect/index.vue
 * @Description: 功能：功能描述
-->

<template>
  <el-select
    class="table-select"
    popper-class="table-select"
    v-model="select_value"
    size="mini"
    @change="change"
    placeholder
  >
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script>
export default {
  name: "tableSelect",
  version: "1.0",
  props: {
    value: {
      default: ""
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    change() {
      this.$emit("input", this.select_value);
      this.$emit("change", this.select_value);
    }
  },
  watch: {
    value(value) {
      this.select_value = value;
    }
  },
  data() {
    return {
      select_value: ""
    };
  },
  created(){
    this.select_value = this.value;
  }
};
</script>


<style lang='less' >
.table-select {
  &.el-select {
    .el-input__inner {
      background-color: transparent;
      border-radius: 20px;
      border: 1px solid #666;
      box-sizing: border-box;
      color: #666;
      height: 24px;
      line-height: 24px;
      padding-right: 0;
    }
  }
  .el-select-dropdown {
    border: 1px solid #5D2BCF;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .el-select-dropdown__item {
      color: #fff;
    }
    .el-select-dropdown__item.hover,
    .el-select-dropdown__item:hover {
      background-color: rgba(28, 113, 218, 0.2);
      color: #fff;
    }
    .el-select-group__wrap:not(:last-of-type)::after {
      background: #666;
    }
  }
  .el-select-dropdown__item {
    height: 20px;
    padding: 0;
    text-align: center;
    font-size:12px;
    line-height: 20px;
  }
  .el-select-dropdown__list{
    padding:0;
  }
}
</style>
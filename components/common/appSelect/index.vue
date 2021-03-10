<!--
 * @Author: FeikeQ
 * @Date: 2020-12-07 16:04:38
 * @LastEditTime: 2021-02-24 18:22:02
 * @LastEditors: FeikeQ
 * @Description: 下拉选择框
 * @FilePath: /nami-pc/components/common/appSelect/index.vue
 * 使用方法：
 * <app-select v-model="regionFilter.value" :options="[{value:'all',label:'所有地区'}]" style="width:122px" />
-->

<template>
  <el-select
    class="app-select"
    popper-class="app-select"
    v-bind:[$options.name]="$options.version"
    v-model="opt_val"
    size="mini"
    :placeholder="placeholder"
    @change="fnSelectChange"
  >
    <template v-for="item in options">
      <el-option-group v-if="item.options" :key="item.label" :label="item.label">
        <el-option
          v-for="group in item.options"
          :key="group.value"
          :label="group.label"
          :value="group.value"
        ></el-option>
      </el-option-group>
      <el-option v-if="!item.options" :key="item.value" :label="item.label" :value="item.value" />
    </template>
  </el-select>
</template>

<script>
export default {
  name: "appSelect",
  version: "1.0",
  props: {
    value: {
      type: [String, Number]
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    options: {
      type: Array,
      default: () => [
        {
          label: "分组",
          options: [
            {
              value: "all",
              label: "所有地区"
            },
            {
              value: "china",
              label: "中国"
            }
          ]
        },
        {
          label: "其它组",
          options: [
            {
              value: "Chengdu",
              label: "北美"
            }
          ]
        }
      ],
      default_normal: () => [
        {
          value: "all",
          label: "所有地区"
        },
        {
          value: "china",
          label: "中国"
        }
      ]
    }
  },
  methods: {
    fnSelectChange() {
      // console.log("opt_val",this.opt_val);
      this.$emit("input", this.opt_val);
      if (this.$listeners.change) this.$listeners.change(this.opt_val);
    }
  },
  data() {
    return {
      opt_val: this.value
    };
  },
  watch: {
    value(newVal, oldVal) {
      this.opt_val = newVal;
    }
  }
};
</script>


<style lang='less' >
.app-select.el-select {
  .el-input__inner {
    background-color: transparent;
    border-radius: 20px;
    border: 1px solid #666;
    box-sizing: border-box;
    color: #666;
    ___height: 28px;
    ___line-height: 28px;
  }
  .el-input__inner:focus {
      border-color:#5D2BCF;
  }
}

.el-select-dropdown {
  border: 1px solid #5D2BCF;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  .el-select-dropdown__item {
    color: #333;
  }

  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background-color: rgba(93, 43, 207, 0.2);
    color: #333;
  }
  .el-select-group__wrap:not(:last-of-type)::after {
    background:rgba(144,147,153,0.3);
  }
}
</style>
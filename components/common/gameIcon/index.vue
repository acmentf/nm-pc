<!--
  功能：游戏图标组件
  作者：acmentf
  邮箱：985881328@qq.com
  时间：2020年12月11日 14:39:46
-->
<template>
  <img :src="require('./images/'+type+'.png')" alt="" :width="size">
</template>

<script>
export default {
  props:{
    /**
     * 1：一血  2：一塔 3：先五杀 4:先十杀 5：兵营 6：推塔数 7 经济领先
     * 8： 小龙 9：水龙 10：土龙 11：风龙 12：火龙 13：峡谷先锋 14：纳什男爵 15：远古巨龙  
     * 16：手枪 17：解除 18：引爆 19：击杀 20：加时 21：先五杀 22：先十杀 23：肉山
     */
    type:{
      type:String,
      default:'1'
    },
    size:{
      type:Number,
      default:20
    }
  },
  name: "GameIcon",
  components: {},
  data() {
    return {
      icon:''
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang='scss' scoped>
</style>
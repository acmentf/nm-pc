<!--
  功能：对战图连线
  作者：acmentf
  邮箱：985881328@qq.com
  时间：2020年12月14日 18:44:39
-->
<template>
<div class='line'>
  <div></div>
</div>
</template>

<script>

export default {
props:{
  type:Number,
  default:1
},
name:'',
components: {},
data() {
return {

};
},
computed: {},
watch: {},
methods: {

},
created() {

},
mounted() {

},
}
</script>
<style lang='less' scoped>
  .line{
    width: 66px;
    border:1px solid #1C71DA;
    border-left:none;
    position: relative;
    height:136px;
    &>div{
      height:1px;
      width:66px;
      background:#1C71DA ;
      position: absolute;
      right: -66px;
      top:50%;
    }
  }
</style>
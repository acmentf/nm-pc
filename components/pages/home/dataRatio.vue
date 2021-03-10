<!-- 
用法：传入一个对象即可
 -->
<template>
    <div class="percentage-box">
        <h4 class="percentage-title">{{dataObject.title}}</h4>
        <div class="percentage">
            <div class="percentage-left" :style="{width:dataObject.leftWidth+'%'}">{{dataObject.percentageLeft+"%"}}</div>
            <div class="percentage-right">{{dataObject.percentageRight+'%'}}</div>
        </div>
    </div>
</template>

<script>
export default {
   name:'dataRatio',
   components: {},
   props:{
    dataObject:{
        default: () => {
            return {
                title:'',
                percentage:0,//总的百分比
                percentageLeft:0,//左边百分比
                percentageRight:0,//右边百分比
            }
        },
        type: Object
    }
   },
   data() {
       return {
       };
   },
   computed: {},
   watch: {
      dataObject:{
        immediate: true ,
        handler (val) {
            val.leftWidth=(val.percentageLeft/val.percentage)*100
        }
      }
   },
   methods: {

   },
   created() {

   },
   mounted() {
   },
   beforeCreate() {}, 
   beforeMount() {}, 
   beforeUpdate() {},
   updated() {}, 
   beforeDestroy() {}, 
   destroyed() {}, 
   activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
.percentage-box{
    width:100%;
    height: 40px;  
    .percentage-title{
        height: 16px;
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;
        color: #DDDDDD;
        margin-bottom: 4px;
        text-align: center;
    }
    .percentage{
        display: flex;
        width:100%;
        background: #060f2a;
        height: 16px;
        border-radius: 8px 8px 8px 8px;
        .percentage-left{
            height: 16px;
            background: linear-gradient(270deg, #6A20FF 0%, #5370FE 100%);
            border-radius: 8px 0px 0px 8px;
            font-size: 12px;
            font-weight: bold;
            line-height: 16px;
            color: #FFFFFF;
            text-align: left;
            padding-left:8px;
        }
        .percentage-right{
            height: 16px;
            background: linear-gradient(93deg, #EB47B1 0%, #DD6EFE 100%);
            border-radius: 0px 8px 8px 0px;
            font-size: 12px;
            font-weight: bold;
            line-height: 16px;
            color: #FFFFFF;
            text-align: right;
            padding-right:8px;
            flex: 1;
        }
    }
}
</style>
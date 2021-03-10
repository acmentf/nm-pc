<!--  -->
<template>
   <div class='default-box'>
       <img :width="wdith" :height="height" :src="src">
       <p class="title-box">
         <slot></slot>
       </p>
   </div>
</template>

<script>

export default {
   name:'default-box',
   components: {},
   props:{
        wdith:{
            type:String,
            default:""
        },
        height:{
            type:String,
            default:""
        },
        src:{
            type:String,
            default:""
        },
    },
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
.default-box{
    text-align: center;
    .title-box{
        margin-top:10px;
        font-size: 14px;
        font-weight: 400;
        line-height: 19px;
        color: #A1A1A1;
    }
}
</style>
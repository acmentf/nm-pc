<!-- 二维码下载模块 -->
<template>
   <div class='download-box'>
        <div class='download-child'>
            <div>
                <p>纳米电竞APP下载</p>
                <img width="130px" height="163px" class="phone_img" src="/images/phone_img.png" alt="手机框">
                <img width="86px" height="86px" class="qrcode_img" src="/images/qrcode_img.png" alt="APP下载">  
            </div>
            <p class="downloadIos" style="display: none;">
                <img width="14px" height="14px" src="/images/ios.png" alt="苹果">
                <span>苹果下载</span>
            </p>
            <p class="downloadAndroid" style="display: none;">
                <img class="Android1" width="14px" height="14px" src="/images/Android1.png" alt="安卓">
                <img class="Android" width="14px" height="14px" src="/images/Android.png" alt="安卓">
                <span>安卓下载</span>
            </p>
        </div>
   </div>
</template>

<script>

export default {
   name:'download-box',
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
.download-box{
    width: 190px;
    // height: 310px;
    // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.6);
    .download-child{
        padding: 23px 15px 14px 15px;
        width:100%;
        height:100%;
        text-align: center;
        margin:0 auto;
        // position:absolute;
        position: relative;
        z-index:2;
        div{
            height:190px;
            width: 100%;
            text-align: center;
            .phone_img{
                position:absolute;
                top:49px;
                left:30px;
            }
            .qrcode_img{
                position:absolute;
                top:86px;
                left:52px;
            }
            p{
                font-size: 12px;
                font-weight: bold;
                color: #666;
                text-align:center;
                margin-bottom:9px;
            }
        }
        .downloadIos{
            width: 140px;
            height: 30px;
            border-radius: 4px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            vertical-align: middle;
            background: #848996;
            margin:16px 0 12px 0;
            span{
                margin-left:6px;
                color: #0D1B40;
                display:inline-block;
                width: 56px;
                height: 19px;
                font-size: 14px;
                font-weight: 400;
                line-height: 19px;
            }
        }
        .downloadIos:hover{
            background: #fff;
            cursor: pointer;
        }
        .downloadAndroid{
            width: 140px;
            height: 30px;
            border-radius: 4px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            vertical-align: middle;
            background: #18621D;
            span{
                margin-left:6px;
                color: #848996;
                display:inline-block;
                width: 56px;
                height: 19px;
                font-size: 14px;
                font-weight: 400;
                line-height: 19px;
            }
            .Android{
                display: none;
            }
        }
        .downloadAndroid:hover{
            background: #28B10E;
            cursor: pointer;
            span{
                color: #fff;
            }
            .Android{
                display: inline-block;
            }
            .Android1{
                display: none;
            }
        }
    }
}
</style>
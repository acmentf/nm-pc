<!--
 * @Author: FeikeQ
 * @Date: 2020-12-16 15:22:43
 * @LastEditTime: 2021-03-02 14:55:51
 * @LastEditors: FeikeQ
 * @FilePath: /nami-pc/pages/about/index.vue
 * @Description: 
-->
<template>
    <div class="about-box">
        <app-carousel></app-carousel>
        <div style="height:40px"></div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="联系我们" name="map">
                <span slot="label">
                    <nuxt-link to="?nav=map"><span class="about"></span> 联系我们</nuxt-link>
                </span>
                <div>
                    <div class="content" style="display: flex;align-items:center;" v-if="$store.state.home.publicData.aboutData">
                        <div style="width:200px;">
                            <img src="/images/logo_g.png" width="100%">
                        </div>
                        <div class="infolist" style="font-size: 18px;">
                            <span><img src="/images/map_about.png" width="24" style="margin-top: -5px;" /> {{ $store.state.home.publicData.aboutData.name }}</span>
                            <span><img src="/images/mail.png" width="24" style="margin-top: -5px;" /> {{ $store.state.home.publicData.aboutData.email }}</span>
                            <span><img src="/images/local.png" width="24" style="margin-top: -5px;" /> {{ $store.state.home.publicData.aboutData.address }}</span>
                        </div>
                        <div style="width:320px;">
                          <img :src="$store.state.home.publicData.aboutData.company_map" onerror="this.src='/images/map_pic.png';this.onerror=null"  width="100%">
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="公司简介" name="info">
                <span slot="label"><nuxt-link to="?nav=info"><span class="info"></span> 公司简介</nuxt-link></span>
                <div>
                    <div class="content" v-if="$store.state.home.publicData.aboutData">
                        <div class="pre" v-html="$store.state.home.publicData.aboutData.commtype_profile">{{ $store.state.home.publicData.aboutData }}</div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="隐私条款" name="privacy">
                <span slot="label"><nuxt-link to="?nav=privacy"><span class="privacy"></span> 隐私条款</nuxt-link></span>
                <div>
                    <div class="content">
                        <div class="pre" v-html="$store.state.home.publicData.privacyPolicyData">{{ $store.state.home.publicData.privacyPolicyData }}</div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="服务条款" name="service">
                <span slot="label"><nuxt-link to="?nav=service"><span class="service"></span> 服务条款</nuxt-link></span>
                <div>
                    <div class="content">
                        <div class="pre" v-html="$store.state.home.publicData.termsOfServiceData">{{ $store.state.home.publicData.termsOfServiceData }}</div>
                    </div>
                </div>
               
            </el-tab-pane>
        </el-tabs>
        <div style="height:20px;"></div>
    </div>
</template>

<script>
 
import * as api from "@/api/home";
export default {
    layout: "home",
    name: "about-box",
    async asyncData({ app, params, query, env, $config }) {
        console.log('asyncData',query);
        // if (!process.server) return;
        return {
            activeName: query.nav || "map",
        }
    },
    methods: {
      handleClick(){
            console.log(this);
        },
       getPublicInfo() {
            var infoMap = [
                "bottomBarURL", //0 公共底部栏url
                "inviteFriendsURL", //1 邀请好友图url
                "termsOfServiceURL", //2 服务条款url
                "aboutData", //3 关于我们 data
                "privacyPolicyURL", //4 隐私政策url
                "termsOfServiceData", //5 服务条款 data
                "privacyPolicyData", //6 隐私政策 data
                "codeUrl", //7 二维码内置链接
                "privacyAgreementCut" //8隐私协议精简版
            ];

            // 获取公共信息
            api.getPublicData(
                {
                    type: "1,2,3,4,5,6,7,8"
                },
                data => {
                    // console.log("获取公共信息:", data);
                    var _data = {};

                    if (data) {
                        for (const key in data) {
                            if (Object.hasOwnProperty.call(data, key)) {
                                _data[infoMap[key]] = data[key];
                            }
                        }
                    }
                    // 保存到 store
                    this.$store.commit("home/publicData", _data);
                }
            ).catch(err => {
                console.log(err);
                // this.$message({
                //     showClose: true,
                //     type: 'error',
                //     message: err
                // });
                return;
            });
        }
   },
    data(){
        console.log('data' ,this.$route.query);
        return{
            // activeName:this.$route.query.nav || "map",
        }
    },
    created() {
       this.getPublicInfo();
   },
}
</script>

<style lang="less">
.about-box{

    .content{
      min-height:300px ;
        width: 100%;
        background: #fff;
        border-radius: 8px;
        color: #666;
        font-size: 18px;
        // font-weight: bold;
        line-height: 24px;
        padding: 30px 60px;
        margin-top: 20px;
        .infolist{
          font-size: 18px;
          flex: 1;
          margin-left: 60px;
          border-left: 1px solid #666;
          padding-left: 60px;
          span{
            display: block;
            margin: 20px 0;
            color: #333;
          }
        }
        h3{
            text-align: center;
            height: 37px;
            font-size: 28px;
            font-weight: bold;
            line-height: 37px;
        }
        .pre{
            width: 100%;
            overflow: hidden;
            margin: 20px 0;
            a{
                color: #1c71da;
            }
        }
    }
    
    

    .el-tabs__nav{
        display: flex;
        width: 100%;
    }
    .el-tabs__item {
        height: 50px;
        flex:1;
        text-align: center;
    }
    .el-tabs__active-bar,.el-tabs__nav-wrap::after{
        display: none;
    }
    .el-tabs__nav .el-tabs__item a{
        color: #666;
        width: 180px;
        height: 50px;
        border-radius: 4px;
        display: inline-block;
        text-align: center;
        font-size: 24px;
        line-height: 50px;
        span{
          display: inline-block;
            width: 24px;
            height: 24px;
            vertical-align: middle;
            background-position: 0 0;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            &.about{
              background-image: url("/images/hove_map.png");
            }
            &.info{
              background-image: url("/images/hove_info.png");
            }
            &.privacy{
              background-image: url("/images/hove_privacy.png");
            }
            &.service{
              background-image: url("/images/hove_service.png");
            }
        }
    }
    .el-tabs__item.is-active a,.el-tabs__nav .el-tabs__item a:hover{
        
        font-weight: bold;
        
    }
    .el-tabs__item.is-active a{
      background: linear-gradient(180deg, #6521D7 0%, #BF49EB 100%);
      color: #fff;
      span{
        &.about{
          background-image: url("/images/about_map.png");
        }
        &.info{
          background-image: url("/images/about_info.png");
        }
        &.privacy{
          background-image: url("/images/about_privacy.png");
        }
        &.service{
          background-image: url("/images/about_service.png");
        }
      }
      
    }
    
}


</style>
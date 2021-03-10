<!--
 * @Author: FeikeQ
 * @Date: 2020-12-15 11:08:49
 * @LastEditTime: 2021-02-25 10:23:07
 * @LastEditors: FeikeQ
 * @FilePath: /nami-pc/components/common/appFollow/index.vue
 * @Description: 关注组件
 * 使用方法
 * <app-follow type="match" small="true例列表中small模式关注按扭" state="true显示已关注状态" ids="121,2121" />
-->
<template>
    <div v-if="!small" class="app-follow" :class="status?'already':''" :ids="ids" @click="changeFollow">
        <a class="def"><span>关注{{title[type].name}}</span> <img  src="/images/star_l.png" /></a>
        <a class="act"><span>点击关注</span> <img  src="/images/star_s.png" /></a>
        <a class="fol"><span>已经关注</span> <img  src="/images/star_g.png" /></a>
        <a class="cal"><span>取消关注</span> <img  src="/images/star_b.png" /></a>
    </div>
    <div v-else class="app-follow-small" :class="status?'already':''" :ids="ids" @click="changeFollow" :title="status?'取消关注':'点击关注'" >
        <img class="def"  src="/images/star_l.png" />
        <img class="act"  src="/images/star_s.png" />
        <img class="fol" src="/images/star_g.png" />
        <img class="cal" src="/images/star_b.png" />
    </div>
</template>

<script>
import * as api from "@/api/user";
export default {
    props:{
        small:{
            type:Boolean,
            default:false
        },
        game_id:{
            type:String,
            default:""
        },
        type:{
            type:String,
            default:"match"
        },
        ids:{
            type:[String,Number],
            default:""
        },
        state:{
            type:Boolean,
            default:false
        },
    },
    data(){
        var cookie = this.$utils.getCookieArray();
        return {
            isLogin:(cookie && cookie.token)?cookie.token:"",
            title:{
                match:{
                    name:"比赛",
                    val:"0"
                },
                team:{
                    name:"战队",
                    val:"1"
                },
                competition:{
                    name:"赛事",
                    val:"2"
                },
                player:{
                    name:"选手",
                    val:"3"
                },
                
                
            },
            status:!!this.state, 
        }
    },
    methods:{
        apiFollow(check){
            var _ids = this.ids +"";
            if(!check){

                if(!this.isLogin.length){
                    this.$message({
                        showClose: true,
                        type: 'error',
                        message: "请您先登录帐号再进行操作!"
                    });
                    return;
                }

                if(!_ids.length){
                    this.$message({
                        showClose: true,
                        type: 'error',
                        message: "请设置 ids 值！多个以“,”逗号分隔开来即可。"
                    });
                    return;
                }

            }
            
            
            
            var _postData={
                type:this.title[this.type].val, // 关注类型"0" 比赛
                op_type:this.status?1:0, // 操作类型 0添加 1移除 2查询
                id_list:_ids,// 关注ID ：多个用，分割
                game_id:this.game_id, //游戏id
                // tournament_id:"", //赛事id 暂不启用
            };
            if(check) _postData.op_type = 2;
            
            api.setFocus(_postData,(data)=>{
                if(check){
                    console.log("查询",data);
                    this.status = !!data[_ids];
                }else{
                    console.log("关注/取关",data);
                    this.status = !this.status;
                }
            })
            .catch(err => {
                // this.$message({
                //     showClose: true,
                //     type: 'error',
                //     message: err
                // });
                return;
            });
        },
        checkFollow(){
            // console.log("==checkFollow==");
            this.apiFollow(1);
        },
        changeFollow(){
            // console.log("==changeFollow==");
            this.apiFollow();
        }
    },
    created(){
        if(!this.state) this.checkFollow();
    }
}
</script>

<style lang="less" scoped>
    .app-follow{
        width: 112px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 14px;
        a{
            width: 100%;
            height: 100%;
            border-radius: 23px;
            font-weight: 400;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 15px 10px 20px;
            cursor: pointer;
            img{
                width: 16px ;
                height: 16px;
            }
        }
        a.def{
            border: 1px solid #6521D7;
            color: #5D2BCF;
        }
        a.act{
            display: none;
            border:none;
            color: #fff;
            background: linear-gradient(180deg, #6521D7 0%, #BF49EB 100%);
        }
        a.fol{
            display: none;
            color:#666;
            border: 1px solid #666;
        }
        a.cal{
            display: none;
            color: #999;
            border: 1px solid #999;
        }

        &.already {
            a.fol{ display: flex;}
            a.def{ display: none;}
        }
        
        &:hover{
            a.def{
                display:none;
            }
            a.act{
                display:flex;
            }
        }

        &.already:hover{
            a.act ,a.fol{
                display:none;
            }
            a.cal{
                display:flex;
            }
        }
    }
    .app-follow-small{
        // width:52px;
        cursor: pointer;
        font-size: 14px;
        img{
            width: 16px;
            max-height: 16px;
        }
        
        
        .act{
            display: none;
        }
        .fol{
            display: none;
        }
        .cal{
            display: none;
        }

        &.already {
            .fol{ display:inline-block;}
            .def{ display: none;}
        }
        
        &:hover{
            .def{
                display:none;
            }
            .act{
                display:inline-block;
            }
        }

        &.already:hover{
            .act ,.fol{
                display:none;
            }
            .cal{
                display:inline-block;
            }
        }

    }
</style>
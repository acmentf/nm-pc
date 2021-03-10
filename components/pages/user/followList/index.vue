<!--
 * @Author: FeikeQ
 * @Date: 2020-12-22 11:56:51
 * @LastEditTime: 2021-02-25 17:50:05
 * @LastEditors: FeikeQ
 * @FilePath: /nami-pc/components/pages/user/followList/index.vue
 * @Description: 
-->
<template>
    <div class="follow-list">
        <app-title v-if="title.length" :title="title" :icon="icon" :color="(type=='competition')?'#5C79BA':'#878B9A'" size="14" style="padding:10px;">
            <div class="status"><b>{{state}}</b></div>
        </app-title>
        <ul v-if="data && data.length" class="list">
            <li v-for="(item ,index) in data" :key="index"
             @click="toSingleField(item.game.match_id,item.game.name,item.status)">
                <div class="game"><img :src="item.game.pic" />{{item.game.name}}</div>
                <div v-if="(type=='team') && item.team" class="team">
                    <img
                        :src="item.team.logo || '/images/team_default.png'"
                        style="width:24px;height:24px;"
                        onerror="this.src='/images/team_default.png';this.onerror=null"
                    />
                    <b>{{ item.team.short_name }}</b>
                    <span style="font-size: 14px;">{{
                        item.team.name
                    }}</span>
                </div>
                <div v-if="(type!='team')" class="time">{{item.time}}</div>
                <div v-if="(type=='match')" class="competition">{{item.competition}}</div>
                <div v-if="(type!='team')" class="group">
                    <div class="icon tr"><img v-if="item.home.amidithion" src="/images/victory_b.png" /></div>
                    <div class="name tr">{{item.home.name}}</div>
                    <div class="logo tr"><img :src="item.home.logo" onerror="this.src='/images/team_default.png';this.onerror=null" /></div>
                </div>
                <div v-if="(item.status !=1) && (type!='team')" class="score">{{item.home.score}}</div>
                <div v-if="(type!='team')" class="mid" :style="{width:((item.status==1)&&'48px')}">{{(item.status!=1)?':':'VS'}}</div>
                <div v-if="(item.status !=1) && (type!='team')" class="score red">{{item.away.score}}</div>
                <div v-if="(type!='team')" class="group tl">
                    <div class="logo tl"><img :src="item.away.logo" onerror="this.src='/images/team_default.png';this.onerror=null" /></div>
                    <div class="name tl">{{item.away.name}}</div>
                    <div class="icon tl"><img v-if="item.away.amidithion" src="/images/victory_b.png" /></div>
                </div>
                <div v-if="item.scene" class="scene">{{item.scene}}</div>
                <div v-if="(type!='team')" class="rule">{{item.rule}}</div>
                <div class="star">
                    <app-follow :type="type" :state="true" :game_id="item.game.name" :small="true" :ids="item.game.match_id" />
                </div>
            </li> 
        </ul>
        <ul v-else class="list" style="margin:168px">
            <img src="/images/follow_null.png" width="260" />
            <p style="color:#A1A1A1">暂无关注</p>
        </ul>
        <div style="height:10px"></div>
    
  </div>
</template>

<script>
import * as api from "@/api/user";

export default {
    props:{
        "type":{
            type:String,
            default:''
        },
        "title":{
            type:String,
            default:""
        },
        "icon":{
            type:String,
            default:""
        },
        "state":{
            type:String,
            default:""
        },
        "data":{
            type:Array,
            default: () => [
                {
                    game:{
                        pic:"/images/dota2.png",
                        name:"DOTA1",
                        match_id:112121212,
                    },
                    time:"2020-11-1 15:30",
                    competition:"黄金职业联赛黄金职业联赛黄金职业联赛黄金职业联赛黄金职业联赛黄金职业联赛黄金职业联赛黄金职业联赛",
                    rule:"BO3",
                    status:0, // 0 未开始 1进行中 2已结束
                    home:{
                        amidithion:1,
                        name:"皇族",
                        logo:"/images/team.png",
                        score:9
                    },
                    away:{
                        amidithion:0,
                        name:"WE",
                        logo:"/images/team.png",
                        score:18
                    },
                    team:{
                        short_name:"RNG",
                        name:"Royal Never Give Up",
                        logo:"/images/team.png",
                    }
                },
                
                {
                    game:{
                        pic:"/images/dota2.png",
                        name:"DOTA2"
                    },
                    time:"2020-11-1 15:30",
                    competition:"黄金职业联赛",
                    rule:"BO3",
                    scene:"第一局 16 ’",
                    status:1, // 0 未开始 1进行中 2已结束
                    home:{
                        name:"皇族皇族皇族皇族皇族皇族",
                        logo:"/images/team.png",
                        score:19
                    },
                    away:{
                        name:"WEJIDJKWSSLAKSJ",
                        logo:"/images/team.png",
                        score:29
                    },
                    team:{
                        short_name:"RNG",
                        name:"Royal Never Give Up",
                        logo:"/images/team.png",
                    }
                },
                {
                    game:{
                        pic:"/images/dota2.png",
                        name:"DOTA3"
                    },
                    time:"2020-11-1 15:30",
                    competition:"黄金职业联赛",
                    rule:"BO3",
                    status:2, // 0 未开始 1进行中 2已结束
                    home:{
                        amidithion:0,
                        name:"皇族",
                        logo:"/images/team.png",
                        score:9
                    },
                    away:{
                        amidithion:1,
                        name:"WE",
                        logo:"/images/team.png",
                        score:18
                    }
                },
                {
                    game:{
                        pic:"/images/dota2.png",
                        name:"DOTA4"
                    },
                    time:"2020-11-1 15:30",
                    competition:"黄金职业联赛",
                    rule:"BO3",
                    home:{
                        amidithion:0,
                        name:"皇族2",
                        logo:"/images/team.png",
                        score:9
                    },
                    away:{
                        amidithion:1,
                        name:"WE2",
                        logo:"/images/team.png",
                        score:18
                    }
                },
                {
                    game:{
                        pic:"/images/dota2.png",
                        name:"DOTA5"
                    },
                    time:"2020-11-1 15:30",
                    competition:"",
                    rule:"BO3",
                    home:{
                        amidithion:1,
                        name:"皇族",
                        logo:"/images/team.png",
                        score:9
                    },
                    away:{
                        amidithion:0,
                        name:"WE",
                        logo:"/images/team.png",
                        score:18
                    }
                }
            ]
        },
    },
    methods:{
      toSingleField(id, game, status) {
        //跳转单场详情
        if (!game) return;
        var _map = ["err", "notStarted", "processing", "over"];
        var _game = game.toLowerCase();
        var _url = {
          path: "/home/" + _game,
          query: { match_id: id ,type:1}
        };
        if (_game !== "csgo") _url.path += "/" + _map[status] ;
        this.$router.push(_url);
      },
    }
}
</script>

<style lang="less" scoped>
    .follow-list{
        font-size: 14px;
        .tr{
            text-align: right;
        }
        .tl{
            text-align: left;
        }
        .status{
            flex:1;
            text-align:right;
            color:#FC5353;
        }
        ul.list{
            color: #333;
            text-align:center;
            li{
                height: 30px;
                display: flex;
                align-items: center;
                font-size: 14px;
                .game{
                    text-align: left;
                    width: 120px;
                    img{
                        margin-left: 24px;
                        margin-right: 12px;
                        width: 18px;
                        height: 18px;
                        object-fit: cover;
                    }
                }
                .competition{
                    width: 180px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    word-break: break-all;
                }
                .time{
                    width: 130px;
                }
                
                .group{
                    width: 170px;
                    line-height: 20px;
                    height:20px;
                    display: flex;
                    align-items: center;
                    .icon{
                        overflow: hidden;
                        height: 16px;
                        flex:1;
                        // background: yellow;
                        img {
                            width: 16px;
                            height: 16px;
                            display:block;
                            float: left;
                            margin: 0 2px;
                            object-fit: cover;
                        }
                    }
                    .icon.tr{
                        img {float:right;}
                    }
                    .name{
                        padding: 0 5px;
                        max-width: 110px;
                        font-size: 14px;
                        color: #333;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        word-break: break-all;
                        // background:  red;
                    }
                    .logo{
                        width: 26px;
                        text-align: center;
                        overflow: hidden;
                        height: 18px;
                        img{
                            width: 18px;
                            height: 18px;
                            display: block;
                            margin: 0 auto;
                            object-fit: cover;
                        }
                    }
                }

                .score{
                    width: 22px;
                    height: 19px;
                    font-size: 14px;
                    font-weight: bold;
                    line-height: 19px;
                    color: #33C6D6;
                }
                .score.red{
                    color: #F05365;    
                }
                .mid{
                    width: 4px;
                    height: 19px;
                    font-size: 14px;
                    line-height: 19px;
                    color: #bbb;
                    position: relative;
                }
                .rule{
                  color:#999;
                    flex:1;
                }
                .team{
                    flex:1;
                    text-align: left;
                }
                .scene{
                    width: 80px;
                }
                .star{
                    width:52px;
                }
            }
            li:hover{
              background: linear-gradient(135deg,rgba(101,33,215,0.3) 0%,rgba(191,73,235,0.3) 100%);
            }
            
        }
    }

     
</style>
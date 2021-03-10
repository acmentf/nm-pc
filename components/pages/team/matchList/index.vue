<!--
 * @Author: FeikeQ
 * @Date: 2020-12-14 17:19:08
 * @LastEditTime: 2021-02-25 10:53:45
 * @LastEditors: FeikeQ
 * @FilePath: /nami-pc/components/pages/team/matchList/index.vue
 * @Description: 
 * 使用方法
 * <match-list :data="data" title="CSGO·俄罗斯联赛" icon="/images/lol.png" state="进行中" type="vs" />
-->
<template>
    <div class="match-list">
        <app-title :title="title" :icon="icon" color="#333" size="16" style="padding:10px;">
            <div class="status"><b>{{state}}</b></div>
        </app-title>
        <ul class="list" :class="type?'vs':''">
            <li v-for="(item ,index) in data" :key="index" @click="toSingleField(item.match_id,item.game,item.status_id)">
                <div class="time">{{$utils.formatime(item.time*1000,"yyyy-MM-dd hh:mm")}}</div>
                <div class="group">
                    <div class="icon tr"><img v-if="item.home.amidithion" src="/images/victory_b.png" /></div>
                    <div class="name tr">{{item.home.name}}</div>
                    <div class="logo tr"><img :src="item.home.logo" onerror="this.src='/images/team_default.png';this.onerror=null" /></div>
                </div>
                <div class="score">{{item.home.score}}</div>
                <div class="mid">{{type?'VS':':'}}</div>
                <div class="score red">{{item.away.score}}</div>
                <div class="group tl">
                    <div class="logo tl"><img :src="item.away.logo" onerror="this.src='/images/team_default.png';this.onerror=null"  /></div>
                    <div class="name tl">{{item.away.name}}</div>
                    <div class="icon tl"><img v-if="item.away.amidithion" src="/images/victory_r.png" /></div>
                </div>
                <div class="rule">{{item.rule}}</div>
            </li> 
        </ul>
        <div style="height:10px"></div>
    
  </div>
</template>

<script>
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
                    time:"2020-11-1 15:30",
                    rule:"BO3",
                    home:{
                        amidithion:1,
                        name:"皇族",
                        logo:"/images/team2.png",
                        score:9,
                        team_id: 3525
                    },
                    away:{
                        amidithion:0,
                        name:"WE",
                        logo:"/images/team.png",
                        score:18,
                        team_id: 3524
                    },
                    status_id: 3,
                    match_id: 3326305,
                    game:'csgo',
                    room_id: "9d95c57ed4036914a65ea7b0847a7a4b"
                },
                {
                    time:"2020-11-1 15:30",
                    rule:"BO3",
                    home:{
                        name:"皇族皇族皇族皇族皇族皇族",
                        logo:"/images/team2.png",
                    },
                    away:{
                        name:"WEJIDJKWSSLAKSJ",
                        logo:"/images/team.png",
                    }
                },
                {
                    time:"2020-11-1 15:30",
                    rule:"BO3",
                    home:{
                        amidithion:0,
                        name:"皇族",
                        logo:"/images/team2.png",
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
                    time:"2020-11-1 15:30",
                    rule:"BO3",
                    home:{
                        amidithion:0,
                        name:"皇族2",
                        logo:"/images/team2.png",
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
                    time:"2020-11-1 15:30",
                    rule:"BO3",
                    home:{
                        amidithion:1,
                        name:"皇族",
                        logo:"/images/team2.png",
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
          query: { match_id: id }
        };
        if (_game !== "csgo") _url.path += "/" + _map[status];
        this.$router.push(_url);
      },
    }
}
</script>

<style lang="less" scoped>
    .match-list{
        background-color:rgba(255, 255, 255, 0.6);
        // box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.15);
        border-radius: 6px;
        margin: 8px 0;
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
                .time{
                    font-size: 14px;
                    width: 140px;
                    padding-left: 10px;
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
                    color: #999;
                    position: relative;
                }
                .rule{
                    flex:1;
                    text-align: left;
                }
            }
            li:hover{
                background: linear-gradient(135deg,rgba(101,33,215,0.3) 0%,rgba(191,73,235,0.3) 100%);
            }
            
        }
        ul.list.vs{
            li{
                .score{
                    display:none;
                }
                .mid{
                    width: 48px;
                }
            }
        }
    }

     
</style>
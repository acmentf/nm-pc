<!--  -->
<template>
  <div class="detail-box">
    <div class="liveBroadcast">
      <div style="position: relative;margin-bottom:13px;width:100%;">
        <Breadcrumb>
          <breadcrumb-item>{{topData.mnl.team_home.team_short_name}} VS {{topData.mnl.team_away.team_short_name}}</breadcrumb-item>
        </Breadcrumb>
        <app-follow
          type="match"
          game_id="LOL"
          style="position: absolute; top:0px; right:0;"
          :ids="topData.mnl.match_id"
        />
      </div>
      <div style="margin-bottom:12px" class="live-box">
        <div class="liveBroadcast-box" :aimation_addr="topData.lvs.aimation_addr" :video_addr="topData.lvs.video_addr">
           <live-box :flow="{
              aimation_addr:topData.lvs.aimation_addr,
              video_addr:topData.lvs.video_addr
            }"></live-box>
        </div>
        <div class="log-box">
          <div class="centent_box" v-if="true">
            <p class="centent_box_gamevs">
              <span class="left">
                <span class="gameName">{{topData.mnl.team_home.team_short_name}}</span>
                <img
                  style="margin:0 20px 0 12px;"
                  width="30px"
                  :src="topData.mnl.team_home.team_img"
                  alt="we"
                />
                <span class="gamevs-one">{{topData.mnl.home_score}}</span>
              </span>
              <span class="gamevs-two">:</span>
              <span class="right">
                <span class="gamevs-three">{{topData.mnl.away_score}}</span>
                <img
                  style="margin:0 10px 0 20px;"
                  width="30px"
                  :src="topData.mnl.team_away.team_img"
                  alt="r"
                />
                <span class="gameName">{{topData.mnl.team_away.team_short_name}}</span>
                <!-- <img
                  v-show="topData.mnl.away_score-topData.mnl.home_score>0"
                  style="margin:0 0 0 12px;"
                  width="24px"
                  height="24px"
                  src="/images/victory_r.png"
                  alt="W"
                />-->
              </span>
            </p>
            <p class="centent_box_datavs">
              <span class="left">
                <span v-if="role_attr_info_home.total.money-role_attr_info_away.total.money>0">
                  <img
                    style="margin:0 4px 0 0px;"
                    width="14px"
                    height="14px"
                    src="/images/arrowup_y.png"
                    alt="we"
                  />
                  {{Math.abs((role_attr_info_home.total.money-role_attr_info_away.total.money)/1000)}}K
                  <img
                    style="margin:0 12px 0 1px;"
                    width="20px"
                    height="20px"
                    src="/images/lead_y.png"
                    alt="we"
                  />
                </span>

                <span class="data-one">{{role_attr_info_home.total.kill}}</span>
              </span>
              <span class="data-two">:</span>
              <span class="right">
                <span class="data-three">{{role_attr_info_away.total.kill}}</span>
                <span v-if="role_attr_info_home.total.money-role_attr_info_away.total.money<0">
                  <img
                    style="margin:0px 0px 0px 12px"
                    width="20px"
                    height="20px"
                    src="/images/lead_y.png"
                    alt="we"
                  />
                  {{Math.abs((role_attr_info_home.total.money-role_attr_info_away.total.money)/1000)}}K
                  <img
                    style="margin:0 4px 0 1px;"
                    width="14px"
                    height="14px"
                    src="/images/arrowup_y.png"
                    alt="we"
                  />
                </span>
              </span>
            </p>
            <div class="achievement-wrapper">
              <!-- 成就 -->
              <div class="achievement">
                <div class="home">
                  <div class="top">
                    <span>
                      <img src="/images/home-dl.png" alt width="20" />
                      <span class="num r">{{resources_info.team_res_home.bigdragon}}</span>
                    </span>
                    <span>
                      <img src="/images/home-xl.png" alt width="20" />
                      <span class="num">{{resources_info.team_res_home.smalldragon}}</span>
                    </span>
                  </div>
                  <div class="bottom">
                    <span>
                      <img src="/images/home-t.png" alt width="20" />
                      <span class="num r">{{resources_info.team_res_home.tower}}</span>
                    </span>
                    <span>
                      <img src="/images/home-sj.png" alt width="20" />
                      <span class="num">{{resources_info.team_res_home.crystal}}</span>
                    </span>
                  </div>
                </div>
                <div class="away">
                  <div class="top">
                    <span>
                      <img src="/images/away-dl.png" alt width="20" />
                      <span class="num r">{{resources_info.team_res_away.bigdragon}}</span>
                    </span>
                    <span>
                      <img src="/images/away-xl.png" alt width="20" />
                      <span class="num">{{resources_info.team_res_away.smalldragon}}</span>
                    </span>
                  </div>
                  <div class="bottom">
                    <span>
                      <img src="/images/away-t.png" alt width="20" />
                      <span class="num r">{{resources_info.team_res_away.tower}}</span>
                    </span>
                    <span>
                      <img src="/images/away-sj.png" alt width="20" />
                      <span class="num">{{resources_info.team_res_away.crystal}}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div class="centent_box_score"></div>
              <div class="centent_box_score" style="margin-top: 13px;"></div>
              <div class="proportion_item">
                <row-bar
                  class="row-bar"
                  direction="row"
                  :pramas="{home:resources_info.team_res_home.feco,away:resources_info.team_res_away.feco}"
                  dw="k"
                  :bg="true"
                >经济</row-bar>
                <!-- <row-bar
                class="row-bar"
                direction="row"
                :pramas="{home:resources_info.team_res_home.fexp,away:resources_info.team_res_away.fexp}"
                dw
                :bg="true"
                >经验</row-bar>-->
                <row-bar
                  class="row-bar"
                  direction="row"
                  :pramas="{home:resources_info.team_res_home.fsoldiers,away:resources_info.team_res_away.fsoldiers}"
                  dw
                  :bg="true"
                >补刀</row-bar>
                <row-bar
                  class="row-bar"
                  direction="row"
                  :pramas="{home:resources_info.team_res_home.fsmalldragon,away:resources_info.team_res_away.fsmalldragon}"
                  :bg="true"
                  dw
                >小龙</row-bar>
                <row-bar
                  class="row-bar"
                  direction="row"
                  :pramas="{home:resources_info.team_res_home.fbigdragon,away:resources_info.team_res_away.fbigdragon}"
                  dw
                  :bg="true"
                >大龙</row-bar>
              </div>
            </div>
          </div>
          <defaultBox
            v-else
            style="margin-top:100px;"
            width="260px"
            height="260px"
            src="/images/processing_default.png"
          >暂无对战数据</defaultBox>
        </div>
      </div>
      <div style="margin-bottom:12px" class="end-box">
        <ul>
          <li
            v-for="(item,index) in game_num"
            :key="index"
            :class="{'sessionActive':item.value === currentTab}"
            @click="tabChange(item.value)"
          >{{item.lable}}</li>
        </ul>
      </div>
      <app-title style="margin:66px 0 24px 0" title="对战阵容" type="1" color="#333" />
      <div class="fight-box">
        <div v-if="true" style="width:100%;height:100%;position:absolute;z-index:2;">
          <div class="line-up-ban">
            <div>
              <el-image
                v-for="(item,index) in roleselect_info.role_ban_home.role_list"
                :key="index+'left'"
                style="width:32px; height: 32px;margin-right:20px;"
                :src="item"
                :fit="item.fits"
              ><div slot="error" class="image-slot">
                  <img src="/images/hero_default.png" style="width:32px;height:32px;    display: block;" />
                </div></el-image>
            </div>Ban
            <div style="text-align: left;">
              <el-image
                v-for="(item,index) in  roleselect_info.role_ban_away.role_list"
                :key="index+'right'"
                style="width: 32px; height: 32px;margin-left:20px;"
                :src="item"
                :fit="item.fits"
              ><div slot="error" class="image-slot">
                  <img src="/images/hero_default.png" style="width:32px;height:32px;    display: block;" />
                </div></el-image>
            </div>
          </div>
          <div class="line-up-pick">
            <div>
              <el-image
                v-for="(item,index) in roleselect_info.role_pick_home.role_list"
                :key="index+'left'"
                style="width: 32px; height: 32px;margin-right:9px;"
                :src="item"
                :fit="item.fits"
              ><div slot="error" class="image-slot">
                  <img src="/images/hero_default.png" style="width:32px;height:32px;    display: block;" />
                </div></el-image>
            </div>
            <span style>Pick</span>
            <div style="text-align:left;">
              <el-image
                v-for="(item,index) in roleselect_info.role_pick_away.role_list"
                :key="index+'right'"
                style="width: 32px; height: 32px;margin-left:9px;"
                :src="item"
                :fit="item.fits"
              ><div slot="error" class="image-slot">
                  <img src="/images/hero_default.png" style="width:32px;height:32px;    display: block;" />
                </div></el-image>
            </div>
          </div>
          <div class="chart-box">
            <experienceChart
              :data="economics_info"
              style="position:absolute;z-index:2;"
              type="lol"
            />
            <div class="mask_box"></div>
          </div>
          <div class="chart-box1" v-if="battle_info && battle_info[tab_index]">
            <div class="chart-tabs">
              <span
                class="chart-tab"
                v-for="(item,index) in chartTabs"
                :key="index"
                :class="tab_index === index ?'chart-tab-actived':''"
                @click="activeChartTabs(index)"
              >{{item.text}}</span>
            </div>
            <probabilityChart
              :data="battle_info[tab_index].page_top"
              style="position:absolute;z-index:2;"
            />
            <div class="mask_box"></div>
            <div class="chart-text">数据仅供参考，为近五十场数据</div>
          </div>
        </div>
        <defaultBox
          v-else
          style="margin-top:50px;"
          width="260px"
          height="260px"
          src="/images/processing_default.png"
        >暂无对战阵营</defaultBox>
      </div>
      <app-title style="margin:66px 0 24px 0" title="数据排行" type="1" color="#333" />
      <div class="ranking-box">
        <div v-if="data_rank_list" class="ranking">
          <div class="chart-box" style="margin-right:90px;">
            <h2>{{topData.mnl.team_home.team_short_name}}</h2>
            <div class="pie-wrapper">
              <el-image style="width:100px" :src="topData.mnl.team_home.team_img" class="home_img">
                <div slot="error" class="image-slot">
                  <img src="/images/team_default.png" alt width="100" />
                </div>
              </el-image>
              <pie width="140" height="140" type="1" alt="TF说故意的圆圈效果"></pie>
            </div>
          </div>
          <div class="center" v-if="data_rank_list[tab_data_index]">
            <table-select
              style="width:90px;margin:24px 0 20px 0"
              v-model="typeSelect"
              :options="selectVal"
              @change="typeChange"
            ></table-select>
            <row-bar
              v-for="(item,index) in data_rank_list[tab_data_index].item_attr"
              :key="index"
              :dw="item.type ==1?'%':''"
              :pramas="{
              
                home: Number(item.value[0]),
                away: Number(item.value[1]),
                total: Number(item.value[0]) + Number(item.value[1])
              }"
            >{{item.name}}</row-bar>
          </div>
          <div class="chart-box" style="margin-left:90px;">
            <h2>{{topData.mnl.team_away.team_short_name}}</h2>
            <div class="pie-wrapper">
              <el-image style="width:100px" :src="topData.mnl.team_away.team_img" class="home_img">
                <div slot="error" class="image-slot">
                  <img src="/images/team_default.png" alt width="100" />
                </div>
              </el-image>
              <pie width="140" height="140" alt="TF说故意的圆圈效果"></pie>
            </div>
          </div>
        </div>
        <defaultBox v-else width="200px" height="200px" src="/images/team_top_default.png">暂无数据排行</defaultBox>
      </div>
      <app-title style="margin:66px 0 24px 0" title="对战详情" type="1" color="#333" />
      <div class="details-box">
        <div class="details-box-one">
          <div v-if="role_attr_info_home" class="details-box-centent">
            <ul class="table">
              <li class="table-header">
                <div class="hero-pic">
                  <el-image style="width:30px;height:30px;" :src="role_attr_info_home.team_img">
                    <div slot="error" class="image-slot">
                      <img src="/images/team_default.png" alt width="30" />
                    </div>
                  </el-image>&nbsp;
                  <span class="team-name">{{role_attr_info_home.team_short_name}}</span>
                </div>
                <div class="flex">KDA</div>
                <div class="flex">参战率</div>
                <div class="flex">总补刀</div>
                <div class="flex">经济</div>
                <div class="flex">召唤师技能</div>
                <div class="zb" style="text-align: center;">出装</div>
              </li>
              <li
                class="table-body"
                v-for="(item,index) in role_attr_info_home.player"
                :key="index"
              >
                <div class="hero-pic">
                  <div>
                    <el-image style="width:40px;height:40px;" :src="item.play_info.role_img_url">
                      <div slot="error" class="image-slot">
                        <img src="/images/team_default.png" alt width="40" />
                      </div>
                    </el-image>
                    <span>{{item.play_info.level}}</span>
                  </div>
                  <div class="name-wrapper">
                    <p class="player_name">{{item.play_info.player_name}}</p>
                    <p class="role_name">{{item.play_info.role_name}}</p>
                  </div>
                </div>
                <div class="flex">
                  <div class="kda">
                    <p>{{item.play_info.kda}}</p>
                    <span>{{item.play_info.kill}}/{{item.play_info.die}}/{{item.play_info.assists}}</span>
                  </div>
                </div>
                <div class="flex">{{item.play_info.group_rate}}</div>
                <div class="flex">{{item.play_info.soldiers}}</div>
                <div class="flex">{{item.play_info.money}}</div>
                <div class="flex">
                  <el-image
                    style="width:30px;height:40px;margin-right:12px;"
                    :src="_item"
                    v-for="(_item,_index) in item.play_info.spells"
                    :key="_index"
                  >
                    <div slot="error" class="image-slot">
                      <img src="/images/team_default.png" alt width="30" />
                    </div>
                  </el-image>
                </div>
                <div class="zb">
                  <el-image
                    style="width:30px;height:30px;"
                    :src="_item"
                    v-for="(_item,_index) in item.play_equip_imgs"
                    :key="_index"
                  >
                    <div slot="error" class="image-slot">
                      <img src="/images/team_default.png" alt width="30" />
                    </div>
                  </el-image>
                </div>
              </li>
            </ul>
          </div>
          <defaultBox
            v-else
            style="margin-top:100px;"
            width="260px"
            height="260px"
            src="/images/battle_details.png"
          >暂无对战详情</defaultBox>
        </div>

        <div class="details-box-two">
          <div v-if="role_attr_info_away" class="details-box-centent">
            <ul class="table">
              <li class="table-header">
                <div class="hero-pic">
                  <el-image style="width:30px" :src="role_attr_info_away.team_img">
                    <div slot="error" class="image-slot">
                      <img src="/images/team_default.png" alt width="30" />
                    </div>
                  </el-image>&nbsp;
                  <span class="team-name">{{role_attr_info_away.team_short_name}}</span>
                </div>
                <div class="flex">KDA</div>
                <div class="flex">参战率</div>
                <div class="flex">总补刀</div>
                <div class="flex">经济</div>
                <div class="flex">召唤师技能</div>
                <div class="zb" style="text-align: center;">出装</div>
              </li>
              <li
                class="table-body"
                v-for="(item,index) in role_attr_info_away.player"
                :key="index"
              >
                <div class="hero-pic">
                  <div>
                    <el-image style="width:40px" :src="item.play_info.role_img_url">
                      <div slot="error" class="image-slot">
                        <img src="/images/team_default.png" alt width="40" />
                      </div>
                    </el-image>
                    <span>{{item.play_info.level}}</span>
                  </div>
                  <div class="name-wrapper">
                    <p class="player_name">{{item.play_info.player_name}}</p>
                    <p class="role_name">{{item.play_info.role_name}}</p>
                  </div>
                </div>
                <div class="flex">
                  <div class="kda">
                    <p>{{item.play_info.kda}}</p>
                    <span>{{item.play_info.kill}}/{{item.play_info.die}}/{{item.play_info.assists}}</span>
                  </div>
                </div>
                <div class="flex">{{item.play_info.group_rate}}</div>
                <div class="flex">{{item.play_info.soldiers}}</div>
                <div class="flex">{{item.play_info.money}}</div>
                <div class="flex">
                  <el-image
                    style="width:30px;margin-right:12px"
                    :src="_item"
                    v-for="(_item,_index) in item.play_info.spells"
                    :key="_index"
                  >
                    <div slot="error" class="image-slot">
                      <img src="/images/team_default.png" alt width="30" />
                    </div>
                  </el-image>
                </div>
                <div class="zb">
                  <el-image
                    style="width:30px"
                    :src="_item"
                    v-for="(_item,_index) in item.play_equip_imgs"
                    :key="_index"
                  >
                    <div slot="error" class="image-slot">
                      <img src="/images/team_default.png" alt width="30" />
                    </div>
                  </el-image>
                </div>
              </li>
            </ul>
          </div>
          <defaultBox
            v-else
            style="margin-top:100px;"
            width="260px"
            height="260px"
            src="/images/battle_details.png"
          >暂无对战详情</defaultBox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import experienceChart from "~/components/pages/home/experienceChart";
import probabilityChart from "~/components/pages/home/probabilityChart";
import NotStarted from "~/components/pages/home/noStarted";
import dataRatio from "~/components/pages/home/dataRatio";
import defaultBox from "~/components/common/default";
import videoPlayer from "~/components/common/videoPlayer";
export default {
  layout: "home",
  name: "processing",
  components: {
    probabilityChart,
    experienceChart,
    NotStarted,
    dataRatio,
    defaultBox,
    videoPlayer
  },
  async asyncData({ query, store }) {
    let { match_id, num } = query;
    store.dispatch("matchDetail/_setParmars", {
      game_id: "LOL",
      match_id: query.match_id
    });
    let topData = await store.dispatch("matchDetail/_getMatchTopData");
    let game_num = store.state.matchDetail.game_num;
    let currentTab = num ? Number(num) : game_num.length;
    let selectVal = [];
    await store.dispatch("matchDetail/_getLiveData", { box_num: currentTab });
    //获取局数
    let {
      resources_info,
      roleselect_info,
      role_attr_info_away,
      role_attr_info_home,
      battle_info,
      economics_info,
      data_rank_list
    } = store.state.matchDetail;
    //获取界面数据
    data_rank_list.forEach(item => {
      selectVal.push({
        label: item.item_name,
        value: item.item_postion
      });
    });
    return {
      topData,
      game_num,
      currentTab,
      resources_info,
      roleselect_info,
      role_attr_info_away,
      role_attr_info_home,
      battle_info,
      economics_info,
      data_rank_list,
      selectVal
    };
  },
  data() {
    var _this = this;
    return {
      dataObject: {
        title: "一号位",
        percentage: 100, //总的百分比
        percentageLeft: 40, //左边百分比
        percentageRight: 60 //右边百分比
      },
      regionFilter: {
        value: 0,
        options: [
          {
            value: 0,
            label: "按胜率"
          },
          {
            value: 8,
            label: "中国"
          },
          {
            value: 1,
            label: "韩国"
          }
        ]
      },
      option1: {
        series: [
          {
            type: "pie",
            radius: ["75%", "100%"],
            center: ["50%", "50%"],
            hoverAnimation: false,
            avoidLabelOverlap: false,
            startAngle: 0, //起始角度
            labelLine: {
              show: false
            },
            data: [
              { value: 75, name: "70%" },
              { value: 25, name: "" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              },
              normal: {
                color: function(params) {
                  var colorList =
                    _this.type == 1
                      ? [
                          {
                            c1: "#6A20FF",
                            c2: "#5370FE"
                          },
                          {
                            c1: "#0F1E45",
                            c2: "#0F1E45"
                          }
                        ]
                      : [
                          {
                            c1: "#F05365",
                            c2: "#DD6EFE"
                          },
                          {
                            c1: "#0F1E45",
                            c2: "#0F1E45"
                          }
                        ];
                  return new _this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [
                    {
                      //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                      offset: 0,
                      color: colorList[params.dataIndex].c1
                    },
                    {
                      offset: 1,
                      color: colorList[params.dataIndex].c2
                    }
                  ]);
                }
              }
            }
          }
        ]
      },
      option3: {
        series: [
          {
            type: "pie",
            radius: ["75%", "100%"],
            center: ["50%", "50%"],
            hoverAnimation: false,
            avoidLabelOverlap: false,
            startAngle: 0, //起始角度
            labelLine: {
              show: false
            },
            data: [
              { value: 75, name: "70%" },
              { value: 25, name: "" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              },
              normal: {
                color: function(params) {
                  var colorList =
                    _this.type == 1
                      ? [
                          {
                            c1: "#652dfe",
                            c2: "#5e48fe"
                          },
                          {
                            c1: "#575efe",
                            c2: "#5566fe"
                          }
                        ]
                      : [
                          {
                            c1: "#585dfe",
                            c2: "#5f44fe"
                          },
                          {
                            c1: "#0F1E45",
                            c2: "#0F1E45"
                          }
                        ];
                  return new _this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [
                    {
                      //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                      offset: 0,
                      color: colorList[params.dataIndex].c1
                    },
                    {
                      offset: 1,
                      color: colorList[params.dataIndex].c2
                    }
                  ]);
                }
              }
            }
          }
        ]
      },
      chartTabs: [
        { text: "胜率", actived: true },
        { text: "一血率", actived: false },
        { text: "一塔率", actived: false },
        { text: "五杀率", actived: false },
        { text: "十杀率", actived: false }
      ],
      data1: {},
      tabIndex: 1,
      sessionArr: [
        { session: "第一场", actived: true },
        { session: "第二场", actived: false },
        { session: "第三场", actived: false },
        { session: "第四场", actived: false },
        { session: "第五场", actived: false },
        { session: "第六场", actived: false }
      ],
      imgUrl: [
        { url: "/images/ban7.png", fits: "fill" },
        { url: "/images/ban7.png", fits: "fill" },
        { url: "/images/ban7.png", fits: "fill" },
        { url: "/images/ban7.png", fits: "fill" },
        { url: "/images/ban7.png", fits: "fill" },
        { url: "/images/ban7.png", fits: "fill" },
        { url: "/images/ban7.png", fits: "fill" }
      ],
      imgUrl1: [
        { url: "/images/pick5.png", fits: "fill" },
        { url: "/images/pick5.png", fits: "fill" },
        { url: "/images/pick5.png", fits: "fill" },
        { url: "/images/pick5.png", fits: "fill" },
        { url: "/images/pick5.png", fits: "fill" }
      ],
      tab_index: 0,
      tab_data_index: 0,
      typeSelect: 1,
      live_tab_index: 0
    };
  },
  computed: {},
  watch: {},
  methods: {
    stringFilter(value, number) {
      if (value.length > number) {
        return value.slice(0, number) + "...";
      } else {
        return value;
      }
    },
    activeChartTabs(index) {
      this.tab_index = index;
    },
    zoneChange() {},
    initChart(pie, pie1, option, option1) {
      this.$nextTick(() => {
        var pieObject = this.$echarts.init(this.$refs[pie]);
        // 使用刚指定的配置项和数据显示图表。
        pieObject.setOption(option);

        var pie1Object = this.$echarts.init(this.$refs[pie1]);
        // 使用刚指定的配置项和数据显示图表。
        pie1Object.setOption(option1);
      });
    },
    async tabChange(box_num) {
      this.currentTab = box_num;
      await this.$store.dispatch("matchDetail/_getLiveData", {
        box_num: this.currentTab
      });
      let {
        resources_info,
        roleselect_info,
        role_attr_info_away,
        role_attr_info_home,
        battle_info,
        economics_info,
        data_rank_list
      } = this.$store.state.matchDetail;
      let selectVal = [];
      data_rank_list.forEach(item => {
        selectVal.push({
          label: item.item_name,
          value: item.item_postion
        });
      });
      this.resources_info = resources_info;
      this.roleselect_info = roleselect_info;
      this.role_attr_info_away = role_attr_info_away;
      this.role_attr_info_home = role_attr_info_home;
      this.battle_info = battle_info;
      this.economics_info = economics_info;
      (this.data_rank_list = data_rank_list), (this.selectVal = selectVal);
    },
    async typeChange(type) {
      this.tab_data_index = this.selectVal.findIndex(
        item => item.value === type
      );
    }
  },
  created() {},
  mounted() {
    //this.initChart("pie", "pie1", this.option3, this.option1);
  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
.liveBroadcast {
  .live-box {
    display: flex;
    .liveBroadcast-box {
      overflow: hidden;
      flex: 1;
      background: #fff;
      border-radius: 6px;
    }
    .log-box {
      width: 392px;
      height: 488px;
      margin-left: 12px;
      // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
      position: relative;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 6px;
      .centent_box {
        width: 100%;
        position: relative;
        z-index: 2;
        text-align: center;
        & > p {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          vertical-align: middle;
        }
        .centent_box_gamevs {
          font-size: 14px;
          font-weight: bold;
          color: #333;
          margin-top: 43px;
          .left {
            display: inline-flex;
            justify-content: flex-end;
            align-items: center;
            vertical-align: middle;
            .gameName {
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              width: 50px;
              display: inline-block;
            }
            .gamevs-one {
              padding-right: 10px;
              font-size: 26px;
              font-weight: bold;
              color: #33C6D6;
              -webkit-text-stroke: 1 rgba(0, 0, 0, 0);
            }
          }
          .right {
            display: inline-flex;
            justify-content: flex-start;
            align-items: center;
            vertical-align: middle;
            .gameName {
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              width: 50px;
              display: inline-block;
            }
            .gamevs-three {
              padding-left: 10px;
              font-size: 26px;
              font-weight: bold;
              color: #F05365;
              -webkit-text-stroke: 1 rgba(0, 0, 0, 0);
            }
          }
          .gamevs-two {
            font-size: 26px;
            line-height: 26px;
            font-weight: bold;
            color: #bbbbbb;
            -webkit-text-stroke: 1 rgba(0, 0, 0, 0);
          }
        }
        .centent_box_datavs {
          display: flex;
          font-size: 14px;
          font-weight: 400;
          color: #eebe26;
          margin-top: 42px;
          .left {
            flex: 1;
            display: inline-flex;
            justify-content: flex-end;
            align-items: center;
            vertical-align: middle;
            .data-one {
              font-size: 30px;
              font-weight: bold;
              color: #33C6D6;
              padding-right: 10px;
            }
          }
          .data-two {
            font-size: 30px;
            font-weight: 400;
            color: #bbbbbb;
          }
          .right {
            flex: 1;
            display: inline-flex;
            justify-content: flex-start;
            align-items: center;
            vertical-align: middle;
            .data-three {
              font-size: 30px;
              font-weight: bold;
              color: #F05365;
              padding-left: 10px;
            }
          }
        }
        .centent_box_score {
          font-size: 14px;
          font-weight: 400;
          color: #ffffff;
          position: absolute;
          top: 192px;
          left: -8px;
          width: 100%;
          & > div {
            display: inline-block;
            width: 150px;
          }
        }
        .centent_box_proportion {
          position: absolute;
          top: 238px;
          left: 0px;
          width: 100%;
          .proportion_item {
            height: 16px;
            position: relative;
            margin: 24px auto;
            font-size: 12px;
            font-weight: bold;
            color: #ffffff;
            padding: 0 12px;
            -webkit-text-stroke: 1 rgba(0, 0, 0, 0);
            .proportion_left_bg {
              width: 162px;
              height: 16px;
              background: #060f2a;
              opacity: 1;
              border-radius: 8px;
              display: inline-block;
              margin-right: 23px;
            }
            .proportion_left_data {
              width: 77px;
              height: 16px;
              background: linear-gradient(270deg, #6a20ff 0%, #5370fe 100%);
              border-radius: 8px;
              padding-right: 12px;
              text-align: right;
              position: absolute;
              left: 99px;
              top: 0px;
            }
            .proportion_center {
              position: absolute;
              top: 0px;
              left: 183px;
              display: inline-block;
              font-size: 12px;
              font-weight: 400;
              color: #dddddd;
              -webkit-text-stroke: 1 rgba(0, 0, 0, 0);
            }
            .proportion_right_bg {
              width: 162px;
              height: 16px;
              background: #060f2a;
              opacity: 1;
              border-radius: 8px;
              display: inline-block;
              margin-left: 7px;
            }
            .proportion_right_data {
              width: 129px;
              height: 16px;
              background: linear-gradient(90deg, #F05365 0%, #dd6efe 100%);
              border-radius: 8px;
              padding-left: 12px;
              text-align: left;
              position: absolute;
              right: 49px;
              top: 0px;
            }
          }
        }
      }
    }
  }
  .end-box {
    .end {
      height: 158px;
      background: rgba(15, 30, 69, 0.5);
      // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
      overflow: hidden;
      border-radius: 6px;
      margin: 0 auto;
      .centent_box_gamevs {
        width: 100%;
        font-size: 20px;
        font-weight: bold;
        color: #ffffff;
        margin: 43px auto 0 auto;
        text-align: center;
        .gamevs {
          text-align: center;
          display: flex;
          justify-content: center;
          & > div {
            flex: 1;
            display: inline-flex;
            justify-content: flex-end;
            align-items: center;
            vertical-align: middle;
            &.away {
              justify-content: flex-start;
            }
            .gamevs-one {
              padding-right: 10px;
              font-size: 26px;
              font-weight: bold;
              color: #33C6D6;
              -webkit-text-stroke: 1 rgba(0, 0, 0, 0);
            }
            .gamevs-three {
              padding-left: 10px;
              font-size: 26px;
              font-weight: bold;
              color: #F05365;
              -webkit-text-stroke: 1 rgba(0, 0, 0, 0);
            }
          }
          .gamevs-two {
            font-size: 26px;
            font-weight: bold;
            color: #bbbbbb;
            -webkit-text-stroke: 1 rgba(0, 0, 0, 0);
            text-stroke: 1 rgba(0, 0, 0, 0);
          }
        }
        .over {
          font-size: 24px;
          font-weight: bold;
          color: #888888;
          margin-top: 12px;
        }
      }
    }
    .log-box {
      padding-top: 30px;
      overflow: hidden;
      width: 100%;
      height: 308px;
      box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
      background: rgba(15, 30, 69, 0.5);
      margin: 12px 0;
    }
    & > ul {
      height: 40px;
      margin: 12px 0;
      display: flex;
      border-radius: 6px;
      overflow: hidden;
      li {
        flex: 1;
        line-height: 40px;
        width: 240px;
        height: 40px;
        background: #fff;
        font-weight: 400;
        color: #333;
        cursor: pointer;
        text-align: center;
      }

      .sessionActive {
        background: #6521D7;
        font-weight: bold;
        color: #fff;
        -webkit-text-stroke: 1 rgba(0, 0, 0, 0);
      }
    }
  }
  > .fight-box {
    width: 1200px;
    height: 415px;
    // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
    position: relative;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.6);
    overflow: hidden;
    .line-up-ban {
      position: absolute;
      top: 24px;
      left: 0;
      width: 100%;
      font-size: 24px;
      font-weight: bold;
      color: #999;
      text-align: center;
      -webkit-text-stroke: 1 rgba(0, 0, 0, 0);
      filter: Gray;
      -webkit-filter: grayscale(100%);
      & > div {
        width: 400px;
        display: inline-block;
        text-align: right;
      }
    }
    .line-up-pick {
      position: absolute;
      top: 76px;
      left: 0;
      width: 100%;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      vertical-align: middle;
      & > div {
        width: 400px;
        display: inline-block;
        text-align: right;
      }
      span {
        margin: 0 10px;
        display: inline-block;
        width: 50px;
        height: 31px;
        font-size: 24px;
        font-weight: bold;
        color: #6521D7;
      }
    }
    .chart-box {
      width: 537px;
      height: 230px;
      position: absolute;
      left: 30px;
      bottom: 30px;
      .mask_box {
        background:rgba(204, 204, 204, 0.2);
        // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
        opacity: 0.5;
        position: absolute;
        top: 30px;
        left: 52px;
        width: 90%;
        height: 75%;
        z-index: 1;
      }
    }
    .chart-box1 {
      width: 537px;
      height: 230px;
      position: absolute;
      bottom: 30px;
      right: 30px;
      .mask_box {
        background:rgba(204, 204, 204, 0.2);
        // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
        opacity: 0.5;
        position: absolute;
        top: 30px;
        left: 52px;
        width: 90%;
        height: 75%;
        z-index: 1;
      }
      .chart-text {
        width: 168px;
        height: 16px;
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;
        color:#999;
        position: absolute;
        bottom: 0px;
        right: 0px;
      }
      .chart-tabs {
        position: absolute;
        top: 0px;
        right: 2px;
        z-index: 3;
        .chart-tab {
          display: inline-flex;
          font-size: 14px;
          font-weight: bold;
          line-height: 19px;
          color: #999;
          margin-left: 24px;
          cursor: pointer;
        }
        .chart-tab-actived {
          font-weight: bold;
          color: #6521D7;
          // text-shadow: 0 4px 6px rgba(42, 47, 247, 0.8);
        }
      }
    }
  }
  > .ranking-box {
    background: rgba(255, 255, 255, 0.6);
    height: 324px;
    width: 1200px;
    // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    display: table-cell;
    vertical-align: middle;
    .ranking {
      width: 876px;
      height: 100%;
      display: flex;
      justify-content: space-between;
      margin: 0 auto;
      .chart-box {
        width: 140px;
        height: 300px;
        position: relative;
        h2 {
          font-size: 24px;
          font-weight: bold;
          line-height: 31px;
          color: #333;
          text-align: center;
          margin: 94px 0 24px 0;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .home_img {
          position: absolute;
        }
        .visitor_img {
          position: absolute;
          bottom: 41px;
          left: 30px;
        }
      }
      .center {
        flex: 1;
        text-align: center;

        .percentage-player {
          margin-bottom: 4px;
          text-align: center;
        }
      }
    }
  }
  > .details-box {
    .details-box-one {
      width: 100%;
      // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
      border-radius: 6px;
      margin-bottom: 12px;
      background:rgba(51, 198, 214, 0.2);
      overflow: hidden;
      .details-box-centent {
        width: 100%;
        height: 100%;
        .details-title {
          width: 100%;
          display: flex;
          margin: 0 auto;
          span {
            text-align: center;
            margin: 0 20px;
          }
          .title-name {
            width: 130px;
            font-size: 18px;
            font-weight: 400;
            line-height: 30px;
            color: #ffffff;
            margin-left: 40px;
            text-align: left;
            display: inline-flex;
            align-items: center;
            vertical-align: middle;
            .gameName {
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              width: 108px;
              display: inline-block;
              margin: 0;
              margin-left: 4px;
            }
          }
          .title-item {
            width: 110px;
            font-size: 16px;
            font-weight: 400;
            line-height: 30px;
            color: #878b9a;
          }
        }
        .details-row {
          width: 100%;
          height: 70px;
          display: flex;
          margin: 0 auto;
          margin: 12px 0;
          span {
            text-align: center;
            margin: 0 18px;
          }
          .row-name {
            width: 130px;
            font-size: 16px;
            font-weight: 400;
            line-height: 70px;
            color: #ffffff;
            margin-left: 40px;
            position: relative;
            .img {
              position: absolute;
              top: 18px;
              left: 0px;
            }
            .grade {
              background-color: #0d1b40;
              width: 14px;
              height: 16px;
              font-size: 12px;
              font-weight: 400;
              line-height: 16px;
              color: #ffffff;
              position: absolute;
              left: -18px;
              bottom: 12px;
            }
            .userName {
              position: absolute;
              top: 11px;
              left: 43px;
              line-height: 25px;
              display: inline-block;
              width: 100px;
              margin: 0;
              .name {
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                display: block;
                width: 80px;
                margin: 0;
              }
            }
          }
          .row-item {
            width: 115px;
            font-size: 14px;
            font-weight: 400;
            line-height: 70px;
            color: #fff;
          }
        }
      }
    }
    .details-box-two {
      width: 100%;
      // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
      border-radius: 6px;
      margin-bottom: 12px;
      overflow: hidden;
      background:rgba(240, 83, 101, 0.2);
      .details-box-centent {
        width: 100%;
        height: 100%;
        .details-title {
          width: 100%;
          display: flex;
          margin: 0 auto;
          span {
            text-align: center;
            margin: 0 20px;
          }
          .title-name {
            width: 130px;
            font-size: 18px;
            font-weight: 400;
            line-height: 30px;
            color: #ffffff;
            margin-left: 40px;
            text-align: left;
            display: inline-flex;
            align-items: center;
            vertical-align: middle;
            .gameName {
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              width: 108px;
              display: inline-block;
              margin: 0;
              margin-left: 4px;
            }
          }
          .title-item {
            width: 110px;
            font-size: 16px;
            font-weight: 400;
            line-height: 30px;
            color: #878b9a;
          }
        }
        .details-row {
          width: 100%;
          height: 70px;
          display: flex;
          margin: 0 auto;
          margin: 12px 0;
          span {
            text-align: center;
            margin: 0 18px;
          }
          .row-name {
            width: 130px;
            font-size: 16px;
            font-weight: 400;
            line-height: 70px;
            color: #ffffff;
            margin-left: 40px;
            position: relative;
            .img {
              position: absolute;
              top: 18px;
              left: 0px;
            }
            .grade {
              background-color: #0d1b40;
              width: 14px;
              height: 16px;
              font-size: 12px;
              font-weight: 400;
              line-height: 16px;
              color: #ffffff;
              position: absolute;
              left: -18px;
              bottom: 12px;
            }
            .userName {
              position: absolute;
              top: 11px;
              left: 43px;
              line-height: 25px;
              display: inline-block;
              width: 100px;
              margin: 0;
              .name {
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                display: block;
                width: 80px;
                margin: 0;
              }
            }
          }
          .row-item {
            width: 115px;
            font-size: 14px;
            font-weight: 400;
            line-height: 70px;
            color: #fff;
          }
        }
      }
    }
  }
  .table {
    padding: 28px 40px;
    .table-header {margin-bottom:10px;
      & > .flex,
      .zb {
        font-size: 16px;
        color: #878b9a;
      }
    }
    .table-body {
      font-size: 14px;
    }
    & > li {
      display: flex;
      .hero-pic {
        width: 200px;
        display: flex;
        align-items: center;
        & > div {
          position: relative;
          width:40px;
          height: 40px;
          span {
            position: absolute;
            width: 16px;
            height: 16px;
            color: #fff;
            bottom: 0;
            left: 0;
            background: #0d1b40;
            font-size: 12px;
          }
        }
        .name {
          margin-left: 6px;
        }
      }
      .zb {
        width: 160px;
        .el-image {
          margin-bottom: 8px;
          margin-right: 12px;
          &:nth-child(4) {
            margin-right: 0;
          }
        }
      }
      .flex {
        flex: 1;
      }
      .kda {
        text-align: center;
        font-size: 16px;
        span {
          color: #888888;
        }
      }
    }
  }
  .pie-wrapper {
    position: relative;
    width: 140px;
    height: 140px;
    .home_img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .row-bar-colum {
    margin-bottom: 8px;
  }
  .name-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-left: 6px;
    font-size: 16px;
    .role_name {
      font-weight: bold;
    }
  }
  .achievement-wrapper {
    margin-top: 44px;
    .achievement {
      display: flex;
      & > div {
        flex: 1;
        &.home {
          padding-right: 22px;
          & > div {
            display: flex;
            justify-content: flex-end;
          }
        }
        &.away {
          padding-left: 22px;
          & > div {
            display: flex;
            justify-content: flex-start;
          }
        }
        .top {
          margin-bottom: 13px;
        }
        .num {
          display: inline-block;
          width: 30px;
        }
      }
    }
    .proportion_item {
      margin-top: 40px;
      padding: 0 12px;
      .row-bar {
        margin-bottom: 24px;
      }
    }
  }
}
</style>
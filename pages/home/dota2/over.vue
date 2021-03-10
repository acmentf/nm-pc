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
          game_id="DOTA2"
          style="position: absolute; top:0px; right:0;"
          :ids="topData.mnl.match_id"
        />
      </div>
      <div style="margin-bottom:12px" class="end-box">
        <div class="end">
          <div class="centent_box_gamevs">
            <div class="gamevs">
              <div class="home">
                <img
                  style="margin:0 12px 0 0px;"
                  width="24px"
                  height="24px"
                  src="/images/victory_b.png"
                  v-show="topData.mnl.home_score>topData.mnl.away_score"
                />
                <span class="name">{{topData.mnl.team_home.team_short_name}}</span>
                <el-image
                  style="margin:0 20px 0 12px;width:30px;height:30px;"
                  :src="topData.mnl.team_home.team_img"
                  fit="contain"
                >
                  <div slot="error" class="image-slot">
                    <img src="/images/team_default.png" alt width="30" />
                  </div>
                </el-image>
                <span class="gamevs-one">{{topData.mnl.home_score}}</span>
              </div>
              <span class="gamevs-two">:</span>
              <div class="away">
                <span class="gamevs-three">{{topData.mnl.away_score}}</span>
                <el-image
                  style="margin:0 20px 0 12px;width:30px;height:30px;"
                  :src="topData.mnl.team_away.team_img"
                  fit="contain"
                >
                  <div slot="error" class="image-slot">
                    <img src="/images/team_default.png" alt width="30" />
                  </div>
                </el-image>
                <span class="name">{{topData.mnl.team_away.team_short_name}}</span>
                <img
                  style="margin:0 0px 0 12px;"
                  width="24px"
                  height="24px"
                  src="/images/victory_r.png"
                  v-show="topData.mnl.home_score<topData.mnl.away_score"
                />
              </div>
            </div>
            <div class="over">已完赛</div>
          </div>
        </div>
        <ul>
          <li
            v-for="(item,index) in game_num"
            :key="index"
            :class="{'sessionActive':item.value === currentTab}"
            @click="tabChange(item.value)"
          >{{item.lable}}</li>
        </ul>
        <div class="log-box">
          <div v-if="true">
            <!-- 成就 -->
            <div class="achievement">
              <div class="home">
                <div class="top">
                  <span>
                    <img src="/images/purple_meat.png" alt width="20" />
                    <span class="num r">{{resources_info.team_res_home.f_roushan}}</span>
                  </span>
                  <span>
                    <img src="/images/home-t.png" alt width="20" />
                    <span class="num r">{{resources_info.team_res_home.tower}}</span>
                  </span>
                </div>
              </div>
              <div class="away">
                <div class="top">
                  <span>
                    <img src="/images/pink_meat.png" alt width="20" />
                    <span class="num r">{{resources_info.team_res_away.f_roushan}}</span>
                  </span>
                  <span>
                    <img src="/images/away-t.png" alt width="20" />
                    <span class="num r">{{resources_info.team_res_away.tower}}</span>
                  </span>
                </div>
                <!-- <div class="bottom">
                  <span>
                    <img src="/images/away-t.png" alt width="20" />
                    <span class="num r">{{resources_info.team_res_away.tower}}</span>
                  </span>
                  <span>
                    <img src="/images/away-sj.png" alt width="20" />
                    <span class="num">{{resources_info.team_res_away.crystal}}</span>
                  </span>
                </div>-->
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
              <row-bar
                class="row-bar"
                direction="row"
                :pramas="{home:resources_info.team_res_home.fexp,away:resources_info.team_res_away.fexp}"
                dw="k"
                :bg="true"
              >经验</row-bar>
              <row-bar
                class="row-bar"
                direction="row"
                :pramas="{home:resources_info.team_res_home.flast_hits,away:resources_info.team_res_away.flast_hits}"
                dw
                :bg="true"
              >正补</row-bar>
              <!-- last_hits，denies -->
              <row-bar
                class="row-bar"
                direction="row"
                :pramas="{home:resources_info.team_res_home.fdenies,away:resources_info.team_res_away.fdenies}"
                :bg="true"
                dw
              >反补</row-bar>
              <row-bar
                class="row-bar"
                direction="row"
                :pramas="{home:resources_info.team_res_home.f_level,away:resources_info.team_res_away.f_level}"
                dw
                :bg="true"
              >等级</row-bar>
            </div>
          </div>
          <defaultBox
            v-else
            style="margin-top:50px;"
            width="160px"
            height="160px"
            src="/images/follow_null.png"
          >暂无对战数据</defaultBox>
        </div>
      </div>
      <app-title style="margin:66px 0 24px 0" title="对战阵容" type="1" color="#333" />
      <div class="fight-box">
        <div v-if="true" style="width:100%;height:100%;position:absolute;z-index:2;">
          <div class="line-up-ban">
            <div>
              <el-image
                v-for="(item,index) in roleselect_info.role_ban_home.role_list"
                :key="index+'left'"
                style="width: 32px; height: 32px;margin-right:20px;"
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
              type="dota2"
            />
            <div class="mask_box"></div>
          </div>
          <div class="chart-box1">
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
              v-if="battle_info.length"
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
        <div class="ranking-box-left">
          <div v-if="data_rank_list.length" class="ranking">
            <div class="ranking-header">
              <div class="header-title">
                <img src="/images/ranking.png" alt width="22" />
                <span>选手数据</span>
              </div>
              <table-select
                style="width:90px;"
                v-model="typeSelect"
                :options="selectVal"
                @change="typeChange"
              ></table-select>
            </div>
            <div class="center">
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
          </div>
          <defaultBox
            v-else
            width="200px"
            height="200px"
            src="/images/team_top_default.png"
            style="padding-top:50px"
          >暂无数据排行</defaultBox>
        </div>
        <div class="ranking-box-right">
          <div v-if="rcffj_list.length" class="ranking">
            <div class="ranking-header">
              <div class="header-title">
                <img src="/images/ranking.png" alt width="22" />
                <span>英雄数据</span>
              </div>
            </div>
            <div class="center" style="padding: 0 25px">
              <ul class="row-bar-list">
                <li v-for="(item,index) in rcffj_list" :key="index">
                  <row-bar
                    :dw="item.type ==1?'%':''"
                    :pramas="{
                    home: Number(item.a_value),
                    away:  Number(item.b_value),
                    total: Number(item.a_value) +  Number(item.b_value)
              }"
                  >{{item.name}}</row-bar>
                </li>
              </ul>
            </div>
          </div>
          <defaultBox v-else width="200px" height="200px" src="/images/team_top_default.png">暂无数据排行</defaultBox>
        </div>
      </div>
      <app-title style="margin:66px 0 24px 0" title="对战详情" type="1" color="#333" />
      <div class="details-box">
        <div class="details-box-one">
          <div v-if="role_attr_info_home.player" class="details-box-centent">
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
                <div class="flex">正/反补</div>
                <div class="flex">经济</div>
                <div class="flex">XPM</div>
                <div class="flex">GPM</div>
                <div class="zb" style="text-align: center;">物品</div>
                <!-- <div class="flex">天赋</div> -->
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
                <div class="flex">{{item.play_info.last_hits}}/{{item.play_info.denies}}</div>
                <div class="flex">{{item.play_info.money}}</div>
                <div class="flex">{{item.play_info.xpm}}</div>
                <div class="flex">{{item.play_info.gpm}}</div>
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
                <!-- <div class="flex">
                  <el-image
                    style="width:30px;margin-right:8px"
                    :src="_item"
                    v-for="(_item,_index) in item.play_info.runes"
                    :key="_index"
                  >
                    <div slot="error" class="image-slot">
                      <img src="/images/team_default.png" alt width="30" />
                    </div>
                  </el-image>
                </div>-->
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
          <div v-if="role_attr_info_away.player" class="details-box-centent">
            <ul class="table">
              <li class="table-header">
                <div class="hero-pic">
                  <el-image style="width:30px;height:30px;" :src="role_attr_info_away.team_img">
                    <div slot="error" class="image-slot">
                      <img src="/images/team_default.png" alt width="30" />
                    </div>
                  </el-image>&nbsp;
                  <span class="team-name">{{role_attr_info_away.team_short_name}}</span>
                </div>
                <div class="flex">KDA</div>
                <div class="flex">参战率</div>
                <div class="flex">正/反补</div>
                <div class="flex">经济</div>
                <div class="flex">XPM</div>
                <div class="flex">GPM</div>
                <div class="zb" style="text-align: center;">物品</div>
                <!-- <div class="flex">天赋</div> -->
              </li>
              <li
                class="table-body"
                v-for="(item,index) in role_attr_info_away.player"
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
                <div class="flex">{{item.play_info.last_hits}}/{{item.play_info.denies}}</div>
                <div class="flex">{{item.play_info.money}}</div>
                <div class="flex">{{item.play_info.xpm}}</div>
                <div class="flex">{{item.play_info.gpm}}</div>
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
                <!-- <div class="flex">
                  <el-image
                    style="width:30px;margin-right:8px"
                    :src="_item"
                    v-for="(_item,_index) in item.play_info.runes"
                    :key="_index"
                  >
                    <div slot="error" class="image-slot">
                      <img src="/images/team_default.png" alt width="30" />
                    </div>
                  </el-image>
                </div>-->
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
export default {
  layout: "home",
  name: "processing",
  components: {
    probabilityChart,
    experienceChart,
    NotStarted,
    dataRatio,
    defaultBox
  },
  async asyncData({ query, store }) {
    let { match_id, num } = query;
    store.dispatch("matchDetail/_setParmars", {
      game_id: "Dota2",
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
      data_rank_list,
      rcffj_list
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
      selectVal,
      rcffj_list
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
                            c1: "#EB47B1",
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
      typeSelect: 1
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
        data_rank_list,
        rcffj_list
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
      this.rcffj_list = rcffj_list;
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
  overflow: hidden;
  .end-box {
    .end {
      height: 158px;
      background: rgba(255, 255, 255, 0.6);
      // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
      overflow: hidden;
      border-radius: 6px;
      margin: 0 auto;
      .centent_box_gamevs {
        width: 100%;
        font-size: 20px;
        font-weight: bold;
        color: #333;
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
          color: #999;
          margin-top: 12px;
        }
      }
    }
    .log-box {
      padding-top: 30px;
      overflow: hidden;
      width: 100%;
      height: 308px;
      // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
      background: rgba(255, 255, 255, 0.6);
      margin: 12px 0;
      .achievement {
        display: flex;
        font-size: 0;
        & > div {
          flex: 1;
          &.home {
            text-align: right;
            padding-right: 38px;
          }
          &.away {
            padding-left: 38px;
          }
          & > div > span {
            img {
              vertical-align: top;
            }
            .num {
              display: inline-block;
              line-height: 20px;
              height: 20px;
              width: 20px;
              text-align: right;
              font-size: 14px;
              &.r {
                margin-right: 20px;
              }
            }
          }
          & > .top {
            margin-bottom: 13px;
          }
        }
      }
      .centent_box_score {
        width: 100%;
        font-size: 14px;
        font-weight: 400;
        line-height: 19px;
        color: #ffffff;
        margin-top: 30px;
        text-align: center;
        & > div {
          display: inline-flex;
          justify-content: flex-end;
          align-items: center;
          vertical-align: middle;
          width: 300px;
          margin-right: 68px;
        }
      }
      .proportion_item {
        margin: 0 auto;
        width: 768px;
        .row-bar {
          margin: 22px 0;
        }
      }
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
        color: #2159e5;
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
          color: #a1a1a1;
          margin-left: 24px;
          cursor: pointer;
        }
        .chart-tab-actived {
          font-weight: bold;
          color: #1d69de;
          text-shadow: 0 4px 6px rgba(42, 47, 247, 0.8);
        }
      }
    }
  }
  > .ranking-box {
    height: 324px;
    width: 1200px;
    // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    display: flex;
    .ranking-box-left {
      width: 440px;
      margin-right: 20px;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 6px;
    }
    & > div.ranking-box-right {
      border-radius: 6px;
      flex: 1;
      background: rgba(255, 255, 255, 0.6);
    }
    .ranking {
      height: 100%;

      margin: 0 auto;
      .chart-box {
        width: 140px;
        height: 300px;
        position: relative;
        h2 {
          font-size: 24px;
          font-weight: bold;
          line-height: 31px;
          color: #ffffff;
          text-align: center;
          margin: 94px 0 24px 0;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .visitor_img {
          position: absolute;
          bottom: 41px;
          left: 30px;
        }
      }
      .center {
        padding: 0 40px;
        text-align: center;
        width: 100%;
        .percentage-player {
          margin-bottom: 4px;
          text-align: center;
        }
        .row-bar-colum {
          margin-bottom: 8px;
        }
      }
      .ranking-header {
        align-items: center;
        display: flex;
        justify-content: space-between;
        padding: 16px 40px 20px 12px;
        font-size: 18px;
        color: #6521D7;
        font-weight: bold;
      }
      .row-bar-list {
        display: flex;
        flex-wrap: wrap;
        & > li {
          width: 50%;
          text-align: right;
          padding: 0 15px;
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
        color: #666;
      }
    }
    .table-body {
      font-size: 14px;
    }
    & > li {
      display: flex;
      .hero-pic {
        width: 160px;
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
          margin-right: 8px;
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
  .name-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-left: 6px;
    font-size: 16px;
    .player_name{
      width: 100%;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
    .role_name {
      font-weight: bold;
    }
  }
}
</style>
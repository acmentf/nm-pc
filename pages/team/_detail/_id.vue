<!--
 * @Author: FeikeQ
 * @Date: 2020-12-11 09:34:26
 * @LastEditTime: 2021-02-25 10:50:32
 * @LastEditors: FeikeQ
 * @FilePath: /nami-pc/pages/team/_detail/_id.vue
 * @Description: 
-->
<template>
  <div class="player_detail">
    <app-follow v-if="false"
      type="player"
      :game_id="theGameID"
      :ids="playerID"
      style="position: absolute; top:40px; right:0;"
    />

    <Breadcrumb>
      <breadcrumb-item>战队详情</breadcrumb-item>
      <breadcrumb-item>队员详情</breadcrumb-item>
    </Breadcrumb>
    <div style="height:20px"></div>

    <div class="info">
      <div class="base">
        <h2>{{ info.player_name }}</h2>
        <p>
          <img
            v-if="theGameID.toUpperCase() !== 'CSGO'"
            :src="
                            `/images/station_${
                                imgKey[theGameID.toUpperCase()][
                                    info.player_position_id
                                ]
                            }.png`
                        "
            :alt="info.player_position_id"
          />
          {{ info.player_real_name }}
        </p>
      </div>
      <div class="logo" :player_id="playerID">
        <img
          :src="info.player_img"
          onerror="this.src='/images/player_default.png';this.onerror=null"
        />
      </div>
      <div class="attr">
        <div class="itembox">
          <p>
            <em>战队：</em>
            <img
              :src="info.player_team_logo"
              onerror="this.src='/images/team_default.png';this.onerror=null"
            />
            <span>{{ info.player_team_name }}</span>
          </p>
          <p>
            <em>赛区：</em>
            <!-- <img src="/images/LPL.png" /> -->
            <span>{{ info.player_region_name }}</span>
          </p>
          <p>
            <em>国籍：</em>
            <img
              :src="info.player_conutry_logo"
              onerror="this.src='/images/country_default.png';this.onerror=null"
            />
            <span>{{ info.player_conutry_name }}</span>
          </p>
        </div>
      </div>
    </div>
    <div style="height:60px"></div>

    <div class="data">
      <app-title title="基础数据" type="1" color="#333" />
      <div class="select_filter">
        <span>筛选条件</span>
        <app-select
          v-model="datas.type"
          :options="datas.typeFilter"
          style="width:122px"
          @change="getData"
        />

        <span>{{ datas.type == 1 ? "赛事" : "场次" }}筛选</span>
        <app-select
          v-model="datas.sub_type"
          :options="selectDataList"
          style="width:257px"
          @change="getData"
        />
      </div>

      <div class="tags" style="margin: 0 -6px;">
        <p v-for="(item, index) in datas.tags" :key="index">
          <b>{{item.value}}{{item.type===1?"%":''}}</b>
          {{item.name}}
        </p>
      </div>
      <br />
      <div class="subdata">
        <div class="radar">
          <app-title title="能力图谱" icon="/images/radar.png" style="padding:10px;" />
          <div class="radar-chart" ref="radarChart"></div>
        </div>

        <div class="table" v-if="theGameID != 'csgo'">
          <app-title title="常用英雄" icon="/images/hero_title.png" style="padding:10px;" />
          <div class="table-hero">
            <el-table
              :data="datas.heroeData"
              :default-sort="{
                                prop: 'date',
                                order: 'descending'
                            }"
              @row-click="tableRowClick"
              size="small"
              height="350"
            >
              <el-table-column prop="rank" label="排名" align="center" width="50">
                <template slot-scope="scope">
                  {{
                  scope.$index + 1
                  }}
                </template>
              </el-table-column>

              <el-table-column prop="hero" label="英雄" align="left">
                <template slot-scope="scope">
                  <img
                    :src="
                                            scope.row[scope.column.property].pic
                                        "
                    style="width:20px;height:20px;border-radius:50%;"
                  />
                  {{ scope.row[scope.column.property].name }}
                </template>
              </el-table-column>

              <el-table-column prop="attendances" label="出场数" align="center" width="78" sortable></el-table-column>

              <el-table-column prop="winning" label="胜场率" align="center" width="78" sortable></el-table-column>

              <el-table-column prop="firstBlood" label="一血率" align="center" width="78" sortable></el-table-column>

              <el-table-column prop="tower" label="一塔率" align="center" width="78" sortable></el-table-column>

              <el-table-column prop="pentaKill" label="五杀率" align="center" width="78" sortable></el-table-column>

              <el-table-column prop="decaKill" label="十杀率" align="center" width="78" sortable></el-table-column>
            </el-table>
          </div>
        </div>

        <div class="table" v-if="theGameID == 'csgo'">
          <app-title title="常用武器" icon="/images/gun.png" style="padding:10px;" />
          <div class="table-hero">
            <el-table
              :data="datas.gunData"
              :default-sort="{
                                prop: 'date',
                                order: 'descending'
                            }"
              @row-click="tableRowClick"
              size="small"
              height="350"
            >
              <div slot="empty">
                <defaultBox width="160px" height="160px" src="/images/honor-null.png">暂无武器数据</defaultBox>
              </div>
              <el-table-column prop="rank" label="排名" align="center" width="50">
                <template slot-scope="scope">
                  {{
                  scope.$index + 1
                  }}
                </template>
              </el-table-column>

              <el-table-column prop="weapon_name" label="武器" align="left" class-name="nowrap">
                <template slot-scope="scope">
                  <img
                    :src="scope.row.weapon_img"
                    style="width:20px;height:20px;object-fit: cover;"
                  />
                  {{ scope.row.weapon_name }}
                </template>
              </el-table-column>

              <el-table-column prop="weapon_kill" label="击杀数" align="center" sortable></el-table-column>

              <el-table-column prop="weapon_rate" label="击杀占比" align="center" width="88" sortable></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <!-- <div class="subdata">
                <el-pagination
                    :page-size="5"
                    :total="100"
                    background
                    layout=" total,prev, pager, next"
                    style="width:100%;"
                ></el-pagination>
      </div>-->
    </div>
    <div style="height:60px"></div>

    <div class="match">
      <app-title title="战队比赛" type="1" color="#333" />
      <div style="height:20px"></div>
      <div class="columns">
        <div>
          <app-title :title="theGameID.toUpperCase()+'·近期赛果'" icon="/images/log.png" />

          <match-list
            v-for="(item, index) in match.recent"
            :key="index"
            :title="theGameID.toUpperCase()+'·'+item.tournament_name"
            :icon="`/images/${theGameID.toLowerCase()}.png`"
            :state="['异常','未开赛','进行中','完场'][item.tournament_statu]"
            :alt="item.tournament_id"
            :data="item.list"
          />
        </div>
        <div>
          <app-title :title="theGameID.toUpperCase()+'·未来赛程'" :icon="`/images/log.png`" />
          <match-list
            v-for="(item, index) in match.future"
            :key="index"
            :title="theGameID.toUpperCase()+'·'+item.tournament_name"
            :icon="`/images/${theGameID.toLowerCase()}.png`"
            :data="item.list"
            type="vs"
          />
          <defaultBox
            v-if="!match.future.length"
            style="margin-top:120px;"
            width="260px"
            height="260px"
            src="/images/match_list.png"
          >暂无未来赛程</defaultBox>
        </div>
      </div>
    </div>
    <div style="height:60px"></div>
  </div>
</template>

<script>
import appSelect from "~/components/common/appSelect";
import * as api from "@/api/team";
import defaultBox from "~/components/common/default";

export default {
  layout: "home",
  name: "team_detail",
  components: { appSelect, defaultBox },
  async asyncData({ app, params, query, store, env, $config }) {
    var _data = {
      teamID: params.detail,
      theGameID: query.game || store.state.common.game_id,
      playerID: params.id,
      info: {},
      datas: {
        run: false,
        type: 2,
        typeFilter: [],
        sub_type: 1,
        tournaments: null,
        tournamentsFilter: [],
        times: null,
        timesFilter: [],

        tags: [],
        radarChart: {
          name: null,
          indicator: [],
          v1: [],
          v2: []
        },
        heroeData: [
          {
            hero: {
              pic: "/images/hero_default.png",
              name: "潮汐海灵-加之无星"
            },
            attendances: 132,
            attendance: "31.53%",
            winning: 68.5,
            firstBlood: 31.8,
            tower: 77.7,
            pentaKill: 69.1,
            decaKill: 34.2
          }
        ]
      },
      match: {
        future: [
          {
            tournament_id: 982,
            tournament_name: "深渊联赛",
            tournament_statu: "",
            list: []
          }
        ],
        recent: []
      }
    };
    if (_data.theGameID == "all") _data.theGameID = "DOTA2";

    if (_data.theGameID.toUpperCase() == "CSGO") _data.datas.type = 1;

    if (process.server) {
      console.log("asyncData___server");
    } else {
      console.log("asyncData___client");
    }
    console.log("playerID:" + _data.playerID);
    console.log("teamID:" + _data.teamID);
    console.log("theGameID:" + _data.theGameID);

    if (_data.playerID) {
      let _info_res = await api.getPlayerInfo({
        game_id: _data.theGameID,
        team_id: _data.teamID * 1,
        player_id: _data.playerID * 1
      });

      _data.info = _info_res.info;
      _data.datas.typeFilter = _info_res.typeFilter;
      _data.datas.tournamentsFilter = _info_res.tournamentsFilter;
      _data.datas.tournaments = _info_res.tournaments;
      _data.datas.timesFilter = _info_res.timesFilter;
      _data.datas.times = _info_res.times;
      _data.datas.sub_type = _info_res.tournaments || _info_res.times; //初始值

      _data.datas.radarChart.name = _data.info.player_name;
    }

    // 战队详情-比赛页面 (复用战队的数据)
    let _match = await api.getTeamMatch({
      game_id: _data.theGameID,
      team_id: _data.teamID * 1
    });
    if (_match) {
      _data.match.recent = _match.recent; // 近期赛果
      _data.match.future = _match.future; // 未来赛程
    }

    // 战队详情-数据页面-数据展示部分
    let _datas = await api.getPlayerData({
      game_id: _data.theGameID,
      team_id: _data.teamID * 1,
      player_id: _data.playerID * 1,
      type: _data.datas.type,
      sub_type: _data.datas.sub_type
    });
    if (_datas) {
      _data.datas.tags = _datas.tags; // 标签集
      _data.datas.heroeData = _datas.heroeData; // 英雄榜单
      _data.datas.gunData = _datas.gunData; // 常用武器
      // 雷达图
      _data.datas.radarChart.indicator = _datas.radarChart.indicator;
      _data.datas.radarChart.v1 = _datas.radarChart.v1;
      _data.datas.radarChart.v2 = _datas.radarChart.v2;
    }

    return _data;
  },
  computed: {
    selectDataList() {
      return this.datas.type == 1
        ? this.datas.tournamentsFilter
        : this.datas.timesFilter;
    }
  },
  data() {
    return {
      imgKey: {
        CSGO: [],
        DOTA2: ["", 1, 2, 3, 4, 5],
        LOL: ["", "a", "b", "c", "d", "e"]
      }
    };
  },
  methods: {
    getData() {
      // console.log("查数据了..",this.datas);
      if (this.datas.run) return;
      this.datas.run = true;

      // 战队详情-数据页面-数据展示部分
      api
        .getPlayerData(
          {
            game_id: this.theGameID,
            team_id: this.teamID * 1,
            player_id: this.playerID * 1,
            type: this.datas.type,
            sub_type: this.datas.sub_type
          },
          data => {
            this.datas.run = false;
            console.log("战队详情-战队队员详情- 数据及比赛列表副本", data);
            this.datas.tags = data.tags; // 标签集
            this.datas.heroeData = data.heroeData; // 英雄榜单
            this.datas.gunData = data.gunData; // 常用武器

            // 雷达图
            this.datas.radarChart.indicator = data.radarChart.indicator;
            this.datas.radarChart.v1 = data.radarChart.v1;
            this.datas.radarChart.v2 = data.radarChart.v2;
            this.initChart("radarChart", this.datas.radarChart);
          }
        )
        .catch(err => {
          this.datas.run = false;
          console.log("战队详情-数据页面-数据展示部分 -ERR");
          console.log(err);
        });
    },
    tableRowClick(row, column, event) {
      if (this.$listeners && this.$listeners["rowClick"])
        this.$listeners["rowClick"](row, column, event);
    },
    formatter(row, column, cellValue, index) {
      return cellValue + "%";
    },
    initChart(domName, chartData) {
      var _data = {
        // title: {
        //     text: '基础雷达图'
        // },
        tooltip: {
          show: false
          // trigger: 'axis'
        },
        legend: {
          left: "center",
          top: 5,
          itemGap: 40,
          itemWidth: 46,
          itemHeight: 6,
          selectedMode:false,
          textStyle: {
            color: "#333",
            fontSize: 14
          }
        },
        radar: {
          startAngle: 60,
          center: ["50%", "55%"],
          radius: 80,
          name: {
            textStyle: {
              color: "#333",
              fontSize: 14,
              padding: [3, 5]
            },
            rich: {
              p: {
                color: "#333",
                align: "center",
                // backgroundColor: '#666',
                // padding: 2,
                // borderRadius: 4
                lineHeight: 20
              },
              a: {
                color: "#33C6D6"
              },
              b: {
                color: "#F05365"
              }
            },
            formatter: function(value, indicator) {
              return `${value.title}\n{a|${value.home}}{p|/}{b|${value.away}}`;
            }
          },
          indicator: [
            {
              name: {
                title: "一血率",
                home: "37.2",
                away: "87.3"
              },
              max: 100
            },
            {
              name: {
                title: "胜率",
                home: "37.2",
                away: "87.3"
              },
              max: 100
            },
            {
              name: {
                title: "五杀率",
                home: "37.2",
                away: "87.3"
              },
              max: 100
            },
            {
              name: {
                title: "十杀率",
                home: "37.2",
                away: "87.3"
              },
              max: 100
            },
            {
              name: {
                title: "场均时长",
                home: "37.2",
                away: "87.3"
              },
              max: 100
            },
            {
              name: {
                title: "一塔率",
                home: "37.2",
                away: "87.3"
              },
              max: 100
            }
          ],
          splitLine: {
            lineStyle: {
              color: [
                "rgba(112, 112, 112,0.4)",
                "rgba(112, 112, 112,0.4)",
                "rgba(112, 112, 112,0.4)",
                "rgba(112, 112, 112,0.4)",
                "rgba(112, 112, 112,0.4)",
                "rgba(112, 112, 112,0.4)",
                "rgba(112, 112, 112,0.4)",
                "rgba(112, 112, 112,0.4)"
              ]
            }
          },
          axisLine: {
            lineStyle: {
              color: "rgba(112, 112, 112,0.4)"
            }
          },
          splitArea: {
            show: false
          }
        },
        series: [
          {
            // name: '预算 vs 开销（Budget vs spending）',
            type: "radar",
            tooltip: {
              trigger: "item"
            },
            areaStyle: {
              opacity: 0.2
            },
            lineStyle: {
              width: 2,
              opacity: 1
            },
            symbol: "none",
            data: [
              {
                value: [51.6, 37.2, 77.1, 87.9, 12.3, 77],
                name: "RNG",
                itemStyle: {
                  color: "#33C6D6"
                }
              },
              {
                value: [68.5, 87.3, 66.6, 12, 34.7, 22],
                name: "战队均值",
                itemStyle: {
                  color: "#F05365"
                }
              }
            ]
          }
        ]
      };
      if (chartData.name) _data.series[0].data[0].name = chartData.name;
      if (chartData.indicator.length)
        _data.radar.indicator = chartData.indicator;
      if (chartData.v1.length) _data.series[0].data[0].value = chartData.v1;
      if (chartData.v2.length) _data.series[0].data[1].value = chartData.v2;

      console.log("this.datas.radarChart", _data);
      this.$nextTick(() => {
        var myChart = this.$echarts.init(this.$refs[domName]);
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(_data);
      });
    }
  },
  mounted() {
    this.initChart("radarChart", this.datas.radarChart);
  },
  head() {
    return {
      title: this.info.player_name + " - 队员详情",
      meta: [
        { name: "keywords", content: "队员详情" },
        {
          hid: "description", //为了避免子组件中的 meta 标签不能正确覆盖父组件中相同的标签而产生重复的现象，建议利用 hid 键为 meta 标签配一个唯一的标识编号。
          name: "description",
          content: "队员详情"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.player_detail {
  overflow: hidden;
  position: relative;
  .info {
    display: flex;
    align-items: center;
    .base {
      height: 52px;
      flex: 1;
      text-align: right;
      padding-right: 40px;
      h2 {
        font-size: 40px;
        font-weight: bold;
        line-height: 52px;
      }
      p {
        font-size: 16px;
        display: inline-flex;
        align-items: center;
        img {
          width: 24px;
          height: 24px;
          margin-right: 4px;
        }
      }
    }
    .logo {
      text-align: center;
      width: 140px;
      height: 140px;
      background-color: rgba(64, 64, 64, 0.43);
      border-radius: 50%;
      overflow: hidden;
      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .attr {
      flex: 1;
      padding-left: 40px;
      .itembox {
        p {
          margin: 8px 0;
          line-height: 21px;
          font-size: 16px;
          display: flex;
          align-items: center;
          img {
            width: 20px;
            height: 20px;
            margin-right: 10px;
          }
        }
      }
    }
  }

  .data {
    .select_filter {
      height: 19px;
      font-size: 14px;
      line-height: 19px;
      color: #999;
      text-align: center;
      margin: 20px;
      span {
        margin-left: 20px;
      }
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      p {
        width: 109px;
        height: 100px;
        background: rgba(255, 255, 255, 0.6);
        text-align: center;
        font-size: 16px;
        line-height: 50px;
        color: #666;
        border: 1px solid transparent;
        margin: 6px;
        overflow: hidden;
        &:hover {
          border: 1px solid #5D2BCF;
          // box-shadow: 0px 4px 6px rgba(42, 47, 247, 0.8);
        }
        b {
          font-size: 20px;
          color: #333;
          display: block;
          line-height: 20px;
          margin-top: 30px;
        }
      }
    }
    .subdata {
      display: flex;
      //   padding: 0 57px;
      .radar {
        width: 390px;
        height: 405px;
        background: rgba(255, 255, 255, 0.6);
        // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        .radar-chart {
          flex: 1;
        }
      }
      .table {
        flex: 1;
        height: 405px;
        background: rgba(255, 255, 255, 0.6);
        margin-left: 12px;
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        .table-hero {
          flex: 1;
        }
      }
    }
  }
  .match {
    .columns {
      display: flex;
      justify-content: space-between;
      & > div {
        padding: 12px;
        width: 594px;
        background-color:rgba(255, 255, 255, 0.6);
        // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.5);
        border-radius: 6px;
      }
    }
  }
}
</style>

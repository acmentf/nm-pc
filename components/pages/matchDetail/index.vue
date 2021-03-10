<!--
  功能：比赛详情 LOL Dota 公用组件
  作者：acmentf
  邮箱：985881328@qq.com
  时间：2021年02月01日 13:43:54
-->
<template>
  <div class="match-detail">
    <!-- 面包屑导航栏 -->
    <Breadcrumb>
      <breadcrumb-item>{{detailData.mnl.team_home.team_short_name}} VS {{detailData.mnl.team_away.team_short_name}}</breadcrumb-item>
    </Breadcrumb>
    <div class="not-start" v-if="status===1">
      <!-- 直播区域 start-->
      <div class="live-session">
        <!-- 比赛未开始（倒计时组件） -->
        <not-started></not-started>
        <!-- 双方对战信息 -->
        <div class="match-info">
          <div class="match-info-wrapper">
            <div class="teams">
              <div class="home-team">
                <span class="name">{{detailData.mnl.team_home.team_short_name}}</span>
                <el-image style="width:55px" :src="detailData.mnl.team_home.team_img">
                  <div slot="error" class="image-slot">
                    <default-img :size="55"></default-img>
                  </div>
                </el-image>
              </div>
              <span class="vs">VS</span>
              <div class="away-team">
                <el-image style="width:55px" :src="detailData.mnl.team_away.team_img">
                  <div slot="error" class="image-slot">
                    <default-img :size="55"></default-img>
                  </div>
                </el-image>
                <span class="name">{{detailData.mnl.team_away.team_short_name}}</span>
              </div>
            </div>
            <p class="team-status-str">未开始</p>
          </div>
        </div>
      </div>
      <!-- 选手整容 -->
      <div class="session">
        <app-title title="选手阵容" type="1" color="#E4E4E4" />
        <div class="player-container content">
          <ul class="position">
            <li
              v-for="(item,index) in position_list"
              :key="index"
              class="position-item"
              :class="actived ===item.position?'actived':''"
              @click="actived = item.position"
            >{{item.position_name}}</li>
          </ul>
          <div class="position-detail">
            <div class="player-info">
              <div style="margin-right:40px;">
                <h6 class="titleHero">常用英雄</h6>
                <div
                  style="display: inline-block;margin-left:20px;text-align:center;"
                  v-for="(item,index) in 2"
                  :key="index"
                >
                  <img
                    width="44px"
                    height="44px"
                    src="/images/hero.png"
                    alt="hero"
                    style="margin-bottom:8px;"
                  />
                  <br />
                  <span>
                    11/
                    <font color="#888888">33</font>
                  </span>
                </div>
              </div>
              <div class="charts-box">
                <h1 class="charts-title">
                  <span class="name">FPX·khansdfgsd</span>
                  <div class="line" style="border-bottom: 4px solid #8B65FF;"></div>
                </h1>
                <img
                  class="playerImg"
                  width="105px"
                  height="105px"
                  src="/images/avatar123.png"
                  alt="avatar123"
                />
                <div ref="pie" style="width:140px;height:140px;margin:0 auto;"></div>
                <div class="data-box" style="text-align:center;">
                  <h4 class="textStyle">胜率</h4>
                  <div class="dataCentent">
                    <img width="20px" height="20px" src="/images/victory_b.png" alt="victory_b" />
                    <div style="display: inline-block;width:30px">3</div>
                    <img width="20px" height="20px" src="/images/time123.png" alt="time123" />
                    <div style="display: inline-block; width:30px">2</div>
                    <div class="dataText" style="color: #8B65FF;">75.0%</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="player-chart">
              <div class="radar-chart" ref="ability"></div>
            </div>
            <div class="player-info">
              <div class="charts-box">
                <h1 class="charts-title">
                  <span class="name">FPX·khansdfgsd</span>
                  <div class="line" style="border-bottom: 4px solid #EB47B1;"></div>
                </h1>
                <img
                  class="playerImg"
                  width="105px"
                  height="105px"
                  src="/images/avatar123.png"
                  alt="avatar123"
                />
                <div ref="pie1" style="width:140px;height:140px;margin:0 auto;"></div>
                <div class="data-box" style="text-align:center;">
                  <h4 class="textStyle">胜率</h4>
                  <div class="dataCentent">
                    <img width="20px" height="20px" src="/images/victory_b.png" alt="victory_b" />
                    <div style="display: inline-block;width:30px">3</div>
                    <img width="20px" height="20px" src="/images/time123.png" alt="time123" />
                    <div style="display: inline-block;width:30px">3</div>
                    <div class="dataText" style="color: #EB47B1;">75.0%</div>
                  </div>
                </div>
              </div>
              <div style="margin-left:40px;">
                <h6 class="titleHero" style="text-align:left;">常用英雄</h6>
                <div
                  style="display: inline-block;margin-right:20px;text-align:center;"
                  v-for="(item,index) in 3"
                  :key="index"
                >
                  <img
                    width="44px"
                    height="44px"
                    src="/images/hero.png"
                    alt="hero"
                    style="margin-bottom:8px;"
                  />
                  <br />
                  <span>
                    11/
                    <font color="#888888">33</font>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NotStarted from "~/components/pages/home/noStarted";
export default {
  props: {
    detailData: {
      type: Object,
      default: () => ({ lvs: {}, mnl: {} })
    }
  },
  name: "match-detail",
  components: { NotStarted },
  data() {
    return {
      status: 1, //比赛状态 1未开始 2进行中 3已结束
      position_list: [
        {
          position: 1,
          position_name: "ADC"
        },
        {
          position: 2,
          position_name: "中单"
        },
        {
          position: 3,
          position_name: "上单"
        },
        {
          position: 4,
          position_name: "打野"
        },
        {
          position: 5,
          position_name: "辅助"
        }
      ],
      actived: 1,
      radarChart: {
        tooltip: {
          show: false
          // trigger: 'axis'
        },
        legend: {
          left: "center",
          top: 20,
          itemGap: 40,
          itemWidth: 26,
          itemHeight: 6,
          textStyle: {
            color: "#fff",
            fontSize: 14
          }
        },
        radar: {
          startAngle: 150,
          angleAxis: { clockwise: true },
          center: ["50%", "55%"],
          radius: 60,
          name: {
            textStyle: {
              color: "#fff",
              fontSize: 14,
              padding: [3, 8]
            },
            rich: {
              p: {
                color: "#999",
                align: "center",
                // backgroundColor: '#666',
                // padding: 2,
                // borderRadius: 4
                lineHeight: 20
              },
              a: {
                color: "#6823FE"
              },
              b: {
                color: "#E94BBA"
              },
              span: {
                color: "#fff",
                align: "center"
              }
            },
            formatter: function(value, indicator) {
              // if (value.title.indexOf("率") !== -1) {
              //   return `{span|${value.title}}\n{a|${value.home}%}{p|/}{b|${value.away}%}`;
              // } else {
              //   return `{span|${value.title}}\n{a|${value.home}}{p|/}{b|${value.away}}`;
              // }
              return `{span|${value.title}}\n{a|${value.home}}{p|/}{b|${value.away}}`;
            }
          },
          indicator: [],
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
            data: []
          }
        ]
      }
    };
  },
  computed: {},
  watch: {
    detailData: {
      handler(val) {
        this.status = val.mnl.status_id;
      },
      deep: true
    }
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang='less' scoped>
.match-detail {
  & > div {
    margin-top: 33px;
    .teams {
      display: flex;
      justify-content: center;
      align-items: center;
      & > div {
        display: flex;
        align-items: center;
        .name {
          font-weight: bold;
          font-size: 30px;
        }
        &.home-team {
          .name {
            color: #8b65ff;
            margin-right: 12px;
          }
        }
        &.away-team {
          .name {
            color: #eb4ab6;
            margin-left: 12px;
          }
        }
      }
      .vs {
        color: #bbbbbb;
        font-size: 26px;
        padding: 0 20px;
        font-weight: bold;
      }
    }
    .row-box {
      margin-top: 26px;
      .row-bar-colum {
        margin-bottom: 16px;
      }
    }
    .live-session {
      display: flex;
      justify-content: space-between;
      .match-info {
        flex: 1;
        height: 488px;
        border-radius: 6px;
        background: rgba(15, 30, 69, 0.5);
        margin-left: 12px;
        padding: 32px 24px 0 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        & > .match-info-wrapper {
          .team-status-str {
            color: #888888;
            font-weight: bold;
            font-size: 24px;
            margin-top: 12px;
            text-align: center;
          }
          .win-rate {
            margin-top: 68px;
            & > .title {
              color: #ffffff;
              font-weight: 400;
              font-size: 16px;
              & > span {
                font-size: 12px;
                color: #888888;
              }
            }
          }
        }
      }
    }
    .session {
      margin-top: 60px;
      .content {
        margin-top: 20px;
        border-radius: 6px;
        overflow: hidden;
        .table-header-right {
          display: flex;
          & > div {
            margin-left: 24px;
            font-size: 14px;
            color: #bbb;
          }
        }
        .pie-box {
          position: relative;
          .team-pic {
            width: 100px;
            position: absolute;
            height: 100px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
        &.player-container {
          .position {
            display: flex;
            justify-content: center;
            align-items: center;
            background: #0f1e45;
            & > li {
              font-size: 16px;
              height: 40px;
              line-height: 40px;
              flex: 1;
              text-align: center;
              color: #888888;
              &:hover {
                cursor: pointer;
              }
              &.actived {
                background: linear-gradient(90deg, #2b2bf9 0%, #1b74d9 100%);
                cursor: text;
                color: #fff;
                font-weight: bold;
              }
            }
          }
          .position-detail {
            padding: 40px 0;
            background: rgba(15, 30, 69, 0.5);
            .position-detail-top {
              display: flex;
              justify-content: center;
              align-items: center;
              .home,
              .away {
                flex: 1;
                display: flex;

                &.home {
                  justify-content: flex-end;
                }
                .player-info {
                  text-align: center;
                  color: #fff;
                  font-size: 24px;
                  font-weight: bold;
                  .player-name {
                    margin-bottom: 32px;
                    position: relative;
                    & > span {
                      position: absolute;
                      background: #8b65ff;
                      width: 44px;
                      height: 4px;
                      border-radius: 12px;
                      bottom: -10px;
                      left: 50%;
                      transform: translate(-50%, 0);
                      &.away-line {
                        background: #eb47b1;
                      }
                    }
                  }
                }
                .hero-list {
                  margin-top: 70px;
                  margin-right: 40px;
                  .hero-list-wrap {
                    display: flex;
                    &.text-left {
                      li {
                        margin-right: 20px;
                        margin-left: 0px;
                      }
                    }
                    li {
                      margin-left: 20px;
                    }
                  }
                  & > p {
                    font-size: 14px;
                    color: #e4e4e4;
                    margin-bottom: 16px;
                    &.text-right {
                      text-align: right;
                    }
                  }
                  .data {
                    margin-top: 5px;
                    font-size: 14px;
                    color: #fff;
                    .total {
                      color: #888;
                    }
                  }
                }
                &.away {
                  .hero-list {
                    margin-left: 40px;
                    margin-right: 0px;
                  }
                }
              }
              .radar-chart {
                margin: 0 90px;
              }
            }
          }
        }
      }
      &.history-session {
        .content {
          display: flex;
          justify-content: space-between;
          overflow: hidden;
          height: 534px;

          .content-left {
            width: 796px;
            background: rgba(15, 30, 69, 0.5);
            padding: 16px 12px;
            .table-header {
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
              .table-header-left {
                display: flex;
                align-items: center;
                .cup-icon {
                  display: inline-block;
                  width: 22px;
                  height: 22px;
                  background: url("/images/cup.png") no-repeat 0 0;
                  background-size: 100% 100%;
                }
                p {
                  color: #5c79ba;
                  font-weight: bold;
                  font-size: 18px;
                  margin-left: 6px;
                }
              }
            }
            .table-body {
              width: 100%;
            }
          }
          .content-right {
            flex: 1;
            margin-left: 12px;
            background: rgba(15, 30, 69, 0.5);
            padding: 18px 0;
            .content-right-title {
              padding: 0 12px;
              display: flex;
              align-items: center;
              margin-bottom: 12px;
              & > img {
                margin-right: 6px;
              }
              & > span {
                color: #5c79ba;
                font-weight: bold;
                font-size: 18px;
              }
            }
            .win-rate-pie {
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 24px 0 28px 0;
              & > div {
                position: relative;
                .data {
                  font-size: 14px;
                  font-weight: bold;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                }
                &.home {
                  .data {
                    color: #8b65ff;
                  }
                }
                &.away {
                  .data {
                    color: #eb47b1;
                  }
                }
              }
              .sl {
                padding: 0 44px;
                font-size: 12px;
              }
            }
            .row-box {
              padding: 0 24px;
              .row-bar {
                margin-bottom: 10px;
              }
            }
          }
        }
      }
      &.near-data-session {
        .content {
          height: 355px;
          background: rgba(15, 30, 69, 0.5);

          .table-header-right {
            justify-content: center;
            padding: 24px 0;
          }
          .body {
            display: flex;
            justify-content: center;
            .bar-box {
              width: 416px;
              margin: 0 92px;
              .row-bar-colum {
                margin-top: 12px;
              }
            }
            .title {
              text-align: center;
              font-size: 24px;
              font-weight: bold;
              color: #fff;
              .line {
                width: 44px;
                height: 4px;
                background: linear-gradient(90deg, #6a20ff 0%, #5370fe 100%);
                opacity: 1;
                border-radius: 12px;
                margin: 0 auto;
                margin-top: 8px;
                margin-bottom: 20px;
              }
            }
            .rote,
            .sl {
              text-align: center;
              font-size: 14px;
              text-align: center;
              color: #e4e4e4;
              &.sl {
                padding: 8px 0;
              }
            }
            .home {
              position: relative;
              .rote {
                color: #8b65ff;
              }
            }
            .away {
              position: relative;
              .rote {
                color: #eb4ab6;
              }
              .line {
                background: linear-gradient(93deg, #eb47b1 0%, #dd6efe 100%);
              }
            }
          }
        }
      }
      &.near-prok-session {
        .content {
          height: 534px;
          box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
          background: rgba(103, 44, 255, 0.2);
          &.content-2 {
            background: rgba(235, 71, 177, 0.2);
          }
          & > table {
            padding-left: 38px;
          }
          & > .title {
            display: flex;
            justify-content: space-between;
            padding: 12px 24px 24px 24px;
            .title-left {
              display: flex;
              align-items: center;
              color: #fff;
              font-size: 18px;
              font-weight: bold;
              .team-name {
                margin-left: 4px;
              }
            }
          }
        }
      }
      &.map-session {
        .content {
          height: 526px;
          box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
          background: rgba(15, 30, 69, 0.5);
          & > table {
            padding-left: 30px;
            .map-container {
              width: 170px;
              height: 103px;
              background: #fff;
            }
            td > div {
              padding-top: 16px;
              &:first-child {
                padding-bottom: 16px;
                padding-top: 0;
              }
            }
            thead {
              padding-right: 20px;
            }
            tbody > tr {
              position: relative;
              &::after {
                content: "  ";
                left: 250px;
                bottom: 53px;
                right: 48px;
                position: absolute;
                border-top: 1px solid #fff;
                opacity: 0.1;
              }
              td {
                text-align: center;
                width: 128px;
              }
            }
          }
        }
      }
    }
  }
  .started {
    .live-session {
      display: flex;
      justify-content: space-between;
      .live-player {
        width: 769px;
        height: 488px;
        background: #0f1e45;
        box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
        opacity: 0.5;
        border-radius: 6px;
      }
    }
    & > .pock-session {
      .content {
        height: 373px;
        background: rgba(15, 30, 69, 0.5);
        padding-top: 30px;
        .body {
          display: flex;
          justify-content: center;
          .bar-box-row {
            width: 416px;
            margin: 0 44px;
            .row-bar {
              margin-bottom: 20px;
            }
            & > .box {
              display: flex;
              justify-content: center;
              text-align: center;
              margin-bottom: 46px;
              & > li {
                padding: 0 20px;
                & > p {
                  font-size: 14px;
                  color: #fff;
                  margin-bottom: 4px;
                }
                & > span {
                  font-weight: bold;
                  font-size: 16px;
                  color: #888888;
                  &.home {
                    color: #8b65ff;
                  }
                  &.away {
                    color: #eb47b1;
                  }
                }
              }
            }
          }
          .title {
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            color: #fff;
            .line {
              width: 44px;
              height: 4px;
              background: linear-gradient(90deg, #6a20ff 0%, #5370fe 100%);
              opacity: 1;
              border-radius: 12px;
              margin: 0 auto;
              margin-top: 8px;
              margin-bottom: 20px;
            }
          }
          .rote,
          .sl {
            text-align: center;
            font-size: 14px;
            text-align: center;
            color: #e4e4e4;
            &.sl {
              padding: 8px 0;
            }
          }
          .home {
            position: relative;
            .rote {
              color: #8b65ff;
            }
          }
          .away {
            position: relative;
            .rote {
              color: #eb4ab6;
            }
            .line {
              background: linear-gradient(93deg, #eb47b1 0%, #dd6efe 100%);
            }
          }
        }
      }
    }
    // 选手阵容
    & > .player-lineup-session {
      .content {
        height: 452px;
        background: rgba(15, 30, 69, 0.5);
        box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
        padding: 42px 60px 0 60px;
        .players-list {
          display: flex;

          & > div {
            flex: 1;
            display: flex;
            align-items: center;
            .team-info {
              display: flex;
              .team-detail {
                & > .name {
                  font-size: 18px;
                  font-weight: bold;
                }
                & > .level {
                  font-size: 14px;
                  color: #e4e4e4;
                }
              }
            }
            .player-item {
              display: flex;
              & > li {
                font-size: 0;
                padding: 0 10px;
                & > p {
                  font-size: 14px;
                  color: #888888;
                  text-align: center;
                }
              }
            }
            &.home {
              .team-detail {
                margin-left: 8px;
                margin-right: 14px;
                .name {
                  color: #8b65ff;
                }
              }
            }
            &.away {
              display: flex;
              justify-content: flex-end;

              .team-detail {
                margin-right: 8px;
                margin-left: 14px;
                .name {
                  color: #eb47b1;
                  text-align: right;
                }
              }
            }
          }
        }
        .player-detail {
          margin-top: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          .echarts-content {
            margin: 0 58px;
          }
          .home-player,
          .away-player {
            text-align: center;
            .name {
              font-size: 24px;
              font-weight: bold;
            }
            .line {
              height: 4px;
              width: 44px;
              border-radius: 6px;
              margin: 0 auto;
              margin-top: 8px;
              margin-bottom: 10px;
            }
            .score {
              font-size: 14px;
              font-weight: bold;
            }
            &.home-player {
              .line {
                background: #8b65ff;
              }
              .score {
                color: #8b65ff;
              }
            }
            &.away-player {
              .line {
                background: #eb47b1;
              }
              .score {
                color: #eb47b1;
              }
            }

            .position {
              font-size: 14px;
              color: #e4e4e4;
              margin-top: 8px;
            }
          }
        }
      }
    }
    & > .player-session {
      .content {
        padding-top: 10px;
        height: 288px;
        box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
        background: rgba(103, 44, 255, 0.2);
        &.content-2 {
          background: rgba(235, 71, 177, 0.2);
        }
        & > table {
          padding-left: 38px;
          padding-right: 80px;
        }
        & > .title {
          display: flex;
          justify-content: space-between;
          padding: 12px 24px 24px 24px;
          .title-left {
            display: flex;
            align-items: center;
            color: #fff;
            font-size: 18px;
            font-weight: bold;
            .team-name {
              margin-left: 4px;
            }
          }
        }
      }
    }
    & > .map-session {
      .content {
        background: transparent !important;
        & > div.swiper {
          display: flex;
          align-items: center;
          .swiper-images {
            flex: 1;
            height: 84px;
            width: 90%;
            .swiper-item {
              border-radius: 4px;
              &:hover {
                cursor: pointer;
              }
              border: 1px solid transparent;
              &.actived {
                border: 1px solid #2159e5;
              }
            }
            .score {
              text-align: center;
              padding-top: 4px;
              font-weight: bold;
              font-size: 18px;
              & > .home {
                color: #8b65ff;
              }
              & > .away {
                color: #eb47b1;
              }
            }
          }
          .arrow-right,
          .arrow-left {
            width: 48px;
            height: 84px;
            position: relative;
            & > .arrow {
              width: 18px;
              height: 18px;
              position: absolute;
              top: 50%;
              right: 0;
              margin-top: -9px;
              background: url("/images/arrow-right.png") no-repeat 0 0;
              background-size: 100% 100%;
              &:hover {
                background: url("/images/arrow-right-hover.png") no-repeat 0 0;
                background-size: 100% 100%;
                cursor: pointer;
              }
            }
            &.arrow-left {
              & > .arrow {
                left: 0;
                background: url("/images/arrow-left.png") no-repeat 0 0;
                background-size: 100% 100%;
                &:hover {
                  background: url("/images/arrow-right-hover.png") no-repeat 0 0;
                  background-size: 100% 100%;
                  cursor: pointer;
                  transform: rotateY(180deg);
                }
              }
            }
          }
        }
        .map-detail-data {
          height: 200px;
          background: rgba(15, 30, 69, 0.5);
          box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
          border-radius: 0px 0px 6px 6px;
          margin: 0 48px;
          margin-top: 50px;
          padding: 17px 16px 15px 16px;
          overflow: hidden;
          display: flex;
          .sencond-title {
            display: flex;
            font-size: 14px;
            color: #737373;
            height: 30px;
            line-height: 30px;
            margin: 16px 0 12px 0;
          }
          .team-info {
            width: 190px;
            .team {
              display: flex;
              align-items: center;
              .team-name {
                margin-left: 4px;
                font-weight: bold;
                font-size: 14px;
              }
              &.home {
                margin-bottom: 31px;
              }
            }
          }
          .first-half,
          .second-half {
            flex: 1;
            text-align: center;
            .data-list {
              display: flex;
              padding: 0 14px;
              & > li {
                flex: 1;
                & > div {
                  width: 20px;
                  height: 20px;
                  overflow: hidden;
                  margin: 0 auto;
                  &.home {
                    margin-bottom: 31px;
                  }
                }
              }
            }
            .title {
              font-size: 16px;
              color: #fff;
            }
            &.first-half {
              position: relative;
              &:after {
                position: absolute;
                content: "";
                right: 0;
                bottom: -50px;
                width: 0;
                top: -20px;
                height: 210px;
                border-right: 1px solid #18295a;
              }
            }
          }
        }
      }
    }
  }
}
</style>
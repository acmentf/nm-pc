<!--  -->
<template>
  <div class="schedule-box">
    <app-carousel></app-carousel>
    <asideTabsNav style="margin-top:20px;" />
    <div class="main-content">
      <select-date @change="dateChange"></select-date>
      <div class="schedule-list-container" v-if="list.length">
        <!-- 图例说明 -->
        <div class="info" v-show="list.length">
          <span @click.stop="()=>{show=!show}" class="cursor-pointer baseText">图例说明</span>
          <div class="info-content" v-show="show">
            <ul class="info-list">
              <li v-for="(item,index) in infoList" :key="index">
                <p class="title">
                  <game-icon type="info" />
                  <span class="text">{{item.title}}</span>
                </p>
                <div class="icon-list">
                  <span v-for="(_item,_index) in item.list" :key="_index" class="icon-item">
                    <game-icon :type="_item.icon" />
                    {{_item.title}}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="list-wrap" v-for="(item,index) in list" :key="index" style="position:relative">
          <div class="list-title">
            <span class="time">
              <span :class="item.group_name ===1?'disabled':''">{{item.group_str}}</span>
            </span>
          </div>
          <div class="list-session">
            <div class="line" :class="item.group_name ===1?'disabled':''"></div>
            <div v-for="(_item,_index) in item.group_item" :key="_index" class="schedule-container">
              <div
                v-for="(__item,__index) in _item.group_item"
                :key="__index"
                
              >
                <el-image :src="__item.group_icon" class="schedule-image">
                  <div slot="error" class="image-slot">
                    <default-img :size="30" type="2" />
                  </div>
                </el-image>
                <span
                  class="schedule-name cursor-pointer"
                  @click="scheduleDetail(__item)"
                >{{__item.group_str}}</span>
                <ul class="list-content">
                  <li v-for="(_item_,_index_) in __item.group_item" :key="_index_">
                    <schedule-item :item="_item_" :icon="_item.group_icon"></schedule-item>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <defaultBox
        class="defaultBox"
        style
        v-else
        width="300px"
        height="300px"
        src="/images/follow_null.png"
      >暂无比赛</defaultBox>
    </div>
  </div>
</template>

<script>
import * as api from "@/api/schedule";
import selectDate from "~/components/common/selectDate";
import appCarousel from "~/components/common/appCarousel";
import ScheduleItem from "~/components/pages/schedule/ScheduleItem";
import asideTabs from "~/components/header/asideTabs";
import { mapState, mapMutations, mapGetters } from "vuex";
import defaultBox from "~/components/common/default";
import asideTabsNav from "~/components/common/asideTabsNav";

import axios from "axios";
export default {
  layout: "home",
  name: "schedule",
  components: { appCarousel, asideTabs, selectDate, ScheduleItem, defaultBox ,asideTabsNav},
  data() {
    return {
      list: [],
      infoList: [
        {
          title: "LOL图例说明",
          list: [
            { title: "一血", icon: "1" },
            { title: "一塔", icon: "2" },
            { title: "先五杀", icon: "3" },
            { title: "先十杀", icon: "4" },
            { title: "水晶", icon: "5" },
            { title: "推塔数", icon: "6" },
            { title: "经济领先", icon: "7" },
            { title: "小龙", icon: "8" },
            { title: "水龙", icon: "9" },
            { title: "土龙", icon: "15" },
            { title: "风龙", icon: "10" },
            { title: "火龙", icon: "11" },
            { title: "峡谷先锋", icon: "12" },
            { title: "纳什男爵", icon: "13" },
            { title: "远古巨龙", icon: "14" }
          ]
        },
        {
          title: "CSGO图例说明",
          list: [
            { title: "手枪", icon: "16" },
            { title: "解除", icon: "17" },
            { title: "引爆", icon: "18" },
            { title: "击杀", icon: "19" },
            { title: "加时", icon: "20" },
            { title: "先五杀", icon: "21" },
            { title: "先十杀", icon: "22" }
          ]
        },
        {
          title: "DOTA2图例说明",
          list: [
            { title: "一血", icon: "1" },
            { title: "一塔", icon: "2" },
            { title: "先五杀", icon: "3" },
            { title: "先十杀", icon: "4" },
            { title: "兵营", icon: "5" },
            { title: "推塔数", icon: "6" },
            { title: "肉山", icon: "23" },
            { title: "经济领先", icon: "7" }
          ]
        }
      ],
      show: false
    };
  },
  head() {
    return {
      title: "联赛"
    };
  },
  computed: {
    ...mapGetters({
      storeGameID: "common/getGameId"
    })
  },
  watch: {
    async storeGameID(game) {
      let { list } = await api.getScheduleList({
        game_id: game,
        game_day: this.$store.state.common.DATE,
        style: 3 //1首页按时间 2首页按赛事 3 赛程
      });
      this.list = list;
    }
  },
  async asyncData({ query, store }) {
    let { game } = query;
    game = game ? game : store.state.common.game_id;
    //获取赛程列表
    let { list } = await api.getScheduleList({
      game_id: game,
      game_day: store.state.common.DATE,
      style: 3 //1首页按时间 2首页按赛事 3 赛程
    });
    return { list };
  },
  methods: {
    ...mapMutations({
      toggle: "schedule/setInfoState"
    }),
    async dateChange(date) {
      this.$store.dispatch("common/_setDate", date);
      let { list } = await api.getScheduleList({
        game_id: this.$route.query.game
          ? this.$route.query.game
          : this.$store.state.common.game_id,
        game_day: this.$store.state.common.DATE,
        style: 3 //1首页按时间 2首页按赛事 3 赛程
      });
      this.list = list;
    },
    scheduleDetail({ game_idstr,tournament_id }) {
      this.$router.push({
        path: "/schedule/detail",
        query: {
          game: game_idstr ? game_idstr.toLowerCase() : "",
          tournament_id
        }
      });
    }
  },
  created() {
    //this.getList()
    //body.onclick=function(){ alert ('body'); };
  },
  mounted() {},
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
.schedule-box {
  position: relative;
  overflow: inherit;
  .aside_tab {
    position: absolute;
    left: -80px;
  }
  .fixd {
    position: fixed;
    top: 70px;
    z-index: 300;
  }
}
.main-content {
  margin-top: 20px;
  .schedule-list-container {
    min-height: 300px;
    position: relative;
    padding-left: 40px;
    margin-top: 40px;
    .info {
      position: absolute;
      right: 0;
      top: -20px;
      .baseText {
        color:rgba(51, 51, 51, 1);
        background-size: 18px;
        background-position: 0 3px;
        background-repeat: no-repeat;
        background-image: url(/images/explain.png);
        display: inline-block;
        width: 85px;
        text-align: right;
        opacity: 0.5;
      }
      .baseText:hover {
        opacity: 1;
      }
      .info-content {
        position: absolute;
        right: 0;
        width: 1100px;
        // border: 1px solid #5D2BCF;
        border-radius: 8px;
        padding: 30px 0 10px 30px;
        background:#fff;
        z-index: 22222;
        top:30px;
        .info-list {
          & > li {
            display: flex;
            .title {
              width: 150px;
              font-size: 14px;
              height: 20px;
              .text {
                position: relative;
                top: 1px;
              }
            }
            .icon-list {
              display: flex;
              flex: 1;
              flex-wrap: wrap;
              & > span {
                //margin: 0 30px 20px 30px;
                width: 10%;
                margin-bottom: 20px;
                font-size: 14px;
              }
            }
          }
        }
      }
    }
    .list-title {
      margin: 10px 0;
      position: absolute;
      top:-42px;
      .time {
        font-size: 18px;
        color:#6521D7;
        font-weight: bold;
        position: relative;
        left: -5px;
        &.disabled {
          color: #999;
        }
        .today-icon {
          position: absolute;
          left: -28px;
        }
      }
    }
    .list-session {
      margin-left: 10px;
      position: relative;
      & > .line {
        position: absolute;
        width: 4px;
        height: 100%;
        left: 0;
        top: 0;
        background: #6521D7;
        border-radius: 2px;
        &.disabled {
          background: #999;
        }
      }
      .schedule-container {
        & > div {
          position: relative;
          //margin-bottom: 45px;
          padding: 15px 0;
          margin-bottom: 40px;
        }
      }

      .list-content {
        padding-left: 48px;

        & > li {
          margin-bottom: 10px;
          &:last-child {
            margin-bottom: 0px;
          }
        }
      }
      .schedule-name {
        font-size: 18px;
        font-weight: bold;
        left: 110px;
        position: absolute;
        top: -34px;
      }
      .schedule-image {
        left: 70px;
        position: absolute;
        top: -37px;
        width: 30px;
        height: 30px;
      }
    }
  }
  .defaultBox {
    margin-top: 38px;
    background: rgba(10, 19, 49, 0.7);
    padding: 40px 0;
  }
}
</style>
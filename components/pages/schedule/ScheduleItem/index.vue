<!--
  功能：联赛列表 Item
  作者：acmentf
  邮箱：985881328@qq.com
  时间：2020年12月09日 15:52:21
-->
<template>
  <div class="schedule-item cursor-pointer" v-if="item.base" @click="matchDetail">
    <div class="home-session">
      <div class="top">
        <div class="game-type flex">
          <img src="/images/lol.png" alt class="game-type-icon" v-if="item.game_id==='LOL'" />
          <img src="/images/csgo.png" alt class="game-type-icon" v-if="item.game_id==='CSGO'" />
          <img src="/images/dota2.png" alt class="game-type-icon" v-if="item.game_id==='DOTA2'" />
          <span
            class="game-status"
            :class="item.info.status_id==2? 'ing':(item.info.status_id==3?'end':'')"
          >{{item.info.title}}</span>
        </div>
        <div class="team-info flex">
          <span class="team-name">{{item.base.home.team_short_name}}</span>
          <el-image :src="item.base.home.team_img" class="team-icon">
            <div slot="error" class="image-slot">
              <default-img :size="40" />
            </div>
          </el-image>
          <span
            class="score home-text"
            v-if="item.info.status_id===3"
          >{{item.info.home.global_score}}</span>
          <span class="score home-text" v-if="item.info.status_id===2">{{item.info.home.score}}</span>
          <span class="score noStart" v-if="item.info.status_id===1">—</span>
        </div>
      </div>
      <div class="icon-list">
        <el-image
          :src="i"
          class="icon-list-item"
          v-for="(i,_i) in item.info.home.icon_list"
          :key="_i"
        ></el-image>
      </div>
    </div>
    <span class="colon flex">:</span>
    <div class="away-session">
      <div class="top">
        <div class="team-info flex">
          <span
            class="score away-text"
            v-if="item.info.status_id===3"
          >{{item.info.away.global_score}}</span>
          <span class="score away-text" v-if="item.info.status_id===2">{{item.info.away.score}}</span>
          <span class="score noStart" v-if="item.info.status_id===1">—</span>
          <el-image :src="item.base.away.team_img" class="team-icon">
            <div slot="error" class="image-slot">
              <default-img :size="40" />
            </div>
          </el-image>
          <span class="team-name">{{item.base.away.team_short_name}}</span>
        </div>
        <div class="game-sz flex">{{item.base.box}}</div>
      </div>
      <div class="icon-list">
        <el-image
          :src="i"
          class="icon-list-item"
          v-for="(i,_i) in item.info.away.icon_list"
          :key="_i"
        ></el-image>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item", "icon"],
  name: "ScheduleItem",
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    computedRouter(pathStr, statusStr, match_id) {
      this.$router.push({
        path: `/home/${pathStr}/${statusStr}`,
        query: { match_id }
      });
    },
    //比赛详情
    matchDetail() {
      let game_id = this.item.game_id;
      let { match_id, status_id } = this.item.base;
      if (game_id === "CSGO") {
        this.$router.push({
          path: "/home/csgo",
          query: { match_id }
        });
      } else {
        let statusStr = ""; //3:已结束 | 2: 进行中 | 1：未开始
        let pathStr = game_id === "DOTA2" ? "dota2" : "lol";
        switch (status_id) {
          case 2:
            statusStr = "processing";
            break;
          case 3:
            statusStr = "over";
            break;
          default:
            statusStr = "notStarted";
        }
        this.computedRouter(pathStr, statusStr, match_id);
      }
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang='less' scoped>
.schedule-item {
  height: 120px;
  width: 1100px;
  background: rgba(255, 255, 255, 0.6);
  display: flex;
  padding: 28px 20px 0 30px;
  border-radius: 4px;
  border: 2px solid transparent;
  &:hover {
    border: 2px solid #1c71da;
  }
  .colon {
    padding: 0 20px;
    color: #666;
    font-size: 16px;
    height: 60px;
  }
  & > div {
    flex: 1;
    .top {
      display: flex;
      justify-content: space-between;
      align-content: center;
    }
    .game-type-icon {
      width: 18px;
      height: 18px;
    }
    .game-status {
      font-size: 14px;
      //color:#FC5353;
      color: #666;
      padding-left: 10px;
      &.ing {
        color: #333;
        font-weight: bold;
      }
      &.end {
        color: #999;
      }
    }
    .team-icon {
      width: 40px;
      height: 40px;
    }
    .game-sz {
      font-size: 16px;
      color: #666;
      font-weight: bold;
    }
    .team-name {
      font-size: 16px;
      color: #333;
      margin: 6px;
    }
    .score {
      padding: 0 12px;
      font-size: 18px;
      font-weight: bold;
      &.noStart{
        color:#bbb;
      }
    }
    .icon-list {
      margin-top: 4px;
      & > .icon-list-item {
        width: 20px;
        height: 20px;
        display: inline-block;
        margin: 0 4px;
      }
    }
    &.home-session {
      .icon-list {
        padding-right: 36px;
        text-align: right;
      }
    }
    &.away-session {
      .icon-list {
        padding-left: 36px;
      }
    }
  }
  .team-info {
    height: 60px;
  }
}
</style>
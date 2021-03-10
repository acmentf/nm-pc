<!--
  功能：赛程日期列表筛选
  作者：acmentf
  邮箱：985881328@qq.com
  时间：2020年12月09日 10:45:27
-->
<template>
  <div class="data-wrapper">
    <ul class="date-list flex">
      <li
        class="date-item flex cursor-pointer"
        v-for="(item,index) in scheduleDateList"
        :key="index"
        :class="active===index?'active':''"
      >
        <div class="date-item-container" v-if="item.fd_str" @click.stop="fnTabChange(index,item)">
          <div class="date-detail text-center">
            <span class="date" v-show="item.week !== '今天'">{{item.fd_str}}</span>
            <span class="week">{{item.week}}</span>
          </div>
          <!-- <p class="game-content text-center">{{item.game_count}}场赛事</p> -->
        </div>
        <div
          v-else
          style="display: inline-block;padding:30px 27px;"
          slot="reference"
          @click="fnCalendar(index,item)"
        >日历筛选</div>
      </li>
    </ul>
    <div class="calendar-wrapper">
      <app-calendar :show.sync="show" :mode="mode" @change="changeDate" />
    </div>
    <div class="zz" v-show="show" @click="show=false"></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "SelectDate",
  data() {
    return {
      active: 0,
      mode: "single",
      date: "",
      show: false
    };
  },
  computed: {
    ...mapState({
      scheduleDateList: state => state.common.scheduleDateList
    })
  },
  watch: {},
  methods: {
    fnTabChange(index, item) {
      this.active = index;
      this.show = false;
      this.changeDate(item.ymd_str);
    },
    fnCalendar(index, item) {
      //this.active = index;
      this.show = true;
    },
    changeDate(date) {
      this.show = false;
      let flag = false;
      this.$emit("change", date);
      this.scheduleDateList.forEach((item, index) => {
        if (item.ymd_str === date) {
          this.active = index;
          flag = true;
        }
      });
      if(!flag)  {
        this.active = -1;
      }
    },

    ...mapMutations({
      toggleCalendarShow: "schedule/setCalendarState"
    })
  },
  created() {},
  mounted() {}
};
</script>
<style lang='less' scoped>
.data-wrapper {
  position: relative;
  .calendar-wrapper {
    position: absolute;
    right: 0px;
    transform: translateX(-380px);
    top: 92px;
    z-index: 99999;
  }
  .date-list {
    height: 84px;
    & > li {
      flex: 1;
      margin: 0 16px;
      height: 84px;
      position: relative;
      color: #666;
      border: 1px solid transparent;
      &::after {
        content: "";
        width: 1px;
        height: 20px;
        background-color: #bbb;
        position: absolute;
        right: -17px;
      }
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
      &:hover,
      &.active {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid #6521D7;
        // box-shadow: 0px 4px 6px rgba(42, 47, 247, 0.8);
        opacity: 1;
        border-radius: 4px;
        .date-detail {
          font-weight: bold;
          color:#333;
          position: relative;
          height: 84px;
          line-height: 84px;
          & > span {
            width: 100%;
            height: 100%;
          }
        }
        .game-content {
          color: #fff;
        }
        &.active {
          background: rgba(255, 255, 255, 0.3);
        }
      }
      &:last-child {
        padding-left: 0;
        &::after {
          content: "";
          width: 0px;
          height: 0;
        }
      }
      & > .date-detail {
        font-size: 16px;
        height: 84px;
      }
      .game-content {
        font-size: 14px;
        padding-top: 8px;
      }
    }
  }
  .zz {
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 11111;
  }
}
</style>
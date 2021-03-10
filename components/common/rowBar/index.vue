<!--
  功能：横向柱状图
  作者：acmentf
  邮箱：985881328@qq.com
  时间：2020年12月24日 18:30:23
-->
<template>
  <div class="row-bar-colum" v-if="direction==='colum'">
    <div class="title">
      <slot></slot>
    </div>
    <div class="bar">
      <p class="home" :style="{width:renderWidth}" v-show="pramas.home">{{pramas.home}}{{dw}}</p>
      <p class="away" v-show="pramas.away">{{pramas.away}}{{dw}}</p>
    </div>
  </div>
  <div v-else class="row-bar">
    <div class="bar">
      <div class="home" :class="{bg:bg}">
        <p :style="{width:renderWidthRow('home')}" v-show="pramas.home">{{pramas.home}}{{dw}}</p>
      </div>
      <span class="title">
        <slot></slot>
      </span>
      <div class="away" :class="{bg:bg}">
        <p :style="{width:renderWidthRow('away')}" v-show="pramas.away">{{pramas.away}}{{dw}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pramas: {
      type: Object,
      default: () => ({
        home: 30,
        away: 50,
        total: 80
      })
    },
    // 标题样式  colum 纵向   row 横向  默认 纵向
    direction: {
      type: String,
      default: "colum"
    },
    dw: {
      type: String,
      default: "%"
    },
    bg: {
      type: Boolean,
      default: false
    }
  },
  name: "",
  components: {},
  data() {
    return {};
  },
  computed: {
    renderWidth() {
      let { home, total, away } = this.pramas;
      if(!total) total = (home*1)+(away*1);
      if (!home && !away) {
        return "50%";
      }
      if (!home && away) {
        return "0%";
      }
      if (home && !away) {
        return "100%";
      }
      return (home / total) * 100 + "%";
    }
  },
  watch: {},
  methods: {
    renderWidthRow(type) {
      let { home, away } = this.pramas;
      if (!home && !away) {
        return "0%";
      } else {
        let total = Number(home) + Number(away);
        if (type === "home") {
          return (home / total) * 100 + "%";
        } else {
          return (away / total) * 100 + "%";
        }
      }
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang='less' scoped>
.row-bar-colum {
  .title {
    font-size: 12px;
    color: #666;
    text-align: center;
    margin-bottom: 8px;
  }

  .bar {
    display: flex;
    height: 16px;
    align-items: center;
    overflow: hidden;
    border-radius: 8px;
    font-size: 12px;
    font-weight: bold;
    width: 100%;
    background:#ccc;
    color:#fff;
    .home {
      height: 16px;
      text-align: left;
      background: #33C6D6;
      padding-left: 8px;

      p {
        text-align: right;
      }
    }
    .away {
      height: 16px;
      text-align: right;
      background: #F05365;
      flex: 1;
      padding-right: 8px;
    }
  }
}
.row-bar {
  .title {
    width: 76px;
    text-align: center;
  }
  .bar {
    display: flex;
    height: 16px;
    align-items: center;
    overflow: hidden;
    font-size: 12px;
    //background: rgba(15, 30, 69, 1);
    width: 100%;
    border-radius: 8px;
    & > div {
      flex: 1;
      &.home {
        display: flex;
        justify-content: flex-end;
        & > p {
          height: 16px;
          text-align: right;
          background:#33C6D6;
          padding-right: 12px;
          border-radius: 8px;
          font-weight: bold;
        }
      }
      &.away {
        & > p {
          height: 16px;
          text-align: left;
          background: #F05365;
          flex: 1;
          padding-left: 12px;
          border-radius: 8px;
          font-weight: bold;
        }
      }
      &.bg {
        background: #ccc;
        border-radius: 8px;
      }
    }
  }
}
.away,
.home {
  height: 16px;
}
</style>
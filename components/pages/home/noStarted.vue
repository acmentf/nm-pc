<!--
 * @Author: acmentf
 * @Date: 2020年12月22日 14:00:59
 * @LastEditTime: 2021-02-27 15:20:05
 * @LastEditors: FeikeQ
 * @FilePath: /nami-pc/components/pages/home/noStarted.vue
 * @Description: 比赛未开始时间倒计时
-->
<template>
  <div class="no-started">
    <img src="/images/logo-pic.png" alt height="66" class="logo-pic" />
    <p>{{isShowCountDown?'距开始':'开始时间'}}</p>
    <div class="count-down" v-if="isShowCountDown">
      <count-down :remainTime="remainTime" @countDowmEnd="countDowmEnd" />
    </div>
    <div class="start-time" v-if="!isShowCountDown">{{$utils.formatime(startTime,'yyyy-MM-dd hh:mm')}}</div>
   
  </div>
</template>

<script>
export default {
  props:{
    startTime:{
      type:Number,
      default:0
    }
  },
  name: "no-started",
  components: {},
  data() {
    return {
      remainTime:0
    };
  },
  computed: {
    isShowCountDown(){
      let nowTime = new Date().getTime();
      this.remainTime = this.startTime - nowTime;
      let surplusHours =  Math.floor((this.startTime-nowTime) / 3600 / 1000);
      return surplusHours <= 24
    }
  },
  watch: {},
  methods: {
    countDowmEnd() {
      //倒计时结束后跳转到比赛进行中
      let {game_id,match_id} =  this.$store.state.matchDetail;
      if(game_id === "CSGO") {
        this.$router.push(`/home/csgo?match_id=${match_id}`)
      }else{
        this.$router.push(`/home/${game_id}/processing?match_id=${match_id}`)
      }

    }
  },
  created() {
   
  },
  mounted() {}
};
</script>
<style lang='less' scoped>
.no-started {
  width: 796px;
  height: 488px;
  border-radius: 6px;
  background: #fff;
  text-align: center;
  .logo-pic {
    margin-top: 167px;
  }
  & > p {
    font-size: 14px;
    padding: 24px 0 12px 0;
    color: #999;
  }
  .start-time{
    font-size:24px;
    color:#666;
  }
}
</style>
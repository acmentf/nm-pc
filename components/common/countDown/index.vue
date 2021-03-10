<!--
 * @Author: acmentf
 * @Date: 2020年12月22日 15:04:07
 * @LastEditTime: 2021-03-03 14:37:33
 * @LastEditors: FeikeQ
 * @FilePath: /nami-pc/components/common/countDown/index.vue
 * @Description: 倒计时组件
-->
<template>
  <div class="count-down-box">
    <span>{{hour? hourString+' : '+minuteString+' : '+secondString : '00'+' : '+minuteString+' : '+secondString}}</span>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {
    remainTime: {
      // 倒计时间总秒数
      default: ""
    }
  },
  data() {
    return {
      hour: "",
      minute: "",
      second: "",
      promiseTimer: ""
    };
  },
  computed: {
    hourString() {
      return this.formatNum(this.hour);
    },
    minuteString() {
      return this.formatNum(this.minute);
    },
    secondString() {
      return this.formatNum(this.second);
    }
  },
  watch: {},
  methods: {
    countDowm() {
      clearInterval(this.promiseTimer);
      this.promiseTimer = setInterval(() => {
        if (this.hour === 0) {
          if (this.minute !== 0 && this.second === 0) {
            this.second = 59;
            this.minute -= 1;
          } else if (this.minute === 0 && this.second === 0) {
            this.second = 0;
            this.$emit("countDowmEnd", true);
            clearInterval(this.promiseTimer);
          } else {
            this.second -= 1;
          }
        } else {
          if (this.minute !== 0 && this.second === 0) {
            this.second = 59;
            this.minute -= 1;
          } else if (this.minute === 0 && this.second === 0) {
            this.hour -= 1;
            this.minute = 59;
            this.second = 59;
          } else {
            this.second -= 1;
          }
        }
      }, 1000);
    },
    formatNum(num) {
      return num < 10 ? "0" + num : "" + num;
    }
  },
  created() {},
  mounted() {
    if (this.remainTime > 0) {
      console.log(this.remainTime / 3600 / 1000)
      this.hour =this.remainTime / 3600 / 1000 >= 24 ? 24: Math.floor((this.remainTime / 3600 / 1000) % 24);
      this.minute = Math.floor((this.remainTime / 60/1000) % 60);
      this.second = Math.floor(this.remainTime/1000 % 60);
      this.countDowm();
    }
  }
};
</script>
<style lang='less' scoped>
.count-down-box{
  font-size:64px;
}

</style>
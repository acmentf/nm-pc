<!--  -->
<template>
  <div class="header-box">
    <nuxt-link to="/">
      <img
        class="logo"
        loading="lazy"
        src="/images/LOGO.png"
        alt="logo"
        width="126px"
        height="40px"
      />
    </nuxt-link>
    <ul>
      <li :class="{actions: '/'===$route.path||$route.path.indexOf('/home')!=-1}">
        <nuxt-link to="/">
          <img class="left_item" loading="lazy" src="/images/home.png" />
          <span class="right_item public">首页</span>
        </nuxt-link>
      </li>
      <li :class="{actions: '/schedule'===$route.path||$route.path.indexOf('/schedule')!=-1}">
        <nuxt-link to="/schedule">
          <img class="left_item" loading="lazy" src="/images/schedule.png" />
          <span class="right_item public">赛程</span>
        </nuxt-link>
      </li>
      <li :class="{actions: '/team'===$route.path||$route.path.indexOf('/team')!=-1}">
        <nuxt-link to="/team">
          <img class="left_item" loading="lazy" src="/images/clan.png" />
          <span class="right_item public">战队</span>
        </nuxt-link>
      </li>
    </ul>
    <client-only>
      <div
        v-if="!cookie || !cookie.token"
        class="login_btn"
        :class="appLoginBox?'active':''"
        @click="appLoginBox = !appLoginBox"
      >
        <img style="margin-right:8px;width:24px;height:24px;" src="/images/avatar.png" />登录/注册
      </div>

      <div v-if="cookie && cookie.token" class="logout">
        <nuxt-link to="/user">
          <img
            class="pic"
            :src="`/images/img${$store.state.user.avatar_id}.png`"
            :alt="$store.state.user.user_id"
          />
        </nuxt-link>
        <nuxt-link to="/user">{{$store.state.user.nick_name}}</nuxt-link>
        <span @click="logout">
          退出
          <img width="16" src="/images/logout.png" />
        </span>
      </div>
    </client-only>
    <app-login v-if="appLoginBox" v-model="appLoginBox"></app-login>
  </div>
</template>

<script>
import * as api from "@/api/user";
import { mapGetters } from "vuex";
export default {
  name: "user-box",
  name: "header-box",
  data() {
    var cookie = this.$utils.getCookieArray();
    this.$store.commit("user/changeToken", cookie);
    return {
      appLoginBox: false,
      cookie
    };
  },
  computed: {},
  watch: {},
  methods: {
    logout() {
      this.$confirm("您确认退出当前账号吗", "确认退出", {
        showClose: false,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        // type: 'warning',
        center: true
      })
        .then(() => {
          var _token = this.cookie.token;
          this.$utils.appCookie("token", "del", -1, "/");
          this.$message({
            type: "success",
            message: "退出成功!"
          });
          // console.log("退出",_token);
          api.logout({ stk: _token });
          this.$router.push({query:{game: this.$store.state.common.game_id}});
          setTimeout(() => {
            this.$router.go(0);
          }, 500);
        })
        .catch(action => {});
    }
  },
  created() {},
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
<style lang='less'scoped>
.header-box {
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  //    padding: 0 0 0 60px;
  position: relative;
  display: flex;
  align-items: center;
  vertical-align: middle;

  .logo {
    margin-right: 50px;
    top: 24px;
  }
  > ul {
    height: 100%;
    float: left;
    li {
      float: left;
      margin-right: 30px;
      padding: 17px;
      height: 100%;
      .left_item {
        display: inline-block;
        box-sizing: border-box;
        vertical-align: middle;
        margin-right: 2px;
        width: 22px;
        height: 22px;
        opacity: 0.7;
      }
      .right_item {
        font-size: 18px;
        color: rgba(255, 255, 255, 0.7);
        display: inline-block;
        box-sizing: border-box;
        vertical-align: middle;
      }
      a {
        padding-bottom: 8px;
        border-bottom: 2px solid transparent;
      }
    }
    .actions {
      background:rgba(0, 0, 0, 0.3);
      //  padding-bottom: 10px;
      .left_item {
        opacity: 1;
      }
      .public {
        color: #fff;
        font-size: 18px;
        font-weight: bold;
      }
      a {
        border-color: #fff;
      }
    }
  }
  > .login_btn {
    position: absolute;
    right: 0px;
    width: 120px;
    height: 30px;
    font-size: 14px;
    font-weight: 400;
    border: 1px solid #ffffff;
    border-radius: 20px;
    color: #ffffff;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    cursor: pointer;
  }
  .login_btn.active {
    background: linear-gradient(136deg, #BF49EB 0%, #6521D7 100%);
    // box-shadow: 0px 4px 6px rgba(42, 47, 247, 0.8);
    border: 0;
  }

  .logout {
    position: absolute;
    right: 0px;
    font-size: 16px;
    color: #fff;
    line-height: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;

    .pic {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 1);
      cursor: pointer;
    }

    a {
      font-weight: bold;
      margin: 0 4px;
      cursor: pointer;
      color: #fff;
    }
    span {
      padding-left: 8px;
      margin-left: 4px;
      height: 24px;
      line-height: 24px;
      border-left: 1px solid #F0F0F0;
      cursor: pointer;
      color: #F0F0F0;
    }
  }
}
</style>
<!--
 * @Author: YangYiKang
 * @Date: 2020-12-07 10:47:09
 * @LastEditors: FeikeQ
 * @LastEditTime: 2021-02-27 09:36:54
 * @FilePath: /nami-pc/layouts/home.vue
 * @Description: 
-->
<template>
  <el-container class="gamebg" :class="switchClass" ref="thebody">
    <el-header height="60px" bak_class="$store.state.home.scrollTop>300?'scrolling':''">
      <Header />
    </el-header>
    <el-main class="main">
      <div class="aside-tabs" v-show="false">
        <asideTabs :class="$store.state.home.scrollTop>345?'fixd':''" :gameList="gameList" />
      </div>
      <!-- <Nuxt keep-alive :keep-alive-props="{include:includeArr}" /> TF说要去掉缓存不然联赛显示有问题 -->
      <Nuxt />
    </el-main>
    <el-footer height="auto">
      <Footer />
    </el-footer>
    <div v-if="true" style="width:0;height:0;">
      <img src="/images/all_bg.jpg" width="0" height="0" />
      <img src="/images/DOTA2_bg.jpg" width="0" height="0" />
      <img src="/images/CSGO_bg.jpg" width="0" height="0" />
      <img src="/images/LOL_bg.jpg" width="0" height="0" />
    </div>
  </el-container>
</template>

<script type="text/javascript">
import "static/css/index.css";
import asideTabs from "~/components/header/asideTabs";
import { mapState, mapGetters } from "vuex";
export default {
  name: "home",
  components: { asideTabs },
  data() {
    return {
      switchClass: "all",
      isShow: false,
      whiteList: ["/", "/schedule", "/team", "/team/"],
      gameList: [
        {
          alt: "all",
          active: true,
          hide: true
        },
        {
          alt: "dota2",
          active: false
        },
        {
          alt: "csgo",
          active: false
        },
        {
          alt: "lol",
          active: false
        }
      ],
      actived: {
        activedIndex: 1
      }
    };
  },
  methods: {
    isShowSideTabs(path) {
      this.isShow = this.whiteList.indexOf(path) > -1;

      //   console.log("---'"+this.isShow +"'---",path)

      if (path && path.indexOf("/team") === 0) {
        this.gameList[0].hide = true;
        this.actived.activedIndex = 2;
      } else {
        this.gameList[0].hide = false;
        this.actived.activedIndex = 1;
      }
    }
  },
  computed: {
    ...mapState({
      includeArr: state => state.common.scheduleIndex
    }),
    ...mapGetters({
      gameId: "common/getGameId"
    })
  },
  watch: {
    gameId(val) {
      this.switchClass = val;
    },
    $route(route) {
      this.isShowSideTabs(route.path);
    }
  },
  mounted() {
    // 滚动状态 byFeikeq
    // window.addEventListener("scroll", e => {
    //   this.$store.commit(
    //     "home/scrollValue",
    //     document.documentElement.scrollTop
    //   );
    // });
  },
  created() {
    this.isShowSideTabs(this.$route.path);
    this.$store.dispatch('common/_getSystemTime', { info_type: "matchtime" })
    //sessionStorage.setItem("breadcrumbState", true);
  },
  beforeDestroy() {}
};
</script>

<style scoped>
.el-header {
  padding: 0;
  z-index: 100;
  width: 100%;
  /* background: linear-gradient(
    135deg,
    rgba(101, 33, 215, 0.35) 0%,
    rgba(191, 73, 235, 0.35) 100%
  ); */
  background: linear-gradient(135deg, #6521D7 0%, #BF49EB 100%);
  position: fixed;
}
.el-header.scrolling {
  /* background: linear-gradient(315deg, #0b2d61 0%, #11166c 100%); */
}

.el-main {
  width: 1200px;
  margin: 0 auto;
  margin-top: 84px;
  padding: 0;
  z-index: 10;
  min-height: calc(100vh - 256px);
  overflow: initial;
}
.el-footer {
  margin-top: 5px;
  background-color: #333;
}

/* 切换背景图片 */
.gamebg {
  background-size: cover;
  background-attachment: fixed;
  transition: all 0.5s;
  background-position: 0 0;
  background-repeat: no-repeat;
  position: relative;
}
.all {
  background-image: url("/images/all_bg.jpg");
}
.dota2 {
  background-image: url("/images/DOTA2_bg.jpg");
}
.csgo {
  background-image: url("/images/CSGO_bg.jpg");
}
.lol {
  background-image: url("/images/LOL_bg.jpg");
}
.main {
  position: relative;
}
.aside-tabs {
  position: absolute;
  top: 320px;
  left: -72px;
}
.fixd {
  position: fixed;
  top: 70px;
  z-index: 300;
}
</style>

<!-- 竖排导航栏 -->
<template>
  <ul>
    <li
      v-for="(item, index) in gameList"
      :key="index"
      @click="setTab(item.alt)"
      :class="renderClass(index + 1)"
      v-show="!item.hide"
    >
      <a :title="item.alt"><span></span>{{ menuName[item.alt] }}</a>
      <nuxt-link
        :to="{ query: { game: item.alt } }"
        :key="index"
        :title="item.alt"
      >{{ menuName[item.alt] }}</nuxt-link>
    </li>
  </ul>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "aside-nav",
  props:{gameList:{
    type:Array,
    default:()=>[
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
      ]
  }},
  components: {},
  data() {
    var menu = {};
    for (let index = 0; index < this.gameList.length; index++) {
      const element = this.gameList[index];
      menu[element.alt] = index + 1;
    }
    return {
      actived: 1,
      menuName:{
        'all':'全部',
        'dota2':'DOTA2',
        'csgo':'CS:GO',
        'lol':'LOL',
      },
      menu
    };
  },
  computed: {
    ...mapGetters({
      storeGameID: "common/getGameId"
    })
  },
  watch: {
    $route({ path }) {
      this.renderActived(path);
    }
  },
  methods: {
    ...mapMutations({
      setGameId: "common/setGameId"
    }),
    setTab(GAME) {
      if (!GAME) return;
      var _game = GAME.toLowerCase();
      var _id = this.menu[_game];
      if (!_id) return;
      this.actived = _id;
      this.setGameId(_game);
    },
    renderClass(tabIndex) {
      if (tabIndex == this.actived) {
        return "icon-" + tabIndex + " actived";
      } else {
        return "icon-" + tabIndex;
      }
    },
    renderActived(path) {
      if (path && path.indexOf("/team") === 0) {
        this.gameList[0].hide = true;
        if (this.$store.state.common.game_id === "all") {
          this.actived = 2;
          this.setGameId("dota2");
        }
      }else{
        this.gameList[0].hide = false;
      }
      if (this.$store.state.common.game_id === "lol") {
        this.actived = 4;
      } else if (this.$store.state.common.game_id === "csgo") {
        this.actived = 3;
      } else if (this.$store.state.common.game_id === "dota2") {
        this.actived = 2;
      } else {
        this.actived = 1;
      }
    }
  },
  created() {
    if (this.$route.query.game) this.setTab(this.$route.query.game);

    setTimeout(() => {
      this.renderActived(this.$route.path);
    }, 0);
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
<style lang="less" scoped>
ul {
  display: flex;
  width: 100%;
  position: relative;
  background: rgba(255, 255, 255, 0.6);
  height: 50px;
  border-radius:6px;
  overflow: hidden;
  align-items: center ;
  padding: 0 12px;
  li {
    min-width:92px;
    height: 30px;
    cursor: pointer;
    position: relative;
    margin-right: 10px;
    font-size: 14px;
    border-radius: 6px;
    overflow: hidden;
    

    a {
      width: 100%;
      display: block;
      line-height:30px;
      height: 100%;
      padding: 0 20px;
      color: #6521D7
    }
    &.actived{
      background: #6521D7;
      a{
        font-weight: bold;
        color: #fff;
      }
    }
    span{
      width:16px;
      height:16px;
      display: inline-block;
      vertical-align: middle;
      margin-right: 4px;
    }
    &.icon-1 span {
      background: url("/images/all-unselected.png") no-repeat 0 0;
      background-size: 100% 100%;
    }
    &.icon-1.actived span {
      background: url("/images/all-selected.png") no-repeat 0 0;
      background-size: 100% 100%;
    }
    &.icon-2 span{
      background: url("/images/DOTA2-unselected.png") no-repeat 0 0;
      background-size: 100% 100%;
    }
    &.icon-2.actived span{
      background: url("/images/DOTA2-selected.png") no-repeat 0 0;
      background-size: 100% 100%;
    }
    &.icon-3 span{
      background: url("/images/CSGO-unselected.png") no-repeat 0 0;
      background-size: 100% 100%;
    }
    &.icon-3.actived span{
      background: url("/images/CSGO-selected.png") no-repeat 0 0;
      background-size: 100% 100%;
    }
    &.icon-4 span{
      background: url("/images/LOL-unselected.png") no-repeat 0 0;
      background-size: 100% 100%;
    }
    &.icon-4.actived span{
      background: url("/images/LOL-selected.png") no-repeat 0 0;
      background-size: 100% 100%;
    }
  }
}
</style>

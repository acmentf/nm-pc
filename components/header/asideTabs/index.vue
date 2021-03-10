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
      <nuxt-link
        :to="{ query: { game: item.alt } }"
        :key="index"
        class="search-engine-optimization"
        :title="item.alt"
      >{{ item.alt }}</nuxt-link>
    </li>
  </ul>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "aside-box",
  props: ["gameList"],
  components: {},
  data() {
    var menu = {};
    for (let index = 0; index < this.gameList.length; index++) {
      const element = this.gameList[index];
      menu[element.alt] = index + 1;
    }
    return {
      actived: 1,
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
        return "icon-" + tabIndex + "-actived";
      } else {
        return "icon-" + tabIndex;
      }
    },
    renderActived(path) {
      if (path && path.indexOf("/team") === 0) {
        if (this.$store.state.common.game_id === "all") {
          this.actived = 2;
          this.setGameId("dota2");
        }
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
  flex-flow: column;
  display: flex;
  li {
    width: 72px;
    height: 72px;
    margin-bottom: 10px;
    cursor: pointer;
    position: relative;

    &.icon-1 {
      background: url("/images/all-unselected.png") no-repeat 0 0;
      background-size: 100% 100%;
    }
    &.icon-1-actived {
      background: url("/images/all-selected.png") no-repeat 0 0;
      background-size: 100% 100%;
    }
    &.icon-2 {
      background: url("/images/DOTA2-unselected.png") no-repeat 0 0;
      background-size: 100% 100%;
    }
    &.icon-2-actived {
      background: url("/images/DOTA2-selected.png") no-repeat 0 0;
      background-size: 100% 100%;
    }
    &.icon-3 {
      background: url("/images/CSGO-unselected.png") no-repeat 0 0;
      background-size: 100% 100%;
    }
    &.icon-3-actived {
      background: url("/images/CSGO-selected.png") no-repeat 0 0;
      background-size: 100% 100%;
    }
    &.icon-4 {
      background: url("/images/LOL-unselected.png") no-repeat 0 0;
      background-size: 100% 100%;
    }
    &.icon-4-actived {
      background: url("/images/LOL-selected.png") no-repeat 0 0;
      background-size: 100% 100%;
    }
  }
}
</style>

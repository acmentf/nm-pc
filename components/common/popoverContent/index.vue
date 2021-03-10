<!--
 * @Author: acmentf
 * @Date: 2020-12-19 10:14:42
 * @Mail:985881328@qq.com
 * @LastEditTime: 2021-02-25 11:12:38
 * @LastEditors: FeikeQ
 * @FilePath: /nami-pc/components/common/popoverContent/index.vue
 * @Description: 功能：popover
-->
<template>
  <div class="popover-content">
    <ul>
      <li v-for="(item,index) in popoverList" :key="index" @click.stop="handleClick(item)">
        <span class="game-icon flex">
          <img :src="item.icon" alt width="16" />
        </span>
        <span class="game-name">{{item.game_title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapMutations } from "vuex"
export default {
  name: "",
  components: {},
  data() {
    return {
      popoverList: [
        {
          icon: require("./images/dota2-icon.png"),
          game_title: "DOTA2",
          game_id: "dota2"
        },
        {
          icon: require("./images/csgo-icon.png"),
          game_title: "CS:GO",
          game_id: "csgo"
        },
        {
          icon: require("./images/lol-icon.png"),
          game_title: "LOL",
          game_id: "lol"
        }
      ]
    };
  },
  computed: {},
  watch: {},
  methods: {
    handleClick(item) {
      let { game_id } = item;
      console.log('game_id',game_id)
      this.setGameId(game_id)
      this.$router.back();
    },
    ...mapMutations({
      setGameId: "common/setGameId"
    })
  },
  created() {},
  mounted() {}
};
</script>
<style lang='less' scoped>
.popover-content {
  background: rgba(255, 255, 255, 0.6);
  border-radius: 6px;
  width: 160px;
  & > ul {
    padding: 4px 0;
    & > li {
      padding: 4px 0 4px 20px;
      display: flex;
      align-items: center;
      &:hover {
        cursor: pointer;
        background: rgba(93, 43, 207, 0.2);
      }
      .game-icon {
        width: 24px;
        height: 24px;
        background: #EFEFEF;
        border-radius: 50%;
      }
      .game-name {
        font-family: CenturyGothic-Bold;
        color: #333;
        font-size: 12px;
        padding-left: 4px;
      }
    }
  }
}
</style>
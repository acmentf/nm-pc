<!--
 * @Author: FeikeQ
 * @Date: 2021-02-24 10:09:17
 * @LastEditTime: 2021-02-27 11:33:19
 * @LastEditors: FeikeQ
 * @FilePath: /nami-pc/components/common/liveBox/index.vue
 * @Description: 播放盒子（视频直播，动画直播）
-->
<template>
  <div class="live-flow">
    <ul class="live-type-list">
      <li :class="live_tab_index === 0?'actived': '' " @click="live_tab_index=0;isAnimal=false">视频直播</li>
      <li :class="live_tab_index === 1 ?'actived': ''" @click="live_tab_index=1;isAnimal=true">动画直播</li>
    </ul>
    <videoPlayer v-show="live_tab_index === 0" :isAnimal="isAnimal" :src="flow.video_addr"></videoPlayer>
    <div v-show="live_tab_index === 1" style="overflow:hidden">
      <animate-live  :src="flow.aimation_addr"/>
    </div>
  </div>
</template>

<script>
import videoPlayer from "~/components/common/videoPlayer";
export default {
  props:{
    flow:{
      type:Object,
      default:()=>({
        aimation_addr:'https://m.esports8.com/live/lol?matchId=l8xsyuqtr7z50ap',
        video_addr:'https://www.apple.com/105/media/cn/mac/family/2018/46c4b917_abfd_45a3_9b51_4e3054191797/films/bruce/mac-bruce-tpl-cn-2018_1280x720h.mp4'
      })
    }
  },
  name: "live-flow",
  components: { videoPlayer },
  data() {
    return {
      live_tab_index: 0,
      isAnimal: false
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang='less' scoped>
.live-flow {
  height: 488px;
  overflow: hidden;
  .live-type-list {
    display: flex;
    height: 40px;
    & > li {
      flex: 1;
      text-align: center;
      line-height: 40px;
      font-size: 14px;
      color: #333;
      &.actived {
        color: #fff;
        font-weight:bold;
        background: #6521D7;
      }
    }
  }
}
</style>
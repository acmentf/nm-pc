<template>
  <div
    ref="player"
    class="video-player-box"
    :playsinline="playsinline"
    @play="onPlayerPlay($event)"
    @pause="onPlayerPause($event)"
    @ended="onPlayerEnded($event)"
    @loadeddata="onPlayerLoadeddata($event)"
    @waiting="onPlayerWaiting($event)"
    @playing="onPlayerPlaying($event)"
    @timeupdate="onPlayerTimeupdate($event)"
    @canplay="onPlayerCanplay($event)"
    @canplaythrough="onPlayerCanplaythrough($event)"
    @ready="playerReadied"
    @statechanged="playerStateChanged($event)"
    v-video-player:myVideoPlayer="playerOptions"
  ></div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default:""
    },
    isAnimal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // component options
      playsinline: true,
      // videojs options
      playerOptions: {
        aspectRatio: "16:9",
        fluid: true,
        muted: true,
        autoplay: true, // 自动播放
        controls: true, // 是否显示控制栏
        language: "zh-CN",
        //poster: '/images/live123.png',
        width: "796",
        height: "595",
        sources: [
          {
            type: "",
            src: this.src
          }
        ]
      }
    };
  },
  methods: {
    // listen event
    onPlayerPlay(player) {
      //console.log("player", player);
    },
    onPlayerPause(player) {
      // console.log('player pause!', player)
    },
    onPlayerEnded(player) {
      // console.log('player ended!', player)
    },
    onPlayerLoadeddata(player) {
      // console.log('player Loadeddata!', player)
    },
    onPlayerWaiting(player) {
      // console.log('player Waiting!', player)
    },
    onPlayerPlaying(player) {
      // console.log('player Playing!', player)
    },
    onPlayerTimeupdate(player) {
      // console.log('player Timeupdate!', player.currentTime())
    },
    onPlayerCanplay(player) {
      // console.log('player Canplay!', player)
    },
    onPlayerCanplaythrough(player) {
      // console.log('player Canplaythrough!', player)
    },
    // or listen state event
    playerStateChanged(playerCurrentState) {
      // console.log("player current update state", playerCurrentState);
    },
    // player is ready
    playerReadied(player) {
      //  let _player = document.getElementById('vjs_video_3').click();
      //  console.log('_player',_player)
      //_player[0].click();
      //player.click()
      // console.log("example 01: the player is readied", player);
    }
  },
  watch: {
    isAnimal(val) {
      let player = document.getElementById("vjs_video_3_html5_api");
      if(!player) return;
      if (val) {
     
        player.pause();
      } else {
        console.log("player-1", player);
        player.play();
      }
    }
  },
  mounted() {
    //let player =  this.$refs['player']
    let player = document.getElementById("vjs_video_3_html5_api");
    setTimeout(() => {
      //player.muted  = false
      //player.volume = 5
    }, 2000);
  }
};
</script>

<style lang="less">
.video-player-box {
  width: 100%;
  margin: 0 auto;
  min-height: 4.18rem;
  .video-js .vjs-progress-control .vjs-progress-holder {
    display: none;
  }
  .vjs-big-play-button {
    display: none;
  }
}
</style>
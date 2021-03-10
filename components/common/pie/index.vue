<!--
  功能：Pie（空心饼状图）图
  作者：acmentf
  邮箱：985881328@qq.com
  时间：2020年12月24日 13:44:27
-->
<template>
  <div class="pie" ref="pie" :style="{width:width+'px',height:height+'px'}"></div>
</template>
<script>
export default {
  props: {
    // 饼图类型 1为主队 2为客队
    type: {
      type: Number | String,
      default: 2
    },
    width: {
      type: String,
      default: '80'
    },
    height: {
      type: String,
      default: '80'
    },
    rate:{
      type:Number | String,
      default:100
    }
  },
  name: "pie",
  components: {},
  data() {
    var _this = this;
    return {
      myChart:null
    };
  },
  computed: {},
  methods: {
    initChart(){
      // byFeikeQ
      var _this = this;
      var option = {
        series: [
          {
            type: "pie",
            radius: ["75%", "100%"],
            center: ["50%", "50%"],
            hoverAnimation: false,
            avoidLabelOverlap: false,
            startAngle: 0, //起始角度
            labelLine: {
              show: false
            },
            data: [
              { value: Number(this.rate), name: "70%" },
              { value: 100-Number(this.rate), name: "" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              },
              normal: {
                color: function(params) {
                  var colorList =
                    _this.type == 1
                      ? [
                          {
                            c1: "#33C6D6",
                            c2: "#33C6D6"
                          },
                          {
                            c1: "#ccc",
                            c2: "#ccc"
                          }
                        ]
                      : [
                          {
                            c1: "#F05365",
                            c2: "#F05365"
                          },
                          {
                            c1: "#ccc",
                            c2: "#ccc"
                          }
                        ];
                  return new _this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [
                    {
                      //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                      offset: 0,
                      color: colorList[params.dataIndex].c1
                    },
                    {
                      offset: 1,
                      color: colorList[params.dataIndex].c2
                    }
                  ]);
                }
              }
            }
          }
        ]
      };
      this.myChart.setOption(option);
    }
  },
  created() {},
  mounted() {
    this.myChart = this.$echarts.init(this.$refs["pie"]);
    this.initChart();
  },

  // byFeikeQ
  watch:{
    rate(n,o){
      this.initChart();
    }
  }
};
</script>
<style lang='less' scoped>
.pie{
  border-radius: 50%;
  overflow: hidden;
}
</style>
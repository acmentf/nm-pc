<!--
  功能：胜率等图probability组件
  作者：feikeq
  邮箱：feikeq@gmail.com
  时间：2020年11月11日 14:30:00
-->
<template>
  <div :class="$options.name">
    <!-- {{data}} -->
    <div class="barmyChart" ref="barmyChart"></div>
    <div class="y-axis">
      <div
        class="point"
        style="background: rgba(51, 198, 214, 0.8);position: absolute;top:170px;left: -4px;"
      ></div>
      <div class="point" style="background:#6521D7;position: absolute;top:83px;left: -4px;"></div>
      <div
        class="point"
        style="background: rgba(240, 83, 101, 0.8);position: absolute;top:-3px;left: -4px;"
      ></div>
    </div>
    <span class="tip homeTeam">
      <span style="display: inline-block;width:30px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{data.team_name_home}}</span>
      <img width="25px" height="25px" :src="data.team_icon_home" onerror="this.src='/images/team_default.png';this.onerror=null" />
      <span>{{data.team_rate_home}}</span>
    </span>
    <span class="tip awayTeam">
      <span style="display: inline-block;width:30px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{data.team_name_away}}</span>
      <img width="25px" height="25px" :src="data.team_icon_away" onerror="this.src='/images/team_default.png';this.onerror=null" />
       <span>{{data.team_rate_away}}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: "probabilityChart",
  version: "1.309.20201111", // 版本号
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {
    type: {
      type: String,
      default: ""
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  watch:{
    'data':{
      handler(value){
        this.initChart();
      },
      deep:true
    }
  },
  methods: {
    initChart() {
      var _tmp = [];
      var data = this.data;
      
      for (var index = 0; index < data.role_list.length; index++) {
        var element = data.role_list[index];
        var _item = {
          value: [index, element.rate *1],
          symbol: "image://" + element.role_img_url
        };
        _tmp.push(_item);
      }
      this.chartOption.series[0].data = _tmp;
      this.chartOption.series[0].name = data.page_name;
      this.$nextTick(() => {
        //   console.log(this.$refs['barmyChart']);
        var myChart = this.$echarts.init(this.$refs["barmyChart"]);
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(this.chartOption);
      });
    }
  },
  data() {
    var data_red = [
      {
        value: [1, 55],
        symbol: "image://" + "/images/c1.png"
      },
      {
        value: [2, 29],
        symbol: "image://" + "/images/c1.png"
      },
      {
        value: [3, 24],
        symbol: "image://" + "/images/c1.png"
      },
      {
        value: [4, 30],
        symbol: "image://" + "/images/c1.png"
      },
      {
        value: [5, 32],
        symbol: "image://" + "/images/c1.png"
      },
      {
        value: [6, 35],
        symbol: "image://" + "/images/c1.png"
      },
      {
        value: [7, 44],
        symbol: "image://" + "/images/c1.png"
      },
      {
        value: [8, 34],
        symbol: "image://" + "/images/c1.png"
      },
      {
        value: [9, 33],
        symbol: "image://" + "/images/c1.png"
      },
      {
        value: [10, 80],
        symbol: "image://" + "/images/c1.png"
      }
    ];

    let icon =
      '<svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9125" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"><defs><style type="text/css"></style></defs><path d="M874.044235 149.955765L873.411765 361.411765l150.588235 150.588235-150.588235 150.588235 0.63247 211.456L662.588235 873.411765l-150.588235 150.588235-150.588235-150.588235-211.456 0.63247L150.588235 662.588235l-150.588235-150.588235 150.588235-150.588235-0.63247-211.456L361.411765 150.588235l150.588235-150.588235 150.588235 150.588235z" fill="#FF6E6E" p-id="9126"></path><path d="M512 512m-271.058824 0a271.058824 271.058824 0 1 0 542.117648 0 271.058824 271.058824 0 1 0-542.117648 0Z" fill="#0C0058" p-id="9127"></path></svg>';
    icon = encodeURIComponent(icon); // 转译
    icon = "data:image/svg+xml;utf8," + icon; // 添加url前缀
    icon = "image://" + icon; // 添加ECharts需要的前缀

    return {
      chartOption: {
        animation: true,

        // title 标题组件，包含主标题和副标题。
        title: {
          // left: 'center', //title 组件离容器左侧的距离。（可以 20 或 '20%'来设置）
          // text: 'text 主标题文本，支持使用 \n 换行',
          // subtext: '副标题文本，支持使用 \n 换行',
        },

        // legend 图例组件。
        legend: {
          show: false
        },

        /*
          tooltip 提示框组件。
          */
        tooltip: {
          // triggerOn: 'axis',
          trigger: "axis", // 触发类型(axis坐标,item数据项图形,none不触发)
          backgroundColor: "rgba(15, 23, 46, 0.8)", //通过设置rgba调节背景颜色与透明度
          borderWidth: 0, //提示框浮层的边框宽。
          formatter: function(params) {
          
           
          },
          // axisPointer 坐标轴指示器配置项。
          axisPointer: {
            type: "none", // ('line' 直线指示器 ,'shadow' 阴影指示器 ,'cross' 十字准星指示器 ,'none' 无指示器)
            shadowStyle: {
              color: "rgba(150,150,150,0.3)"
            }
          }
        },

       
        xAxis: {
          type: "value",
          // boundaryGap:['0%', '100%'],
          /* splitLine 坐标轴在 grid 区域中的分隔线。*/
          splitLine: {
            show: false, // 是否显示区域中的分隔线。
            lineStyle: {
              opacity: 0.1,
              // 使用深浅的间隔色
              color: ["#4C95FA"]
            }
          },
          axisLine: {
            lineStyle: {
              color: "#FAFAFA",
              width: 1, //这里是坐标轴的宽度,可以去掉
              opacity: 0.14
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          }

        },

        // yAxis 直角坐标系 grid 中的 y 轴，一般情况下单个 grid 组件最多只能放左右两个 y 轴，多于两个 y 轴需要通过配置 offset 属性防止同个位置多个 Y 轴的重叠。
        yAxis: {
       
          type: "value",
        
          max: 100,
          min: 0,
          interval: 60, // 步长
          show: true,
          offset: 30,
          axisTick: {
            show: false,
            inside: true // 坐标轴刻度是否朝内，默认朝外。
          },
          /* splitLine 坐标轴在 grid 区域中的分隔线。*/
          splitLine: {
            show: false,
            lineStyle: {
              // 使用深浅的间隔色
              color: "#4C95FA"
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgba(170, 170, 170, 0.95)",
              width: 1 //这里是坐标轴的宽度
            }
          },
          // axisLabel 坐标轴刻度标签的相关设置。
          axisLabel: {
            // inside: true,
            formatter: "{value}%",
            show: true,
            textStyle: {
              color: "rgba(170, 170, 170, 0.95)", //更改坐标轴文字颜色
              fontSize: 14 //更改坐标轴文字大小
            }
          }
          // z: 10 //Y 轴组件的所有图形的z值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖。
        },

        // grid 直角坐标系内绘图网格，单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴。可以在网格上绘制折线图，柱状图，散点图（气泡图）。
        grid: {
          // show:true, //是否显示直角坐标系网格。
          top: 30, //grid 组件离容器上侧的距离。
          left: 30, //grid 组件离容器左侧的距离。
          right: 10, //grid 组件离容器右侧的距离。
          bottom: 30,
          containLabel: true
          // height: 160 //grid 组件的高度。默认自适应。
        },

        // series 系列列表。每个系列通过 type 决定自己的图表类型
        series: [
          {
            type: "line", //折线/面积图
            smooth: false, //是否平滑曲线显示。
            // symbol: 'image://data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7', //标记的图形。
            // symbolSize: 40, //标记的大小
            symbol: "none",
            symbolSize: 0, //标记的大小
            sampling: "average", //折线图在数据量远大于像素点时候的降采样策略，开启后可以有效的优化图表的绘制效率，默认关闭，也就是全部绘制不过滤数据点。
            // itemStyle 折线拐点标志的样式。
            itemStyle: {
              // color: '#CA6BCE',
              normal: {
                color: "#6521D7", //
                boxShadow: "0px 4px 6px rgba(42, 47, 247, 0.8)",
                opacity: 0.8,
                lineStyle: {
                  width: 1 // 0.1的线条是非常细的了
                }
              }
            },
            data: [],
          
            symbol: icon,
            // symbol:['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'],
            symbolSize: 20
          }
        ]
      }
    };
  },
  mounted() {
    this.initChart();
  }
};
</script>

<style lang="less" scoped>
.probabilityChart {
  width: 100%;
  height: 100%;
  position: relative;
  .barmyChart {
    width: 100%;
    height: 100%;
  }
  .y-axis {
    border-left: 2px solid #ddd;
    border-image: linear-gradient(
        247deg,
        rgba(240, 83, 101, 0.8),
        rgba(8, 51, 95, 0.5),
        rgba(51, 198, 214, 0.8)
      )
      1 5 10;
    height: 173px;
    position: absolute;
    top: 30px;
    left: 51px;
    .point {
      width: 5px;
      height: 5px;
      border-radius: 50%;
    }
  }
  .tip {
    position: absolute;
    width: 100%;
    font-size: 14px;
    font-weight: bold;
    color: #333;
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
    img {
      margin: 0 8px;
    }
    &.homeTeam {
      top: -7px;
      &>span{
        font-size:14px;
        color:#33C6D6;
      }
    }
    &.awayTeam {
      bottom: -7px;
      &>span{
        font-size:14px;
        color:#F05365;
      }
    }
  }
}
</style>
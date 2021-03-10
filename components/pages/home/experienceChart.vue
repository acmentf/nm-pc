<!--
  功能：胜率等图experience组件
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
      <div class="point" style="background: #6521D7;position: absolute;top:83px;left: -4px;"></div>
      <div
        class="point"
        style="background: rgba(240, 83, 101, 0.8);position: absolute;top:-3px;left: -4px;"
      ></div>
    </div>
    <span class="tip homeTeam">
      <span style="display: inline-block;width:30px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{data.team_contrast}}</span>
      <img
        width="25px"
        height="25px"
        :src="data.team_contrast_icon"
        v-if="data.team_contrast_icon"
        onerror="this.src='/images/team_default.png';this.onerror=null"
      />
    </span>
    <span class="tip awayTeam">
      <span style="display: inline-block;width:30px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{data.team_standard}}</span>
      <img
        width="25px"
        height="25px"
        :src="data.team_standard_icon"
        v-if="data.team_standard_icon"
        onerror="this.src='/images/team_default.png';this.onerror=null"
      />
    </span>
  </div>
</template>

<script>
export default {
  name: "experienceChart",
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
      default: {}
    }
  },
  methods: {
    initChart() {
      var data = this.data.ecolist ? this.data.ecolist : []; //经济
      var data_1 = this.data.explist ? this.data.explist : []; //经验
      let xAxis = [],
        yAxis = [],
        xAxis_1 = [],
        yAxis_1 = [];
      data.forEach(item => {
        let arr = item.split(":");
        yAxis.push(Number(arr[1]));
        if (arr[0].length == 1) {
          xAxis.push("0" + arr[0] + ":" + "00");
        } else {
          xAxis.push(arr[0] + ":" + "00");
        }
      });
      data_1.forEach(item => {
        let arr = item.split(":");
        yAxis_1.push(Number(arr[1]));
        if (arr[0].length == 1) {
          xAxis_1.push("0" + arr[0] + ":" + "00");
        } else {
          xAxis_1.push(arr[0] + ":" + "00");
        }
      });
      this.chartOption.xAxis.data = xAxis;
      //
      //  this.chartOption.series[0].data = yAxis;
      //  this.chartOption.series[1].data = yAxis_1;
      //
      if (this.type === "lol") {
        this.chartOption.color=["#F5AF10", "#F5AF10"];
        this.chartOption.series = [
          {
            name: "经济差",
            type: "line",
            stack: "总量",
            areaStyle: {
              color: "rgba(245, 175, 16, 0.1)"
            },
            symbol: "none",
            symbolSize: 0, //标记的大小
            data: yAxis,
            itemStyle: {
              normal: {
                // 修改数据边界的线颜色
                lineStyle: {
                  color: "#F5AF10" //改变折线颜色
                }
              }
            }
          }
        ];
      } else {
        this.chartOption.series = [
          {
            name: "经验差",
            type: "line",
            stack: "总量",
            areaStyle: {
              color: "rgba(245, 175, 16, 0.1)"
            },
            symbol: "none",
            symbolSize: 0, //标记的大小
            data: yAxis_1,
            itemStyle: {
              normal: {
                // 修改数据边界的线颜色
                lineStyle: {
                  color: "#F5AF10" //改变折线颜色
                }
              }
            }
          },
          {
            name: "经济差",
            type: "line",
            stack: "总量",
            areaStyle: {
              color: "rgba(40, 98, 229, 0.1)"
            },
            symbol: "none",
            symbolSize: 0, //标记的大小
            data: yAxis,
            itemStyle: {
              normal: {
                // 修改数据边界的线颜色
                lineStyle: {
                  color: "#2862E5" //改变折线颜色
                }
              }
            }
          }
        ];
      }

      this.$nextTick(() => {
        var myChart = this.$echarts.init(this.$refs["barmyChart"]);
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(this.chartOption);
      });

      // this.$nextTick(() => {
      //   var myChart = this.$echarts.init(this.$refs["barmyChart"]);

      //   // 使用刚指定的配置项和数据显示图表。
      //   myChart.setOption(this.chartOption);
      // });
    }
  },
  watch: {
    data: {
      handler() {
        this.initChart();
      },
      deep: true
    }
  },
  data() {
    let _this = this;
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
        color: ["#2862E5","#F5AF12"],
        legend: {
          itemHeight: 6,
          show: true,
          right: "center",
          x: "right",
          textStyle: {
            color: " #A1A1A1"
          },
          icon: "circle"
        },

        /*
                        tooltip 提示框组件。
                        */
        tooltip: {
          // triggerOn: 'axis',
          trigger: "axis", // 触发类型(axis坐标,item数据项图形,none不触发)
          backgroundColor: "rgba(15, 23, 46, 0.8)", //通过设置rgba调节背景颜色与透明度
          borderWidth: 0, //提示框浮层的边框宽。
          position: function(point, params, dom, rect, size) {
            var pointX = point[0],
              pointY = point[1];
            var boxWidth = size.contentSize[0],
              boxHeight = size.contentSize[1],
              _mid = boxHeight / 2;
            var x = pointX,
              y = pointY - _mid;
            if (point[0] > size.viewSize[0] / 2) {
              x = pointX - boxWidth;
              y = pointY - boxHeight + _mid;
            }
            if (y < 10) y = 0;
            return [x, y];
          },
          formatter: function(params) {
            // console.log('params',params)
            var res =
              "<p style='text-align:center;line-height:12px;color:#fff;'>" +
              params[0].axisValue +
              "</p>";
            for (var i = 0; i < params.length; i++) {
              var _val = params[0].value;
              if (isNaN(_val)) _val = 0;
              var _teamName =
                _val > 0 ? _this.data.team_standard : _this.data.team_contrast;
              var _css =
                " text-align:left; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;vertical-align: bottom; display: inline-block; ";
              var _tmp =
                params[i].marker +
                "<b style='color:rgba(255, 255, 255, 0.7);font-size:10px;width:40px;" +
                _css +
                "'>" +
                _teamName +
                "</b> " +
                "<b style='color:rgba(255, 255, 255, 0.7);font-size:10px;width:56px;" +
                _css +
                "'>" +
                params[i].seriesName +
                "领先:" +
                "</b> " +
                " <b style='color:" +
                params[i].color +
                ";font-size:10px;display: inline-block;margin-left:-5px;' >" +
                Math.abs(params[i].value) +
                "</b><br />";

              res += _tmp;
            }

            return res;
          },
          // axisPointer 坐标轴指示器配置项。
          axisPointer: {
            type: "line", // ('line' 直线指示器 ,'shadow' 阴影指示器 ,'cross' 十字准星指示器 ,'none' 无指示器)
            shadowStyle: {
              color: "rgba(150,150,150,0.3)"
            },
            lineStyle: {
              color: "rgba(150,150,150,0.8)"
            },
            crossStyle: {
              color: "blue"
            }
          }
        },

        xAxis: {
          type: "category",
          data: ["01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00"],
          offset: 10,
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
            show: true,
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
            show: true,
            textStyle: {
              color: "rgba(170, 170, 170, 0.95)", //更改坐标轴文字颜色
              fontSize: 14 //更改坐标轴文字大小
            }
          }
        },

        // yAxis 直角坐标系 grid 中的 y 轴，一般情况下单个 grid 组件最多只能放左右两个 y 轴，多于两个 y 轴需要通过配置 offset 属性防止同个位置多个 Y 轴的重叠。
        yAxis: {
          /*
                            type 坐标轴类型。
                            'value' 数值轴，适用于连续数据。
                            'category' 类目轴，适用于离散的类目数据。为该类型时类目数据可自动从 series.data 或 dataset.source 中取，或者可通过 xAxis.data 设置类目数据。
                            'time' 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
                            'log' 对数轴。适用于对数数据。
                            */
          type: "value",

          show: true,
          offset: 30,
          // axisTick 坐标轴刻度相关设置。
          axisTick: {
            show: false
          },
          /* splitLine 坐标轴在 grid 区域中的分隔线。*/
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          // axisLabel 坐标轴刻度标签的相关设置。
          axisLabel: {
            // inside: true,
            formatter: function(params) {
              return params / 1000 + "K";
            },
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
          bottom: 10,
          containLabel: true
          // height: 160 //grid 组件的高度。默认自适应。
        },

        // series 系列列表。每个系列通过 type 决定自己的图表类型
        series: [
        
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
.experienceChart {
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
    }
    &.awayTeam {
      bottom: -7px;
    }
  }
}
</style>
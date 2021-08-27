<template>
  <div class="sort">

    <el-row style="margin-top:20px">
      <div class="select">
        <!-- :inline="true" -->
          <el-form :model="params" class="demo-form-inline">
            <el-row>
              <el-col :span="24">
            
            <el-col :span="3.5"
              ><el-form-item>
                <el-select v-model="params.name" placeholder="Company name">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select></el-form-item
            ></el-col>

            <el-col :span="3.5">
              <el-input
              v-model="params.minClose"
              placeholder="Lower limit of Close"
            ></el-input> 
            </el-col>
                <el-col class="line" :span="0.5">-</el-col>
            <el-col :span="3.5"
              ><el-form-item>
                <el-input
              v-model="params.maxClose"
              placeholder="Upper limit of Close"
            ></el-input> </el-form-item
            ></el-col>
            
              <el-col :span="0.1">
                 <!-- :span="2" -->
                 
              <el-form-item style="float:right">
                <el-button plain type="primary" @click="onSubmit"
                  >Query</el-button
                >
              </el-form-item>
              </el-col>
              </el-col>
            </el-row>
<el-row>
            <el-col :span="16">
              <el-form-item>
                 <!-- label="Date range" -->
                <el-col :span="8">
                  <el-date-picker
                    type="date"
                    placeholder="Pick start date"
                    v-model="params.startDate"
                    style="width: 100%"
                  ></el-date-picker>
                </el-col>
                <el-col class="line" :span="0.1">-</el-col>
                <el-col :span="8">
                  <el-date-picker
                    placeholder="Pick end date"
                    v-model="params.endDate"
                    style="width: 100%"
                  ></el-date-picker>
                </el-col>
              </el-form-item>
            </el-col>
            <!-- <el-row> -->
            <!-- </el-row> -->
            </el-row>
          </el-form>
      </div>
    </el-row>

    <el-row>
      <div v-loading="loading">
        <v-chart ref="bar" class="chart" :option="option" /></div
    ></el-row>
  </div>
</template>

<script>
// import { getTopVolume } from "@/api";
// import Search from "@/components/Search.vue"

import { parseData } from "@/utils/parse";
import { getFilteredStocks } from "@/api";

import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, CustomChart, LineChart, BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent,
  DataZoomComponent,
  BrushComponent,
  VisualMapComponent,
} from "echarts/components";
import { CandlestickChart } from "echarts/charts";
import VChart, { THEME_KEY } from "vue-echarts";

use([
  CanvasRenderer,
  PieChart,
  CustomChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  CandlestickChart,
  GridComponent,
  ToolboxComponent,
  DataZoomComponent,
  LineChart,
  BarChart,
  BrushComponent,
  VisualMapComponent,
]);

const upColor = "#F56C6C";
const downColor = "#67C23A";

export default {
  name: "Sort",
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: "light",
  },
  data() {
    return {
      volumeData: [],
      loading: true,
      stockData: {
        categoryData: [],
        values: [],
      },
      params: {
        name:"AAPL",
        minClose:10,
        maxClose:100,
        startDate: "2007-01-01",
        endDate: "2014-12-31",
      },
      option: null,
      options:[
        {
          label:"Altaba Inc.",
          value:"AABA"
        },{
          label:"American Express",
          value:"AXP"
        },{
          label:"Amazon",
          value:"AMZN"
        },{
          label:"Apple Inc.",
          value:"AAPL"
        },{
          label:"Boeing",
          value:"BA"
        },{
          label:"Caterpillar Inc.",
          value:"CAT"
        },{
          label:"Chevron Corporation",
          value:"CVX"
        },{
          label:"Cisco Systems",
          value:"CSCO"
        },{
          label:"The Coca-Cola Company",
          value:"KO"
        },{
          label:"General Electric Company",
          value:"GE"
        },{
          label:"Alphabet Inc.",
          value:"GOOGL"
        },{
          label:"Goldman Sachs",
          value:"GS"
        },{
          label:"The Home Depot",
          value:"HD"
        },{
          label:"IBM",
          value:"IBM"
        },{
          label:"Intel",
          value:"INTC"
        },{
          label:"Johnson & Johnson",
          value:"JNJ"
        },{
          label:"JPMorgan Chase",
          value:"JPM"
        },{
          label:"McDonald's",
          value:"MCD"
        },{
          label:"Merck & Co.",
          value:"MRK"
        },{
          label:"Microsoft",
          value:"MSFT"
        },{
          label:"Nike, Inc.",
          value:"NKE"
        },{
          label:"Procter & Gamble",
          value:"PG"
        },{
          label:"3M",
          value:"MMM"
        },{
          label:"The Travelers Companies",
          value:"TRV"
        },{
          label:"UnitedHealth Group",
          value:"	UNH"
        },{
          label:"Verizon Communications",
          value:"VZ"
        },{
          label:"Visa Inc.",
          value:"V"
        },{
          label:"Walgreens Boots Alliance	",
          value:"WBA"
        },{
          label:"United Technologies Corp Stock Price",
          value:"	UTX"
        },{
          label:"The Walt Disney Company",
          value:"DIS"
        },
      ]
    };
  },
  methods: {
    splitData(rawData) {
      var categoryData = [];
      var values = [];
      var volumes = [];
      for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i]);
        volumes.push([
          i,
          rawData[i][4],
          rawData[i][0] > rawData[i][1] ? 1 : -1,
        ]);
      }

      return {
        categoryData: categoryData,
        values: values,
        volumes: volumes,
      };
    },

    renderItem(params, api) {
      let xValue = api.value(0);
      let openPoint = api.coord([xValue, api.value(1)]);
      let closePoint = api.coord([xValue, api.value(2)]);
      let lowPoint = api.coord([xValue, api.value(3)]);
      let highPoint = api.coord([xValue, api.value(4)]);
      let halfWidth = api.size([1, 0])[0] * 0.35;
      let style = api.style({
        stroke: api.visual("color"),
      });

      return {
        type: "group",
        children: [
          {
            type: "line",
            shape: {
              x1: lowPoint[0],
              y1: lowPoint[1],
              x2: highPoint[0],
              y2: highPoint[1],
            },
            style: style,
          },
          {
            type: "line",
            shape: {
              x1: openPoint[0],
              y1: openPoint[1],
              x2: openPoint[0] - halfWidth,
              y2: openPoint[1],
            },
            style: style,
          },
          {
            type: "line",
            shape: {
              x1: closePoint[0],
              y1: closePoint[1],
              x2: closePoint[0] + halfWidth,
              y2: closePoint[1],
            },
            style: style,
          },
        ],
      };
    },
    getFilteredStocks() {
      this.loading = true;
      const promise = new Promise((resolve, reject) => {
        getFilteredStocks(this.params)
          .then((response) => {
            const data = response;
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
      promise
        .then((response) => {
          this.stockData = this.splitData(parseData(response));
          // Y.data;
          this.loading = false;
          console.log(this.stockData);
          this.getOption();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    refresh() {
      // simulating async data from server
      let seconds = 3;
      let bar = this.$refs.bar;
      // bar.showLoading({
      //   text: '正在加载',
      //   color: '#4ea397',
      //   maskColor: 'rgba(255, 255, 255, 0.4)'
      // })
      let timer = setInterval(() => {
        seconds--;
        if (seconds === 0) {
          clearTimeout(timer);
          // bar.hideLoading()
          bar.mergeOptions(this.option);
        }
      }, 1000);
    },
    onSubmit() {
      this.getFilteredStocks(this.params);
    },
    getOption() {
      this.option = {
        animation: true,
        legend: {
          bottom: 0,
          left: "center",
          data: ["Dow-Jones index"],
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          textStyle: {
            color: "#000",
          },
          position: function (pos, params, el, elRect, size) {
            var obj = { top: 10 };
            obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 30;
            return obj;
          },
          // extraCssText: 'width: 170px'
        },
        axisPointer: {
          link: { xAxisIndex: "all" },
          label: {
            backgroundColor: "#777",
          },
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: false,
            },
            brush: {
              type: ["lineX", "clear"],
            },
          },
        },
        brush: {
          xAxisIndex: "all",
          brushLink: "all",
          outOfBrush: {
            colorAlpha: 0.1,
          },
        },
        visualMap: {
          show: false,
          seriesIndex: 5,
          dimension: 2,
          pieces: [
            {
              value: 1,
              color: downColor,
            },
            {
              value: -1,
              color: upColor,
            },
          ],
        },
        grid: [
          {
            left: "10%",
            right: "8%",
            height: "50%",
          },
          {
            left: "10%",
            right: "8%",
            top: "63%",
            height: "16%",
          },
        ],
        xAxis: [
          {
            type: "category",
            data: this.stockData.categoryData,
            scale: true,
            boundaryGap: false,
            axisLine: { onZero: false },
            splitLine: { show: false },
            splitNumber: 20,
            min: "dataMin",
            max: "dataMax",
            axisPointer: {
              z: 100,
            },
          },
          {
            type: "category",
            gridIndex: 1,
            data: this.stockData.categoryData,
            scale: true,
            boundaryGap: false,
            axisLine: { onZero: false },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { show: false },
            splitNumber: 20,
            min: "dataMin",
            max: "dataMax",
          },
        ],
        yAxis: [
          {
            scale: true,
            splitArea: {
              show: true,
            },
          },
          {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
          },
        ],
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0, 1],
            start: 0,
            end: 100,
          },
          {
            show: true,
            xAxisIndex: [0, 1],
            type: "slider",
            top: "85%",
            start: 0,
            end: 100,
          },
        ],
        series: [
          {
            name: "Dow-Jones index",
            type: "candlestick",
            data: this.stockData.values,
            itemStyle: {
              color: upColor,
              color0: downColor,
              borderColor: null,
              borderColor0: null,
            },
            tooltip: {
              formatter: function (param) {
                param = param[0];
                return [
                  "Date: " + param.name + '<hr size=1 style="margin: 3px 0">',
                  "Open: " + param.data[0] + "<br/>",
                  "Close: " + param.data[1] + "<br/>",
                  "Lowest: " + param.data[2] + "<br/>",
                  "Highest: " + param.data[3] + "<br/>",
                ].join("");
              },
            },
          },
          {
            name: "Volume",
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: this.stockData.volumes,
            itemStyle:{
              opacity: 0.5,
            }
          },
        ],
      };
    },
    calculateMA(dayCount, data) {
      var result = [];
      for (var i = 0, len = data.values.length; i < len; i++) {
        if (i < dayCount) {
          result.push("-");
          continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
          sum += data.values[i - j][1];
        }
        result.push(+(sum / dayCount).toFixed(3));
      }
      return result;
    },
  },
  mounted() {
    this.$nextTick(() => {
      // this.getTopVolume();
      this.getFilteredStocks();
      // this.refresh()
    });
  },
};
</script>

<style scoped>
.el-col{
  margin:-2px 5px
}

.chart {
  height: 400px;
}

.proxy-test {
  float: right;
}

.el-dropdown-menu {
  max-height: 80vh;
  overflow-y: scroll;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
<template>
  <div v-loading="loading">
    <v-chart ref="bar" class="chart" :option="option" />
  </div>
</template>

<script>
import { parseData } from "@/utils/parse";
import { getStocks } from "@/api";

import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, CustomChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent,
  DataZoomComponent,
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
]);

export default {
  name: "Stocks",
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: "light",
  },
  data() {
    return {
      stockData: {
        categoryData: [],
        values: [],
      },
      loading: true,
      stock: "AAPL",
      startDate: "2007-01-01",
      endDate: "2014-12-31",
      option: null,
    };
  },
  methods: {
    splitData(rawData) {
      let categoryData = [];
      let values = [];
      for (let i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i][0]);
        rawData[i][0] = i;
        values.push(rawData[i]);
      }
      return {
        categoryData: categoryData,
        values: values,
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
    getStocks() {
      this.loading = true;
      const promise = new Promise((resolve, reject) => {
        getStocks(this.stock, this.startDate, this.endDate)
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
    getOption() {
      this.option = {
        animation: false,
        legend: {
          bottom: 10,
          left: "center",
          data: ["Dow-Jones index"],
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
          position: function (pos, params, el, elRect, size) {
            let obj = { top: 10 };
            obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 30;
            return obj;
          },
        },
        axisPointer: {
          link: { xAxisIndex: "all" },
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
        grid: [
          {
            left: "10%",
            right: "8%",
            bottom: 150,
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
        ],
        yAxis: [
          {
            scale: true,
            splitArea: {
              show: true,
            },
          },
        ],
        dataZoom: [
          {
            type: "inside",
            start: 98,
            end: 100,
            minValueSpan: 10,
          },
          {
            show: true,
            type: "slider",
            bottom: 60,
            start: 98,
            end: 100,
            minValueSpan: 10,
          },
        ],
        series: [
          {
            name: "Dow-Jones index",
            type: "custom",
            renderItem: this.renderItem,
            dimensions: [null, "open", "close", "lowest", "highest"],
            encode: {
              x: 0,
              y: [1, 2, 3, 4],
              tooltip: [1, 2, 3, 4],
            },
            data: this.stockData.values,
          },
        ],
      };
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.getStocks();
      // this.refresh()
    });
  },
};
</script>


<style scoped>
.chart {
  height: 400px;
}
</style>
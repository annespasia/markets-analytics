<template>
  <v-chart class="chart" :option="option" />
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
import {CandlestickChart} from 'echarts/charts';
import VChart, { THEME_KEY } from "vue-echarts";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  CandlestickChart
]);

export default {
  name: "HelloWorld",
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: "dark"
  },
  data() {
    return {
      option: {
        title: {
          text: "Traffic Sources",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: [
            "Direct",
            "Email",
            "Ad Networks",
            "Video Ads",
            "Search Engines"
          ]
        },
        series: [
          {
            name: "Traffic Sources",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "Direct" },
              { value: 310, name: "Email" },
              { value: 234, name: "Ad Networks" },
              { value: 135, name: "Video Ads" },
              { value: 1548, name: "Search Engines" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }
    };
  }
};



// import TradingVue from "trading-vue-js";
// // import Data from '../data/data.json'
// import { parseData } from "@/utils/parse";
// import { getStocks } from "@/api";

// export default {
//   name: "Stocks",
//   components: { TradingVue },
//   methods: {
//     onResize(event) {
//       this.width = window.innerWidth * 0.9;
//       this.height = window.innerHeight * 0.9;
//     },
//     getStocks() {
//       this.loading = true;
//       const promise = new Promise((resolve, reject) => {
//         getStocks(this.stock, this.startDate, this.endDate)
//           .then((response) => {
//             const data = response;
//             resolve(data);
//           })
//           .catch((error) => {
//             reject(error);
//           });
//       });
//       promise
//         .then((response) => {
//           this.chart.data = parseData(response);
//           // Y.data;
//           this.loading = false;
//           console.log(this.chart.data);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     },
//   },
//   mounted() {
//     window.addEventListener("resize", this.onResize);
//     this.getStocks();
//   },
//   beforeDestroy() {
//     window.removeEventListener("resize", this.onResize);
//   },
//   data() {
//     return {
//       loading: true,
//       stock: "AAPL",
//       startDate: "2007-01-01",
//       endDate: "2014-12-31",
//       chart: {
//         type: "Candles",
//         data: [],
//       },
//       width: window.innerWidth,
//       height: window.innerHeight,
//       colors: {
//         colorBack: "#fff",
//         colorGrid: "#eee",
//         colorText: "#333",
//       },
//     };
//   },
// };
</script>


<style scoped>
.chart {
  height: 400px;
}
</style>
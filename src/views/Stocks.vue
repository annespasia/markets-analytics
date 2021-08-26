<template>
  <!-- TradingVueJs 101 (example from 'Getting Started' ) -->
  <div class="stocks">
    <trading-vue
      :data="chart"
      :width="this.width"
      :height="this.height"
      :color-back="colors.colorBack"
      :color-grid="colors.colorGrid"
      :color-text="colors.colorText"
    >
    </trading-vue>
  </div>
</template>

<script>
import TradingVue from "trading-vue-js";
// import Data from '../data/data.json'
import { parseData } from "@/utils/parse";
import { getStocks } from "@/api";

export default {
  name: "Stocks",
  components: { TradingVue },
  methods: {
    onResize(event) {
      this.width = window.innerWidth * 0.9;
      this.height = window.innerHeight * 0.9;
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
          this.chart.data = parseData(response);
          // Y.data;
          this.loading = false;
          console.log(this.chart.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
    this.getStocks();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  data() {
    return {
      loading: true,
      stock: "AAPL",
      startDate: "2007-01-01",
      endDate: "2014-12-31",
      chart: {
        type: "Candles",
        data: [],
      },
      width: window.innerWidth,
      height: window.innerHeight,
      colors: {
        colorBack: "#fff",
        colorGrid: "#eee",
        colorText: "#333",
      },
    };
  },
};
</script>
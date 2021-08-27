<template>
  <div class="stocks">
    <el-row>
      <div class="select">
        <el-row>
          <el-form :inline="true" :model="params" class="demo-form-inline">
            <el-col :span="8"
              >
              <el-col :span="12">
              <el-form-item>
                <el-select v-model="params.name" placeholder="Company name">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select> </el-form-item
            >
            </el-col>
            <el-col :span="12">
                <!-- label="Company name" -->
                <el-select v-model="params.by" placeholder="Aggregate by">
                  <el-option
                    v-for="item in options_by"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select> 
                </el-col>
            </el-col>
            <el-col :span="14">
              <el-form-item>
                <el-col :span="11">
                  <el-date-picker
                    type="date"
                    placeholder="Pick start date"
                    v-model="params.startDate"
                    style="width: 100%"
                  ></el-date-picker>
                </el-col>
                <el-col class="line" :span="1">-</el-col>
                <el-col :span="11">
                  <el-date-picker
                    placeholder="Pick end date"
                    v-model="params.endDate"
                    style="width: 100%"
                  ></el-date-picker>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item>
                <el-button plain type="primary" @click="onSubmit"
                  >Query</el-button
                >
              </el-form-item></el-col
            >
          </el-form>
        </el-row>
      </div>
    </el-row>

    <el-row>
      <div v-loading="loading">
        <el-table
      :data="stockData"
      style="width: 100%"
      height="80vh">
      <el-table-column
        prop="name"
        label="Company"
        width="100">
      </el-table-column>
      <el-table-column
        prop="year"
        label="Year"
        width="100">
      </el-table-column>
        <el-table-column
        prop="month"
        label="Month"
        width="100" v-if="stockData[0].month"
        >
        <template slot-scope="scope">
          {{scope.row.month}}
        </template>
      </el-table-column>
      <el-table-column
        prop="week"
        label="Week"
        width="100" v-if="stockData[0].week" >
        <template slot-scope="scope">
          {{scope.row.week}}
        </template>
      </el-table-column>
      <el-table-column
        prop="ohlcSub.openMin"
        label="Min open">
      </el-table-column>
      <el-table-column
        prop="ohlcSub.openMAx"
        label="Max open">
      </el-table-column>
      <el-table-column
        prop="ohlcSub.openAvg"
        label="Average of open"
        width="180">
      </el-table-column>
      <el-table-column
        prop="ohlcSub.volumeMin"
        label="Min volume">
      </el-table-column>
      <el-table-column
        prop="ohlcSub.volumeMax"
        label="Max volumen">
      </el-table-column>
      <el-table-column
        prop="ohlcSub.volumeAvg"
        label="Average of volume">
      </el-table-column>
    </el-table>
      </div></el-row>
  </div>
</template>

<script>
// import { parseAggData } from "@/utils/parse";
import { getAggStocks } from "@/api";

export default {
  name: "Stocks",
  components: {
  },
  data() {
    return {
      stockData: [],
      loading: true,
      params: {
        name: "AAPL",
        by:2,
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
      ],
      options_by:[
        {label:"Week",value:0},
        {label:"Month",value:1},
        {label:"Year",value:2}
      ]
    };
  },
  methods: {
    onSubmit() {
      this.getAggStocks(this.params);
    },
    getAggStocks() {
      this.loading = true;
      const promise = new Promise((resolve, reject) => {
        getAggStocks(this.params)
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
          this.stockData = response;
          // Y.data;
          this.loading = false;
          console.log(this.stockData);
          // this.getOption();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.getAggStocks();
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
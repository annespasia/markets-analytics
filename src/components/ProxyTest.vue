<template>
  <div class="proxy-test">
    <button @click="clickProxy()">测试跨域</button>
    <el-card v-loading="loading" style="width: 100%">
      {{stockData}}
    </el-card>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  data() {
    return {
      stockData:[],
      loading:false,
    };
  },
  methods: {
    clickProxy() {
      // this.axios.get("/topVolume");
      this.loading=true
      this.getTopVolume()
    },
    getTopVolume() {
      const req = request({
        url: "/api/topVolume",
        method: "get",
        // params: { token }
      });
      const promise = new Promise((resolve, reject) => {
        req
          .then((response) => {
            const data = response;
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
      promise.then((response) => {
          this.stockData = response
          // Y.data;
          this.loading = false;
          console.log(this.stockData)
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
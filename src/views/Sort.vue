<template>
  <div class="sort">
    <div class="proxy-test">
    <el-dropdown>
      <span class="el-dropdown-link">
        Volume Top 10<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <!-- <el-dropdown-item v-for="(elem, index) in volumeData" :key="index"
          >{{ elem.name }}{{ elem.totalVolume }}</el-dropdown-item
        > -->
        <el-table
          v-loading="loading"
          :data="volumeData"
          stripe
          style="width: 100%"
        >
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="name" label="name" width="100">
          </el-table-column>
          <el-table-column prop="totalVolume" label="total volume" width="150">
          </el-table-column>
        </el-table>
      </el-dropdown-menu>
    </el-dropdown>
    </div>

    <Search />
  </div>
</template>

<script>
import { getTopVolume } from "@/api";
import Search from "@/components/Search.vue"

export default {
  name:"Sort",
  components:{
    Search
  },
  data() {
    return {
      volumeData: [],
      loading: true,
    };
  },
  methods: {
    // clickProxy() {
    //   // this.axios.get("/topVolume");
    //   this.loading=true
    //   this.getTopVolume()
    // },
    getTopVolume() {
      const promise = new Promise((resolve, reject) => {
        getTopVolume()
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
          this.volumeData = response;
          // Y.data;
          this.loading = false;
          // console.log(this.stockData)
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getTopVolume();
  },
};
</script>

<style scoped>
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
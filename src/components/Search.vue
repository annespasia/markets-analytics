<template>
  <div class="search">
    <el-input placeholder="Number of stocks" v-model="searchData.n"></el-input>
    <!-- <el-input placeholder="" -->

    <el-table v-loading="loading" :data="sortData" stripe style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="name" label="name" width="100"> </el-table-column>
      <el-table-column prop="totalVolume" label="total volume" width="150">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name:"Search",
  data(){
    return{
      loading:false,
      searchData:{
        n:10
      },
      sortData:[]
    }
  }
}
</script>

<style scoped>
.search {
  width: 100%;
  /* // width: 100vw; */
  display: inline-block;
  margin-top: 15px;
  text-align: left;
  /* float: left; */
}

.el-button {
  /* width: 30%; */
  /* display: inline-block; */
  margin-right: 15px;
  margin-left: 0px;
}

.el-input {
  width: 36%;
  margin-right: 15px;
  display: inline-block;
}

.el-select {
  width: 15%;
  margin-right: 15px;
}
</style>
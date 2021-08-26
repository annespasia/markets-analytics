<template>
  <div class="menu">
    <!-- <transition name="el-zoom-in-center"> -->
      <el-menu
        :default-active="$route.path"
        class="el-menu"
        mode="vertical"
        @select="handleSelect"
        router
        ref="menu"
        :collapse="isCollapse"
      >
        <el-menu-item @click="handleClick">
          <i class="el-icon-menu"></i>
        </el-menu-item>
        <el-menu-item index="/">
          <i class="el-icon-data-line"></i>
          <span slot="title">STOCKS</span>
        </el-menu-item>
        <el-menu-item index="/filter">
          <i class="el-icon-pie-chart"></i>
          <span slot="title">FILTER</span>
        </el-menu-item>
        <el-menu-item index="/sort">
          <i class="el-icon-edit-outline"></i>
          <span slot="title">SORT</span>
        </el-menu-item>
        <el-menu-item index="/agg">
          <i class="el-icon-files"></i>
          <span slot="title">AGGREGATE</span>
        </el-menu-item>
      </el-menu>
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      isCollapse: true,
    };
  },
  methods: {
    handleSelect() {},
    handleClick() {
      // console.log("click");
      this.isCollapse = !this.isCollapse;
    },
  },
  computed: {
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.apiActiveMenu) {
        // 注意这里很重要
        return meta.apiActiveMenu;
      }
      return path;
    },
  },
  // mounted(){
  //   document.body.addEventListener("click",()=>{
  //     this.isCollapse=true
  //   },false)
  // }
};
</script>

<style scoped>
.el-menu {
  /* width: 200px; */
  /* display: inline-block; */
  margin: 0px;
  text-align: left;
  position: absolute;
  bottom: 0;
  top: 0px;
  /* overflow: scroll; */
}

.el-menu:not(.el-menu--collapse) {
  width: 200px;
}
</style>
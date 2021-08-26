<template>
  <div id="app">
    <Menu />
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <router-link to="/proxy">ProxyTest</router-link>
      <router-link to="/trade">TradeTest</router-link>
    </div> -->
    <div class="routs">
      <router-view/>
    </div>

  </div>
</template>

<script>
import Menu from "@/components/Menu.vue"

export default {
  components:{
    Menu
  }
}
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  // margin-top 60px

.routs
  margin-left 64px
  padding 10px
</style>

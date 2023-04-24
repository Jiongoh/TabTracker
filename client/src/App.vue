<template>
  <div class="app">
    <MyHeader />
    
    <router-view></router-view>
  </div>
</template>

<script>
import MyHeader from "./components/MyHeader.vue";
export default {
  name: "App",
  components: { MyHeader },
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
}
.app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>

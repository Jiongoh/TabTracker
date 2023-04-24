<template>
  <div class="panel">
    <h2>{{ title }}</h2>
    <slot name="create"></slot>
    <div class="empty"><slot> Nothing Defined </slot></div>
  </div>
</template>

<script>
export default {
  name: "MyPanel",
  props: ["title"],
};
</script>

<style scoped>
h2 {
  background-color: #409eff;
  margin-top: 0;
  margin-bottom: 0;
  height: 50px;
  color: #fff;
  line-height: 52px;
  cursor: default;
  padding-left: 20px;
  text-shadow: 1px 1px 1px #f2f6fc;
  box-shadow: 1px 1px 3px #909399;
}
.panel .empty {
  margin: 5px;
  text-align: center;
  color: #909399;
}
</style>
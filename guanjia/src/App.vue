<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import '@/assets/css/global.css'
export default {
  name: 'App'
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
  min-width: 1280px;
}
#app {
  .size;
}
</style>

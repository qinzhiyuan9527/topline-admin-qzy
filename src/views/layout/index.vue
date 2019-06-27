<template>
<div id="app-layout">
  <el-container>
    <el-aside width="200px"><AppAside/></el-aside>
    <el-container>
      <el-header><AppHeader/></el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script>
import AppAside from './components/AppAside.vue'
import AppHeader from './components/AppHeader.vue'
export default {
  name: 'AppLayout',
  data () {
    return {}
  },
  components: {
    AppAside,
    AppHeader
  }
}
</script>

<style lang="less" scoped>
#app-layout {
  height: 100%;
  .el-container {
    height: 100%;
    .el-aside {
      height: 100%;
    }
    .el-container {
      height: 100%;
      .el-header {
        background-color: #ebfff6;
        padding: 0px;
      }
      .el-main {
        background-color: #8b7285;
      }
    }
  }
}
</style>

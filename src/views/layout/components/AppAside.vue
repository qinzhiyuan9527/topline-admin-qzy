<template>
<div id="AppHeader">
  <div>
    <img src="./logo_admin.png" alt="">
  </div>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    router
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="/">
      <i class="el-icon-s-shop"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-reading"></i>
        <span>内容管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/publish">发布文章</el-menu-item>
        <el-menu-item index="/article">内容列表</el-menu-item>
        <el-menu-item index="/connent">评论列表</el-menu-item>
        <el-menu-item index="/image">素材管理</el-menu-item>
<!--        <el-menu-item index="/publish/modify/:id">编辑文章</el-menu-item>-->
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-video-camera-solid"></i>
        <span>粉丝管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-1">图文数据</el-menu-item>
        <el-menu-item index="2-2">粉丝概况</el-menu-item>
        <el-menu-item index="2-3">粉丝画像</el-menu-item>
        <el-menu-item index="2-4">粉丝列表</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="/account">
      <i class="el-icon-s-custom"></i>
      <span slot="title">账户信息</span>
    </el-menu-item>
  </el-menu>
</div>
</template>

<script>
export default {
  name: 'AppAside',
  data () {
    return {}
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
#AppHeader {
  height: 100%;
  background-color: #323745;
  div {
    text-align: center;
    width: 100%;
    img {
      padding: 10px 0px;
    }
  }
  .el-menu {
    height: 100%;
  }
}
</style>

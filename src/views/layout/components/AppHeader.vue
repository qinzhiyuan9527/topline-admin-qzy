<template>
  <div id="AppAside">
    <el-row :gutter="20" class="app-header">
      <el-col :span="14" class="app-header-s"><i class="el-icon-s-unfold"></i>江苏传智播客教育科技股份有限公司</el-col>
      <el-col :span="4" :offset="6">
        <el-dropdown>
        <span class="el-dropdown-link">
          <img width=30 :src="$store.state.user.photo" alt="">
          {{$store.state.user.name}}<i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>git地址</el-dropdown-item>
            <el-dropdown-item @click.native="SignOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {
      // userInfo: {}
    }
  },
  created () {
    // this.userInfo = JSON.parse(window.localStorage.getItem('user_info'))
  },
  methods: {
    SignOut () {
      this.$confirm('确认退出嘛？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user_info')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        this.$router.push({
          name: 'login'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
  #AppAside {
    background-color: #ccc;
    .app-header {
      height: 60px;
      display: flex;
      align-items: center;
      .app-header-s {
        margin-left: 10px;
        font-size: 16px;
      }
    }
  }
</style>

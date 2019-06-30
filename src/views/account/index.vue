<template>
  <div>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>账户设置</span>
        </div>
        <el-row>
          <el-col :span="8">
            <el-form label-width="80px">
              <el-form-item label="媒体名称">
                <el-input v-model="userInfo.name"></el-input>
              </el-form-item>
              <el-form-item label="媒体简介">
                <el-input v-model="userInfo.intro"></el-input>
              </el-form-item>
              <el-form-item label="头条号ID">
                <el-input disabled :value="userInfo.id && userInfo.id.toString()"></el-input>
              </el-form-item>
              <el-form-item label="绑定手机">
                <el-input disabled :value="userInfo.mobile"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="userInfo.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleUpdate">保存</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :offset="2" :span="4">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
            :http-request="handleUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
        </el-row>
      </el-card>
    </div>
</template>

<script>
export default {
  name: 'AccountSetting',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    // 获取用户资料
    loadUserInfo () {
      this.$http({
        method: 'GET',
        url: '/user/profile'
      }).then(data => {
        // console.log(data)
        this.userInfo = data
      })
    },
    // 编辑上传用户资料
    handleUpdate () {
      const { name, intro, email } = this.userInfo
      this.$http({
        method: 'PATCH',
        url: 'user/profile',
        data: {
          name,
          intro,
          email
        }
      }).then(data => {
        this.$store.commit('changeUser', data)
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      }).catch(err => {
        console.log(err)
        this.$message({
          type: 'warning',
          message: '出错了'
        })
      })
    },
    handleAvatarSuccess () {},
    beforeAvatarUpload () {},
    // 上传图片
    handleUpload (uploadConfig) {
      const formData = new FormData()
      formData.append('photo', uploadConfig.file)
      this.$http({
        method: 'PATCH',
        url: '/user/photo',
        data: formData
      }).then(data => {
        this.userInfo.photo = data.photo
        this.$store.commit('changeUser', this.userInfo)
        this.$message({
          type: 'success',
          message: '图片上传成功'
        })
      }).catch(err => {
        console.log(err)
        this.$message({
          type: 'warning',
          message: '图片上传失败'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

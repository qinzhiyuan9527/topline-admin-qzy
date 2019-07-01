<template>
  <div>
    <div class="box-wrap" @click="UplosdPictures">
      <p>点击选择图片</p>
      <i
        v-if="!value"
        style="margin-top: 20px;
        font-size: 90px; color: #eee;"
        class="iconfont icon-image_upload"
      ></i>
      <img v-else width="120" :src="value">
    </div>

    <!--  选择框-->
      <el-dialog
        title="素材"
        :visible.sync="dialogVisible"
        width="30%">
        <el-tabs value="first">
          <el-tab-pane label="全部" name="first">
            <el-upload
              class="avatar-uploader"
              action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
              :headers="{Authorization : `Bearer ${$store.state.user.token}`}"
              name="image"
              v-bind:on-success="UplosdImage"
              :show-file-list="false">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="收藏" name="second">收藏</el-tab-pane>
        </el-tabs>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="hodleOk">确 定</el-button>
        </span>
      </el-dialog>
    <!--   /选择框-->
  </div>
</template>

<script>
export default {
  name: 'UploadImage',
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      imageUrl: null
    }
  },
  methods: {
    UplosdPictures () {
      this.dialogVisible = true
    },
    UplosdImage (data) {
      this.$message({
        type: 'success',
        message: '上传成功'
      })
      this.imageUrl = data.data.url
    },
    hodleOk () {
      this.$emit('input', this.imageUrl)
      this.dialogVisible = false
    }

  }
}
</script>

<style lang="less" scoped>
  .box-wrap {
    width: 200px;
    height: 200px;
    border: 1px solid #eee;
    cursor: pointer;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
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

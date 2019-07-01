<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>图片管理</span>
        <el-upload
          style="float:right; padding: 3px 0"
          class="upload-demo"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :headers="{Authorization : `Bearer ${$store.state.user.token}`}"
          name="image"
          :show-file-list="false"
          v-bind:on-success="imageUp">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
      <el-radio-group v-model="active">
        <el-radio-button @click.native="LoadImage(false)" label="全部"></el-radio-button>
        <el-radio-button @click.native="LoadImage(true)" label="收藏"></el-radio-button>
      </el-radio-group>
      <el-row>
        <el-col :span="3" style="height: 200px" v-for="item in form" :key="item.id">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="item.url" style="width: 100%; height: 150px" class="image">
            <div class="icon" style="padding: 14px;">
              <i
                :class="item.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
                @click="Collection(item)">
              </i>
              <i
                class="el-icon-delete-solid"
                @click="DeletePicture(item)">
              </i>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
 </div>
</template>

<script>
export default {
  name: 'AppImage',
  data () {
    return {
      active: '全部',
      activeName: 'first',
      form: {}
    }
  },
  created () {
    this.LoadImage()
  },
  methods: {
    // 获取图片素材
    LoadImage (collect = false) {
      this.$http({
        method: 'GET',
        url: '/user/images',
        params: {
          collect
        }
      }).then(data => {
        this.form = data.results
        // console.log(data)
      })
    },
    // 收藏功能
    Collection (val) {
      this.$http({
        method: 'PUT',
        url: `/user/images/${val.id}`,
        data: {
          collect: !val.is_collected
        }
      }).then(data => {
        this.form.is_collected = data.collect
        this.LoadImage()
      })
    },
    // 刪除功能
    DeletePicture (val) {
      this.$http({
        method: 'DELETE',
        url: `/user/images/${val.id}`
      }).then(() => {
        this.$message({
          type: 'success',
          message: '刪除成功'
        })
        this.LoadImage()
      })
    },

    imageUp (data) {
      this.$message({
        type: 'success',
        message: '上传成功'
      })
      this.LoadImage()
    }
  }
}
</script>

<style lang="less" scoped>
  .icon {
    text-align: center;
    i {
      font-size: 20px;
      margin-right: 20px;
    }
    i:hover {
      color: darkmagenta;
    }
  }
  .el-row {
    display: flex;
    flex-wrap: wrap;
  }
  .el-col {
    margin: 10px;
  }
  .el-card {
    height: 100%;
  }
  .el-card__body {
    height: 100%;
  }
</style>

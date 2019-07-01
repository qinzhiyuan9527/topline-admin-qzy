<template>
  <div class="block">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修改文章</span>
      </div>
      <el-form ref="form" :model="form">
        <el-form-item class="biaoti">
          <el-input v-model="form.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- bidirectional data binding（双向数据绑定） -->
          <quill-editor
            v-model="form.content"
            ref="myQuillEditor"
            :options="editorOption">
          </quill-editor>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="form.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!--        封面组件-->
          <template v-if="form.cover.type > 0">
            <el-row>
              <el-col :span="5"  v-for=" n in form.cover.type" :key="n">
                <upload-pictures v-model="form.cover.images[n - 1]"></upload-pictures>
              </el-col>
            </el-row>
          </template>
        </el-form-item>
        <el-form-item label="频道">
          <!--        <el-input v-model="form.channel_id"></el-input>-->
          <article-channel v-model="form.channel_id"></article-channel>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="AppModify(false)">保存</el-button>
          <el-button type="info" @click="AppModify(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script>
import ArticleChannel from '@/components/article-channel'
import UploadPictures from '@/components/upload-pictures'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'Appmodify',
  components: {
    quillEditor,
    UploadPictures,
    ArticleChannel
  },
  data () {
    return {
      form: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型
          images: [] // 图片地址
        }, // 封面
        channel_id: '' // 文章所属频道id
      },
      editorOption: {}, // 富文本编辑器设置
      modifyOk: 1 // 用于验证页面有没有修改
    }
  },
  watch: {
    form: {
      handler () {
        this.modifyOk += 1
        // console.log(this.modifyOk)
      },
      deep: true
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    },
    articleId () {
      return this.$route.params.id
    }
  },
  // mounted () {
  //   // console.log('this is current quill instance object', this.editor)
  // },
  created () {
    this.articleModify()
  },
  // 路由守卫
  beforeRouteLeave (to, from, next) {
    console.log(this.modifyOk)
    if (this.modifyOk > 1 || this.modifyOk) {
      let is = confirm('您有未保存的修改确认退出嘛')
      if (is) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  },
  methods: {
    async articleModify () {
      try {
        const data = await this.$http({
          methods: 'GET',
          url: `/articles/${this.articleId}`
        })
        this.$message({
          type: 'success',
          message: '跳转成功'
        })
        this.form = data
      } catch {
        this.$message({
          type: 'warning',
          message: '跳转失败'
        })
      }
    },
    // 修改文章
    async AppModify (draft) {
      try {
        this.modifyOk = false
        await this.$http({
          method: 'PUT',
          url: `/articles/${this.articleId}`,
          data: this.form,
          params: {
            draft
          }
        })
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.$router.push({
          name: 'article'
        })
      } catch {
        alert('出错了')
      }
    }
  }
}
</script>

<style lang='less' scoped>

</style>

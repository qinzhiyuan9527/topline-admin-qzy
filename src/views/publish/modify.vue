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

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'Appmodify',
  components: {
    quillEditor,
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
      editorOption: {} // 富文本编辑器设置
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
  mounted () {
    console.log('this is current quill instance object', this.editor)
  },
  created () {
    this.articleModify()
  },
  methods: {
    articleModify () {
      // console.log(this.$route.params.id)
      this.$http({
        methods: 'GET',
        url: `/articles/${this.articleId}`
      }).then(data => {
        this.$message({
          type: 'success',
          message: '跳转成功'
        })
        this.form = data
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: '跳转失败'
        })
        console.log(err)
      })
    },
    // 修改文章
    AppModify (draft) {
      this.$http({
        method: 'PUT',
        url: `/articles/${this.articleId}`,
        data: this.form,
        params: {
          draft
        }
      }).then(data => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.$router.push({
          name: 'article'
        })
      })
    }
  }
}
</script>

<style lang='less' scoped>

</style>

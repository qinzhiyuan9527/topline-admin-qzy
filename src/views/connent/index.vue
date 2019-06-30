<template>
  <div>
    <el-card>
      <div slot="header">
        <span>评论管理</span>
      </div>
      <el-table :data="articles">
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="评论粉丝数"></el-table-column>
        <el-table-column label="允许评论">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="handleChangeCommentStatus(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'article-comment',
  data () {
    return {
      articles: []
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    // 获取评价列表
    loadArticles () {
      this.$http({
        method: 'GET',
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(data => {
        // console.log(data.results)
        this.articles = data.results
      })
    },
    // 修改文章评论状态
    handleChangeCommentStatus (scope) {
      console.log(scope)
      this.$http({
        method: 'PUT',
        url: `/comments/status`,
        params: {
          article_id: scope.id.toString()
        },
        data: {
          allow_comment: scope.comment_status
        }
      }).then(data => {
        console.log(data)
      })
    }
  }
}
</script>

<style scoped>

</style>

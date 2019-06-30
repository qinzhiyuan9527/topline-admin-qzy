<template>
<div>
  <!--    <筛选区域>-->
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>卡片名称</span>
    </div>
    <el-form ref="filterparams" :model="filterparams" label-width="80px">
      <el-form-item label="文章状态">
        <el-radio-group v-model="filterparams.status">
          <el-radio label="">全部</el-radio>
          <el-radio v-for="(item, index) in statStype" :key="index" :label="index + ''">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道">
        <article-channel v-model="filterparams.channel_id"></article-channel>
      </el-form-item>
      <el-form-item label="时间选择">
        <el-date-picker
          v-model="begin_end_pubdate"
          value-format="yyyy-MM-dd"
          @change="articleChange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-button type="primary" @click="articleQuery" :loading="articleOk">查询</el-button>
    </el-form>
  </el-card>
  <!--    </筛选区域>-->

  <!--    <内容区域>-->
  <el-card class="content" v-loading="articleOk">
    <div slot="header" class="clearfix">
      <span>共找到{{totalCount}}条符合条件的内容</span>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
        <el-table-column
          prop="cover.images[0]"
          label="封面"
          width="180">
          <template slot-scope="scope">
            <img width="100" :src="scope.row.cover.images[0]" alt="">
          </template>
        </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="200">
      </el-table-column>
      <el-table-column
        prop=""
        label="状态">
        <template slot-scope="scope">
          <el-tag :type="statStype[scope.row.status].type">{{statStype[scope.row.status].label}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="success" plain @click="$router.push(`/publish/modify/${scope.row.id}`)">修改</el-button>
          <el-button type="danger" plain @click="articledelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <!--    </内容区域>-->
  <!--  <分页>-->
  <el-row type="flex" justify="center">
    <el-col :span="6">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        class="paging"
        @current-change="handleCurrentChange"
        :disabled="articleOk">
      </el-pagination>
    </el-col>
  </el-row>

  <!--  </分页>-->
</div>
</template>

<script>
import ArticleChannel from '@/components/article-channel'
export default {
  name: 'AppArticle',
  components: {
    ArticleChannel
  },
  data () {
    return {
      tableData: [], // 列表数据
      totalCount: 0, // 总条目数
      value1: {},
      articleOk: false,
      statStype: [
        {
          type: 'info',
          label: '草稿'
        },
        {
          type: '',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'warning',
          label: '审核失败'
        },
        {
          type: 'danger',
          label: '已删除'
        }
      ],
      filterparams: {
        status: '', // 文章状态
        channel_id: '', // 频道id
        begin_pubdate: '', // 起始时间
        end_pubdate: '' // 截止时间
      },
      begin_end_pubdate: [],
      page: 1 // 分页数据
    }
  },
  created () {
    // 获取文章列表
    this.loadArticles(this.page)
  },
  methods: {
    // 获取文章列表
    loadArticles (page = 1) {
      // console.log(page)
      // 过滤出有效的查询条件数据字段
      const filterData = {}
      for (let key in this.filterparams) {
        if (this.filterparams[key]) {
          filterData[key] = this.filterparams[key]
        }
      }
      this.articleOk = true
      this.$http({
        method: 'GET',
        url: '/articles',
        params: {
          page, // 请求数据的页码，不传默认为 1
          per_page: 10, // 请求数据的每页大小，不传默认为 10
          ...filterData // 筛选传入的条件
        }
      }).then(data => {
        this.articleOk = false
        // console.log(4444)
        this.tableData = data.results
        this.totalCount = data.total_count

        // console.log('kkk')
      })
    },
    articleQuery () {
      // console.log('hhh')
      this.loadArticles(this.page)
    },
    // 设置分页页码
    handleCurrentChange (val) {
      // console.log(this.filterparams.page)
      this.page = val
      this.loadArticles(val)
    },
    // 编辑修改功能
    // articleModify (scope) {
    //   // console.log(scope)
    //   // $router.push({
    //   //   name: 'modify',
    //   //   params: {
    //   //     id: scope.row.id
    //   //   }
    //   // })
    //   this.$router.push({name: ''})
    // },
    // 删除功能
    articledelete (scope) {
      // console.log(scope)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$http({
          method: 'DELETE',
          url: `/articles/${scope.id}`
        }).then(data => {
          // console.log(data)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.loadArticles(this.page)
        }).catch(err => {
          alert('出错了')
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    articleChange (value) {
      this.filterparams.begin_pubdate = value[0]
      this.filterparams.end_pubdate = value[1]
    }
  }
}
</script>

<style lang="less" scoped>
  .content {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .paging {
    margin: 0 auto;
  }
</style>

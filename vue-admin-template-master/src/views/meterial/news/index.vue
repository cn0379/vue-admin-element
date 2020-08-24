<template>
    <div class="story-main">

    <el-card class="card" shadow="never">
      <div slot="header">
        <span>搜索条件</span>
      </div>
      <el-row :gutter="15">
        <el-col :span="8">
          <el-input v-model="search.author" class="input" size="small" placeholder="根据作者查询" @change="searchAuth($event)" />
        </el-col>
        <el-col :span="8">
          <el-input v-model="search.title" class="input" size="small" placeholder="根据文章标题查询" @change="searchTitle($event)" />
        </el-col>
      </el-row>
    </el-card>

    <el-card v-loading="loading" class="card" shadow="never">
      <div slot="header">
        <span>新闻管理</span>
      </div>
      <el-button type="primary" style="margin-bottom:30px;" @click="goAdd">新增</el-button>
      <el-table v-loading="loading" :data="newsList" border style="width:100%">
        <el-table-column align="center" width="50" type="index" label="#" />
        <el-table-column property="title" align="center" width="200" label="文章标题" />
        <el-table-column property="author" align="center" width="100" label="作者" />
        <el-table-column property="desc" align="center" width="200" label="文章描述" />
        <el-table-column property="cover" align="center" width="300" label="封面图片">
          <template slot-scope="scope">
            　　　　      <img :src="scope.row.cover" width="200" height="80">
          　　        </template>
        </el-table-column>
        <el-table-column property="hot" align="center" width="120" label="是否最热" />
        <el-table-column property="type" align="center" width="120" label="是否显示" />
        <el-table-column property="" align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="editNews(scope.row.id)">
              编辑
            </el-button>
            <el-button size="mini" @click="view(scope.row.id,)">
              查看
            </el-button>
            <el-button type="danger" size="mini" @click="del(scope.row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 30px;text-align:center;"
        :current-page="page.start"
        :page-sizes="page.sizes"
        :page-size="page.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import newsApi from '@/api/meterial/news/news'
import axios from 'axios'
import { getToken } from '../../../utils/myAuth'
import qs from 'qs'
export default {
  data() {
    return {
      newsList: [],
      search: {},
      loading: false,
      page: {
        totalCount: 0,
        start: 1,
        limit: 10,
        size: [10, 20, 30, 40]
      }
    }
  },
  created() {
    this.getNewsList()
  },
  methods: {
    getNewsList() {
      this.loading = true
      const pages = {
        start: this.page.start,
        limit: this.page.limit,
        ...this.search
      }
      newsApi.news({ ...pages }).then(res => {
        this.newsList = res.data.list
        this.page.totalCount = res.data.totalRow
      })
      this.loading = false
    },
    searchAuth(e) {
      this.search.author = e
      this.page.start = 1
      this.getNewsList()
    },
    searchTitle(e) {
      this.search.title = e
      this.page.start = 1
      this.getNewsList()
    },
    editNews(id) {
      this.$router.push({ path: `/news/detailNews?id=${id}` })
    },
    handleSizeChange(val) {
      this.page.limit = val
      this.newsList = []
      this.getNewsList()
    },
    handleCurrentChange(val) {
      this.page.start = val
      this.newsList = []
      this.getNewsList()
    },
    view(id, disappear) {
      var obj = {
        id: id,
        disappear: true
      }
      // obj = qs.stringify(obj, function replacer(key,valu){
      //   console.log(key)
      // })
      this.$router.push({ path: `/news/detailNews?id=${id}&disappear=${disappear}` })
    },
    del(id) {
      newsApi.delNews({ id }).then(res => {
        this.tip(res, '删除')
      })
    },
    goAdd() {
      this.$router.push({ path: '/news/detailNews' })
    },
    tip(res, desc) {
      if (res.code === 'success') {
        this.$message.success(desc + '成功!')
        this.getNewsList()
      } else {
        this.$message.error(desc + '失败!')
      }
    }
  }
}

</script>

<style  lang='scss' scoped>
  .story-main {
    .card {
      margin: 30px;
    }
  }

</style>

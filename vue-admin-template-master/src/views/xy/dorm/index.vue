<template>
  <div class="dorm-main">
    <el-card class="card" shadow="never">
      <div slot="header">
        <span>搜索条件</span>
      </div>
      <el-row :gutter="15">
        <el-col>
          <el-input class="input" size="small" placeholder="根据名字查询" />
        </el-col>
      </el-row>
    </el-card>

    <el-card class="card" shadow="never">
      <el-button type="primary" style="margin:30px 0;" @click="goAddd">添加</el-button>
      <div slot="header">
        <span>宿舍信息</span>
      </div>
      <el-table v-loading="loading" style="width: 100%;" :data="dormList" border>
        <el-table-column align="center" type="index" label="#" width="50" />
        <el-table-column align="center" property="name" label="宿舍名称" width="280" />
        <el-table-column align="center" property="type" label="男生/女生宿舍" width="200">
          <template slot-scope="scope">
            {{ scope.row.type == 0 ? "男生" : "女生" }}
          </template>
        </el-table-column>
        <el-table-column align="center" property="position" label="宿舍地址" width="180" />
        <el-table-column align="center" property="bak" show-overflow-tooltip label="描述" width="320" />
        <el-table-column align="center" width="520" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row.id)">查看</el-button>
            <el-button type="text" size="small" @click="edit(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      style="margin-top: 30px;text-align:right;"
      :current-page="page.start"
      :page-sizes="page.sizes"
      :page-size="page.limit"
      :total="page.totalCount"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    </el-pagination>
    <Detail ref="detail" @refreshDorm="getDormList" />
  </div>
</template>

<script>
import xyStudentApi from '@/api/xy/student'
import xyDormApi from '@/api/xy/dorm'
import pageMInxin from '@/minxin/pageMinxin'


import Detail from './Detail'
export default {
  components: {
    Detail
  },
  mixins: [pageMInxin],
  data() {
    return {
      loading: false,
      dormList: []
    }
  },
  created() {
    this.getDormList()
  },
  methods: {
    getDormList() {
      this.loading = true
      xyStudentApi.studentDorm().then((res) => {
        this.dormList = res.data.list
        this.loading = false
        this.page.totalCount = res.data.totalRow
      })
    },
    handleSizeChange(val) {
    },
    handleCurrentChange(val) {
      this.page.start = val
      this.students = {}
      this.getDormList()
    },
    handleClick(id) {
      var disappear = true
      this.$refs.detail.getCurrentItem(id, disappear)
    },
    edit(id) {
      this.$refs.detail.getCurrentItem(id)
    },
    goAddd() {
      this.$refs.detail.openDialog()
    }
  }
}
</script>

<style  lang='scss' scoped>
.dorm-main {
  .card {
    margin: 30px;
  }
}
</style>

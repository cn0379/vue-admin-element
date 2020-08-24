<template>
  <div class="clazz-main">
    <el-card class="card" shadow="never">
      <div slot="header">
        <span>搜索条件</span>
      </div>
      <el-row :gutter="15">
        <el-col :span="8">
          <el-input v-model="searchName" class="input" style="width:200px" size="small" placeholder="根据名字查询" />
        </el-col>
        <el-col :span="8">
          <el-date-picker
            v-model="search.startTime"
            value-format="yyyy-MM-dd"
            class="input"
            size="small"
            type="date"
            placeholder="选择开始日期"
          />
        </el-col>
        <el-col :span="8">
          <el-date-picker
            v-model="search.endtTime"
            value-format="yyyy-MM-dd"
            class="input"
            size="small"
            type="date"
            placeholder="选择开始日期"
          />
        </el-col>
      </el-row>
      <el-col :span="8" :offset="16" style="text-align:right;margin-top:20px;margin-bottom:20px;">
        <el-button size="small">重置</el-button>
        <el-button type="primary" size="small" @click="doSearch">查询</el-button>
      </el-col>
    </el-card>

    <el-card class="card" shadow="never">
      <div slot="header">
        <el-button type="primary" size="small" @click="goAdd">新增</el-button>
      </div>
      <el-table
        v-loading="loading"
        header-align="center"
        :data="classInfoList"
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="#" width="50" />
        <el-table-column property="className" align="center" label="班级名称" width="180" />
        <el-table-column property="type" align="center" label="班级类型" width="80">
          <template slot-scope="scope">
            {{ scope.row.type == 0 ? "WEB" : "UI" }}
          </template>
        </el-table-column>
        <el-table-column
          property="desc"
          align="center"
          show-overflow-tooltip
          label="班级描述"
          width="380"
        />
        <el-table-column property="startTime" align="center" label="开班时间" width="180" />
        <el-table-column property="endTime" align="center" label="结束时间" width="220" />
        <el-table-column property="addTime" align="center" label="添加时间" width="220" />
        <el-table-column label="操作" align="center" @click="goAdd">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row.id)">查看</el-button>
            <el-button type="text" size="small" @click="edit(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 30px;text-align:right;"
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
    <Detail ref="detail" @refreshList="getclassInfo" />
  </div>
</template>

<script>
import xyClazzApi from '@/api/xy/clazz'
import Detail from './Detail'
import { pickBy, resetFormData } from '@/utils/index'
import pageMInxin from '@/minxin/pageMinxin'
export default {
  name: 'XyClazz',
  components: {
    Detail
  },
  mixins: [pageMInxin],
  data() {
    return {
      search: {},
      loading: false,
      classInfoList: [],
      searchName: ''
    }
  },
  created() {
    this.getclassInfo()
  },
  methods: {
    async getclassInfo() {
      this.loading = true
      const page = {
        start: this.page.start,
        limit: this.page.limit,
        className: this.searchName
      }
      const { data } = await xyClazzApi.getClassList({ ...page })
      this.classInfoList = data.list
      this.page.totalCount = data.totalRow
      this.loading = false
    },
    doSearch() {
      this.getclassInfo()
    },
    goAdd() {
      this.$refs.detail.openDialog()
    },
    handleClick(id) {
      var disappear = true
      this.$refs.detail.getCurrentItem(id, disappear)
    },
    edit(id) {
      this.$refs.detail.getCurrentItem(id)
    },
    handleSizeChange(val) {
      this.page.limit = val
      this.students = {}
      this.getclassInfo()
    },
    handleCurrentChange(val) {
      this.page.start = val
      this.students = {}
      this.getclassInfo()
    }
  }
}
</script>

<style  lang='scss' scoped>
.clazz-main {
  .card {
    margin: 30px;
  }
}
</style>

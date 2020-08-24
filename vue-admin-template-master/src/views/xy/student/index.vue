<template>
  <div class="student-main">
    <el-card class="box-card card" shadow="hover">
      <div slot="header">
        <span>搜索条件</span>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input v-model="search.name" class="input" size="small" placeholder="根据名字查询" />
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
              v-model="search.endTime"
              value-format="yyyy-MM-dd"
              class="input"
              size="small"
              type="date"
              placeholder="选择结束日期"
            />
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px">
          <el-col :span="6">
            <el-select v-model="classId" placeholder="选择班级">
              <el-option
                v-for="item in classList"
                :key="item.id"
                :label="item.className"
                :value="item.id"
              />
            </el-select>
          </el-col>
          <el-col :span="6">
            <!-- <el-input v-model="search.name" size="small" class="input" placeholder /> -->
          </el-col>
          <el-col :span="8" :offset="6" style="text-align: right;">
            <el-button size="small" @click="doReset">重置</el-button>
            <el-button type="primary" size="small" @click="doSearch">查询</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="card" shadow="hover">
      <div slot="header">
        <el-button type="primary" @click="goAdd">新增</el-button>
      </div>
      <el-table v-loading="loading" :data="studentList" border style="width: 100%">
        <el-table-column label="#" type="index" width="50" fixed />
        <el-table-column prop="name" label="姓名" width="150" />
        <el-table-column prop="sexv" label="性名" width="120" />
        <el-table-column prop="classname" label="班级" width="220" />
        <el-table-column prop="dormname" label="宿舍" width="220" />
        <el-table-column prop="cityText" label="城市" width="200" />
        <el-table-column prop="dormStartTime" label="开始时间" />
        <el-table-column prop="dormEndTime" label="结束时间" />
        <el-table-column fixed="right" label="操作" width="100">
          <!-- 自定义列的实现  作用于插槽-->
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row.id)">查看</el-button>
            <el-button type="text" size="small" @click="goEdit(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
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
    </el-card>
    <Detail ref="detail" @refreshList="getStudentList" />
  </div>
</template>

<script>
import xyClazzApi from '@/api/xy/clazz'
import xyStudentApi from '@/api/xy/student'
import { pickBy } from '@/utils/index'
import Detail from './Detail.vue'
import pageMixin from '@/minxin/pageMinxin'

export default {
  name: 'XyStudent',
  components: {
    Detail
  },
  mixins: [pageMixin],
  data() {
    return {
      loading: false,
      studentList: [],
      search: {},
      classList: [],
      classId: ''
    }
  },
  created() {
    this.getListiInit()
  },
  methods: {
    getListiInit() {
      this.getClassList()
      this.getStudentList()
    },
    doReset() {},
    doSearch() {
      this.page.start = 1
      this.getStudentList()
    },
    handleClick(id) {
      this.$refs.detail.dialog = true
      var disappear = true
      this.$refs.detail.getCurrentID(id, disappear)
    },
    handleSizeChange(val) {
      this.page.limit = val
      this.students = {}
      this.getStudentList()
    },
    handleCurrentChange(val) {
      this.page.start = val
      this.students = {}
      this.getStudentList()
    },
    goAdd() {
      this.$refs.detail.openDialog()
      this.$refs.detail.preCostList = []
    },
    goEdit(id) {
      this.$refs.detail.getCurrentID(id)
    },
    async getClassList() {
      const { data } = await xyClazzApi.getClassList()
      this.classList = data.list
    },
    async getStudentList() {
      this.loading = true
      let page = {
        start: this.page.start,
        limit: this.page.limit,
        ...this.search
      }
      page = pickBy(page)
      const { data } = await xyStudentApi.getStudentList({
        ...page
      })
      this.studentList = data.list
      this.page.totalCount = data.totalRow
      this.loading = false
    }
  }
}
</script>

<style  lang='scss' scoped>
.student-main {
  .card {
    margin: 30px;
  }
}
</style>

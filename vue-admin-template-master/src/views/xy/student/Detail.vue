<!--  -->
<template>
  <div class="student-detail-main">
    <el-dialog title="提示" width="80%" :visible.sync="dialog" :before-close="handleClose">
      <el-form ref="form" :model="students" label-width="90px">
        <el-card shadow="never" style="border:none;">
          <div slot="header">
            <span>基本信息</span>
          </div>
          <el-row :gutter="15">
            <el-col :span="8">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="students.name" size="small" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别">
                <el-select v-model="students.sex">
                  <el-option label="女" value="1" />
                  <el-option label="男" value="0" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="班级">
                <el-select :value="className_" placeholder="选择班级" @change="selectClassName">
                  <el-option
                    v-for="item in classList"
                    :key="item.id"
                    :label="item.className"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :span="8">
              <el-form-item label="电话">
                <el-input v-model="students.tel" size="small" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证">
                <el-input v-model="students.manID" size="small" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="地市">
                <el-cascader
                  v-model="selectCity"
                  size="small"
                  :options="cityOptions"
                  @change="cityChange"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :span="8">
              <el-form-item label="宿舍">
                <el-select :value="dname" placeholder="选择宿舍" @change="selectDormName">
                  <el-option
                    v-for="item in dormList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="开始日期">
                <el-date-picker
                  v-model="students.dormStartTime"
                  value-format="yyyy-MM-dd"
                  class="input"
                  size="small"
                  type="date"
                  placeholder="选择开始日期"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结束日期">
                <el-date-picker
                  v-model="students.dormEndTime"
                  value-format="yyyy-MM-dd"
                  class="input"
                  size="small"
                  type="date"
                  placeholder="选择结束日期"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card shadow="never" style="border:none;">
          <div slot="header">
            <span>补充信息</span>
          </div>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="紧急联系人">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="微信">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="QQ">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="毕业院校">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="工作">
                <el-input size="small" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </el-form>
      <el-card shadow="never" style="margin-top: 15px;">
        <div slot="header">
          <span>缴费信息</span>
        </div>
        <el-form ref="costForm" :model="costForm">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="费用类型">
                <el-radio-group v-model="costForm.costType" size="small">
                  <el-radio label="0">学费</el-radio>
                  <el-radio label="1">住宿费</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="金额">
                <el-input v-model="costForm.costValue" size="small" style="width:200px" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="缴费时间">
                <el-input v-model="costForm.costTime" size="small" style="width:200px" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-col>
            <el-form-item label="备注">
              <el-input
                v-model="costForm.costBak"
                size="small"
                type="textarea"
                style="width:300px;"
              />
            </el-form-item>
          </el-col>
          <el-col style="text-align:right;padding-bottom:18px;">
            <span>
              <el-button size="small">取 消</el-button>
              <el-button type="primary" size="small" @click="throttle(addCost,3000)">添加缴费信息</el-button>
            </span>
          </el-col>
        </el-form>
      </el-card>
      <el-table
        ref="singleTable"
        :data="preCostList"
        highlight-current-row
        style="width: 100%;margin-top: 30px;"
        border
        stripe
      >
        <el-table-column type="index" width="50" />
        <el-table-column property="costType" label="费用类型" width="70">
          <template slot-scope="scope">{{ scope.row.costType == 0 ? "学费" : "住宿费" }}</template>
        </el-table-column>
        <el-table-column property="costValue" label="金额" width="200" />
        <el-table-column property="costTime" width="200" label="时间" />
        <el-table-column property="costBak" label="备注" />
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.tempId"
              type="danger"
              size="mini"
              @click="removeCostTime(scope.row.tempId)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span v-show="disappear" slot="footer" class="dialog-footer" style="margin-right:20px">
        <el-button size="small" @click="doCancel">取 消</el-button>
        <el-button size="small" type="primary" @click="doSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  regionDataPlus,
  CodeToText,
  TextToCode
} from 'element-china-area-data'
import xyClazzApi from '@/api/xy/clazz'
import xyStudentApi from '@/api/xy/student'
import { deepClone, resetFormData } from '@/utils/index'


export default {
  data() {
    return {
      dialog: false, // 弹窗 默认关闭
      disappear: true, // 用于点击查看,隐藏更改项目
      cityOptions: regionDataPlus,
      selectCity: [],
      classList: [],
      dormList: [],
      costList: [],
      preCostList: [],
      dname: '',
      className_: '',
      costForm: {
        costType: '0'
      },
      students: {}
    }
  },
  methods: {
    openDialog() {
      this.dialog = true
      this.getClassList()
      this.getDormList()
    },
    doCancel() {
      this.dialog = false
      this.students = {}
    },
    selectDormName(e) {
      this.dname = e
    },
    selectClassName(e) {
      this.className_ = e
    },
    handleClose() {
      this.dialog = false
      this.students = {}
      var that = this
      setTimeout(function() {
        that.disappear = true
      }, 500)
      this.className_ = ''
      this.selectCity = []
      this.dname = ''
    },
     throttle(func, wait) {
      var timer = null
      return function () {
        if (timer) {
        } else {
          func()
          timer = setTimeout(function () {
            timer = null
          }, wait)
        }
      }
    },
    addCost() {
      var newConstObj = deepClone(this.costForm)
      newConstObj.tempId = new Date().getTime()
      this.preCostList.push(newConstObj)
      resetFormData(this, 'costForm')
    },
    removeCostTime(tempId) {
      this.preCostList = this.preCostList.filter((ele) => ele.tempId != tempId)
    },
    doSave() {
      const students = this.students
      students.classId = this.className_
      students.dormId = this.dname
      let api = null
      students.id
        ? (api = xyStudentApi.studentUpdate)
        : (api = xyStudentApi.studentSave)
      var submitObj = {
        xyUser: {
          ...students
        },
        _size: this.preCostList.length
      }
      this.preCostList.map((ele, idx) => {
        return (submitObj['xyCostItems_' + idx] = ele)
      })
      api(submitObj).then((res) => {
        if (res.code === 'success') {
          this.$message.success('保存成功!')
          this.handleClose()
          this.$emit('refreshList')
        }
      })
    },
    getCurrentID(id, disappear) {
      this.openDialog()
      if (disappear) {
        this.disappear = false
        return this.getCurrentID(id)
      } else {
        xyStudentApi.studentDetail({ id }).then((res) => {
          this.selectCity = res.data.city == null ? {} : res.data.city.split(',')
          this.students = res.data
          this.className_ = res.data.classId
          this.dname = res.data.dormId
        })
        xyStudentApi
          .costList({ userId: id, start: 1, limit: 99 })
          .then((res) => {
            this.preCostList = res.data.list
          })
      }
    },
    getDormList() {
      xyStudentApi.studentDorm().then((res) => {
        this.dormList = res.data.list
      })
    },
    async getClassList() {
      const { data } = await xyClazzApi.getClassList()
      this.classList = data.list
    },
    cityChange(e) {
      const city = e
      var cityStr = city.map((ele) => {
        return ele
      })
      var cityStrText = city.map((ele) => {
        return CodeToText[ele].replace('省', '')
      })
      this.students.cityText = cityStrText.join(',').replace('市', '')
      this.students.city = cityStr.join(',')
    }
  }
}
</script>

<style lang='stylus' scoped>
</style>

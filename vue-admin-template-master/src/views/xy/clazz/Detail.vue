<!--  -->
<template>
  <div class="student-detail-main">
    <el-dialog title="提示" width="80%" :visible.sync="dialog" :before-close="handleClose">
      <el-form ref="form" :model="classInfo" label-width="90px">
        <el-card shadow="never" style="border:none;">
          <div slot="header">
            <span>基本信息</span>
          </div>
          <el-row :gutter="15">
            <el-col>
              <el-form-item label="班级名称" prop="name">
                <el-input v-model="classInfo.className" size="small" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="班级类型">
                <el-select v-model="classInfo.type">
                  <el-option label="UI" value="1" />
                  <el-option label="WEB" value="0" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="开课日期">
                <el-date-picker
                  v-model="classInfo.startTime"
                  value-format="yyyy-MM-dd"
                  class="input"
                  size="small"
                  type="date"
                  placeholder="选择开始日期"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="结课日期">
                <el-date-picker
                  v-model="classInfo.endTime"
                  value-format="yyyy-MM-dd"
                  class="input"
                  size="small"
                  type="date"
                  placeholder="选择结束日期"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="班级描述">
                <el-input v-model="classInfo.desc" size="small" type="textarea" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </el-form>
      <span
        v-show="disappear"
        slot="footer"
        class="dialog-footer"
        style="margin-right:20px"
      >
        <el-button size="small" @click="doCancel">取 消</el-button>
        <el-button size="small" type="primary" @click="doSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import xyClazzApi from '@/api/xy/clazz'
import xyStudentApi from '@/api/xy/student'

export default {
  data() {
    return {
      dialog: false, // 弹窗 默认关闭
      disappear: true,
      classInfo: {},
      search: {}
    }
  },
  methods: {
    openDialog() {
      this.dialog = true
    },
    doCancel() {
      this.handleClose()
    },
    doSave() {
      const classInfo = this.classInfo
      let api = null
      classInfo.id
        ? (api = xyClazzApi.upDataClass)
        : (api = xyClazzApi.saveClassInfo)
      var submitObj = {
        xyClassInfo: {
          ...classInfo
        }
      }
      api(submitObj).then((res) => {
        if (res.code === true) {
          this.$message.success('保存成功!')
          this.handleClose()
          this.$emit('refreshList')
        }
      })
    },
    getCurrentItem(id, disappear) {
      this.openDialog()
      if (disappear) {
        this.disappear = false
        return this.getCurrentItem(id)
      } else {
        xyClazzApi.detailClass({ id }).then((res) => {
          this.classInfo = res.data
        })
      }
    },
    handleClose() {
      this.dialog = false
      this.classInfo = {}
      var that = this
      setTimeout(function() {
        that.disappear = true
      }, 500)
    }
  }
}
</script>

<style lang='stylus' scoped>
</style>

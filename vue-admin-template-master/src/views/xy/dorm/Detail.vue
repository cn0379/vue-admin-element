<template>
  <div class="dorm-detail-main">
    <el-dialog title="提示" width="80%" :visible.sync="dialog" :before-close="handleClose">
      <el-form ref="form" label-width="90px" :model="dormInfo">
        <el-card shadow="nerver">
          <el-row :gutter="15">
            <el-form-item label="宿舍名称" prop="name">
              <el-input v-model="dormInfo.name" type="text" size="small" />
            </el-form-item>
          </el-row>
          <el-row :gutter="15">
            <el-form-item label="男生/女生宿舍">
              <el-select v-model="dormInfo.type">
                <el-option label="男" value="0" />
                <el-option label="女" value="1" />
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="开课日期">
                <el-date-picker
                  v-model="dormInfo.startTime"
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
                  v-model="dormInfo.endTime"
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
            <el-form-item label="宿舍地址">
              <el-input v-model="dormInfo.position" type="text" size="small" />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="宿舍描述">
              <el-input v-model="dormInfo.bak" type="textarea" size="small" />
            </el-form-item>
          </el-row>
        </el-card>
      </el-form>
      <span v-show="disappear" slot="footer" class="dialog-footer" style="margin-right:20px">
        <el-button size="small" @click="doCancel">取 消</el-button>
        <el-button size="small" type="primary" @click="doSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import xyDormApi from '@/api/xy/dorm'
import { getCurrentItem } from '@/utils/index'

export default {
  data() {
    return {
      dialog: false,
      dormInfo: {},
      disappear: true
    }
  },
  methods: {
    openDialog() {
      this.dialog = true
    },
    handleClose() {
      this.dialog = false
       setTimeout(function() {
        this.disappear = true
      }.bind(this), 500)
      this.dormInfo = {}
    },
    doCancel() {
      this.handleClose()
    },
    doSave() {
      const dormInfo = this.dormInfo
      let api = null
      dormInfo.id ? (api = xyDormApi.updateDorm) : (api = xyDormApi.saveDorm)
      var submitObj = {
        xyDormInfo: {
          ...dormInfo
        }
      }
      api(submitObj).then((res) => {
        if (res.code === true) {
          this.$message.success('保存成功!')
          this.handleClose()
          this.$emit('refreshDorm')
        }
      })
    },
    getCurrentItem(id, disappear) {
      this.openDialog()
      if (disappear) {
        this.disappear = false
        return this.getCurrentItem(id)
      } else {
        xyDormApi.detailDorm({ id }).then((res) => {
          this.dormInfo = res.data
        })
      }
    }
  }
}
</script>

<style  lang='scss' scoped>

</style>

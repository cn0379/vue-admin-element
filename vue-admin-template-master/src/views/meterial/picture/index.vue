<template>
  <div class="picture-main">
    <el-card v-loading="loading" class="card" shadow="never">
      <div slot="header">图片管理</div>
      <div class="file">
        <el-button
          type="primary"
          size="small"
          style="width:80px;margin:0px 0 0px 20px;"
        >
          上传图片
          <form>
            <input type="file" class="file-item" enctype="multipart/form-data" @change="updateFile($event)">
          </form>
        </el-button>
      </div>
      <el-row>
        <el-col style="margin:20px 0 0 20px;" :span="8">
          <el-input v-model="search.title" class="input" size="small" placeholder="根据名字查询" />
        </el-col>
        <el-button style="margin:20px 0 0 20px;" type="primary" size="small" @click="doSearch">查询</el-button>
      </el-row>
      <div class="pic-container" @mouseover="start_($event)" @mouseout="end($event)">
        <el-card v-for="item in fileList" shadow="hover" class="picList" style="width:300px;">
          <div style="font-size:14px;color:#808080">图片名称: {{ item.title || "低调的图片" }} </div>
          <el-image
            :src="item.fileName"
            style="width:100%;height:250px;margin:20px 0 20px 0;border: 1px solid #EBEEF5"
            fit="cover"
            @click="view(item.fileName,item.title)"
          />
          <el-dialog
            :title="title_"
            :visible.sync="dialog"
            width="40%"
            :before-close="handleClose"
          >
            <div>
              <img style="width:100%;height:100%;" :src="src" alt="">
            </div>
          </el-dialog>
          <div class="desc">
            <p style="width:100%;height:1px;backgroundColor:#EBEEF5" />
            <!-- <span class="time" style="font-size:10px;color:#808080"  :class="act" >上传于{{ item.addTime }}</span> -->
            <div class="btn">
              <el-button size="small" type="primary" @click="editPicture(item.id)">更新标题</el-button>
              <el-button size="small" type="danger" style="margin-left:120px;" @click="delPicture(item.id)">删除</el-button>
            </div>
            <el-dialog
              title="更改标题"
              :visible.sync="dialogTitle"
              width="40%"
              :before-close="handleClose"
            >
              <el-input v-model="editTitle" placeholder="请输入新的标题" />
              <el-button type="primary" style="margin-top:30px;" size="small" @click="confirm">确认</el-button>
            </el-dialog>
          </div>
        </el-card>
      </div>
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
import imagesApi from '@/api/meterial/picture/picture'
const settingFile = require('@/settings.js')
import axios from 'axios'
export default {
  data() {
    return {
      host: settingFile.host,
      fileList: [],
      act: '',
      page: {
        totalCount: 0,
        limit: 10,
        start: 1,
        sizes: [10, 20, 30, 40]
      },
      dialogTitle: false,
      search: {},
      src: '',
      title_: '',
      dialog: false,
      loading: false,
      isShowBtn: false,
      editTitle: '',
      titleTempID: ''
    }
  },
  created() {
    this.getpictureList()
  },
  methods: {
    updateFile(e) {
      const instance = axios.create()
      var file = e.target.files[0]
      var fd = new FormData()
      fd.append('file', file)
      var that = this
      imagesApi.updateFile(fd).then((res) => {
        const url = that.host + res.url
        that.fileList.push(url)
        this.tip(res, '上传')
        that.getpictureList()
      })
    },
    start_(e) {
      console.log(e.target.isShowBtn)
    },
    end() {
    },
    handleSizeChange(val) {
      this.page.limit = val
      this.fileList = []
      this.getpictureList()
    },
    handleCurrentChange(val) {
      this.page.start = val
      this.fileList = []
      this.getpictureList()
    },
    handleClose() {
      this.dialog = false
    },
    view(src, title) {
      this.dialog = true
      this.src = src
      this.title_ = title || '低调的图片'
    },
    editPicture(id) {
      this.dialogTitle = true
      this.titleTempID = id
    },
    confirm() {
      this.dialogTitle = false
      const submitObj = {
        title: this.editTitle,
        id: this.titleTempID
      }
      imagesApi.updateTitle({ ...submitObj }).then(res => {
        this.tip(res, '修改')
      })
    },
    delPicture(id) {
      imagesApi.delPicture({ id }).then(res => {
        this.tip(res, '删除')
      })
    },
    tip(res, desc) {
      if (res.code === 'success') {
        this.$message.success(desc + '成功!')
        this.getpictureList()
      } else {
        this.$message.error(desc + '失败!')
      }
    },
    doSearch() {
      this.page.start = 1
      this.getpictureList()
    },
    getpictureList() {
      this.loading = true
      const page = {
        start: this.page.start,
        limit: this.page.limit,
        ...this.search
      }
      imagesApi.pictureList({ ...page })
        .then(res => {
          this.fileList = res.data.list
          this.page.totalCount = res.data.totalRow
          this.fileList.forEach(ele => {
            return ele.fileName = `http://www.bufantec.com/media/` + ele.fileName
          })
          this.loading = false
        })
    }
  }
}
</script>

<style  lang='scss' scoped>
.picture-main {
  .card {
    margin: 30px;
    .pic-container {
      display: flex;
      flex-wrap: wrap;
        .picList {
            margin: 20px;
        }
    }
    .file {
      position: relative;
      overflow: hidden;
      .file-item {
        position: absolute;
        top: 0px;
        left: 11px;
        font-size: 20px;
        opacity: 0;
      }
    }
  }
}
</style>

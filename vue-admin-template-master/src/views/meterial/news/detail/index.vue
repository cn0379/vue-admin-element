<template>
  <div class="addNews-main">
    <el-form
      ref="form"
      class="demo-ruleForm"
      label-width="110px"
      :inline="true"
      :model="xyNews"
      :label-position="labelPosition"
    >
      <el-card class="card" shadow="hover">
        <div slot="header">
          <span>新增新闻信息</span>
        </div>
        <el-form-item label="文章标题">
          <el-input v-model="xyNews.title" class="input" style="width:500px" />
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="xyNews.author" class="input" style="width:500px" />
        </el-form-item>
        <el-form-item label="文章描述">
          <el-input v-model="xyNews.desc" size="small" type="textarea" style="width:500px;" />
        </el-form-item>
        <el-row>
          <el-upload
            class="upload-demo"
            action="http://www.bufantec.com/admin/xy/upload/uploadImg"
            :on-success="handUploadScuuess"
          >
            <el-button size="small" type="primary">{{ info }}</el-button>
          </el-upload>
          <el-image v-if="isPicShow" style="width: 100px; height: 100px; margin-top:30px;" :src="xyNews.cover" fit="cover" />
        </el-row>
        <el-row style="margin-top:40px;">
          <el-col :span="8">
            显示文章
            <el-switch
              v-model="storyType_"
              active-color="#13ce66"
              inactive-icon-class="false"
              @change="storyType($event)"
            />
          </el-col>
          <el-col :span="8">
            是否最热
            <el-switch
              v-model="isHot"
              active-color="#13ce66"
              inactive-icon-class="false"
              @change="storyHot($event)"
            />
          </el-col>
        </el-row>
        <el-form-item label="切换富文本类型" style="margin:35px;">
          <el-radio-group v-model="t_Type">
            <el-radio :label="0">markDown</el-radio>
            <el-radio :label="1">富文本</el-radio>
          </el-radio-group>
        </el-form-item>
        <Tinymce v-if="t_Type === 0" ref="tin" v-model="xyNews.content1" />
        <keep-alive>
          <MarkDownEditor v-if="t_Type === 1" v-model="xyNews.content2" class="markdown-editor" />
        </keep-alive>
        <el-col :span="24" :offset="6" style="text-align: right;margin:30px 0 20px 0;">
          <el-button type="primary" @click="cancel">返回</el-button>
          <el-button v-if="disappear" type="primary" style="margin-left:20px;" @click="uploadNews">确定</el-button>
        </el-col>
      </el-card>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import MarkDownEditor from '@/components/MarkdownEditor'
import newsApi from '@/api/meterial/news/news'
import { resetFormData } from '@/utils/index'
const host = require('@/settings.js')

export default {
  components: {
    Tinymce,
    MarkDownEditor
  },
  data() {
    return {
      labelPosition: 'right',
      MdContent: '',
      t_Type: 0,
      showStory: true,
      hot: true,
      disappear: '', // 控制查看页面的确定
      xyNews: {
        content: '',
        content2: '',
        cover: ''
      },
      isHot: 0,
      storyType_: 0,
      src: '',
      host: host.host,
      isPicShow: false,
      jumpId: '',
      info: '上传文件'
    }
  },
  created() {
    const id = this.$route.query.id
    const disappear = this.$route.query.disappear
    this.jumpId = this.$route.query.id
    if (id) {
      this.initEditNews(id)
    }
    if (disappear) {
      this.disappear = false
    } else {
      this.disappear = true
    }
  },
  methods: {
    initEditNews(id) {
      newsApi.detailNews({ id }).then((res) => {
        this.xyNews = res.data
        console.log(this.xyNews)
        this.isHot = this.xyNews.hot == 1
        this.storyType_ = this.xyNews.type == 1
        this.info = '修改文件'
        this.isPicShow = true
      })
    },
    cancel() {
      this.xyNews = {}
      this.$router.go(-1)
    },
    storyType(e) {
      this.xyNews.type = e === true ? 1 : 0
    },
    storyHot(e) {
      this.xyNews.hot = e === true ? 1 : 0
    },
    handUploadScuuess(response, file, fileList) {
      this.src = this.host + '/' + response.url
      this.isPicShow = true
      this.xyNews.cover = this.src
    },
    uploadNews() {
      var xyNews = this.xyNews
      let api = null
      xyNews.id ? (api = newsApi.updataNews) : (api = newsApi.addNews)

      api({ xyNews }).then((res) => {
        if (res.code === 'success') {
          this.$message.success('添加成功!')
          this.xyNews = {}
        } else {
          this.$message.error('添加失败!')
        }
        resetFormData(this)
      })
    }
  }
}
</script>

<style  lang='scss' scoped>
.addNews-main {
  .markdown-editor {
    ::v-deep .te-md-splitter {
      width: 100%;
    }
  }
  .card {
    margin: 30px;
  }
}
</style>

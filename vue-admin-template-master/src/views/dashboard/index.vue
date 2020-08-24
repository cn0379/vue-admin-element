<template>
  <div class="dashboard-main">
    <el-card class="card" shadow="never">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card style="height:130px;" shadow="hover">
            <div class="pic-container">
              <div>
                <img class="picture" src="../../assets/icon/照片.png" alt>
              </div>
              <div>
                <p class="info">照片总数 {{ baseData.imgCount.count }}</p>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card style="height:130px;" shadow="hover">
            <div class="pic-container">
              <div>
                <img class="picture" src="../../assets/icon/照片.png" alt>
              </div>
              <div>
                <p class="info">新闻总数 {{ baseData.newsCount.count }}</p>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card style="height:130px;" shadow="hover">
            <div class="pic-container">
              <div>
                <img class="picture" src="../../assets/icon/照片.png" alt>
              </div>
              <div>
                <p class="info">用户总数 {{ baseData.userCount.count }}</p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="echarts" shadow="hover">
      <div id="main" style="width:100%;height:500px;" />     
    </el-card> 
  </div>   
</template>
   
<script>
import echarts from 'echarts'
import dashboardApi from '@/api/dashboard/dashboard'

export default {
  data() {
    return {
      baseData: {
        imgCount: {
          count: ''
        },
        imgCountByDay: [],
        userCount: {
          count: ''
        },
        newsCount: {
          count: ''
        }
      }
    }
  },
  created() {},
  mounted() {
    this.getDashboardData()
  },
  methods: {
    getDashboardData() {
      dashboardApi.dashboard().then((res) => {
        this.baseData = res
        this.drawLine()
      })
    },
    drawLine() {
      var myChart = echarts.init(document.getElementById('main'))
      const timeData = []
      const imgData = []
      const newsData = []
      const userData = []
      this.baseData.imgCountByDay.forEach((ele) => {
        timeData.push(ele.date)
        imgData.push(ele.count)
      })
      this.baseData.newsCountByDay.forEach((ele) => {
        newsData.push(ele.count)
      })
      this.baseData.userCountByDay.forEach((ele) => {
        userData.push(ele.count)
      })
      myChart.setOption({
        title: {
          text: '数据明细'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['照片明细', '新闻明细', '用户访问明细']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: timeData
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '照片明细',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: imgData
          },
          {
            name: '新闻明细',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: newsData
          },
          {
            name: '用户访问明细',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: userData
          }
        ]
      })
    }
  }
}
</script>

<style lang='scss' scoped >
* {
  margin: 0;
  padding: 0;
}
.dashboard-main {
  .card {
    margin: 30px;
    border: none;
  }
  .pic-container {
    display: flex;
    .info {
      padding: 10px 0px 0px 60px;
      font-weight: 600;
    }
  }
  .picture {
    width: 50px;
    margin-top: 30px;
  }
  .echarts {
    margin: 50px;
  }
}
</style>

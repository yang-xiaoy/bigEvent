<template>
  <div class="mains_container">
    <!-- 第一行 -->
    <el-row :gutter="10" class="total_row">
      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="1">
        <div class="grid-content bg-purple">
          <div class="max_num">
            <h3>10015<i>篇</i></h3>
          </div>
          <div class="discript"><span>总文章数</span></div>
        </div>
      </el-col>
      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="11">
        <div class="grid-content bg-purple">
          <div class="max_num">
            <h3>123<i>篇</i></h3>
          </div>
          <div class="discript"><span>日新增文章数</span></div>
        </div>
      </el-col>
      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="11">
        <div class="grid-content bg-purple">
          <div class="max_num">
            <h3>35<i>条</i></h3>
          </div>
          <div class="discript"><span>评论总数</span></div>
        </div>
      </el-col>
      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="1">
        <div class="grid-content bg-purple">
          <div class="max_num">
            <h3>1230<i>条</i></h3>
          </div>
          <div class="discript"><span>日新增评论</span></div>
        </div>
      </el-col>
    </el-row>
    <!-- 第二行 -->
    <el-row :gutter="10" class="month_add">
      <el-col :xs="15" :sm="15" :md="15" :lg="15" :xl="1">
        <div class="grid-content bg-purple" id="left_col">
        </div>
      </el-col>
      <el-col :xs="9" :sm="9" :md="9" :lg="9" :xl="11">
        <div class="grid-content bg-purple" id="right_col"></div>
      </el-col>
    </el-row>
    <!-- 第三行 -->
    <el-row :gutter="10" class="total_bottom">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="1">
        <div class="grid-content bg-purple" id="article_total"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  methods: {
    init_left() {
      const myChart = echarts.init(document.getElementById('left_col'))

      myChart.setOption({
        title: [
          {
            left: 'center',
            top: '10px',
            text: '月新增文章数'
          }
        ],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2022-11-10', '2022-12-10', '2023-1-11', '2023-2-12', '2023-3-10', '2023-4-11', '2023-5-12']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
          }
        ]
      })
    },
    init_right() {
      const myChart = echarts.init(document.getElementById('right_col'))
      myChart.setOption({
        title: [
          {
            left: 'center',
            top: '10px',
            text: '分类文章数量比'
          }
        ],
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '10%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '60%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ]
          }
        ]
      })
    },
    init_total() {
      const myChart = echarts.init(document.getElementById('article_total'))
      myChart.setOption({
        title: [
          {
            left: 'center',
            top: '2px',
            text: '分类文章数量比'
          }
        ],
        legend: {
          top: '30px'
        },
        tooltip: {},
        dataset: {
          dimensions: ['product', '2015', '2016', '2017'],
          source: [
            { product: 'Matcha Latte', 2015: 43.3, 2016: 85.8, 2017: 93.7 },
            { product: 'Milk Tea', 2015: 83.1, 2016: 73.4, 2017: 55.1 },
            { product: 'Cheese Cocoa', 2015: 86.4, 2016: 65.2, 2017: 82.5 },
            { product: 'Walnut Brownie', 2015: 72.4, 2016: 53.9, 2017: 39.1 }
          ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
      })
    }
  },
  mounted() {
    this.init_left()
    this.init_right()
    this.init_total()
  }
}
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;

}

.total_row {
  height: 120px;

  .max_num {
    height: 90px;
    background-color: #fff;
    line-height: 90px;
  }

  .discript {
    height: 30px;
    background-color: #e5e5e5;
    line-height: 30px;
    font-size: 14px;
  }

  .el-col h3 {
    font-size: 38px;
    font-weight: 400;
  }

  .el-col h3 i {
    font-size: 12px;
    font-style: normal;
    margin-left: 5px;
  }

  .el-col:nth-of-type(1) h3 {
    color: #81a2f7;
  }

  .el-col:nth-of-type(2) h3 {
    color: #62c1e8;
  }

  .el-col:nth-of-type(3) h3 {
    color: #44d3dc;
  }

  .el-col:nth-of-type(4) h3 {
    color: #4ac791;
  }
}

.month_add {
  height: 410px;

  #left_col,
  #right_col {
    height: 410px
  }
}

.total_bottom {
  height: 495px;

  #article_total {
    height: 495px;
  }
}

.bg-purple {
  background: #fff;
}

.grid-content {
  min-height: 36px;
}
</style>

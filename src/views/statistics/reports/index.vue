<template>
  <div>
    <el-card>
      <div id="main" style="width: 1150px;height:500px;" />
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
])
import { getReport } from '@/api/Reportform'
export default {
  name: 'Reports',
  data() {
    return {
      legend: {},
      series: [],
      xAxis: [],
      yAxis: []
    }
  },

  created() {
    this.getReport()
  },
  mounted() {

  },
  methods: {
    drawLine() {
      var myChart = echarts.init(document.getElementById('main'))

      myChart.setOption({
        title: {
          text: '用户来源'
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
          data: this.legend.data
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
            data: this.xAxis.data
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: this.series
      })
    },
    async getReport() {
      const res = await getReport()
      const { legend, series, xAxis, yAxis } = res
      this.legend = legend
      this.series = series
      this.xAxis = xAxis
      this.yAxis = yAxis
      this.drawLine()
      console.log(res)
    }
  }
}
</script>

<style scoped lang='less'>

</style>

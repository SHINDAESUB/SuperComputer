<script>
// import VueCharts from 'vue-chartjs'
import { Bar,mixins  } from 'vue-chartjs'
const { reactiveProp } = mixins
//https://www.chartjs.org/docs/latest/charts/line.html  옵션
//https://www.chartjs.org/samples/latest/

// https://wormwlrm.github.io/2021/07/02/Data-Visualization-with-Chart-js.html
export default {
  extends: Bar, //차트 종류 ex)bar
  mixins: [ reactiveProp] ,
  props:{
    chartdata: {},
  },  
  data () {
    return {
      options: {
          title: {
            display: true,
            // text: '5분당 데이터'
          },
          scales: {
            yAxes: [{
              ticks: {
                maxTicksLimit: 3, //눈금 및 격자 선 최대 갯수
                precision: 0,  // 소수점 표시  
                beginAtZero: true, // 0 부터 시작 
                scaleShowLabels:true, 
              },
              gridLines: {
                display: false
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              },
              ticks: {
                scaleShowLabels:true,
                suggestedMin: 1
              }
            }]
          },
          legend: {
            display: true, /* false = 범례를 숨긴다.  */
            position: 'bottom',
            // labels: {
            //     fontSize: 12,
            //     // fontFamily: 'sans-serif',
            //     fontColor: '#000000',
            //     fontStyle: 'bold'
            // }
          },
          responsive: true,
          maintainAspectRatio: false
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>

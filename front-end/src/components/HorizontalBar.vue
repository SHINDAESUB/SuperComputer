<script>
// import VueCharts from 'vue-chartjs'
import { HorizontalBar,mixins  } from 'vue-chartjs'
const { reactiveProp } = mixins
//https://www.chartjs.org/docs/latest/charts/line.html  옵션
//https://www.chartjs.org/samples/latest/
export default {
  extends: HorizontalBar, //차트 종류 ex)bar
  mixins: [ reactiveProp] ,
  props:{
    chartdata: {
      type: Object,
      default: null
    },
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
                // max: 5,
                // min: 3,
                maxTicksLimit: 3,
                precision: 1,
                beginAtZero: false,
                scaleShowLabels:false,
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
                scaleShowLabels:false,
              }
            }]
          },
          legend: {
            display: false, /* false = 범례를 숨긴다.  */
            // position: 'top',
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

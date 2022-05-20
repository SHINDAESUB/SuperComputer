<script>
// import VueCharts from 'vue-chartjs'
import { Line,mixins  } from 'vue-chartjs'
const { reactiveProp } = mixins
//https://www.chartjs.org/docs/latest/charts/line.html  옵션
//https://www.chartjs.org/samples/latest/
export default {
  extends: Line, //차트 종류 ex)bar
  mixins: [ reactiveProp] ,
  
  props:{
    chartdata:Object,
    legend:Boolean,
    title:String,
  },  

  data () {
    return {
      options: {
          title: {
            display: false,
            text: this.title
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              scaleLabel: {
                  display: true,
                  labelString: 'Load / Process (sec)'
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              ticks: {
                beginAtZero: true
              },

              gridLines: {
                display: false
              },

            }]
          },
          legend: {
            display: true, /* false = 범례를 숨긴다.  */
            position: 'bottom',
            labels: {
                fontSize: 12,
                // fontFamily: 'sans-serif',
                fontColor: '#000000',
                fontStyle: 'bold'
            }
          },
          responsive: true,
          maintainAspectRatio: false,
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
}
</script>

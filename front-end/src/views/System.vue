<template>
  <v-container class="system"  >
    <v-row class="" >
      <v-col cols="4">
        <v-card
          class="elevation-2 rounded-xl"
          color="white"
          height="450"
        >
          <v-card-text class="pa-6">
            <HalfDoughnutChart
              :chart-data="cpuColl"
              title='CPU ALLOC'
              height="280"
            />
            <v-divider class="mt-2"></v-divider>
            <div class="text-center display-1 black--text font-weight-medium mt-5">{{cpuPersent}} %</div>
            <div class="text-center title  font-weight-medium mt-2">{{cpuUse}} of {{cpuTotal}} ALLOCED</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card
          class="elevation-2 rounded-xl"
          color="white"
          height="450"
        >
          <v-card-text class="pa-6">
            <HalfDoughnutChart
              title='MEMORY USE'
              :chart-data="freeMemColl"
              height="280"
            />
            <v-divider class="mt-2"></v-divider>
            <div class="text-center display-1 black--text font-weight-medium mt-5">{{freeMemPersent}} %</div>
            <div class="text-center title  font-weight-medium mt-2">{{freeMemUse}} of {{freeMemTotal}} GB</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card
          tile
          class="elevation-2 rounded-xl"
          color="white"
          height="450"
        >
          <v-card-text class="pa-6">
            <div class=" display-1 black--text font-weight-medium mt-5 ml-6">NODE STATE </div>
            <div class=" subtitle-2  font-weight-medium mt-2 ml-6">SNOW </div>
            <v-row class="text-center mt-2">
              <v-card
                class="mx-auto rounded-circle"
                height="120"
                width="120"
                outlined
                :style="nodeStateStyle(nodeStates[0])" 
              >              
                <v-card-text>
                  <div class="subtitle-1 mt-3 font-weight-bold black--text">{{nodeStates[0]}}</div>
                  <div>01</div>
                </v-card-text>
              </v-card>
              <v-card
                class="mx-auto rounded-circle"
                height="120"
                width="120"
                outlined
                :style="nodeStateStyle(nodeStates[1])" 
              >              
                <v-card-text>
                    <div class="subtitle-1 mt-3 font-weight-bold black--text">{{nodeStates[1]}}</div>
                    <div>02</div>
                </v-card-text>
              </v-card>
            </v-row>
            <v-divider class="mt-6"></v-divider>

             <div class=" subtitle-2  font-weight-medium mt-2 ml-6">THUNDER </div>
              <v-row class="text-center mt-2">
                <v-card
                  class="mx-auto rounded-circle"
                  height="120"
                  width="120"
                  outlined
                  :style="nodeStateStyle(nodeStates[2])" 
                >              
                  <v-card-text>
                    <div class="subtitle-1 mt-3 font-weight-bold black--text">{{nodeStates[2]}}</div>
                    <div>01</div>
                  </v-card-text>
                </v-card>
                <v-card
                  class="mx-auto rounded-circle"
                  height="120"
                  width="120"
                  outlined
                  :style="nodeStateStyle(nodeStates[3])" 
                >              
                  <v-card-text>
                    <div class="subtitle-1 mt-3 font-weight-bold black--text">{{nodeStates[3]}}</div>
                    <div>02</div>
                  </v-card-text>
                </v-card>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="8">
        <v-card
          class="elevation-2 rounded-xl"
          color="white"
          height="450"
        >
          <v-card-text>
            <div class=" display-1 black--text font-weight-medium mt-5 ml-6">JOB RUNTIME</div>
            <div class=" subtitle-2  font-weight-medium mt-2 ml-6">Top 18 of {{jobHistoryTotal}}</div>
            <BarChart
              class="px-2"
              :chart-data="jobBarColl"
              height="320"
            />
          </v-card-text>

        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card
          class="elevation-2 rounded-xl"
          color="white"
          height="450"
        >
          <v-card-text>
            <div class=" display-1 black--text font-weight-medium mt-5 ml-6">JOB COUNT </div>
            <div class=" subtitle-2  font-weight-medium mt-2 ml-6">Partition percent </div>
            <HorizontalBar
              :chart-data="jobHorizontalColl"
              height="300"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import slurm from '../services/slurm'
import LineChart from '../components/LineChart.vue'
import HalfDoughnutChart from '../components/HalfDoughnutChart.vue'
import HorizontalBar from '../components/HorizontalBar.vue'
import BarChart from '../components/BarChart.vue'

export default {
  name: 'Home',

  components: {
    LineChart,
    HalfDoughnutChart,
    BarChart,
    HorizontalBar,
  },

  data () {
    return {
      cpuColl:{},
      cpuTotal: 352,
      cpuUse:0,
      cpuPersent:0,

      freeMemColl:{},
      freeMemTotal: 626,
      freeMemUse:0,
      freeMemPersent:0,

      jobHistoryTotal:0,
      jobBarColl:{},
      jobHorizontalColl:{},

      nodeStates:[]
    }
  },

  created() {
    this.getData()
    this.polling = setInterval(this.getData, 2000);
  },


  methods:{

    getData(){
      this.nodeState('state')
      this.cpuHalfDoughnut('cpu')
      this.freeHalfDoughnut('free')
      this.jobHistory('system')
    },

    nodeStateStyle(state){
      let style = ""
      switch( state ) {
          case 'IDLE':
            style ="border: 10px solid #E0E0E0;"
          break;
          case 'ALLOC':
            style ="border: 10px solid #1E88E5"
          break;
          case 'DOWN':
            style ="border: 10px solid #E53935"
          break;
          default:
            style ="border: 10px solid #FDD835;"
          break;
      }
      return style
    },

    async nodeState(type){
      try {
        let result = await slurm.nodes(type)
      
        this.nodeStates = result
      } catch (e) {
        console.error(e)
      }
    },

    async cpuHalfDoughnut(type){
      try {
        let result = await slurm.nodes(type)

        this.cpuUse = result.thunder + result.csnow
        this.cpuPersent =Math.round((this.cpuUse / this.cpuTotal) * 100)  

        this.cpuColl = {
          labels: ['Thunder','SNOW','OTHER'],
          datasets: [
            {
              label: ['Thunder','SNOW','OTHER'],
              backgroundColor: ['#039BE5' ,'#00ACC1','#E0E0E0'],
              data:[ result.thunder , result.csnow ,this.cpuTotal - this.cpuUse ]
            },
        ]}
      } catch (e) {
        console.error(e)
      }
    },

    async freeHalfDoughnut(type){
      try {
        let result = await slurm.nodes(type)

        this.freeMemUse = result.use
        this.freeMemPersent = Math.round((result.use / this.freeMemTotal) * 100)

        this.freeMemColl = {
          labels: ['USE','FREE'],
          datasets: [
            {
              label: ['USE','FREE'],
              backgroundColor: ['#039BE5','#E0E0E0'],
              data:[ this.freeMemUse , this.freeMemTotal - this.freeMemUse  ]
            },
        ]}
      } catch (e) {
        console.error(e)
      }
    },

    async jobHistory(type){
      try {
        let result = await slurm.jobHistory(type)

        result.sort((prev , current ) => { return current.second - prev.second})

        console.log("result :" ,result)

        let topResult = result.filter((order , index) => { return index < 18 })
        let barLabel = topResult.map(result => { return result.id})
        let barData = topResult.map(result => { return result.second})
        this.jobHistoryTotal = result.length

        let thunder= result.filter(result => { return result.partition === "thunder"})
        let csnow= result.filter(result => { return result.partition === "snow"})
        let all= result.filter(result => { return result.partition === "all"})

        this.jobBarColl = {
          labels: barLabel,
          datasets: [
            {
              label: 'SECOND',
              backgroundColor: '#00897B',
              data: barData
            },
        ]}

        this.jobHorizontalColl = {
          labels: [''],
          datasets: [
            {
              label: 'SNOW',
              backgroundColor: '#00897B',
              data: [csnow.length]
            },
            {
              label: 'THUNDER',
              backgroundColor: '#039BE5',
              data: [thunder.length]
            },
            {
              label: 'ALL',
              backgroundColor: '#00ACC1',
              data: [all.length]
            },
            {
              label: 'OTHER',
              backgroundColor: '#E0E0E0',
              data: [result.length - (all.length + thunder.length +csnow.length )]
            },
          ],
        }
      } catch (e) {
        console.error(e)
      }
    },
  },
  beforeDestroy () {
    clearInterval(this.polling)
  }

}
</script>
<style lang="scss">
.system{
  height: 100vh;
}
</style>
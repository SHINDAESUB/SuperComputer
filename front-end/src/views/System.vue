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
              title='CPU Alloc'
              height="280"
            />
            <v-divder/>
            <v-divider class="mt-2"></v-divider>
            <div class="text-center display-1 black--text font-weight-medium mt-5">{{cpuPersent}} %</div>
            <div class="text-center title  font-weight-medium mt-2">{{cpuUse}} of {{cpuTotal}} Alloced</div>
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
              title='Free mem'
              :chart-data="freeMemColl"
              height="280"
            />
            <v-divder/>
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
            <HalfDoughnutChart
              :chart-data="totalColl"
              height="280"
            />
            <v-divder/>
            <v-divider class="mt-2"></v-divider>
            <div class="text-center display-1 black--text font-weight-medium mt-5">20 %</div>
            <div class="text-center title  font-weight-medium mt-2">50 of 100 Reserved</div>
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
            <div class=" display-1 black--text font-weight-medium mt-5 ml-6">9567</div>
            <div class=" subtitle-2  font-weight-medium mt-2 ml-6">50 of 100 Reserved</div>
            <BarChart
              class="px-2"
              :chart-data="crcColl"
              height="300"
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
          <HorizontalBar
            class="pt-3 px-2 "
            :chart-data="hColl"
            height="400"
          />

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ganglia from '../services/ganglia'
import ipmi from '../services/ipmi'
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

      totalColl:{},

      crcColl : {
        labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
        datasets: [
            {
              label: ['x','y'],
              backgroundColor: '#00897B ',
              data: [ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
            }
        ],

      },
      hColl : {
        labels: ['LATINE','VALUE','CHORO','ADDLE','SCSENS'],
        datasets: [
            {
              label: ['y'],
              backgroundColor: '#00897B  ',
              data: [ 14877,23472,18173,21552,29998,6,7,8,9,10,11,12,13,14,15,16,17,18],
            },
            {
              label: ['x'],
              backgroundColor: '#E0E0E0A1',
              data: [ 30000-14877,30000-23472,30000-18173,30000-21552,30000-29998,6,7,8,9,10,11,12,13,14,15,16,17,18],
            },
        ],

      }
              
    }
  },

  mounted(){
    this.totalColl = {
        labels: ['x','y'],
        datasets: [
            {
                backgroundColor: ['#039BE5' ,'#00ACC1','#E0E0E0'],
                data: [ 4 ,3 ,8],
            }
        ],
    }
    this.cpuHalfDoughnut('cpu')
    this.freeHalfDoughnut('free')
    this.jobHistoryBar('bar')
  },

  methods:{
    async cpuHalfDoughnut(type){
      try {
        let result = await slurm.nodes(type)

        this.cpuUse = result.thunder + result.csnow
        this.cpuPersent =Math.round((this.cpuUse / this.cpuTotal) * 100)  

        this.cpuColl = {
          labels: ['Thunder','CSNOW','OTHER'],
          datasets: [
            {
              label: ['Thunder','CSNOW','OTHER'],
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

    async jobHistoryBar(type){
      try {
        let result = await slurm.jobHistory(type)

        console.log(result)

        // this.cpuUse = result.thunder + result.csnow
        // this.cpuPersent =Math.round((this.cpuUse / this.cpuTotal) * 100)  

        // this.cpuColl = {
        //   labels: ['Thunder','CSNOW','OTHER'],
        //   datasets: [
        //     {
        //       label: ['Thunder','CSNOW','OTHER'],
        //       backgroundColor: ['#039BE5' ,'#00ACC1','#E0E0E0'],
        //       data:[ result.thunder , result.csnow ,this.cpuTotal - this.cpuUse ]
        //     },
        // ]}
      } catch (e) {
        console.error(e)
      }
    },

  }
}
</script>
<style lang="scss">
.system{
  height: 100vh;
}
</style>
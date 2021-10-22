<template>
  <v-container class="dashboard d-flex flex-column justify-center   "  >
    <v-row >
      <v-col cols="4">
        <v-card
          class="elevation-2 rounded-xl"
          color="white"
          height=130
          @click="runtime()"
        >
          <v-card-text class="pa-6">
              <v-row no-gutters class="display-1">Service runtime</v-row>
              <v-row no-gutters class="display-1 font-weight-black"><v-spacer/>{{time}} min</v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card
          class="elevation-2 rounded-xl"
          color="white"
          height="130"
          @click="power()"
        >
          <v-card-text class="pa-6">
              <v-row no-gutters class="display-1">Node start</v-row>
              <v-row>
                <v-spacer/>
                <v-btn
                  v-for="(on , index) in start"
                  fab
                  small
                  dark
                  readonly
                  class="mx-4 elevation-0"
                  :color="on ? 'success' : 'red' "
                  :key="index"/>
              </v-row>
          </v-card-text>
        </v-card>

      </v-col>
      <v-col cols="4">
        <v-card
          tile
          class="elevation-2 rounded-xl"
          color="white"
          height="130"
          @click="squeue()"
        >
          <v-card-text class="pa-6">
              <v-row no-gutters class="display-1">Running jobs</v-row>
              <v-row no-gutters class="display-1 font-weight-black"><v-spacer/>{{running}}</v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="8">
        <v-card
          class="elevation-2 rounded-xl"
          color="white"
          height=600
          @click="gangliaLine()"
        >
        <v-card-text>
          <LineChart
            :chart-data="lineChartData"
            :height="520"
            :title="'Usage'"
          />
        </v-card-text>


        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card
          class="elevation-2 rounded-xl"
          color="white"
          height="600"
          @click="gangliaDoughnut()"
        >
          <DoughnutChart
            :chart-data="doughnutChartCsnow"
            :height="280"
            :title="'CSNOW'"
          />
          <v-divider/>
          <DoughnutChart
            :chart-data="doughnutChartThunder"
            :height="280"
            :title="'THUNDER'"
          />
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-card
          class="elevation-2 rounded-xl"
          color="white"
          height="130"
          @click="nodes()"
        >
          <v-card-text class="pa-6">
            <v-row no-gutters class="display-1">Total nodes</v-row>
            <v-row no-gutters class="display-1 font-weight-black"><v-spacer/>{{total}}</v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card
          class="elevation-2 rounded-xl"
          color="white"
          height="130"
        >
          <v-card-text class="pa-6">
            <v-row no-gutters class="display-1">Idel nodes</v-row>
            <v-row no-gutters class="display-1 font-weight-black"><v-spacer/>{{idel}}</v-row>
          </v-card-text>
        </v-card>

      </v-col>
      <v-col cols="4">
        <v-card
          class="elevation-2 rounded-xl"
          color="white"
          height="130"
        >
          <v-card-text class="pa-6">
            <v-row no-gutters class="display-1">USE</v-row>
            <v-row no-gutters class="display-1 font-weight-black"><v-spacer/>{{persent}} %</v-row>
          </v-card-text></v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ganglia from '../services/ganglia'
import ipmi from '../services/ipmi'
import slurm from '../services/slurm'

import LineChart from '../components/LineChart.vue'
import DoughnutChart from '../components/DoughnutChart.vue'


export default {
  name: 'Home',

  components: {
    LineChart,
    DoughnutChart,
  },

  data () {
    return {
      time:0,
      start:[],
      running:0,
      lineChartData:{},
      
      csnow:[],
      thunder:[],
      lineLabel:[],
      doughnutChartCsnow: {},
      doughnutChartThunder: {},
    
      idel:0,
      total:0,
      persent:0,

      polling: null,
    }
  },
  created() {
    this.getData()
    this.polling = setInterval(this.getData, 2000);
  },

  methods:{
    getData(){
      this.runtime()
      this.power()
      this.squeue()
      this.gangliaLine()
      this.gangliaDoughnut()
      this.nodes()
    },

    async runtime(){
        try {
          let result = await slurm.runtime()
          this.time = result.runtime
        } catch (e) {
          console.error(e)
        }
    },

    async power(){
        try {
          let result = await ipmi.power()
          this.start = result 
        } catch (e) {
          console.error(e)
        }
    },

    async squeue(){
        try {
          let result = await slurm.squeue()
          this.running = result.squeue
        } catch (e) {
          console.error(e)
        }
    },

    async gangliaLine(){
      try {
        let result = await ganglia.line()
        if(this.csnow.length === 10) this.csnow.shift() 
        if(this.thunder.length === 10) this.thunder.shift() 

        this.csnow.push(result.csnow)
        this.thunder.push(result.thunder)

        if(this.lineLabel.length < 10 ) this.lineLabel.push(this.thunder.length)
      
        this.lineChartData = {
          labels: this.lineLabel,
          datasets: [
            {
              label: 'CSNOW',
              borderColor:'#26C6DA',
              backgroundColor: '#FFFFFF00',
              data:this.csnow
            },
            {
              label: 'Thunder',
              borderColor:'#26A69A',
              backgroundColor: '#FFFFFF00',
              data:this.thunder
            }
          ] 
        }
      } catch (e) {
        console.error(e)
      }
    },

    async gangliaDoughnut(){
        try {
          let result = await ganglia.bar()
          
          this.doughnutChartCsnow = {
            labels: ['CPU','USER','OTHER'],
            datasets: [
              {
                label: 'CSNOW',
                backgroundColor: [
                  '#7E57C2',
                  '#5C6BC0',
                  '#E0E0E0'
                ],
                data:[ (result.csnow.cpu[0] + result.csnow.cpu[1])/2 ,(result.csnow.user[0] + result.csnow.user[1])/2 , 100 - (result.csnow.cpu[0] + result.csnow.cpu[1])/2 - (result.csnow.user[0] + result.csnow.user[1])/2]
              },
          ]}

          this.doughnutChartThunder = {
            labels: ['CPU','USER','OTHER'],
            datasets: [
              {
                label: 'THUNDER',
              backgroundColor: [
                '#7E57C2',
                '#5C6BC0',
                '#E0E0E0'
              ],
                data:[ (result.thunder.cpu[0] + result.thunder.cpu[1])/2 ,(result.thunder.user[0] + result.thunder.user[1])/2 , 100 - (result.thunder.cpu[0] + result.thunder.cpu[1])/2 - (result.thunder.user[0] + result.thunder.user[1])/2]
              },
          ]}
        } catch (e) {
          console.error(e)
        }
    },

    async nodes(){
        try {
          let result = await slurm.nodes()
          
          this.idel = result.idel
          this.total = result.total
          this.persent = ( this.idel / this.total) * 100  
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
.dashboard{
  height: 100vh;
}
</style>
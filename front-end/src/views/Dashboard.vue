<template>
  <section>
    <v-container >
      <h1 class="py-2 text-h3 font-weight-bold"> Dashboard </h1>
      <Slurm
        :runtime="time"
        :jobs="jobs"
        :idle="idle"
        :total="total"
        :use="use"
        :persent="persent"
      />
      <Ganglia
        :nodeData="nodeData"
        :csnowData="csnowData"
        :thunderData="thunderData"
      />
      <Ipmi
        :state="state"
      />
    </v-container>
  </section>
</template>

<script>
import ganglia from '../services/ganglia'
import ipmi from '../services/ipmi'
import slurm from '../services/slurm'
import LineChart from '../components/charts/LineChart.vue'
import DoughnutChart from '../components/charts/DoughnutChart.vue'

import Ganglia from '@/components/dashboard/Ganglia.vue'
import Slurm from '@/components/dashboard/Slurm.vue'
import Ipmi from '@/components/dashboard/Ipmi.vue'

export default {
  name: 'Home',

  components: {
    LineChart,
    DoughnutChart,
    Slurm,
    Ganglia,
    Ipmi
  },

  data () {
    return {

      time:0,
      jobs:0,
      idle:0,
      total:0,
      use:0,
      persent:0,

      nodeData:{},
      lineLabel:[],
      csnow:[],
      thunder:[],
      csnowData: {},
      thunderData: {},
  
      state:[],

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
      this.nodes('text')
      this.squeue()
      this.gangliaLine()
      this.gangliaDoughnut()
      this.power('dashboard')

    },

    async runtime(){
        try {
          let result = await slurm.runtime()
          this.time = Number(result.runtime)
        } catch (e) {
          console.error(e)
        }
    },

    async squeue(){
        try {
          let result = await slurm.squeue()
          this.jobs = result.squeue
        } catch (e) {
          console.error(e)
        }
    },

    async nodes(type){
        try {
          let result = await slurm.nodes(type)
          
          this.idle = result.idle
          this.total = result.total
          this.use = this.total - this.idle
          this.persent = ( (this.total - this.idle) / this.total) * 100  
        } catch (e) {
          console.error(e)
        }
    },  

    async power(type){
        try {
          let result = await ipmi.power(type)
          this.state = result 
        } catch (e) {
          console.error(e)
        }
    },

    async gangliaLine(){
      try {
        let result = await ganglia.line()

        if(this.csnow.length === 10) this.csnow.shift() //데이터 10 개 이상일 경우 삭제
        if(this.thunder.length === 10) this.thunder.shift() 

        this.csnow.push(result.csnow)
        this.thunder.push(result.thunder)

        let y1 = [...this.csnow]
        let y2 = [...this.thunder]

        let date = new Date()
        let hour = date.getHours()
        let min = date.getMinutes()
        let sec = date.getSeconds()

        hour = hour >= 10 ? hour : '0' + hour
        min = min >= 10 ? min : '0' + min
        sec = sec >= 10 ? sec : '0' + sec

        if(this.lineLabel.length === 10 ) this.lineLabel.shift() 
        this.lineLabel.push(hour+":"+min+":"+sec)
      
        this.nodeData = {
          labels: this.lineLabel,
          datasets: [
            {
              label: 'CSNOW',
              borderColor:'#4CAF50',
              backgroundColor: '#FFFFFF00',
              data:y1
            },
            {
              label: 'Thunder',
              borderColor:'#2196F3',
              backgroundColor: '#FFFFFF00',
              data:y2
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
          
          this.csnowData = {
            labels: ['System','User','Other'],
            datasets: [
              {
                label: 'SNOW',
                backgroundColor: [
                  '#F44336',
                  '#1D88F5',
                  '#E0E0E0'
                ],
                data:[ (result.csnow.cpu[0] + result.csnow.cpu[1])/2 ,(result.csnow.user[0] + result.csnow.user[1])/2 , 100 - (result.csnow.cpu[0] + result.csnow.cpu[1])/2 - (result.csnow.user[0] + result.csnow.user[1])/2]
              },
          ]}

          this.thunderData = {
            labels: ['System','User','Other'],
            datasets: [
              {
                label: 'THUNDER',
                backgroundColor: [
                  '#F44336',
                  '#1D88F5',
                  '#E0E0E0'
              ],
                data:[ (result.thunder.cpu[0] + result.thunder.cpu[1])/2 ,(result.thunder.user[0] + result.thunder.user[1])/2 , 100 - (result.thunder.cpu[0] + result.thunder.cpu[1])/2 - (result.thunder.user[0] + result.thunder.user[1])/2]
              },
          ]}
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

</style>
<template>
  <section>
    <v-container >
      <h1 class="py-2 text-h3 font-weight-bold" id="monitoring"> Monitoring </h1>

      <State
        class="mt-6"
        :cpuChart="cpuChart"
        :cpuTotal="cpuTotal"
        :cpuUse="cpuUse"
        :cpuPersent="cpuPersent"
        :memoryChart="memoryChart"
        :memoryTotal="memoryTotal"
        :memoryUse="memoryUse"
        :memoryPersent="memoryPersent"
      />

      <Job
        class="mt-6"
        :jobs="jobs"
        :jobBarChart="jobBarChart"
        :jobHorizontalChart="jobHorizontalChart"
        :csnow="csnow"
        :thunder="thunder"
        :all="all"
        :other="other"

      />

      <Node
        class="mt-6"
        :nodes="nodes"
      />
    </v-container>
  </section>
</template>

<script>
//서비스
import slurm from '@/services/slurm'

//컴포넌트
import State from '@/components/monitoring/State.vue'
import Node from '@/components/monitoring/Node.vue'
import Job from '@/components/monitoring/Job.vue'

export default {
  name: 'Home',

  components: {
    State,
    Node,
    Job
  },

  data () {
    return {
      cpuChart:{},
      cpuTotal: 352,
      cpuUse:0,
      cpuPersent:0,

      memoryChart:{},
      memoryTotal: 626,
      memoryUse:0,
      memoryPersent:0,
      
      nodes:[],

      csnow:0,
      thunder:0,
      all:0,
      other:0,
      jobs:0,
      jobBarChart:{},
      jobHorizontalChart:{},

    }
  },

  created() {
    this.getData()
    this.polling = setInterval(this.getData, 1000);
  },

  methods:{

    getData(){
      this.nodeState('state')
      this.cpuAllocation('cpu')
      this.memoryUsage('free')
      this.jobHistory('system')
    },

    async nodeState(type){
      try {
        let result = await slurm.nodes(type)
      
        this.nodes = result

      } catch (e) {
        console.error(e)
      }
    },

    async cpuAllocation(type){
      try {
        let result = await slurm.nodes(type)

        this.cpuUse = result.thunder + result.csnow
        this.cpuPersent =Math.round((this.cpuUse / this.cpuTotal) * 100)  

        this.cpuChart = {
          labels: ['Thunder','CSNOW','Other'],
          datasets: [
            {
              label: ['Thunder','CSNOW','Other'],
              backgroundColor: ['#039BE5' ,'#00ACC1','#E0E0E0'],
              data:[ result.thunder , result.csnow ,this.cpuTotal - this.cpuUse ]
            },
        ]}
      } catch (e) {
        console.error(e)
      }
    },

    async memoryUsage(type){
      try {
        let result = await slurm.nodes(type)

        this.memoryUse = result.use
        this.memoryPersent = Math.round(((this.memoryTotal - result.use) / this.memoryTotal) * 100)

        this.memoryChart = {
          labels: ['USE', 'FREE' ],
          datasets: [
            {
              label: ['USE' ,'FREE'],
              backgroundColor: ['#039BE5', '#E0E0E0',],
              data:[ this.memoryTotal - this.memoryUse ,this.memoryUse    ]
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

        let topResult = result.filter((order , index) => { return index < 18 })
        let barLabel = topResult.map(result => { return result.id})
        let barData = topResult.map(result => { return result.second})
        this.jobs = result.length

        let thunder= result.filter(result => { return result.partition === "thunder"})
        let csnow= result.filter(result => { return result.partition === "snow"})
        let all= result.filter(result => { return result.partition === "all"})

        this.jobBarChart = {
          labels: barLabel,
          datasets: [
            {
              label: 'SECOND',
              backgroundColor: '#00897B',
              data: barData
            },
        ]}

      this.csnow = csnow.length
      this.thunder = thunder.length
      this.all = all.length
      this.other = result.length - (this.csnow + this.thunder + this.all )


        this.jobHorizontalChart = {
          labels: [''],
          datasets: [
            {
              label: 'CSNOW',
              backgroundColor: '#00897B',
              data: [this.csnow]
            },
            {
              label: 'Thunder',
              backgroundColor: '#039BE5',
              data: [this.thunder]
            },
            {
              label: 'All',
              backgroundColor: '#00ACC1',
              data: [this.all]
            },
            {
              label: 'Other',
              backgroundColor: '#E0E0E0',
              data: [this.other]
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
<template>
  <v-container class="node  "  >
    <v-row >
      <div class="title font-weight-bold my-5">전원 현황</div>
      <v-expansion-panels
        multiple
      >
        <v-expansion-panel>
          <v-expansion-panel-header>설정 1     
            <v-switch
              v-model="switch1"
              class="ml-2"
              ></v-switch>
            </v-expansion-panel-header>
          <v-expansion-panel-content>
            <divider/>
            <v-row>
              <span class="mt-5">Power off</span>
            <v-switch
              v-model="switch1"
              class="ml-2"
              ></v-switch>
            </v-row>

            <v-row>
              <span class="mt-5">Power on</span>
            <v-switch
              v-model="switch1"
              class="ml-2"
              ></v-switch>
            </v-row>

            <v-row>
              <span class="mt-5">Hard Reset</span>
            <v-switch
              v-model="switch1"
              class="ml-2"
              ></v-switch>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>설정 2     
            <v-switch
              v-model="switch1"
              class="ml-2"
              ></v-switch>
            </v-expansion-panel-header>
          <v-expansion-panel-content>
            Some content
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>설정 3     
            <v-switch
              v-model="switch1"
              class="ml-2"
              ></v-switch>
            </v-expansion-panel-header>
          <v-expansion-panel-content>
            Some content
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>

<script>
import LineChart from '../components/LineChart.vue'
import PieChart from '../components/Pie.vue'


export default {
  name: 'Home',

  components: {
    LineChart,
    PieChart
  },

  data () {
    return {
      disabled: false,
      readonly: false,
    }
  },


  mounted(){
    this.totalColl = {
        labels: ['성공','실패'],
        datasets: [
            {
                backgroundColor: ['#4CAF50' ,'#F44336'],
                data: [ 4 ,3 , 5, 6],
            }
        ],
    }
  },
}
</script>
<style lang="scss">
.node{
  height: 100vh;
}
</style>
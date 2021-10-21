<template>
  <v-container class="system d-flex flex-column justify-center  "  >
    <v-row >
      <v-col cols="4">
        <v-card
          class="elevation-2 rounded-xl"
          color="white"
          height="450"
        >
          <v-card-text class="pa-6">
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
        <DoughnutChart
          :chart-data="totalColl"
          height="400"
        />

        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card
          class="elevation-2 rounded-xl"
          color="white"
          height="450"
        >
          <PieChart
            :chart-data="totalColl"
            height="400"
          />

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LineChart from '../components/LineChart.vue'
import DoughnutChart from '../components/Pie.vue'


export default {
  name: 'Home',

  components: {
    LineChart,
    DoughnutChart
  },

  data () {
    return {
      totalColl:{},
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
.system{
  height: 100vh;
}
</style>
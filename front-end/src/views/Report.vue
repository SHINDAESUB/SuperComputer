<template>
  <v-container class="report d-flex flex-row align-center justify-center  "  >
    <v-row >
      <v-col cols="12">
        <v-card
          class="elevation-2 rounded-xl"
          color="white"
          height="800px"
        >
          <v-card-text class="pa-6">
            <ScatterChart
              :chart-data="totalColl"
              height="400"
              class="mx-12"
            />
            <v-row class="text-center mt-12">
            <v-card
              class="mx-auto rounded-circle"
              height="250"
              width="250"
              outlined
              style='border: 10px solid #00BFA5;' 
            >              <v-card-text>
                <div class="display-3 mt-12 font-weight-bold black--text">50</div>
                <div class="display-1 ">CHORO</div>
              </v-card-text></v-card>
              <v-divider
                vertical
              ></v-divider>
            <v-card
              class="mx-auto rounded-circle"
              height="250"
              width="250"
              outlined
              style='border: 10px solid #00BFA5;' 
            >
              <v-card-text>
                <div class="display-3 mt-12 font-weight-bold black--text">50</div>
                <div class="display-1 ">ADOLE</div>
              </v-card-text>
            </v-card>
<v-divider
  vertical
></v-divider>
            <v-card
              class="mx-auto rounded-circle"
              height="250"
              width="250"
              outlined
              style='border: 10px solid #00BFA5;' 
            >              <v-card-text>
                <div class="display-3 mt-12 font-weight-bold black--text">50</div>
                <div class="display-1 ">SCENS</div>
              </v-card-text></v-card>


            </v-row>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ScatterChart from '../components/ScatterChart.vue'


export default {
  name: 'Report',

  components: {
    ScatterChart,
  },
  data () {
    return {
      totalColl:{
            datasets: [
              {
                label: 'THUNDER',
              backgroundColor: [
                '#FF8A80','#FF8A80','#FF8A80','#FF8A80','#FF8A80','#FF8A80','#FF8A80','#FF8A80','#FF8A80','#FF8A80','#FF8A80','#FF8A80'
              ],
                data: [{
                x: 6,
                y: 3,
                r: 15
              }, {
                x: 3,
                y: 12,
                r: 4
              },
              {
                x: 5,
                y: 15,
                r: 10
              },
              {
                x: 3,
                y: 12,
                r: 8
              },
              {
                x: 4,
                y: 5,
                r: 20
              },
              {
                x: 2,
                y: 6,
                r: 3
              },
              {
                x: 4,
                y: 9,
                r: 11
              },
              {
                x: 5,
                y: 10,
                r: 6
              }
            ]
              },
          ]
        },



              
    }
  },



}
</script>

<style lang="scss">
.report{
  height: 100vh;
}
</style>
<template>
  <v-container class="node  "  >
    <v-row >
      <div class="title font-weight-bold my-5">POWER CONTROL</div>
      <v-expansion-panels>
        <v-expansion-panel >
          <v-expansion-panel-header >
            CSNOW 01     
            <v-spacer/>
            <v-col class="ma-0 pa-0" cols='1'> <v-chip dark :color="nodeStateStyle(nodePowers[2])">{{nodePowers[2]}}</v-chip></v-col>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-radio-group
                    v-model="csnow1"
                    column
                  >
                    <v-radio
                      label="POWER ON"
                      color="#43A047"
                      value="on"
                    ></v-radio>
                    <v-radio
                      label="POWER OFF"
                      color="#E0E0E0"
                      value="off"
                    ></v-radio>
                    <v-radio
                      label="HARDWARE RESET"
                      color="#1E88E5"
                      value="reset"
                    ></v-radio>
                    <v-radio
                      label="SOFTWARE RESET(cycle)"
                      color="#FDD835"
                      value="cycle"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
            </v-row>
            <v-row class="my-1">
              <v-spacer/>
              <v-btn tile color="primary"  @click="powerUpdate('snow01' ,csnow1)">Apply</v-btn>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            CSNOW 02 
            <v-spacer/>
            <v-col class="ma-0 pa-0" cols='1'> <v-chip dark :color="nodeStateStyle(nodePowers[3])">{{nodePowers[3]}}</v-chip></v-col>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-radio-group
                    v-model="csnow2"
                    column
                  >
                    <v-radio
                      label="POWER ON"
                      color="#43A047"
                      value="on"
                    ></v-radio>
                    <v-radio
                      label="POWER OFF"
                      color="#E0E0E0"
                      value="off"
                    ></v-radio>
                    <v-radio
                      label="HARDWARE RESET"
                      color="#1E88E5"
                      value="reset"
                    ></v-radio>
                    <v-radio
                      label="SOFTWARE RESET(cycle)"
                      color="#FDD835"
                      value="cycle"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
            </v-row>
            <v-row class="my-1">
              <v-spacer/>
              <v-btn tile color="primary"  @click="powerUpdate('snow02' ,csnow2)">Apply</v-btn>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            THUNDER 01   
            <v-spacer/>
            <v-col class="ma-0 pa-0" cols='1'> <v-chip dark :color="nodeStateStyle(nodePowers[0])">{{nodePowers[0]}}</v-chip></v-col>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-radio-group
                    v-model="thunder1"
                    column
                  >
                    <v-radio
                      label="POWER ON"
                      color="#43A047"
                      value="on"
                    ></v-radio>
                    <v-radio
                      label="POWER OFF"
                      color="#E0E0E0"
                      value="off"
                    ></v-radio>
                    <v-radio
                      label="HARDWARE RESET"
                      color="#1E88E5"
                      value="reset"
                    ></v-radio>
                    <v-radio
                      label="SOFTWARE RESET(cycle)"
                      color="#FDD835"
                      value="cycle"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
            </v-row>
            <v-row class="my-1">
              <v-spacer/>
              <v-btn tile color="primary"  @click="powerUpdate('thunder01' ,thunder1)">Apply</v-btn>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            THUNDER 02        
            <v-spacer/>
            <v-col class="ma-0 pa-0" cols='1'> <v-chip dark :color="nodeStateStyle(nodePowers[1])">{{nodePowers[1]}}</v-chip></v-col>            
          </v-expansion-panel-header>
          <v-expansion-panel-content>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-radio-group
                    v-model="thunder2"
                    column
                  >
                    <v-radio
                      label="POWER ON"
                      color="#43A047"
                      value="on"
                    ></v-radio>
                    <v-radio
                      label="POWER OFF"
                      color="#E0E0E0"
                      value="off"
                    ></v-radio>
                    <v-radio
                      label="HARDWARE RESET"
                      color="#1E88E5"
                      value="reset"
                    ></v-radio>
                    <v-radio
                      label="SOFTWARE RESET(cycle)"
                      color="#FDD835"
                      value="cycle"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
            </v-row>
            <v-row class="my-1">
              <v-spacer/>
              <v-btn tile color="primary"  @click="powerUpdate('thunder02' ,thunder2)">Apply</v-btn>
            </v-row>

          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

    </v-row>
  </v-container>
</template>

<script>
import ipmi from '../services/ipmi'

export default {
  name: 'Home',

  data () {
    return {
      nodePowers:[],
      csnow1:'',
      csnow2:'',
      thunder1:'',
      thunder2:'',
    }
  },


  async created() {
    await this.power('node')
    await this.dataSetting()
    this.polling = setInterval(this.getData, 2000);
  },

  methods:{
    dataSetting(){
      this.csnow1 = this.nodePowers[2] 
      this.csnow2 = this.nodePowers[3] 
      this.thunder1 = this.nodePowers[0] 
      this.thunder2 = this.nodePowers[1] 
    },

    getData(){
      this.power('node')
    },

    nodeStateStyle(state){
      let style = ""
      switch( state ) {
          case 'off':
            style ="#E0E0E0"
          break;
          case 'on':
            style ="#43A047"
          break;

      }

      return style
    },

    async power(type){
        try {
          let result = await ipmi.power(type)

          this.nodePowers = result 

        } catch (e) {
          console.error(e)
        }
    },

    async powerUpdate(host , state){
      try {
        await ipmi.powerUpdate(host , state)
      
      } catch (e) {
        console.error(e)
      }
    }
  
  },

  beforeDestroy () {
    clearInterval(this.polling)
  }
}
</script>
<style lang="scss">
.node{
  height: 100vh;
}
</style>
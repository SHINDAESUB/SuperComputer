<template>
  <v-container class="node  "  >
    <v-row >
      <div class="title font-weight-bold my-5">POWER CONTROL</div>
      <v-expansion-panels>
        <v-expansion-panel >
          <v-expansion-panel-header >
            CSNOW 01     
            <v-spacer/>
            <v-col class="ma-0 pa-0" cols='1'> <v-chip :color="nodeStateStyle(nodeStates[0])">{{nodeStates[0]}}</v-chip></v-col>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-radio-group
                    v-model="nodePowers[2]"
                    column
                    
                  >
                    <v-radio
                      label="POWER ON"
                      color="#E53935"
                      value="on"
                      @click="powerUpdate('snow01' ,nodePowers[2])"
                    ></v-radio>
                    <v-radio
                      label="POWER OFF"
                      color="#E0E0E0"
                      value="off"
                      @click="powerUpdate('snow01' ,nodePowers[2])"
                    ></v-radio>
                    <v-radio
                      label="HARDWARE RESET"
                      color="#1E88E5"
                      value="reset"
                      @click="powerUpdate('snow01' ,nodePowers[2])"
                    ></v-radio>
                    <v-radio
                      label="SOFTWARE RESET(cycle)"
                      color="#FDD835"
                      value="cycle"
                      @click="powerUpdate('snow01' ,nodePowers[2])"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            CSNOW 02 
            <v-spacer/>
            <v-col class="ma-0 pa-0" cols='1'> <v-chip :color="nodeStateStyle(nodeStates[0])">{{nodeStates[0]}}</v-chip></v-col>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-radio-group
                    v-model="nodePowers[3]"
                    column
                  >
                    <v-radio
                      label="POWER ON"
                      color="#E53935"
                      value="on"
                      @click="powerUpdate('snow02' ,nodePowers[3])"
                    ></v-radio>
                    <v-radio
                      label="POWER OFF"
                      color="#E0E0E0"
                      value="off"
                      @click="powerUpdate('snow02' ,nodePowers[3])"
                    ></v-radio>
                    <v-radio
                      label="HARDWARE RESET"
                      color="#1E88E5"
                      value="reset"
                      @click="powerUpdate('snow02' ,nodePowers[3])"
                    ></v-radio>
                    <v-radio
                      label="SOFTWARE RESET(cycle)"
                      color="#FDD835"
                      value="cycle"
                      @click="powerUpdate('snow02' ,nodePowers[3])"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            THUNDER 01   
            <v-spacer/>
            <v-col class="ma-0 pa-0" cols='1'> <v-chip :color="nodeStateStyle(nodeStates[0])">{{nodeStates[0]}}</v-chip></v-col>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-radio-group
                    v-model="nodePowers[0]"
                    column
                  >
                    <v-radio
                      label="POWER ON"
                      color="#E53935"
                      value="on"
                      @click="powerUpdate('thunder01' ,nodePowers[0])"
                    ></v-radio>
                    <v-radio
                      label="POWER OFF"
                      color="#E0E0E0"
                      value="off"
                      @click="powerUpdate('thunder01' ,nodePowers[0])"
                    ></v-radio>
                    <v-radio
                      label="HARDWARE RESET"
                      color="#1E88E5"
                      value="reset"
                      @click="powerUpdate('thunder01' ,nodePowers[0])"
                    ></v-radio>
                    <v-radio
                      label="SOFTWARE RESET(cycle)"
                      color="#FDD835"
                      value="cycle"
                      @click="powerUpdate('thunder01' ,nodePowers[0])"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            THUNDER 02        
            <v-spacer/>
            <v-col class="ma-0 pa-0" cols='1'> <v-chip :color="nodeStateStyle(nodeStates[0])">{{nodeStates[0]}}</v-chip></v-col>            
          </v-expansion-panel-header>
          <v-expansion-panel-content>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-radio-group
                    v-model="nodePowers[1]"
                    column
                  >
                    <v-radio
                      label="POWER ON"
                      color="#E53935"
                      value="on"
                      @click="powerUpdate('thunder02' ,nodePowers[1])"
                    ></v-radio>
                    <v-radio
                      label="POWER OFF"
                      color="#E0E0E0"
                      value="off"
                      @click="powerUpdate('thunder02' ,nodePowers[1])"
                    ></v-radio>
                    <v-radio
                      label="HARDWARE RESET"
                      color="#1E88E5"
                      value="reset"
                      @click="powerUpdate('thunder02' ,nodePowers[1])"
                    ></v-radio>
                    <v-radio
                      label="SOFTWARE RESET(cycle)"
                      color="#FDD835"
                      value="cycle"
                      @click="powerUpdate('thunder02' ,nodePowers[1])"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

    </v-row>
  </v-container>
</template>

<script>
import slurm from '../services/slurm'
import ipmi from '../services/ipmi'

export default {
  name: 'Home',

  data () {
    return {
      disabled: false,
      readonly: false,
      nodeStates:[],
      nodePowers:[],
      ex7: 'red',
    }
  },


  created() {
    this.getData()
    this.polling = setInterval(this.getData, 2000);
  },


  methods:{

    getData(){
      this.nodeState('state')
      this.power('node')
    },

    nodeStateStyle(state){
      let style = ""
      switch( state ) {
          case 'IDLE':
            style ="#E0E0E0"
          break;
          case 'ALLOC':
            style ="#1E88E5"
          break;
          case 'DOWN':
            style ="#E53935"
          break;
          default:
            style ="#FDD835"
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
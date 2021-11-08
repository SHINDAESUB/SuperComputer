<template>
  <v-container class="report"  >
    <v-row class="d-flex flex-row align-center justify-center ">
      <v-col cols="12">
        <v-card
          class="elevation-2 rounded-xl"
          color="white"
          max-height="945px"
        >
          <v-card-text class="pa-6">
            <v-row no-gutters>
              <span class="title ">Directory</span>
              <v-spacer/>
              <v-btn icon @click="outList()"> 
                <v-icon>mdi-folder-refresh-outline</v-icon>
              </v-btn>
            </v-row>
            <v-row>
              <v-col cols="3" class="overflow-auto elevation-1" style="max-height:840px" >
                  <v-list max-height="840px"
                  >
                      <span v-for="(item , index) in list" :key="index">
                          <v-list-item  v-if="!item.hasOwnProperty('files')" >
                              <v-list-item-content @click="fileSelect(list[index].name , null)">
                                  <v-list-item-title >{{ item.name }}</v-list-item-title>
                              </v-list-item-content>
                          </v-list-item>

                          <v-list-group v-else no-actions >
                              <template v-slot:activator>
                                  <v-list-item-content>
                                      <v-list-item-title>{{ item.name }}</v-list-item-title>
                                  </v-list-item-content>
                              </template>

                              <v-list-item
                                  v-for="files in item.files"
                                  :key="files"
                              >
                                  <v-list-item-content @click="fileSelect(files ,item.name )">
                                      <v-list-item-title >{{ files }}</v-list-item-title>
                                  </v-list-item-content>
                              </v-list-item>
                          </v-list-group>
                      </span>
                  </v-list>
              </v-col>
              <v-col cols="9" class="mt-0 pt-0" >
                <div class="title">{{selected}}</div>
                <v-row no-gutters class="mt-2">
                    <v-card v-if="extension !== ''"  max-height='380px' height='380px' width="100%">
                      <v-card-text v-if="extension === '.out'">
                        <v-slide-group
                          active-class="success"
                          show-arrows
                        >
                          <v-slide-item
                            v-for="(item ,index) in outputResult"
                            :key="index"
                            class="ma-1 pa-0"
                          >
                            <v-card class="elevation-1" width="300px">
                              <v-card-subtitle class="subheading font-weight-bold">
                                RESEULT {{ index + 1}}
                              </v-card-subtitle>
                              <v-divider></v-divider>
                              <v-list dense>
                                <v-list-item
                                  v-for="(key, index) in item"
                                  :key="index"
                                >
                                  <v-list-item-content >
                                    {{ index }}:
                                  </v-list-item-content>
                                  <v-list-item-content
                                    class="align-end red--text"
                                  >
                                    {{ key }} 
                                  </v-list-item-content>
                                </v-list-item>
                              </v-list>
                            </v-card>
                          </v-slide-item>
                        </v-slide-group>
                      </v-card-text>
                      <v-card-text v-else-if="extension === '.txt'">
                        <v-row>
                          <v-col cols="6">
                            <v-card class="elevation-1">
                              <v-list >
                                <v-list-item>
                                  <v-list-item-content >
                                    Distributed Processes
                                  </v-list-item-content>
                                  <v-list-item-content
                                    class="align-end red--text"
                                  >
                                    {{snowResult[0]["Distributed Processes"]}}
                                  </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-content >
                                    Global nx
                                  </v-list-item-content>
                                  <v-list-item-content
                                    class="align-end red--text"
                                  >
                                    {{snowResult[0]["Global nx"]}}
                                  </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-content >
                                    Global ny
                                  </v-list-item-content>
                                  <v-list-item-content
                                    class="align-end red--text"
                                  >
                                    {{snowResult[0]["Global ny"]}}
                                  </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-content >
                                    Global nz
                                  </v-list-item-content>
                                  <v-list-item-content
                                    class="align-end red--text"
                                  >
                                    {{snowResult[0]["Global nz"]}}
                                  </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-content >
                                    Number of Equations
                                  </v-list-item-content>
                                  <v-list-item-content
                                    class="align-end red--text"
                                  >
                                    {{snowResult[0]["Number of Equations"]}}
                                  </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-content >
                                    Number of Nonzero Terms
                                  </v-list-item-content>
                                  <v-list-item-content
                                    class="align-end red--text"
                                  >
                                    {{snowResult[0]["Number of Nonzero Terms"]}}
                                  </v-list-item-content>
                                </v-list-item>
                              </v-list>
                            </v-card>
                          </v-col>
                          <v-col cols="6">
                            <v-card class="elevation-1">
                              <v-list >
                                <v-list-item>
                                  <v-list-item-content >
                                    Raw Read B/W
                                  </v-list-item-content>
                                  <v-list-item-content
                                    class="align-end red--text"
                                  >
                                    {{snowResult[0]["Raw Read B/W"]}}
                                  </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-content >
                                    Raw Write B/W
                                  </v-list-item-content>
                                  <v-list-item-content
                                    class="align-end red--text"
                                  >
                                    {{snowResult[0]["Raw Write B/W"]}}
                                  </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-content >
                                    Raw Total B/W
                                  </v-list-item-content>
                                  <v-list-item-content
                                    class="align-end red--text"
                                  >
                                    {{snowResult[0]["Raw Total B/W"]}}
                                  </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-content >
                                    Raw DDOT
                                  </v-list-item-content>
                                  <v-list-item-content
                                    class="align-end red--text"
                                  >
                                    {{snowResult[0]["Raw DDOT"]}}
                                  </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-content >
                                    Raw WAXPBY
                                  </v-list-item-content>
                                  <v-list-item-content
                                    class="align-end red--text"
                                  >
                                    {{snowResult[0]["Raw WAXPBY"]}}
                                  </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-content >
                                   Raw SpMV
                                  </v-list-item-content>
                                  <v-list-item-content
                                    class="align-end red--text"
                                  >
                                    {{snowResult[0]["Raw SpMV"]}}
                                  </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-content >
                                    Raw MG
                                  </v-list-item-content>
                                  <v-list-item-content
                                    class="align-end red--text"
                                  >
                                    {{snowResult[0]["Raw MG"]}}
                                  </v-list-item-content>
                                </v-list-item>
                              </v-list>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                </v-row>
                <v-row no-gutters>
                  <v-card v-if="extension !== ''" class="overflow-auto mt-5" height="400px" max-height="400px" width="100%">
                    <v-card-text>
                      <div v-for="(text, index) in fileInfo.split('\n')" :key="index" :class="textColor(text)">
                        {{ text }}
                      </div>
                    </v-card-text>
                  </v-card>
                </v-row>

              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import out from '../services/out'

export default {
  name: 'Report',

  data () {
    return {
      list:[],
      selected:null,
      fileInfo:'',
      extension:'',
      outputResult:[],
      snowResult:[],
      redLines:[
        'Machine Summary::Distributed Processes=',
        'Global Problem Dimensions::Global',
        'Linear System Information::Number of',
        'GB/s Summary::Raw Read B/W=',
        'GB/s Summary::Raw Write B/W=',
        'GB/s Summary::Raw Total B/W=',
        'GFLOP/s Summary::Raw DDOT=',
        'GFLOP/s Summary::Raw WAXPBY=',
        'GFLOP/s Summary::Raw SpMV=',
        'GFLOP/s Summary::Raw MG=',
        'T/V N NB P Q Time Gflops',
        'WR'
      ]
    }
  },

  async created() {
    await this.outList()
  },
  methods:{
    async outList(){
        this.selected = null
        try {
          let result = await out.list()

          console.log('result',result)

          this.extension = ''
          this.fileInfo = ''
          this.selected = null
          this.list = result 

        } catch (e) {
          console.error(e)
        }
    },

    async fileSelect(file ,folder){

        this.outputResult = []

        let root = folder !== null ? folder+"/"+file : file

        try {
          let result = await out.read(root)

          this.selected = file

          this.fileInfo = result 

          let fileLen = file.length;
          let dotLen = file.lastIndexOf('.');
          this.extension = file.substring(dotLen, fileLen)
          this.extension === '.out' ?  this.outputSetting() : this.snowSetting()
        
        } catch (e) {
          console.error(e)
        }
    },

    textColor(text){
      let result = this.redLines.some(line => text.includes(line) )

      let color = result ? 'red--text font-weight-bold' : '' 

      return color
    },

    outputSetting(){
      this.outputResult = []
      let fileText = this.fileInfo.split('\n')
      let splitArr = []

      fileText.forEach(line => { if(line.includes('WR')) splitArr.push(line)});

      splitArr.forEach(element => {
        let str=element.split(' '); 
        let result = str.filter(text => text !=='')
        let output = {'T/V':result[0] ,'N':result[1],'NB':result[2],'P':result[3],'Q':result[4],'Time':result[5],'Gflops':result[6]}
        this.outputResult.push(output)
      })

    },

    snowSetting(){
      this.snowResult = []
      let fileText = this.fileInfo.split('\n')
      let result = []

      fileText.forEach(text => { 
        this.redLines.forEach(line =>{
          if(text.includes(line)){
            let textLen = text.length;
            let dotLen = text.lastIndexOf('=');
            let data = text.substring(dotLen+1, textLen)
            result.push(data)
          } 
        })
      })

      let snow = {
        'Distributed Processes':result[0] ,
        'Global nx':result[1],
        'Global ny':result[2],
        'Global nz':result[3],
        'Number of Equations':result[4],
        'Number of Nonzero Terms':result[5],
        'Raw Read B/W':result[6],
        'Raw Write B/W':result[7],
        'Raw Total B/W': result[8],
        'Raw DDOT':result[9],
        'Raw WAXPBY':result[10],
        'Raw SpMV':result[11],
        'Raw MG':result[12],
      }

      this.snowResult.push(snow)
      

    }
  }
}
</script>

<style lang="scss">
.report{
  height: 100vh;
}
</style>
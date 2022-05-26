<template>
    <article>
        <h2 class="py-2 text-h4 font-weight-bold" id="state" >
            Slurm
        </h2>

        <v-card height="100%" class="relative">
            <v-card-title class="text-h5">Directory</v-card-title>    
            <v-card-text>
                <v-select
                    v-model="select"
                    :items="folder"
                    item-text="name"
                    item-value="files"
                    label="Folder "
                    outlined
                    return-object
                />
                <v-select
                    v-model="file"
                    :items="select.files"
                    item-text="files"
                    item-value="files"
                    label="File"
                    outlined
                    @change="fileSelect()"
                />
            </v-card-text> 
        </v-card>

        <v-card height="100%" class="relative mt-2" min-height="200px">
            <v-card-title class="text-h6">File</v-card-title>    
            <v-card-subtitle>{{file}}</v-card-subtitle>    
                    <v-card-text v-if="file !== ''">
                        <v-row>
                            <v-col cols="12" md="3">
                                <div class="subtitle-1">Summary</div>
                                <v-card 
                                    class="overflow-auto mt-2" 
                                    :height="$vuetify.breakpoint.xs ? 480 : 780"
                                >
                            <v-card-text v-if="file.substring(file.lastIndexOf('.'), file.length) === '.out'">
                                <v-card
                                    v-for="(item ,index) in outputResult"
                                    :key="index"
                                >
                                    <v-card-title>Reseult {{ index + 1}}</v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-text>
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
                                    </v-card-text>
                                </v-card>
                            </v-card-text>

                            <v-card-text v-else >
                                <v-list v-if="snowResult.length !== 0">
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
                            
                            </v-card-text>
                        </v-card>
                    </v-col>

                    <v-col cols="12" md="9">
                        <div class="subtitle-1">Log</div>
                        <v-card 
                            class="overflow-auto mt-2" 
                            :max-height="$vuetify.breakpoint.xs ? 480 : 780"
                        >
                            <v-card-text >
                                <div v-for="(text, index) in log.split('\n')" :key="index" :class="strongLog(text)">
                                    {{ text }}
                                </div>

                            </v-card-text>
                        </v-card>


                    </v-col>
                </v-row>
            </v-card-text> 
            <v-card-text v-else class="text-center">
                Select a File
            </v-card-text>
        </v-card>
    </article>
</template>

<script>

import out  from '@/services/out'

export default {
    props:{
        folder:Array,
    },

    data() {
        return {
            select:{},
            
            file:"",
            
            log:'',

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
    
    methods:{
        async fileSelect(){ //file 선택시 데이터 바인딩

            try {
                let result = await out.read(this.select.name + "/" + this.file)

                this.log = result

                let extension = this.file.substring(this.file.lastIndexOf('.'), this.file.length)
                extension === '.out' ?  this.outputSetting() : this.snowSetting()
            
            } catch (e) {
                console.error(e)
            }
        },

        strongLog(log){ //this.redLines 포함된 line 만 강조
            let result = this.redLines.some( line => log.includes(line) )

            let color = result ? 'red--text font-weight-bold' : '' 

            return color
        },

        outputSetting(){ ///.out 값 바인딩
            this.outputResult = []
            let fileText = this.log.split('\n')
            let splitArr = []

            fileText.forEach(line => { if(line.includes('WR')) splitArr.push(line)});

            splitArr.forEach(element => {
                let str=element.split(' '); 
                let result = str.filter(text => text !=='')
                let output = {'T/V':result[0] ,'N':result[1],'NB':result[2],'P':result[3],'Q':result[4],'Time':result[5],'Gflops':result[6]}
                this.outputResult.push(output)
            })

        },

        snowSetting(){ //csnow 값 바인딩
            this.snowResult = []
            let fileText = this.log.split('\n')
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
    },

    //this.select 파일이 바뀔때 실행
    watch: {
        select() {
            this.file = ''
        }
    }
}
</script>

<style>

</style>
<template>
    <article>
        <h2 class="py-2 text-h4 font-weight-bold" id="state" >
            State
        </h2>
        <v-row>
            <v-col
                cols="12"
                md="6"
            >
                <v-card>
                    <v-card-title class="text-h5">CPU Allocation</v-card-title>   
                    <v-card-text>
                        <HalfDoughnutChart
                            :chart-data="cpuChart"
                            :height="200"
                            :max-height="200"
                        />
                        <v-divider class="ma-3"></v-divider>
                        <div class="text-center text-h6 black--text font-weight-medium mt-5">{{cpuPersent}} %</div>
                        <div class="text-center text-h6 font-weight-medium mt-2">{{cpuUse}} of {{cpuTotal}} ALLOCED</div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col           
                cols="12"
                md="6"
            >
                <v-card>
                    <v-card-title class="text-h5">Memory Usage</v-card-title>      
                    <v-card-text>
                        <HalfDoughnutChart
                            :chart-data="memoryChart"
                            :height="200"
                            :max-height="200"
                        />   
                        <v-divider class="ma-3"></v-divider>
                        <div class="text-center text-h6 black--text font-weight-medium mt-5">{{memoryPersent}} %</div>
                        <div class="text-center text-h6  font-weight-medium mt-2">{{memoryTotal - memoryUse}} of {{memoryTotal}} GB</div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </article>
</template>

<script>
//차트 컴포넌트 사용
import HalfDoughnutChart from '@/components/charts/HalfDoughnutChart.vue'

export default {
    props:{

        cpuChart:Object,
        cpuTotal:Number,
        cpuUse:Number,
        cpuPersent:Number,

        memoryChart:Object,
        memoryTotal:Number,
        memoryUse:Number,
        memoryPersent:Number
    },  

    components: {
        HalfDoughnutChart,
    },
}
</script>

<style>

</style>
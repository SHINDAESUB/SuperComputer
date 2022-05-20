<template>
    <v-container  >
        <h4 class="pa-2 text-h4 font-weight-bold">Slurm</h4>
        <v-row>
            <v-col           
                cols="12"
                md="4"
            >
                <v-card>
                    <v-card-title class="text-h5">Runtime</v-card-title>         
                    <v-card-text class="d-flex justify-end black--text">
                        <div>
                            <span class="text-h3 mr-2 ">56</span>
                            <sub class="text-h6 font-weight-light">min</sub>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col           
                cols="12"
                md="4"
            >
                <v-card>
                    <v-card-title class="text-h5">Running Jobs</v-card-title>           
                    <v-card-text class="d-flex justify-end black--text">
                        <div>
                            <span class="text-h3 mr-2 ">56</span>
                            <sub class="text-h6 font-weight-light">job</sub>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col           
                cols="12"
                md="4"
            >
                <v-card>
                    <v-card-title class=" d-flex justify-space-between">
                        <span class="text-h5">Node state</span>
                        <span class="subtitle-2">
                            <v-chip
                                label
                            >
                                IDLE :
                                4
                            </v-chip>
                            <v-chip
                                class="mx-2"
                                color="green lighten-2"
                                label
                            >
                                USE :
                                4
                            </v-chip>
                            <v-chip
                                color="primary"
                                label
                            >
                                TOTAL :
                                4
                            </v-chip>
                        </span>
                        </v-card-title>        
                    <v-card-text class="d-flex  black--text">
                        <v-row>
                            <v-col cols="9">
                                <v-progress-linear
                                    color="green darken-2"
                                    background-color="grey lighten-2"
                                    rounded
                                    height="48"
                                    dark
                                    reactive
                                    @click.prevent.self
                                />
                            </v-col>
                            <v-col cols="3" class="text-right">
                                <span class="text-h3  mr-2">20</span>
                                <sub class="text-h6 font-weight-light">%</sub>
                            </v-col>

                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>


export default {

}
</script>

<style>

</style>
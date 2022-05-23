<template>
    <v-container  >
        <h4 class="pa-2 text-h4 font-weight-bold">Ipmi</h4>
        <v-row>
            <v-col
                v-for="(node, index) in state" 
                :key="index"
                cols="12"
                md="3"
            >
                <v-card
                    tile
                >
                    <v-card-title class="text-h5">NODE {{index + 1}}</v-card-title>           
                    <v-card-text class="d-flex justify-end black--text">
                        <v-switch
                            inset
                            v-model="state[index]"
                            readonly
                        />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

export default {
    props:{
        state:Array,
    },  
}
</script>

<style>

</style>
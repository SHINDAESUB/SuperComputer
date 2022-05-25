<template>
    <article>
        <h2 class="py-2 text-h4 font-weight-bold" id="state" >
            Node
        </h2>
        <v-row>
            <v-col
                cols="6"
                md="6"
            >
                <v-card>
                    <v-card-title class="text-h5">CSNOW</v-card-title>         
                    <v-list 
                        subheader
                        two-line
                    >   
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title v-text="'01'"></v-list-item-title>
                                <v-list-item-subtitle v-text="'STATE : '+nodes[0]"></v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-avatar :class="stateColor(nodes[0])"/>
                        </v-list-item>
                        <v-divider/>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title v-text="'02'"></v-list-item-title>
                                <v-list-item-subtitle v-text="'STATE : '+nodes[1]"></v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-avatar :class="stateColor(nodes[1])"/>

                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
            <v-col           
                cols="6"
                md="6"
            >
                <v-card>
                    <v-card-title class="text-h5">THUNDER</v-card-title>         
                    <v-list 
                        subheader
                        two-line
                    >   
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title v-text="'01'"></v-list-item-title>
                                <v-list-item-subtitle v-text="'STATE : '+nodes[2]"></v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-avatar :class="stateColor(nodes[2])"/>
                        </v-list-item>
                        <v-divider/>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title v-text="'02'"></v-list-item-title>
                                <v-list-item-subtitle v-text="'STATE : '+nodes[3]"></v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-avatar :class="stateColor(nodes[3])"/>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    </article>
</template>

<script>
  export default {
    props:{
        nodes:Array,
    },  
    
    methods:{
        stateColor(state){
        let style = ""
        
            switch( state ) {
                case 'IDLE':
                    style ="grey lighten-2"
                break;
                case 'ALLOC':
                    style ="primary"
                break;
                case 'DOWN':
                    style ="red"
                break;
                default:
                    style ="yellow"
                break;
            }
            return style
        }
    }
}
</script>

<style>

</style>
<template>
    <v-fab-transition>
        <v-btn 
            v-show="!hidden"
            bottom 
            right 
            fab 
            fixed 
            dark 
            color="orange darken-1"
            @click="toTop" 
            small
        >
            <v-icon dark>mdi-chevron-up</v-icon>
        </v-btn>
    </v-fab-transition>
</template>


<script>
export default {
    data () {
        return {
            hidden:true 
        }
    },

    mounted(){

        this.scroll();  
    },

    
    methods: {

        toTop(){
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
        },

        scroll() {  
            window.onscroll = () => {
                window.pageYOffset >= 25 ? this.hidden = false : this.hidden = true
            }
        }
    },
}
</script>


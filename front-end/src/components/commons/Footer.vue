<template>
  <v-footer
    color="grey lighten-2 relative"
    width="100%"
        
  >
    <v-card
        color="grey lighten-2"
        flat
        tile
        class="text-center"
        width="100%"
    >
        <v-card-text>
            <v-btn text small :href="`http://www.falinux.com/`" target="_blank" class="ma-1" >
                <v-img src="../../../public/falinux.png" dense  alt="에프에이리눅스"></v-img> 
            </v-btn>

            <v-btn text small :href="`https://www.etri.re.kr/intro.html`" target="_blank" class="ma-1" >
                <v-img src="../../../public/etri.png" dense alt="에트리"></v-img> 
            </v-btn>
        </v-card-text>
    </v-card>
  </v-footer>
</template>
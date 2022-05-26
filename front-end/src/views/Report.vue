<template>
  <section>
    <v-container >
      <h1 class="py-2 text-h3 font-weight-bold" id="node">Report <v-btn icon @click="directory()"> <v-icon>mdi-refresh</v-icon></v-btn></h1>
      
      <Directory
        class="mt-6"
        :folder="folder"
      />

    </v-container>
  </section>
</template>

<script>
import out  from '@/services/out'

import Directory from '@/components/report/Directory.vue'

export default {
  name: 'Report',

  components: {
    Directory
  },

  data () {
    return {
      folder:[], //폴더 HPCG , HPL
    }
  },

  async created() {
    await this.directory()
  },

  methods:{
    async directory(){
        try {
          let result = await out.list()

          this.folder = result
          
        } catch (e) {
          console.error(e)
        }
    }
  }
}
</script>

<style lang="scss">

</style>
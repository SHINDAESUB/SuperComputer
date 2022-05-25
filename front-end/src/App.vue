<template>
  <v-app>
    <v-main class="grey lighten-3">
      <Header/>
      <router-view/>
      <Move/>
      <Footer/>
    </v-main>
  </v-app>
</template>

<script>
import Footer from './components/commons/Footer.vue';
import Header from './components/commons/Header.vue';
import Move from './components/commons/Move.vue';

export default {
  components: { 
    Header,
    Move,
    Footer
  },
  
  name: 'App',

  data: () => ({
     drawer: null
  }),
};
</script>
<style lang="scss">

html,body{
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%
}

#app {
  background-color:#CFD8DC;
  height: 100%;
  width: 100%;
}

html{
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
html::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
}

section{
  position: relative;
  height: 100%;
}

</style>
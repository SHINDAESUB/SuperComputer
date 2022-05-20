<template>
  <v-app>
    <!-- <v-navigation-drawer
      app
      permanent
      expand-on-hover
    >
      <v-list nav>
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/system">
          <v-list-item-icon>
            <v-icon>mdi-chart-line</v-icon>
          </v-list-item-icon>
          <v-list-item-title>System Monitoring</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/node">
          <v-list-item-icon>
            <v-icon>mdi-cog-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Node Control</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/report">
          <v-list-item-icon >
            <v-icon>mdi-file-chart-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Report</v-list-item-title>
        </v-list-item>
        <v-list-item disabled link to="/fru" > 
          <v-list-item-icon>
            <v-icon>mdi-information</v-icon>
          </v-list-item-icon>
          <v-list-item-title>FRU Information</v-list-item-title>
        </v-list-item>
        <v-list-item disabled link to="/remote">
          <v-list-item-icon>
            <v-icon>mdi-remote</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Remote Control</v-list-item-title>
        </v-list-item>
        <v-list-item disabled link to="/image">
          <v-list-item-icon>
            <v-icon>mdi-image</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Image Redirection</v-list-item-title>
        </v-list-item>
        <v-divider/>
        <v-list-item link :href="'http://www.supreme-k.org:30080/ganglia'" target="_blank" >
          <v-list-item-icon>
            <v-img src="../public/ganglia.jpeg" max-height="24px" max-width="24px"/>
          </v-list-item-icon>
          <v-list-item-title>
            Ganglia Monitoring
          </v-list-item-title>
        </v-list-item>
      </v-list>


    </v-navigation-drawer> -->
    <v-main class="grey lighten-2">
      <Header/>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/commons/Header.vue';

export default {
  components: { Header },
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

html  {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
html::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
}


</style>
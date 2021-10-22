<template>
  <v-app>
    <v-navigation-drawer
      app
      permanent
      expand-on-hover

    >
        <v-card 
        
          height="200px"
          class="pl-2 elevation-0">
          <v-card-text class="pl-12">
            로고 이미지
            에트리 이미지
          </v-card-text>
        </v-card>
        
        <v-divider></v-divider>

        <v-list
          nav
        >
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
          <v-list-item link to="/fru"> 
            <v-list-item-icon>
              <v-icon>mdi-file-chart-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>FRU Information</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/remote">
            <v-list-item-icon>
              <v-icon>mdi-file-chart-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Remote Control</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/image">
            <v-list-item-icon>
              <v-icon>mdi-file-chart-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Image Redirection</v-list-item-title>
          </v-list-item>
        </v-list>

    </v-navigation-drawer>
    <v-main class="grey lighten-2">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
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
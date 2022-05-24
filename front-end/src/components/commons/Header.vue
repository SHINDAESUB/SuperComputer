<template>
<header>
    <v-app-bar
        v-if="!$vuetify.breakpoint.mdAndUp"
        app
        flat
        fixed
    >
        <v-app-bar-nav-icon @click="drawer = true" /> <!-- 햄버거 버튼  -->
        <v-app-bar-title 
            class="font-weight-bold"
        >
            Super Computer
        </v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer
        app
        v-model="drawer"
        :permanent="$vuetify.breakpoint.mdAndUp"
    >
        <v-list>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="text-h5 font-weight-bold">
                        Super Computer
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-divider/>
        <v-list
            nav
        >
            <v-list-item-group
                v-model="group"
                active-class="orange--text text--darken-1"
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
                    <v-list-item-icon>
                        <v-icon>mdi-file-chart-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Report</v-list-item-title>
                </v-list-item>

                <v-list-item link disabled to="/fru">
                    <v-list-item-icon>
                        <v-icon>mdi-information</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>FRU Information</v-list-item-title>
                </v-list-item>

                <v-list-item link disabled to="/remote">
                    <v-list-item-icon>
                        <v-icon>mdi-remote</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Remote Control</v-list-item-title>
                </v-list-item>
                
                <v-list-item link disabled to="/image">
                    <v-list-item-icon>
                        <v-icon>mdi-image</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Image Redirection</v-list-item-title>
                </v-list-item>
            </v-list-item-group>
        </v-list>
        <v-divider/>
        <v-list-item link :href="'http://www.supreme-k.org:30080/ganglia'" target="_blank" >
            <v-list-item-icon>
                <v-img src="../../../public/ganglia.jpeg" max-height="24px" max-width="24px"/>
            </v-list-item-icon>
            <v-list-item-title>
                Ganglia Monitoring
            </v-list-item-title>
        </v-list-item>

    </v-navigation-drawer>
</header>

</template>

<script>
export default {
    data: () => ({
        drawer: false,
        group: null,
    }),
}
</script>
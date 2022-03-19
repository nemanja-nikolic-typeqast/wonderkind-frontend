<template>
  <v-container>

    <v-navigation-drawer
        app
        v-model="drawer"
    >

      <v-list nav>
        <side-menu-item
            link="/"
            title="Books"
            icon="mdi-library"
            tooltip="Books page"/>

        <side-menu-item
            link="/authors"
            title="Authors"
            icon="mdi-book-arrow-right-outline"
            tooltip="Authors page"/>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar
        app
        color="brown darken-3"
        dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <div class="d-flex align-center">
        <v-img
            alt="Logo"
            class="shrink mr-2"
            contain
            src="../assets/logo2.png"
            transition="scale-transition"
            width="70"
        />
      </div>

    </v-app-bar>

  </v-container>
</template>

<script>

import SideMenuItem from './SideMenuItem'

export default {
  name: 'MainLayout',
  components: {
    SideMenuItem,
  },
  data () {
    return {
      drawer: false,
    }
  },
}

</script>

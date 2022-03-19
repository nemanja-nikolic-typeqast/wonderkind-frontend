<template>
  <v-app>
    <v-layout fill-height>

      <div>
        <main-layout/>
      </div>

      <v-main class="mb-16">
        <router-view :key="$route.fullPath" class="pr-10 mb-5"/>
      </v-main>

    </v-layout>
  </v-app>
</template>

<script>
import MainLayout from "./components/MainLayout";

export default {
  name: 'App',
  components: {
    MainLayout
  },
  data: () => ({

  }),
}
</script>

<style>
  tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, .03);
  }
</style>

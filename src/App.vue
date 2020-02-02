<template>
  <v-app>
    <v-app-bar app dense>
      <v-btn text :to="{ name: 'transaction' }">
        <span class="mr-2">transaction</span>
      </v-btn>
      <v-btn text :to="{ name: 'inventory' }">
        <span class="mr-2">inventory</span>
      </v-btn>
      <v-btn text :to="{ name: 'historic' }">
        <span class="mr-2">historic</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({
    //
  })
};
</script>

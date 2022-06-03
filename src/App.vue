<template>
  <main-screen />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainScreen from "./components/MainScreen.vue";

export default defineComponent({
  name: "App",
  components: {
    MainScreen,
  },
});
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

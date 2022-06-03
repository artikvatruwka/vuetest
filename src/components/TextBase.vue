<template>
  <p class="text"><slot></slot></p>
</template>

<script lang="ts">
export default {
  name: "TextBase",
  props: { variant: { type: String, default: "body" } },
};
</script>

<style scoped>
.text {
  font-family: "Roboto", sans-serif;
  margin: 0;
}
</style>

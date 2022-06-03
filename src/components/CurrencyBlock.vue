<template>
  <text-base class="currency-block">
    <slot></slot>
  </text-base>
</template>

<script lang="ts">
import TextBase from "./TextBase.vue";
export default {
  components: { TextBase },
  name: "CurrencyBlock",
};
</script>

<style scoped>
.currency-block {
  font-size: 13px;
  display: block;
}
</style>

<template>
  <div class="exchange-block"><slot></slot></div>
</template>

<script lang="ts">
export default { name: "ExchangeBlock" };
</script>

<style scoped>
.exchange-block {
  padding: 16px 8px 8px;
  width: 100%;
  border-radius: 16px;
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.1);
}
</style>

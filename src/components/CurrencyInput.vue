<template>
  <div class="currency-input">
    <label>
      <currency-block>
        {{ name }}
      </currency-block>
    </label>
    <input
      type="number"
      :name="name"
      :value="value"
      @input="(e) => $emit('handle-input', e)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import CurrencyBlock from "./CurrencyBlock.vue";

export default defineComponent({
  components: { CurrencyBlock },
  name: "CurrencyInput",
  props: {
    name: String,
    value: Number,
  },
});
</script>

<style scoped>
.currency-input {
  width: 100%;
  flex: 1;
  flex-direction: column;
  display: flex;
  align-items: flex-start;
}

input {
  display: flex;
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  border: 1.5px solid #aeddb6;
  border-radius: 8px;
  height: 28px;
  font-size: 20px;
}

input[type="number"] {
  -moz-appearance: textfield;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>

<template>
  <div class="currency-exchange-blocks">
    <exchange-block class="exchange-block">
      <currency-input :name="base" @handle-input="handleInput" :value="1" />
    </exchange-block>
    <span class="divider">=</span>
    <exchange-block class="exchange-block">
      <currency-block>{{ target }}</currency-block>
      <text-base class="currency-output">{{ exchangedValue }}</text-base>
    </exchange-block>
  </div>
</template>

<script lang="ts">
import { mapState } from "vuex";
import store from "@/store";
import CurrencyBlock from "./CurrencyBlock.vue";
import CurrencyInput from "./CurrencyInput.vue";
import ExchangeBlock from "./ExchangeBlock.vue";
import TextBase from "./TextBase.vue";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "CurrencyExchange",
  data() {
    return {
      value: 1,
    };
  },
  components: { CurrencyInput, TextBase, ExchangeBlock, CurrencyBlock },

  methods: {
    handleInput(e: InputEvent) {
      let newValue = parseFloat((e.currentTarget as HTMLInputElement).value);
      if (isNaN(newValue)) newValue = 0;
      this.value = newValue;
    },
  },
  props: {
    fiatToCrypto: Boolean,
  },
  computed: {
    ...mapState({
      state: (state) => state,
    }),
    base(): string {
      return this.fiatToCrypto ? store.state.crypto : store.state.fiat;
    },
    target(): string {
      return this.fiatToCrypto ? store.state.fiat : store.state.crypto;
    },
    exchangedValue(): number | string {
      if (!store.getters.getCurrentTickerLoaded) return this.$t("loading");
      if (this.fiatToCrypto)
        return this.value * store.getters.getExchangeRateFiatToCrypto;
      return this.value * store.getters.getExchangeRateCryptoToFiat;
    },
  },
});
</script>

<style scoped>
.currency-exchange-blocks {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  width: 100%;
}
.currency-output {
  display: block;
  max-width: 100%;
  font-size: 20px;
  text-overflow: clip;
  white-space: nowrap;
  overflow: hidden;
}

.divider {
  align-self: center;
}

.exchange-block {
  width: calc(50% - 32px);
  flex-direction: column;
  display: flex;
  align-items: flex-start;
  overflow: hidden;
}
</style>

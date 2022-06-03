<template>
  <main>
    <simple-picker
      @select-item="setLanguage"
      :selected-index="currentLocaleIndex"
      :items="availableLangs"
      :title="$t('changeLangue')"
    />
    <currency-exchange :fiatToCrypto="true" />
    <currency-exchange :fiatToCrypto="false" />
    <simple-picker
      @select-item="setCurrency"
      :selected-index="currentCurrencyIndex"
      :items="availableCurrencies"
      :title="$t('changeCurrency')"
    />
    <simple-picker
      @select-item="setCrypto"
      :selected-index="currentCryptoCurrencyIndex"
      :items="availableCryptoCurrencies"
      :title="$t('changeCrypto')"
    />
    <simple-picker
      @select-item="setRefreshInterval"
      :selected-index="currentIntervalIndex"
      :items="availableIntervals"
      :title="$t('changeRequestFrequency')"
    />
  </main>
</template>

<script lang="ts">
import store from "@/store";
import { defineComponent } from "@vue/runtime-core";
import CurrencyExchange from "./CurrencyExchange.vue";
import SimplePicker from "./SimplePicker.vue";

export default defineComponent({
  name: "MainScreen",
  data() {
    return {
      availableLangs: ["en", "ru"],
      availableCurrencies: ["USD", "EUR"],
      availableCryptoCurrencies: ["BTC", "ETH", "LTC"],
      availableIntervals: ["1", "5", "15", "30", "60"],
    };
  },
  computed: {
    currentLocaleIndex(): number {
      return this.availableLangs.indexOf(this.$i18n?.locale);
    },
    currentCurrencyIndex(): number {
      return this.availableCurrencies.indexOf(store.state.fiat);
    },
    currentCryptoCurrencyIndex(): number {
      return this.availableCryptoCurrencies.indexOf(store.state.crypto);
    },
    currentIntervalIndex(): number {
      console.log(this.availableIntervals.indexOf("5"));
      return this.availableIntervals.indexOf(
        (store.state.updateFrequency / 1000).toString()
      );
    },
  },
  methods: {
    setLanguage(lang: string) {
      this.$i18n.locale = lang;
    },
    setCurrency(currency: string) {
      store.dispatch("setFiat", currency);
    },
    setCrypto(crypto: string) {
      store.dispatch("setCrypto", crypto);
    },
    setRefreshInterval(interval: string) {
      store.dispatch("setUpdateFrequency", Number(interval) * 1000);
    },
  },
  components: { CurrencyExchange, SimplePicker },
});
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 16px;
  max-width: 600px;
  margin: auto;
}
</style>

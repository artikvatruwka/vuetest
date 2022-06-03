<template>
  <main>
    <simple-picker @select-item="1" :items="availableLangs" :title="selectedLang" />
    <currency-exchange :fiatToCrypto="true" />
    <currency-exchange :fiatToCrypto="false" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import CurrencyExchange from "./CurrencyExchange.vue";
export default defineComponent({
  name: "MainScreen",
  data: function () {
    return {
      availableLangs: ["en", "ru"],
      availableCurrencies: ["USD", "EUR"],
      availableCryptoCurrencies: ["BTC", "ETH", "LTC"],
    };
  },
  computed: {
    selectedLang() {
      return $t("langueName");
    },
  },
  methods: {
    setLanguage(lang: string) {
      this.$i18n.locale = lang;
    },
  }
  components: { CurrencyExchange },
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

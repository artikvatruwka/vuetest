import { initKrakenWSConnection, Subscription, TickerData } from "@/api";
import { createStore } from "vuex";

export interface State {
  rates: { [key: string]: TickerData };
  fiat: string;
  crypto: string;
  updateFrequency: number;
  subscriptions: { [key: string]: Subscription };
}

export default createStore<State>({
  state: {
    rates: {},
    fiat: "EUR",
    crypto: "BTC",
    updateFrequency: 5000,
    subscriptions: {},
  },
  getters: {
    getTicker: (state) => state.crypto + "/" + state.fiat,
    getCurrentTickerLoaded: (state) =>
      state.rates[state.crypto + "/" + state.fiat] !== undefined,
    getExchangeRateFiatToCrypto: (state) => {
      const rate = parseFloat(
        state.rates[state.crypto + "/" + state.fiat][1].a[0]
      );
      if (isNaN(rate)) return undefined;
      return rate;
    },
    getExchangeRateCryptoToFiat: (state) => {
      const rate = parseFloat(
        state.rates[state.crypto + "/" + state.fiat][1].a[0]
      );
      if (isNaN(rate)) return undefined;
      return 1 / rate;
    },
  },
  mutations: {
    SET_RATES(state, { rates, ticker }) {
      state.rates[ticker] = rates;
    },
    SET_FIAT(state, fiat) {
      state.fiat = fiat;
    },
    SET_CRYPTO(state, crypto) {
      state.crypto = crypto;
    },
    SET_UPDATE_FREQUENCY(state, updateFrequency) {
      state.updateFrequency = updateFrequency;
    },
    ADD_SUBSCRIPTION(state, { subscription, ticker }) {
      state.subscriptions[ticker] = subscription;
    },
    REMOVE_SUBSCRIPTION(state, ticker) {
      delete state.subscriptions[ticker];
    },
  },
  actions: {
    updateRates({ commit, getters }, value) {
      commit("SET_RATES", { ticker: getters.getTicker, rates: value });
    },
    setFiat({ commit }, fiat) {
      commit("SET_FIAT", fiat);
    },
    setCrypto({ commit }, crypto) {
      commit("SET_CRYPTO", crypto);
    },
    addSubscription({ commit, getters }, value) {
      commit("ADD_SUBSCRIPTION", {
        subscription: value,
        ticker: getters.getTicker,
      });
    },
    removeSubscription({ commit }, value) {
      commit("REMOVE_SUBSCRIPTION", value);
    },
    setUpdateFrequency({ commit }, value) {
      commit("SET_UPDATE_FREQUENCY", value);
    },
  },

  plugins: [initKrakenWSConnection],
});

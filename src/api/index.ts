import { State } from "@/store";
import { Store } from "vuex";

export interface TickerRate {
  a: [string, number, string];
  b: [string, number, string];
  c: [string, string];
  h: [string, string];
  l: [string, string];
  o: [string, string];
  p: [string, string];
  t: [number, number];
  v: [string, string];
}
export type TickerData = [number, TickerRate, string, string];
export interface Subscription {
  channelID: number;
  channelName: string;
  event: string;
  pair: string;
  status: string;
  subscription: {
    name: string;
  };
}

export const initKrakenWSConnection = (store: Store<State>) => {
  const socket = new WebSocket("wss://ws.kraken.com");

  const subscribeToTicker = (ticker: string) => {
    const req = {
      event: "subscribe",
      pair: [ticker],
      subscription: {
        name: "ticker",
        // interval: 5,
      },
    };
    socket.send(JSON.stringify(req));
  };

  const unsubscribeFromTicker = (channelID: number) => {
    const req = {
      event: "unsubscribe",
      channelID,
    };
    socket.send(JSON.stringify(req));
  };

  const tickerEventHandler = (data: string) => {
    const tickerData = JSON.parse(data) as TickerData;
    store.dispatch("updateRates", tickerData);
  };

  socket.onopen = () => {
    subscribeToTicker(store.getters.getTicker);
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const eventType = data.event ?? data[2];
    console.log(eventType, event.data);
    if (eventType === "subscriptionStatus")
      store.dispatch("addSubscription", data);

    if (eventType === "ticker") tickerEventHandler(event.data);
  };

  socket.onerror = (error) => {
    console.log(error);
  };

  let lastTicker = store.getters.getTicker;
  store.subscribe((mutation, state) => {
    if (
      ["SET_CRYPTO", "SET_FIAT", "SET_UPDATE_FREQUENCY"].includes(mutation.type)
    ) {
      unsubscribeFromTicker(state.subscriptions[lastTicker].channelID);
      store.dispatch("removeSubscription", lastTicker);
      subscribeToTicker(store.getters.getTicker);
    }
    lastTicker = store.getters.getTicker;
  });
};

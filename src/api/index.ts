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

  const subscribeToTicker = () => {
    const req = {
      event: "subscribe",
      pair: [`${store.state.crypto}/${store.state.fiat}`],
      subscription: {
        name: "ticker",
      },
    };
    socket.send(JSON.stringify(req));
  };

  const tickerEventHandler = (data: string) => {
    const tickerData = JSON.parse(data) as TickerData;
    store.dispatch("updateRates", tickerData);
  };

  socket.onopen = () => {
    subscribeToTicker();
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const eventType = data.event ?? data[2];

    if (eventType === "subscriptionStatus")
      store.dispatch("addSubscription", data);

    if (eventType === "ticker") tickerEventHandler(event.data);
  };
};

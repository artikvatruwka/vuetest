import { createApp } from "vue";
import App from "./App.vue";
import VueI18n from "vue-i18n";
import store from "./store";
import messages from "./dictionary.json";
const i18n = new VueI18n({
  locale: "en",
  messages,
});
createApp(App).use(store).use(i18n).mount("#app");

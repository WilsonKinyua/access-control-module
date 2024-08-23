import "./assets/scss/index.scss";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);

// Initialize the auth module
store.dispatch("auth/initializeAuth");

app.use(router);
app.use(store);
app.mount("#app");

import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/dist/vuetify.min.css";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
  },
});

createApp(App).use(vuetify).mount("#app");

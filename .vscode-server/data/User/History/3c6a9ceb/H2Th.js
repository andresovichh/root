import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
createApp(App).use(router).mount("#app");

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available throughout your project
createApp.Vue.use(BootstrapVue);
createApp.Vue.use(IconsPlugin);

createApp.Vue.config.productionTip = false;

new createApp.Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
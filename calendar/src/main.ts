import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { VueSvgIcon } from "@yzfe/vue-svgicon";
import "@yzfe/svgicon/lib/svgicon.css";

import ElementUI from "element-ui";
import "@/styles/element-variables.scss";
import "@/styles/index.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faHome, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { faAccusoft } from "@fortawesome/free-brands-svg-icons";
//import {} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.component("svg-icon", VueSvgIcon);

library.add(faHome, faDollarSign);

Vue.component("awesome-icon", FontAwesomeIcon);
Vue.use(ElementUI);

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

// Vue.use(VueSvgIcon, {
//   tagName: "svg-icon",
//   defaultWidth: "1em",
//   defaultHeight: "1em"
// });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");

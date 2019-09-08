import Vue from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMoneyBillAlt,
  faUserInjured,
  faGasPump,
  faCheckCircle,
  faTimesCircle,
  faPlusCircle,
  faPlayCircle,
  faExclamationCircle,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faMoneyBillAlt,
  faUserInjured,
  faGasPump,
  faCheckCircle,
  faTimesCircle,
  faPlusCircle,
  faPlayCircle,
  faExclamationCircle,
  faTrashAlt
);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

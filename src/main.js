import Vue from "vue";
import App from "./App.vue";
import vueNoty from "vuejs-noty";
import "vuejs-noty/dist/vuejs-noty.css";
import VueDisqus from "vue-disqus";
import wysiwyg from "vue-wysiwyg";
import "vue-wysiwyg/dist/vueWysiwyg.css";

import router from "./router";

Vue.use(vueNoty);
Vue.use(VueDisqus);
Vue.use(wysiwyg);
Vue.config.productionTip = false;

const authData = localStorage.getItem("auth");
const user = authData ? JSON.parse(authData) : {};

new Vue({
  router,
  data: {
    auth: user
  },
  render: h => h(App)
}).$mount("#app");

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import bootstrap from 'bootstrap'
import { popper } from '@popperjs/core'

import InfiniteLoading from 'vue-infinite-loading';
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";


Vue.use(VueAxios, axios, bootstrap, popper)
Vue.use(InfiniteLoading, LottieAnimation);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

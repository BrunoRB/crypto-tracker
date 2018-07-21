import Vue from 'vue';
import App from './App.vue';
import VueSelect from 'vue-select';
import router from './routes.js';

Vue.config.productionTip = false;
Vue.component('v-select', VueSelect);

new Vue({
	render: h => h(App),
	router
}).$mount('#app')

require('./bootstrap');

import Vue from 'vue'
import App from './components/App.vue';
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import axios from 'axios';
import {routes} from '../js/routes';
import store from "../js/stores";
// import { extend } from "vee-validate";

window.Vue = require('vue');
// baseRule(extend);

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

const router = new VueRouter({
    mode: 'history',
    routes: routes
});
 
const app = new Vue({
    store,
    el: '#app',
    router: router,
    render: h => h(App),
});
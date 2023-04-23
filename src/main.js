import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueCookies from 'vue3-cookies';

import 'bootstrap/dist/css/bootstrap.css';

import 'bootstrap/dist/js/bootstrap.js';

const app = createApp(App);
app.use(VueCookies);
app.use(store);
app.use(router);
app.mount('#app');

store.dispatch('initializeStore');

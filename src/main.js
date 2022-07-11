import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router.js'
import store from './store/index.js';

import BaseButton from './components/ui/BaseButton.vue'
import PageHeader from './components/ui/PageHeader.vue'

const app = createApp(App);

app.use(router);
app.use(store);

app.component('base-button', BaseButton);
app.component('page-header', PageHeader);

app.mount('#app');

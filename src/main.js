import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { Alert } from 'ant-design-vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"

const app = createApp(App);

const pinia = createPinia();

pinia.use(piniaPluginPersistedState)

app.use(router);
app.use(pinia);
app.use(Alert);
app.mount('#app');

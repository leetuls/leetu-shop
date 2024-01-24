import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { Alert, Table, Popconfirm, Button, Input, Modal, Select, Checkbox, Form } from 'ant-design-vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"

const app = createApp(App);

const pinia = createPinia();

pinia.use(piniaPluginPersistedState)

app.use(router);
app.use(pinia);
app.use(Alert);
app.use(Table);
app.use(Popconfirm);
app.use(Button);
app.use(Input);
app.use(Modal);
app.use(Select);
app.use(Checkbox);
app.use(Form);
app.mount('#app');

import { createRouter, createWebHistory } from 'vue-router';
import home from './home';
import Page404 from './page-not-found';

const routes = [...home, ...Page404];
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
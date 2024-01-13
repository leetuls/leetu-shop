import Content from '../../layouts/frontend/Content.vue';
import Login from '@/pages/frontend/Login.vue';
import Products from '@/pages/frontend/Products.vue';

const home = [
    {
        path: "/",
        name: 'home-page',
        component: Content,
    },
    {
        path: "/login",
        name: 'login-page',
        component: Login,
    },
    {
        path: "/shop",
        name: 'products-page',
        component: Products,
    }
];

export default home;
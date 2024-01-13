import Content from '../../layouts/frontend/Content.vue';
import LoginPage from '@/pages/frontend/LoginPage.vue';
import ProductsPage from '@/pages/frontend/ProductsPage.vue';

const home = [
    {
        path: "/",
        name: 'home-page',
        component: Content,
    },
    {
        path: "/login",
        name: 'login-page',
        component: LoginPage,
    },
    {
        path: "/shop",
        name: 'products-page',
        component: ProductsPage,
    }
];

export default home;
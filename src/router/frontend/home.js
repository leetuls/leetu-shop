import Content from '../../layouts/frontend/Content.vue';
import LoginPage from '@/pages/frontend/LoginPage.vue';
import ProductsPage from '@/pages/frontend/ProductsPage.vue';
import ProductDetailsPage from '@/pages/frontend/ProductDetailsPage.vue';

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
    },
    {
        path: "/product-details",
        name: 'products-detail-page',
        component: ProductDetailsPage,
    }
];

export default home;
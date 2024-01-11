import Content from '../../layouts/frontend/Content.vue';
import Login from '@/pages/frontend/Login.vue';

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
    }
];

export default home;
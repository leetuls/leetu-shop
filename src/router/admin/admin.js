import DashBoard from '@/pages/admin/DashBoard.vue';
import Login from '@/pages/admin/Login.vue';

const admin = [
    {
        path: "/admin",
        name: 'admin-page',
        component: DashBoard,
    },
    {
        path: "/login-admin",
        name: 'login-admin-page',
        component: Login,
    }
];

export default admin;
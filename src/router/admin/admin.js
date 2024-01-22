import DashBoard from '@/pages/admin/DashBoard.vue';
import Login from '@/pages/admin/Login.vue';
import CategoryList from '@/pages/admin/CategoryList.vue';

const admin = [
    {
        path: "/admin",
        name: 'admin-page',
        component: DashBoard
    },
    {
        path: "/login-admin",
        name: 'login-admin-page',
        component: Login
    },
    {
        path: "/admin/category-list",
        name: 'category-list',
        component: CategoryList
    }
];

export default admin;
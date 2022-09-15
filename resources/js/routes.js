const Welcome = () => import('./components/Welcome.vue')
const Login = () => import('./pages/Login/Login.vue')

export const routes = [
    {
        name: 'home',
        path: '/',
        component: Welcome
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
]
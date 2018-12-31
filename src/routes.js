import Auth from './components/Auth.vue'
import User from './components/User.vue'
import Dashboard from './components/Dashboard.vue'
import Portfolio from './components/portfolio/Portfolio.vue'
import Stocks from './components/stocks/Stocks.vue'
import store from './store/store'

export const routes = [
    {
        path: '/',
        component: Auth,
        beforeEnter(to, from, next) {
            const user = store.state.auth.user;
            if (user) {
                next('/user');
            } else {
                next();
            }
        },
    },
    {
        path: '/user',
        component: User,
        children: [
            {path: '', component: Dashboard},
            {path: 'portfolio', component: Portfolio},
            {path: 'stocks', component: Stocks}
        ],
        beforeEnter(to, from, next) {
            const user = store.state.auth.user;
            if (user) {
                next();
            } else {
                next('/');
            }
        },
    },
];
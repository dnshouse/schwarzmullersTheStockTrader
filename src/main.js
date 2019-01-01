import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store/store'

Vue.filter('currency', (value) => {
    return '$' + value.toLocaleString();
});

Vue.filter('error', (message) => {
    if (message !== null) {
        let lower = message.toLowerCase().split('_').join(' ');
        return lower.charAt(0).toUpperCase() + lower.substr(1);
    }
    return null;
});

Vue.use(Vuelidate);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});

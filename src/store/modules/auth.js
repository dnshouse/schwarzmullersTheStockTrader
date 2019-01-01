import axios from '../../axios-auth'
import config from '../../config'
import router from '../../router'

const state = {
    user: null,
    error: null,
};

const mutations = {
    'SET_USER'(state, user) {
        state.user = user;

        const now = new Date();
        const expirationDate = new Date(now.getTime() + (user.expiresIn * 1000));

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userExpiresIn', expirationDate);
    },
    'UNSET_USER'(state) {
        state.user = null;
        localStorage.removeItem('user');
        localStorage.removeItem('userExpiresIn');
        // router.push('/');
    },
    'SET_ERROR'(state, error) {
        state.error = error;
    },
};

const actions = {
    authenticate({commit, dispatch}, data) {
        // try to sign up
        axios.post('signupNewUser?key=' + config.firebase.webApiKey, data)
            .then(response => {
                commit('SET_USER', response.data);
                dispatch('autoLogout', response.data.expiresIn);

                router.push('/user');
            })
            .catch(error => {

                // if the user exists try to sign in
                if (error.response.data.error.message === 'EMAIL_EXISTS') {
                    axios.post('verifyPassword?key=' + config.firebase.webApiKey, data)
                        .then(response => {
                            commit('SET_USER', response.data);
                            dispatch('autoLogout', response.data.expiresIn);

                            router.push('/user');
                        })
                        .catch(error => {
                            commit('SET_ERROR', error.response.data.error.message);
                        });
                } else {
                    commit('SET_ERROR', error.response.data.error.message);
                }

            });
    },
    tryAutoLogin({commit, dispatch}) {
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user){
            return;
        }

        const userExpiresIn = localStorage.getItem('userExpiresIn');
        const now = new Date();
        if(now >= userExpiresIn){
            return;
        }

        commit('SET_USER', user);
        dispatch('autoLogout', user.expiresIn);

        router.push('/user');
    },
    autoLogout({commit}, ttl) {
        setTimeout(() => {
            commit('UNSET_USER');
        }, ttl * 1000);
    },
    logOut({commit}) {
        commit('UNSET_USER');
    }
};

const getters = {
    user(state) {
        return state.user;
    },
    error(state) {
        return state.error;
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}
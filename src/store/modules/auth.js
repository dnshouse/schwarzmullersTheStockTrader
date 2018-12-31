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
        router.push('/user');
    },
    'UNSET_USER'(state) {
        state.user = null;
        router.push('/');
    },
    'SET_ERROR'(state, error) {
        state.error = error;
    },
};

const actions = {
    authenticate({commit}, data) {
        // try to sign up
        axios.post('signupNewUser?key=' + config.firebase.webApiKey, data)
            .then(response => {
                commit('SET_USER', response.data);
            })
            .catch(error => {

                // if the user exists try to sign in
                if (error.response.data.error.message === 'EMAIL_EXISTS') {
                    axios.post('verifyPassword?key=' + config.firebase.webApiKey, data)
                        .then(response => {
                            commit('SET_USER', response.data);
                        })
                        .catch(error => {
                            commit('SET_ERROR', error.response.data.error.message);
                        });
                } else {
                    commit('SET_ERROR', error.response.data.error.message);
                }

            });
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
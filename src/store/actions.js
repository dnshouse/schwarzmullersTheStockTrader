import store from './store';
import axios from '../axios-database'

export const loadData = ({commit}) => {
    const user = store.state.auth.user;
    axios.get(user.localId + '/data.json' + '?auth=' + user.idToken)
        .then(response => {
            const data = response.data;

            const stocks = data.stocks;
            const funds = data.funds;
            const stockPortfolio = data.stockPortfolio;
            const portfolio = {
                stockPortfolio,
                funds
            };

            commit('SET_STOCKS', stocks);
            commit('SET_PORTFOLIO', portfolio);
        })
        .catch(error => console.log(error.response.data));
};
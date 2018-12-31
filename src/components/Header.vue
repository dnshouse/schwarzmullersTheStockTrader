<template>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <router-link class="navbar-brand" to="/user">Stock Trader</router-link>
            </div>

            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <router-link to="/user/portfolio" activeClass="active" tag="li"><a>Portfolio</a></router-link>
                    <router-link to="/user/stocks" activeClass="active" tag="li"><a>Stocks</a></router-link>
                </ul>
                <strong class="navbar-text navbar-right">Your Funds: {{ funds | currency }}</strong>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="#" @click="endDay">End Day</a></li>
                    <li class="dropdown" :class="{open: isDropDownOpen}" @click="isDropDownOpen = !isDropDownOpen">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                           aria-expanded="false">Save & Load <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#" @click="saveData">Save Data</a></li>
                            <li><a href="#" @click="loadData">Load Data</a></li>
                        </ul>
                    </li>
                    <li><a href="#" @click="logOut">Logout</a></li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import {mapActions} from 'vuex'
    import {mapGetters} from 'vuex';

    import axios from '../axios-database'

    export default {
        name: "Header",
        data() {
            return {
                isDropDownOpen: false
            };
        },
        computed: {
            ...mapGetters({
                getUser: 'user',
            }),
            funds() {
                return this.$store.getters.funds;
            }
        },
        methods: {
            ...mapActions({
                randomizeStocks: 'randomizeStocks',
                fetchData: 'loadData',
                doLogOut: 'logOut',
            }),
            endDay() {
                this.randomizeStocks();
            },
            saveData() {
                const data = {
                    funds: this.$store.getters.funds,
                    stockPortfolio: this.$store.getters.stockPortfolio,
                    stocks: this.$store.getters.stocks
                };
                axios.put(this.getUser.localId + '/data.json' + '?auth=' + this.getUser.idToken, data)
                    .then(response => console.log(response.data))
                    .catch(error => console.log(error.response.data));
            },
            loadData() {
                this.fetchData();
            },
            logOut() {
                this.doLogOut();
            }
        }
    }
</script>

<style scoped>

</style>
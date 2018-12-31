<template>
    <div>
        <h1>Trade or View your Portfolio</h1>
        <h6>You may Save & Load your Data</h6>
        <h6>Click on 'End Day' to begin a New Day</h6>
        <hr>
        <p>Your funds: {{ funds | currency }}</p>
        <p>Your token: {{ token }}</p>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "Dashboard",
        computed: {
            ...mapGetters({
                getUser: 'user',
            }),
            funds() {
                return this.$store.getters.funds;
            },
            token() {
                return this.getUser ? this.getUser.idToken : null;
            }
        }
    }
</script>

<style scoped>

</style>
<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: "App",
        created() {
            this.tryAutoLogin();
        },
        methods: {
            ...mapActions({
                tryAutoLogin: 'tryAutoLogin',
            }),
        }
    }
</script>

<style>
    body {
        padding: 30px;
    }
</style>

<template>
    <div class="container">
        <div id="loginbox"
             style="margin-top:50px;"
             class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">

            <div class="panel panel-info">
                <div class="panel-heading">
                    <div class="panel-title">Sign In</div>
                </div>

                <div style="padding-top:30px" class="panel-body">
                    <div v-if="getError" class="alert alert-danger col-sm-12">
                        {{ getError | error }}
                    </div>

                    <form id="loginform" class="form-horizontal" role="form">
                        <div style="margin-bottom: 25px" class="input-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                            <input id="login-username" type="text" class="form-control" name="username" value=""
                                   placeholder="email" v-model="email">
                        </div>
                        <div style="margin-bottom: 25px" class="input-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                            <input id="login-password" type="password" class="form-control" name="password"
                                   placeholder="password" v-model="password">
                        </div>
                        <div style="margin-top:10px" class="form-group">
                            <div class="col-sm-12 controls">
                                <a id="btn-login" class="btn btn-success" @click="authenticate" :disabled="password.length < 6">Login</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import {mapGetters} from 'vuex';

    export default {
        name: "Auth",
        computed: {
            ...mapGetters({
                getUser: 'user',
                getError: 'error',
            }),
        },
        data() {
            return {
                email: '',
                password: '',
            };
        },
        methods: {
            ...mapActions({
                performAuthentication: 'authenticate'
            }),
            authenticate() {
                if(this.password.length > 5){
                    const data = {
                        email: this.email,
                        password: this.password,
                        returnSecureToken: true
                    };

                    this.performAuthentication(data);
                }
            },
        }
    }
</script>

<style scoped>

</style>
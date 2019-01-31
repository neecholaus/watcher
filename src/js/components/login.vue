<template>
    <div>
        <h3 class="mt-2 mb-4 font heebo">Login</h3>
        <form action="/watcher/login" method="POST">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text dark">
                        <i class="fa fa-envelope"></i>
                    </span>
                </div>
                <input type="text"
                       placeholder="Email"
                       class="form-control dark transparent"
                       name="email"
                       autocomplete="off"
                       required />
            </div>

            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text dark"><i class="fa fa-lock"></i></span>
                </div>
                <input type="password"
                       placeholder="Password"
                       class="form-control dark transparent"
                       name="password"
                       required />
            </div>
            <div class="text-right">
                <p class="pull-left mt-4" style="font-size: 13px">Created by Nick Neuman.</p>
                <button type="submit"
                        class="btn btn-dark mt-3 slide-icon">
                    <i class="fa fa-sign-in"></i> Login
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {

            }
        },
        methods: {

        }
    }
</script>

<style>
    #login-con {
        background: url('/public/images/watcher-login.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        min-height: calc(100vh - 56px);
    }

    @media (max-width: 500px) {
        #login-con {
            background-position: right;
        }
    }

    #login-box {
        border-radius: 4px !important;
    }
</style>
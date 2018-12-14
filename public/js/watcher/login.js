let login = new Vue({
    el: '#watcher-login',
    data: function() {
        return {
            username: null,
            password: null
        }
    },
    methods: {
        submit: function() {
            axios.post('/watcher/login', {
                username: this.username,
                password: this.password
            }).then(function(response) {
                if(response.data) {
                    window.location = '/watcher';
                } else {
                    toastr.error('Invalid username or password.');
                    this.username = this.password = null;
                }
            }).catch(function(error) {
                console.log(error);
            });
        }
    }
});
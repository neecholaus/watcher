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
            axios.post('/watcher', {
                username: this.username,
                password: this.password
            }).then(function(response) {
                console.log(response);
            }).catch(function(error) {
                console.log(error);
            });
        }
    }
});
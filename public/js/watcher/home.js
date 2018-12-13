let home = new Vue({
    el: '#watcher-home',
    data: function() {
        return {

        }
    },
    methods: {
        logout: function() {
            axios.post('/watcher/logout').then(function(response) {
                console.log(response);
                if(response.data) {
                    window.location.reload();
                }
            }).catch(function(error) {
                console.log(error);
            });
        }
    }
});
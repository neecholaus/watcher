let home = new Vue({
    el: '#watcher-home',
    data: function() {
        return {
           userId: null
        }
    },
    mounted: function() {
        this.userId = document.getElementById('userId').value;        
    },
    methods: {
        getProperty: function() {
            console.log(this.userId);
        }
    }
});
<template>
    <div class="bg-light p-2 rounded mx-auto" style="max-width:500px;" v-if="imgSrc && capture">
        <p>Taken: <b>{{ capture.taken_at }}</b></p>
        <div class="text-center">
            <img :src="imgSrc" class="img-fluid" />
        </div>
    </div>
    <h5 v-else class="text-center rounded mx-auto p-2 bg-warning text-dark" style="max-width:500px;">
        <h5 class="mb-0"><i class="fa fa-exclamation-triangle"></i> No images could be found.</h5>
    </h5>
</template>

<script>
    export default {
        data: function() {
            return {
                capture: null,
                imgSrc: null
            }
        },
        mounted: function() {
            let self = this;

            // Initial request;
            this.fetchMostRecent();

            // Interval request
            setInterval(function() {
                self.fetchMostRecent();
            }, 2000);
        },
        methods: {
            fetchMostRecent: function() {
                let self = this;
                axios.get('/watcher/most-recent')
                    .then((res) => {
                        self.imgSrc = '/watcher/capture/' + res.data.filename;
                        self.capture = res.data;
                        self.capture.taken_at = self.formatDate(self.capture.taken_at);
                    }).catch((err) => {
                    self.imgSrc = null;
                    self.capture = null;
                });
            },
            formatDate: function(str) {
                let obj = new Date(str);

                return obj.toDateString() + ` ${obj.getHours()}:${obj.getMinutes()}`;
            }
        }
    }
</script>
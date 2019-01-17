<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <div class="p-2 rounded bg-light">
                    <h5 class="font heebo">Find a moment</h5>
                    <select class="form-control" name="time" v-model="specificCaptureFilename">
                        <option selected disabled value="default">Please Select a Time:</option>
                        <option
                                v-for="(time, i) in times"
                                :value="time.filename">{{ formatDate(time.taken_at) }}</option>
                    </select>
                    <hr/>
                    <div class="text-right">
                        <button class="btn btn-secondary"
                                @click="fetchTimes">
                            <i class="fa fa-refresh"
                               v-bind:class="{ 'fa-spin': !times }"></i>
                        </button>
                        <button class="btn btn-warning"
                                @click="specificCaptureSrc = null;">
                            <i class="fa fa-clock-o"></i> Back to Current
                        </button>
                        <button class="btn btn-success"
                                @click="setSpecificCapture(specificCaptureFilename)">Find</button>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <div class="bg-light rounded p-2" v-if="specificCaptureSrc">
                    <!--<p><span class="text-muted">Taken:</span> <b>{{ specificCapture.taken_at }}</b></p>-->
                    <div class="text-center">
                        <img :src="specificCaptureSrc" class="img-fluid" />
                    </div>
                </div>
                <div class="bg-light rounded p-2" v-else-if="currentCaptureSrc && currentCapture">
                    <p><span class="text-muted">Taken:</span> <b>{{ currentCapture.taken_at }}</b></p>
                    <div class="text-center">
                        <img :src="currentCaptureSrc" class="img-fluid" />
                    </div>
                </div>
                <h5 v-else class="text-center rounded mx-auto p-2 bg-warning text-dark" style="max-width:500px;">
                    <h5 class="mb-0"><i class="fa fa-exclamation-triangle"></i> No images could be found.</h5>
                </h5>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                specificCaptureFilename: 'default',
                specificCaptureSrc: null,
                currentCapture: null,
                currentCaptureSrc: null,
                time: null,
                times: null
            }
        },
        mounted: function() {
            let self = this;

            // Get times for selector
            this.fetchTimes();

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
                        self.currentCaptureSrc = '/watcher/capture/' + res.data.filename;
                        self.currentCapture = res.data;
                        self.currentCapture.taken_at = self.formatDate(self.currentCapture.taken_at);
                    }).catch((err) => {
                    self.currentCaptureSrc = null;
                    self.currentCapture = null;
                });
            },
            formatDate: function(str) {
                let meridiem = 'AM'
                let obj = new Date(str);
                let day = obj.toDateString();

                let hour = obj.getHours();
                if(hour > 12) {
                    hour = hour - 12;
                    meridiem = 'PM';
                }

                let minutes = obj.getMinutes();
                if(minutes < 10) minutes = '0' + minutes.toString();

                let seconds = obj.getSeconds();
                if(seconds < 10) seconds = '0' + seconds.toString();

                return `${day} ${hour}:${minutes}:${seconds} ${meridiem}`;
            },
            fetchTimes: function() {
                let self = this;
                this.times = null;
                setTimeout(() => {
                    axios.get('/watcher/times')
                        .then((result) => {
                            self.times = result.data;
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }, 1000);
            },
            setSpecificCapture: function(filename) {
                this.specificCaptureSrc = '/watcher/capture/' + filename;
            }
        }
    }
</script>
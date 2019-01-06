<template>
    <div class="container pt-4">
        <div class="row">
            <div class="col-md-10 col-lg-8 col-xl-6 mx-auto bg-white rounded p-4">
                <h5 class="mt-2 mb-4">Generate invite link</h5>

                <div v-if="token" class="bg-light p-2 mb-4 text-muted rounded">
                    <p class="m-0">https://nickneuman.co/watcher/register?token=<span class="text-success font-weight-bold">{{ token }}</span></p>
                </div>

                <button type="button"
                        class="btn btn-primary"
                        @click="fetchToken">
                    <i :class="generateIcon"></i> {{ token ? 'New' : 'Generate' }}
                </button>

                <button type="button"
                        class="btn btn-primary"
                        @click="copyLink"
                        v-if="token">
                    <i class="fa fa-clipboard"></i> Copy
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                token: null,
                generateIcon: 'fa fa-refresh'
            }
        },
        methods: {
            fetchToken: function() {
                this.token = null;

                axios.post('/watcher/gen-token')
                    .then((res) => {
                        this.token = res.data.token;
                    })
                    .catch((err) => {
                        toastr.error('Token could not be generated.');
                    });
            },
            copyLink: function() {
                let input = document.createElement('input');
                let link = `https://nickneuman.co/watcher/register?token=${this.token}`;

                document.body.appendChild(input);
                input.value = link;
                input.select();
                document.execCommand('copy');
                document.body.removeChild(input);

                toastr.success('Invite link has been copied.');
            }
        }
    }
</script>
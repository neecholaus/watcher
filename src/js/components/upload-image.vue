<template>
    <div class="container pt-4">
        <div class="row">
            <div class="col-md-10 col-lg-8 col-xl-6 mx-auto bg-white rounded p-4">
                <h5 class="mt-2 mb-4">Upload Image</h5>
                <form action="/watcher/upload" method="POST" enctype="multipart/form-data">
                    <input type="hidden" name="taken_at" v-model="taken_at" />
                    <div class="p-2 bg-light my-2">
                        <input type="file" name="file" class="form-control-file" />
                    </div>
                    <button type="submit"
                            class="btn btn-primary">
                        <i class="fa fa-upload"></i> Upload
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                taken_at: new Date()
            }
        },
        methods: {
        }
    }
</script>
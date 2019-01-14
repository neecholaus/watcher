<template>
    <div class="p-2 rounded bg-light">
        <h5 class="font heebo">Find a moment</h5>
        <flat-pickr
                v-model="time"
                class="w-100 form-control"
                placeholder="Click here..."
                :config="timeConfig"></flat-pickr>
    </div>
</template>

<script>
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import 'flatpickr/dist/themes/dark.css';

    export default {
        components: {
            flatPickr
        },
        data: function() {
            return {
                timeConfig: {
                    enableTime: true
                },
                time: null
            }
        },
        methods: {

        }
    }
</script>
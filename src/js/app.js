// Import Bootstrap and dependencies
import 'bootstrap';
import 'popper.js';

// Require jQuery
window.$ = window.jQuery = require('jquery');

// VueJS
window.Vue = require('../../node_modules/vue/dist/vue');

// Require Axios
window.axios = require('../../node_modules/axios/dist/axios.min');

// Components
Vue.component('generate-invite', require('./components/generate-invite.vue').default);
Vue.component('upload-image', require('./components/upload-image.vue').default);
Vue.component('capture-canvas', require('./components/capture-canvas.vue').default);

// Main component
new Vue({el: '#main'});

// Require Toastr Notifications
window.toastr = require('../../node_modules/toastr/toastr');
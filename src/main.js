import Vue from 'vue'
import App from './App.vue'
// import {VueFormBuilderPlugin} from 'v-form-builder'
// import 'v-form-builder/dist/v-form-builder.css' //load CSS from your App
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router'
import ViewForm from "@/ViewForm";
import Dashboard from "@/Dashboard";
import FormBuilder from "@/FormBuilder";

Vue.use(VueRouter)

global.jQuery = require('jquery');
var $ = global.jQuery;
// $.extend(require('jquery-ui'));
$.extend(require('jquery-ui-sortable'));
$.extend(require('formBuilder'));
window.$ = $;
require('formBuilder/dist/form-render.min.js');

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
// install now
// Vue.use(VueFormBuilderPlugin)
Vue.config.productionTip = false

const routes = [
    {
        path: '/',
        component: Dashboard
    },
    {
        path: '/view/:id',
        component: ViewForm
    },
    {
        path: '/builder',
        component: FormBuilder
    }
]

const router = new VueRouter({
    routes: routes
})

new Vue({
    render: h => h(App),
    router
}).$mount('#app')

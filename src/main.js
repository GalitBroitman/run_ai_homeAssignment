import { createApp} from 'vue';

import App from './App.vue';
import * as VueRouter from 'vue-router';
import TabsWrapper from '../components/Tabs/TabsWrapper.vue'
import CompaniesList from '../components/Companies/CompaniesList.vue'
import Tabs from 'vue3-tabs';
//import VueTabs from 'vue-nav-tabs'
//import 'vue-nav-tabs/themes/vue-tabs.css'
//import { VTab } from 'vuetify/lib';



const routes = [
  {  path: '/', component: CompaniesList},
  {  path: '/tabsWrapper/:name', component: TabsWrapper},
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes, // short for `routes: routes`
})



const app = createApp(App);
app.use(router);
app.use(Tabs);
//app.use(VTab);
 app.mount('#app');

// new Vue({
//   render: h => h(app),
// }).$mount('#app')

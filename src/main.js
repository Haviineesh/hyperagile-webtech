import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

import MyNavBar from './components/myNavbar.vue';
import TesterDashboard from './components/myTestCase.vue';
import AdminDashboard from './components/myUser.vue';

// Define routes
const routes = [
  { path: '/tester', component: TesterDashboard, meta: { role: 'tester' } },
  { path: '/admin', component: AdminDashboard, meta: { role: 'admin' } },
];

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Create and mount the app
const app = createApp(App);
app.use(router);
app.use(BootstrapIconsPlugin);
app.component('my-nav-bar', MyNavBar);
app.mount('#app');

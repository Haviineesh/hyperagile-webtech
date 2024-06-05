import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

import TesterDashboard from './components/myTestCase.vue';
import AdminDashboard from './components/myUser.vue';
import MyNavBar from './components/myNavbar.vue';

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
app.component('my-nav-bar', MyNavBar);
app.mount('#app');

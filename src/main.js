import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

import MyLogin from './components/myLogin.vue';
import MyNavBar from './components/myNavbar.vue';
import TesterDashboard from './components/myTestCase.vue';
import AdminDashboard from './components/myUser.vue';
import AddUserForm from './components/myUserAdd.vue';
import EditUserForm from './components/myUserEdit.vue';
import MyNavBar from './components/myNavbar.vue';

// Define routes
const routes = [
  { path: '/', components: MyLogin },
  { path: '/tester', component: TesterDashboard, meta: { role: 'tester' } },
  { path: '/manageuser', component: AdminDashboard, meta: { role: 'admin' } },
  { path: '/adduser', component: AddUserForm, meta: { role: 'admin' } },
  { path: '/edituser', component: EditUserForm, meta: { role: 'admin' } },
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

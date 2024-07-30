import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import AddRole from './components/addRole.vue';
import addTestCase from './components/addTestCase.vue';
import EditRole from './components/editRole.vue';
import editTestCase from './components/editTestCase.vue';
import ForgotPassword from './components/myForgotPassword.vue';
import MyLogin from './components/myLogin.vue';
import MyNavBar from './components/myNavbar.vue';
import myRole from './components/myRole.vue';
import TesterDashboard from './components/myTestCase.vue';
import AdminDashboard from './components/myUser.vue';
import AddUserForm from './components/myUserAdd.vue';
import EditUserForm from './components/myUserEdit.vue';

// Define routes
const routes = [
  { path: '/', component: MyLogin, meta: { hideNavbar: true } },
  {path: '/forgotpassword', component: ForgotPassword, meta: { hideNavbar: true }},
  { path: '/tester', component: TesterDashboard, meta: { role: 'tester' } },
  { path: '/addtest', component: addTestCase, meta:{role :'tester'}},
  { path: '/edittest', component: editTestCase, meta:{role:'tester'}},
  { path: '/manageuser', component: AdminDashboard, meta: { role: 'admin' } },
  { path: '/adduser', component: AddUserForm, meta: { role: 'admin' } },
  { path: '/edituser', component: EditUserForm, meta: { role: 'admin' } },
  { path: '/managerole', component: myRole, meta: { role: 'admin' } },
  { path: '/addrole', component: AddRole, meta: { role: 'admin' } },
  { path: '/editrole/:id', component: EditRole, meta: { role: 'admin' } },
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

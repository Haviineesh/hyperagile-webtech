import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import AddRole from './components/addRole.vue';
import AddTestCase from './components/addTestCase.vue';
import EditRole from './components/editRole.vue';
import EditTestCase from './components/editTestCase.vue';
import ForgotPassword from './components/myForgotPassword.vue';
import MyLogin from './components/myLogin.vue';
import MyNavBar from './components/myNavbar.vue';
import MyRole from './components/myRole.vue';
import TesterDashboard from './components/myTestCase.vue';
import AdminDashboard from './components/myUser.vue';
import AddUserForm from './components/myUserAdd.vue';
import EditUserForm from './components/myUserEdit.vue';

// Define routes
const routes = [
  { path: '/', component: MyLogin, meta: { hideNavbar: true } },
  { path: '/forgotpassword', component: ForgotPassword, meta: { hideNavbar: true } },
  { path: '/tester', component: TesterDashboard, meta: { requiresRole: 'tester' } },
  { path: '/addtest', component: AddTestCase, meta: { requiresRole: 'tester' } },
  { path: '/edittest', component: EditTestCase, meta: { requiresRole: 'tester' } },
  { path: '/manageuser', component: AdminDashboard, meta: { requiresRole: 'admin' } },
  { path: '/adduser', component: AddUserForm, meta: { requiresRole: 'admin' } },
  { path: '/edituser', component: EditUserForm, meta: { requiresRole: 'admin' } },
  { path: '/managerole', component: MyRole, meta: { requiresRole: 'admin' } },
  { path: '/addrole', component: AddRole, meta: { requiresRole: 'admin' } },
  { path: '/editrole/:id', component: EditRole, meta: { requiresRole: 'admin' } },
];

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Route guard for role-based access control
router.beforeEach((to, from, next) => {
  const userRole = localStorage.getItem('userRole') || 'anonymous';

  if (to.meta.requiresRole && to.meta.requiresRole !== userRole) {
    // Redirect to home if user does not have the required role
    next('/');
  } else {
    next();
  }
});

// Create and mount the app
const app = createApp(App);
app.use(router);
app.use(BootstrapIconsPlugin);
app.component('my-nav-bar', MyNavBar);
app.mount('#app');

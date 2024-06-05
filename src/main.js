import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';

import TesterDashboard from './components/TesterDashboard.vue';



const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/tester', component: TesterDashboard },
    
  ]
});

const app = createApp(App)
//
app.use(router)

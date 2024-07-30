<template>
  <div>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">
    <my-nav-bar v-if="!$route.meta.hideNavbar" :userRole="userRole" @logout="logout" />
    <router-view @login="setUserRole" />
    <my-footer />
  </div>
</template>

<script>
import 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

export default {
  data() {
    return {
      userRole: localStorage.getItem('userRole') || 'anonymous'
    };
  },
  methods: {
    setUserRole(role) {
      this.userRole = role;
      localStorage.setItem('userRole', role);
    },
    logout() {
      this.userRole = 'anonymous';
      localStorage.removeItem('userRole');
      this.$router.push('/');
    }
  }
};
</script>

<template>
  <div>
    <my-nav-bar v-if="!$route.meta.hideNavbar" :userRole="userRole" @logout="logout" />
    <router-view @login="setUserRole" />
    <my-footer />
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

export default {
  data() {
    return {
      userRole: localStorage.getItem('userRole')
    };
  },
  methods: {
    setUserRole(role) {
      this.userRole = role;
      localStorage.setItem('userRole', role);
      if (role === 'admin') this.$router.push('/admin');
      if (role === 'tester') this.$router.push('/tester');
      if (role === 'stakeholder') this.$router.push('/stakeholder');
    },
    logout() {
      localStorage.removeItem('userRole');
      this.$router.push('/');
    }
  }
};
</script>

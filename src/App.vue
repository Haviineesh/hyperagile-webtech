<template>
  <div>
    <my-nav-bar :userRole="userRole" @logout="logout" />
    <router-view @login="setUserRole" />
    <my-footer />
  </div>
</template>

<script>

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
      if (role === 'admin') this.$router.push('/admin');
      if (role === 'tester') this.$router.push('/tester');
      if (role === 'stakeholder') this.$router.push('/stakeholder');
    },
    logout() {
      this.userRole = 'anonymous';
      localStorage.removeItem('userRole');
      this.$router.push('/');
    }
  }
};
</script>

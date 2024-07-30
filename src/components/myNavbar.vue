<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Welcome, {{ username }} ({{ userRole }})</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li v-if="userRole === 'tester'" class="nav-item">
            <router-link class="nav-link" to="/tester">Test Cases</router-link>
          </li>
          <li v-if="userRole === 'admin'" class="nav-item">
            <router-link class="nav-link" to="/manageuser">Users</router-link>
          </li>
          <li v-if="userRole === 'admin'" class="nav-item">
            <router-link class="nav-link" to="/managerole">Roles</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'myNavbar',
  data() {
    return {
      username: '',
      userRole: ''
    };
  },
  created() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.username = user.username;
      this.userRole = this.getRoleName(user.roleID);
    }
  },
  methods: {
    getRoleName(roleID) {
      switch (roleID) {
        case 1: return 'admin';
        case 2: return 'tester';
        // Add other roles here
        default: return 'user';
      }
    },
    logout() {
      localStorage.removeItem('user');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
/* Bootstrap styles will handle most of this */
</style>

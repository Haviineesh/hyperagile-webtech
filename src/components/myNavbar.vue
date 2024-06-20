<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Welcome: {{ userRole }}</a>
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
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <!-- v-if="userRole === 'tester'" -->
            <li class="nav-item" >
              <router-link class="nav-link" to="/tester">Tester Dashboard</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/manageuser">Manage User</router-link>
            </li>
            <li class="nav-item">
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
        userRole: 'tester' // For demonstration purposes, replace with your logic
      };
    },
    methods: {
      logout() {
        // Implement logout logic
        console.log('Logging out...');
      }
    }
  };
  </script>
  
  <style scoped>
  /* Bootstrap styles will handle most of this */
  </style>
  
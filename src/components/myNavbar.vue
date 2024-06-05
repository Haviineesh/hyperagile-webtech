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
            <li class="nav-item" v-if="userRole === 'admin'">
              <router-link class="nav-link" to="/admin">Admin Dashboard</router-link>
            </li>
            <li class="nav-item" v-if="userRole === 'tester'">
              <router-link class="nav-link" to="/tester">Tester Dashboard</router-link>
            </li>
            <li class="nav-item" v-if="userRole === 'stakeholder'">
              <router-link class="nav-link" to="/stakeholder">Stakeholder Dashboard</router-link>
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
    name: 'my-nav-bar',
    props: {
      userRole: {
        type: String,
        required: true
      }
    },
    methods: {
      logout() {
        this.$emit('logout');
      }
    }
  };
  </script>
  
  <style scoped>
  .navbar {
    background-color: #f8f9fa;
  }
  
  .nav-link {
    color: #007bff;
  }
  
  .nav-link:hover {
    color: #0056b3;
  }
  </style>
  
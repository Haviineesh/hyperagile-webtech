<template>
    <div class="container mt-5">
      <h2>Add New User</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            class="form-control"
            id="username"
            v-model="newUser.username"
            required
          />
        </div>
  
        <div v-if="usernameExists" class="alert alert-danger" role="alert">
          Username already exists! Please choose a different username.
        </div>
  
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="newUser.email"
            required
          />
        </div>
  
        <div v-if="emailExists" class="alert alert-danger" role="alert">
          Email already exists!
        </div>
  
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="newUser.password"
            readonly
          />
        </div>
  
        <div class="form-group">
          <label for="role">Role</label>
          <select class="form-control" id="role" v-model="newUser.role" required>
            <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
          </select>
        </div>
  
        <button type="submit" class="btn btn-primary">Save User</button>
        <button type="button" class="btn btn-danger" @click="$router.push('/manageuser')">Cancel</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newUser: {
          username: "",
          email: "",
          password: "",
          role: "" // You'll need to provide a default value for role
        },
        usernameExists: false, // Placeholder for username existence check (not implemented)
        emailExists: false, // Placeholder for email existence check (not implemented)
        roles: [ // Replace with your actual roles data
          { id: 1, name: "Admin" },
          { id: 2, name: "User" },
          { id: 3, name: "Editor" }
        ]
      };
    },
    methods: {
      handleSubmit() {
        // You'll need to implement form submission logic here
        console.log("Submitted new user:", this.newUser);
        // Reset form or handle success/error
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>
  
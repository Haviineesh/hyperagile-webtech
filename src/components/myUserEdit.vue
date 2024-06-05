<template>
    <div class="container mt-5">
      <h2>Edit User</h2>
      <form @submit.prevent="handleSubmit">
        <input type="hidden" v-model="user.userID" />
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="user.email"
            required
          />
        </div>
  
        <div v-if="emailExists" class="alert alert-danger" role="alert">
          Email already exists! Please choose a different email.
        </div>
  
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            class="form-control"
            id="username"
            v-model="user.username"
            required
          />
        </div>
  
        <div v-if="usernameExists" class="alert alert-danger" role="alert">
          Username already exists! Please choose a different username.
        </div>
  
        <div class="form-group">
          <label for="role">Role</label>
          <select class="form-control" id="role" v-model="user.roleID" required>
            <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
          </select>
        </div>
  
        <div class="row">
          <div class="col-md-6">
            <button type="submit" class="btn btn-primary float-right" @click="showConfirmUpdate">Update User</button>
          </div>
          <div class="col-md-6">
            <a href="#" class="btn btn-secondary" @click="$router.push('/manageuser')">Back</a>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script>
//   export default {
//     props: {
//       // You'll need to pass the user data as a prop from the parent component
//       user: Object
//     },
//     data() {
//       return {
//         emailExists: false, // Placeholder for email existence check (not implemented)
//         usernameExists: false, // Placeholder for username existence check (not implemented)
//         roles: [
//           { id: 1, name: "Admin" },
//           { id: 2, name: "User" },
//           { id: 3, name: "Editor" }
//         ]
//       };
//     },
//     methods: {
//       handleSubmit() {
//         // You'll need to implement form submission logic here
//         console.log("Submitted updated user:", this.user);
//         // Submit form data or handle success/error
//       },
//       showConfirmUpdate() {
//         if (confirm("Are you sure you want to update this user?")) {
//           this.handleSubmit();
//         }
//       }
//     }
//   };
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>
  
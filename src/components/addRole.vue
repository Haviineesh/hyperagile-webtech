<template>
    <div class="container p-3 mt-3 mb-3 border border-secondary rounded">
      <form @submit.prevent="createRole">
        <div class="mb-3 d-flex justify-content-center">
          <h3>Create New Role</h3>
        </div>
        <p>
          <label class="col-3" for="roleName">Role Name:</label>
          <input type="text" v-model="roleName" id="roleName" placeholder="name" required />
          <!-- <div v-if="roleExists" class="alert alert-danger" role="alert">
            Role Name already exists!
          </div> -->
        </p>
        <p>
          <label class="col-3" for="description">Description:</label>
          <textarea v-model="description" id="description" rows="3"></textarea>
        </p>
        <div class="form-group d-flex justify-content-start">
          <button type="submit" class="btn btn-success">
            Create <i class="bi bi-plus"></i>
          </button>
          <div class="ml-3">
            <button type="button" class="btn btn-danger" @click="cancelCreate">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        roleName: '',
        description: '',
        roleExists: false
      };
    },
    methods: {
      createRole() {
        axios.post('/createrole', {
          roleName: this.roleName,
          description: this.description
        })
        .then(response => {
          // Handle success, maybe redirect to another page
          if(response.data.roleExists) {
            this.roleExists = true;
          } else {
            this.roleExists = false;
            window.location.href = '/manageroles';
          }
        })
        .catch(error => {
          // Handle error
          console.error('Error creating role:', error);
        });
      },
      cancelCreate() {
        // Handle cancel logic here, such as redirecting to another page
        window.location.href = '/manageroles';
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your custom styles here if needed */
  </style>
  
<template>
    <div>
      <div class="container">
        <div class="d-flex justify-content-between">
          <div class="form-group d-flex align-items-end">
            <input
              type="text"
              class="form-control"
              v-model="searchText"
              placeholder="Search User..."
              @input="filterUsers"
            />
          </div>
          <div class="mt-3 mb-3">
            <router-link to="/adduser" class="btn btn-light">
              Add New User <i class="bi bi-plus"></i>
            </router-link>
          </div>
        </div>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">User ID</th>
              <th scope="col">Email</th>
              <th scope="col">Username</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in filteredUsers" :key="user.userID">
              <td>{{ index + 1 }}</td>
              <td>{{ user.userID }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.roleID }}</td>
              <td>
                <router-link :to="'/edituser/' + user.userID" class="btn btn-warning">
                  <i class="bi bi-pencil-square"></i>
                </router-link>
                <button class="btn btn-danger" @click="confirmDelete(user)">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Delete Modal -->
      <div v-if="userToDelete" class="modal fade show d-block" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteModalLabel">Delete Confirmation</h5>
              <button type="button" class="close" @click="userToDelete = null" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to delete user {{ userToDelete.username }} (ID: {{ userToDelete.userID }})?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="userToDelete = null">No</button>
              <button type="button" class="btn btn-danger" @click="deleteUser">Yes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        searchText: '',
        users: [],
        filteredUsers: [],
        userToDelete: null,
      };
    },
    created() {
      this.fetchUsers();
    },
    methods: {
      fetchUsers() {
        axios
          .get('http://localhost:8000/users')
          .then((response) => {
            this.users = response.data;
            this.filteredUsers = this.users;
          })
          .catch((error) => {
            console.error('Error fetching users:', error);
          });
      },
      filterUsers() {
        const query = this.searchText.toLowerCase();
        this.filteredUsers = this.users.filter(
          (user) =>
            user.username.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query)
        );
      },
      confirmDelete(user) {
        this.userToDelete = user;
      },
      deleteUser() {
        axios
          .delete(`http://localhost:8000/users/${this.userToDelete.userID}`)
          .then(() => {
            this.fetchUsers();
            this.userToDelete = null;
          })
          .catch((error) => {
            console.error('Error deleting user:', error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your custom styles here if needed */
  </style>
  
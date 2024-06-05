<template>
    <div class="container mt-5">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          id="searchInput"
          placeholder="Search..."
          v-model="searchText"
        />
      </div>
  
      <div class="mt-3 mb-3 d-flex justify-content-end">
        <a href="/adduser" class="btn btn-light">Add New User <i class="bi bi-plus"></i></a>
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
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ user.userID }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.role }}</td>
            <td>
                <a href="/edituser" class="btn btn-warning btn-sm">Edit</a>
              <button class="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteModalLabel">Delete Confirmation</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to delete this user, {{ deleteUser.username }}?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <a href="#" class="btn btn-danger">Delete</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchText: "",
        users: [
          { userID: 123, email: "user1@example.com", username: "user1", role: "Admin" },
          { userID: 223, email: "user2@example.com", username: "user2", role: "User" },
          { userID: 355, email: "user3@example.com", username: "user3", role: "Editor" }
        ],
        deleteUser: {} // Placeholder for user to be deleted (not used in this example)
      };
    },
    computed: {
      filteredUsers() {
        return this.users.filter(user => user.username.toLowerCase().includes(this.searchText.toLowerCase()));
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>
  
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
          <a href="/adduser" class="btn btn-success">Add New User</a>
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
                  <td>{{ user.roleID }}</td>
                  <td>
                      <a href="/edituser" class="btn btn-warning btn-sm">Edit</a>
                      <button class="btn btn-danger btn-sm" @click="confirmDelete(user)">Delete</button>
                  </td>
              </tr>
          </tbody>
      </table>

      <div v-if="showDeleteModal" class="modal fade show" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true" style="display: block;">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title" id="deleteModalLabel">Delete Confirmation</h5>
                      <button type="button" class="close" @click="closeDeleteModal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div class="modal-body">
                      <p>Are you sure you want to delete this user, {{ deleteUser.username }}?</p>
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" @click="closeDeleteModal">Cancel</button>
                      <button type="button" class="btn btn-danger" @click="deleteUserConfirmed">Delete</button>
                  </div>
              </div>
          </div>
      </div>

      <div v-if="showDeleteModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
      return {
          searchText: "",
          users: [],
          deleteUser: {}, // Placeholder for user to be deleted
          showDeleteModal: false // Control the visibility of the delete modal
      };
  },
  computed: {
      filteredUsers() {
          return this.users.filter(user => user.username.toLowerCase().includes(this.searchText.toLowerCase()));
      }
  },
  methods: {
      fetchData() {
          axios.get('http://localhost:8000/users')
              .then(response => {
                  this.users = response.data;
              })
              .catch(error => {
                  console.error('There was an error!', error);
              });
      },
      confirmDelete(user) {
          this.deleteUser = user;
          this.showDeleteModal = true;
      },
      closeDeleteModal() {
          this.showDeleteModal = false;
      },
      deleteUserConfirmed() {
          axios.delete(`http://localhost/WebTechBackend/api/index.php/users/${this.deleteUser.userID}`)
              .then(() => {
                  this.users = this.users.filter(user => user.userID !== this.deleteUser.userID);
                  this.showDeleteModal = false;
              })
              .catch(error => {
                  console.error('There was an error!', error);
              });
      }
  },
  mounted() {
      this.fetchData();
  }
};
</script>

<style scoped>
/* Add any custom styles here */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}
.modal.fade.show {
  display: block;
}
</style>

<template>
  <div>
    <div class="container">
      <div class="d-flex justify-content-between">
        <div class="form-group d-flex align-items-end">
          <input type="text" class="form-control" v-model="searchQuery" placeholder="Search Role..." @input="filterRoles" />
        </div>
        <div class="mt-3 mb-3">
          <router-link to="/addrole" class="btn btn-light">Create New Role <i class="bi bi-plus"></i></router-link>
        </div>
      </div>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Role ID</th>
            <th scope="col">Role Name</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(role, index) in filteredRoles" :key="role.roleID">
            <td>{{ index + 1 }}</td>
            <td>{{ role.roleID }}</td>
            <td>
              <span v-if="role.roleName.startsWith('ROLE_')">{{ role.roleName.substring(5) }}</span>
              <span v-else>{{ role.roleName }}</span>
            </td>
            <td>{{ role.description }}</td>
            <td>
              <router-link :to="'/editrole/' + role.roleID" class="btn btn-warning">
                <i class="bi bi-pencil-square"></i>
              </router-link>
              <button class="btn btn-danger" @click="confirmDelete(role.roleID)">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Delete Modal -->
    <div v-if="roleToDelete" class="modal fade show d-block" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteModalLabel">Delete Confirmation</h5>
            <button type="button" class="close" @click="roleToDelete = null" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete role {{ roleToDelete.roleName }} (ID: {{ roleToDelete.roleID }})?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="roleToDelete = null">No</button>
            <button type="button" class="btn btn-danger" @click="deleteRole">Yes</button>
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
      searchQuery: '',
      roles: [],
      filteredRoles: [],
      roleToDelete: null
    };
  },
  created() {
    this.fetchRoles();
  },
  methods: {
    fetchRoles() {
      axios.get('http://your-api-endpoint/api.php?action=getUsers')
        .then(response => {
          this.roles = response.data;
          this.filteredRoles = this.roles;
        })
        .catch(error => {
          console.error('Error fetching roles:', error);
        });
    },
    filterRoles() {
      const query = this.searchQuery.toLowerCase();
      this.filteredRoles = this.roles.filter(role =>
        role.roleName.toLowerCase().includes(query) ||
        role.description.toLowerCase().includes(query)
      );
    },
    confirmDelete(roleID) {
      this.roleToDelete = this.roles.find(role => role.roleID === roleID);
    },
    deleteRole() {
      axios.delete(`http://your-api-endpoint/api.php?action=deleteUser&id=${this.roleToDelete.roleID}`)
        .then(() => {// response?
          this.fetchRoles();
          this.roleToDelete = null;
        })
        .catch(error => {
          console.error('Error deleting role:', error);
        });
    }
  }
};
</script>

<style scoped>
/* Add your custom styles here if needed */
</style>

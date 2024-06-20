<template>
    <div>
      <div class="container">
        <div class="d-flex justify-content-between">
          <div class="form-group d-flex align-items-end">
            <input type="text" class="form-control" v-model="searchQuery" placeholder="Search Role..." @input="filterRoles" />
          </div>
          <div class="mt-3 mb-3">
            <a href="/addrole" id="addRole" class="btn btn-light">Create New Role <i class="bi bi-plus"></i></a>
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
                <a class="btn btn-warning" :href="'/editrole/' + role.roleID">
                  <i class="bi bi-pencil-square"></i>
                </a>
                <a class="btn btn-danger" data-toggle="modal" :data-target="'#deleteModal' + role.roleID">
                  <i class="bi bi-trash"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Delete Modal -->
      <div v-for="role in roles" :key="'deleteModal' + role.roleID" :id="'deleteModal' + role.roleID" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteModalLabel">Delete Confirmation</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to delete role {{ role.roleName }} (ID: {{ role.roleID }})?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
              <a :href="'/deleterole/' + role.roleID" class="btn btn-danger">Yes</a>
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
        notificationMessage: '',
        searchQuery: '',
        roles: [
          // Sample data, replace with actual data fetched from API
          { roleID: 1, roleName: 'ROLE_ADMIN', description: 'Administrator role' },
          { roleID: 2, roleName: 'USER', description: 'User role' }
        ],
        filteredRoles: []
      };
    },
    created() {
      // Initialize filteredRoles with all roles initially
      this.filteredRoles = this.roles;
    },
    methods: {
      filterRoles() {
        const query = this.searchQuery.toLowerCase();
        this.filteredRoles = this.roles.filter(role =>
          role.roleName.toLowerCase().includes(query) ||
          role.description.toLowerCase().includes(query)
        );
      }
    }
  };
  </script>
  
  <style>
  /* Add your styles here */
  </style>
  
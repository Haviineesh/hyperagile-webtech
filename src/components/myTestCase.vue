<template>
    <div>
      <button class="btn btn-success mb-3">
        Create New Test Case +
      </button>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Test Case ID</th>
            <th>Test Case Name</th>
            <th>Users</th>
            <th>User Statuses</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>123</td>
            <td>Sample Test Case</td>
            <td>Username</td>
            <td>Username: Status</td>
            <td>
              <button class="btn btn-primary btn-sm">Details</button>
              <button class="btn btn-warning btn-sm">Edit</button>
              <button class="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
          <!-- Repeat the <tr> for each test case -->
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'viewTestCase',
    data() {
      return {
        // Add your data properties here
      };
    },
    methods: {
      // Add your methods here
    }
  };
  </script>
  
  <style scoped>
  .btn-success {
    float: right;
  }
  
  .table {
    width: 100%;
    margin: 0 auto;
  }
  
  .table th,
  .table td {
    text-align: center;
    vertical-align: middle;
  }
  
  .btn-primary {
    margin-right: 5px;
  }
  
  .btn-warning {
    margin-right: 5px;
  }
  
  .btn-danger {
    margin-right: 5px;
  }
  </style>
  
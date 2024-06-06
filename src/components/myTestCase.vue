<template>
  <div class="container mt-5">
    <div class="form-group">
      <input type="text" class="form-control" id="searchInput" placeholder="Search..." v-model="searchText" />
    </div>

    <div class="mt-3 mb-3 d-flex justify-content-end">
      <a href="/addtest" class="btn btn-success">Create New Test Case <i class="bi bi-plus"></i></a>
    </div>

    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Test Case ID</th>
          <th scope="col">Test Case Name</th>
          <th scope="col">Users</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="(test, index) in filteredTest" :key="test.testID">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ test.testID }}</td>
          <td>{{ test.name }}</td>
          <td>{{ test.user }}</td>
          <td>{{ test.status }}</td>
          <td>
            <a href="/edittest" class="btn btn-warning btn-sm">Edit</a>
            <button class="btn btn-danger btn-sm">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteModalLabel">Delete Confirmation</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete this test case, {{ deleteTest.name }}?</p>
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
      test: [
        { testID: 123, name: "abu", user: "user1", status: "Approved" },
        { testID: 223, name: "ali", user: "user2", status: "Approved" },
        { testID: 355, name: "ziz", user: "user3", status: "Pending" }
      ],
      deleteTest: {} // Placeholder for user to be deleted (not used in this example)
    };
  },
  computed: {
      filteredTest() {
        return this.test.filter(test => test.name.toLowerCase().includes(this.searchText.toLowerCase()));
      }
    }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>

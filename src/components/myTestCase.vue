<template>
  <div class="container mt-5">
    <div class="form-group">
      <input type="text" class="form-control" id="searchInput" placeholder="Search..." v-model="searchText" @input="filterTestCases" />
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
        <tr v-for="(test, index) in filteredTestCases" :key="test.testID">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ test.testID }}</td>
          <td>{{ test.name }}</td>
          <td>{{ test.user }}</td>
          <td>{{ test.status }}</td>
          <td>
            <a href="/edittest" class="btn btn-warning btn-sm">Edit</a>
            <button class="btn btn-danger btn-sm" @click="confirmDelete(test.testID)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="testToDelete" class="modal fade show d-block" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteModalLabel">Delete Confirmation</h5>
            <button type="button" class="close" @click="testToDelete = null" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete this test case, {{ testToDelete.name }}?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="testToDelete = null">No</button>
            <button type="button" class="btn btn-danger" @click="deleteTestCase">Yes</button>
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
      testCases: [],
      filteredTestCases: [],
      testToDelete: null
    };
  },
  created() {
    this.fetchTestCases();
  },
  methods: {
    fetchTestCases() {
      axios.get('http://localhost:8000/testcases')
        .then(response => {
          this.testCases = response.data;
          this.filteredTestCases = this.testCases;
        })
        .catch(error => {
          console.error('Error fetching test cases:', error);
        });
    },
    filterTestCases() {
      const query = this.searchText.toLowerCase();
      this.filteredTestCases = this.testCases.filter(test =>
        test.name.toLowerCase().includes(query) ||
        test.user.toLowerCase().includes(query) ||
        test.status.toLowerCase().includes(query)
      );
    },
    confirmDelete(testID) {
      this.testToDelete = this.testCases.find(test => test.testID === testID);
    },
    deleteTestCase() {
      axios.delete(`http://localhost:8000/testcases/${this.testToDelete.testID}`)
        .then(() => {
          this.fetchTestCases();
          this.testToDelete = null;
        })
        .catch(error => {
          console.error('Error deleting test case:', error);
        });
    }
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>

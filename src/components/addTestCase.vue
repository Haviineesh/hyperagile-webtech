<template>
    <div class="container mt-5">
      <h2 class="mb-4">Add Test Case</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="projectId">Projects ID:</label>
          <input type="text" class="form-control" v-model="testCase.projectId" placeholder="Code Test Case" required>
        </div>
        <div class="form-group">
          <label for="smartContractID">Smart Contract ID:</label>
          <input type="number" class="form-control" v-model="testCase.smartContractID" placeholder="Smart Contract ID" required>
        </div>
        <div class="form-group">
          <label for="testCaseName">Test Case Name:</label>
          <input type="text" class="form-control" v-model="testCase.testCaseName" placeholder="Test Case Name" required>
          <!-- Display an alert if the test case name already exists -->
          <div v-if="testCaseNameExists" class="alert alert-danger" role="alert">
            Test Case Name already exists! Please choose a different test case name.
          </div>
        </div>
        <div class="form-group">
          <label for="test_desc">Test Case Description:</label>
          <textarea class="form-control" v-model="testCase.test_desc" rows="3"></textarea>
        </div>
        <div class="form-group">
          <label for="dateCreated">Date Created:</label>
          <input type="date" class="form-control" v-model="testCase.dateCreated" placeholder="Date Created">
        </div>
        <div class="form-group">
          <label for="deadline">Deadline:</label>
          <input type="date" class="form-control" v-model="testCase.deadline" placeholder="Deadline">
          <!-- Display an alert if the deadline is not later than the date created -->
          <div v-if="deadlineInvalid" class="alert alert-danger" role="alert">
            Deadline must be later than the Date Created! Please choose a valid deadline.
          </div>
        </div>
        <div class="form-group">
          <label>Assign Users:</label>
          <div v-for="user in users" :key="user.userID">
            <div v-if="user.userID !== 2000" class="form-check">
              <input type="checkbox" class="form-check-input" :id="'userCheckbox' + user.userID" :value="user.userID" v-model="selectedUsers">
              <label class="form-check-label" :for="'userCheckbox' + user.userID">
                {{ user.username }} ({{ user.roleName.substring(5) }})
              </label>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-between">
          <button type="submit" class="btn btn-success">Create <i class="bi bi-plus"></i></button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        testCase: {
          projectId: '',
          smartContractID: '',
          testCaseName: '',
          test_desc: '',
          dateCreated: '',
          deadline: '',
        },
        users: [
          // Example data, replace with actual data or fetch from API
          { userID: 1, username: 'user1', roleName: 'ROLE_USER' },
          { userID: 2, username: 'user2', roleName: 'ROLE_ADMIN' },
          { userID: 3, username: 'user3', roleName: 'ROLE_USER' },
        ],
        selectedUsers: [],
        testCaseNameExists: false,
        deadlineInvalid: false,
      };
    },
    methods: {
      handleSubmit() {
        // Validate and submit the form
        this.validateForm();
  
        if (!this.testCaseNameExists && !this.deadlineInvalid) {
          console.log('Form submitted:', this.testCase, 'Assigned users:', this.selectedUsers);
          // Submit form to the server or handle as needed
        }
      },
      validateForm() {
        // Example validation logic, replace with actual validation
        this.testCaseNameExists = this.checkIfTestCaseNameExists(this.testCase.testCaseName);
        this.deadlineInvalid = new Date(this.testCase.deadline) <= new Date(this.testCase.dateCreated);
      },
      checkIfTestCaseNameExists(name) {
        // Example check, replace with actual check logic
        const existingTestCaseNames = ['existingTest1', 'existingTest2'];
        return existingTestCaseNames.includes(name);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>
  
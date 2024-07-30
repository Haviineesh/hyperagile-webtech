<template>
  <div class="container mt-5">
    <h2 class="mb-4">Add Test Case</h2>
    <form @submit.prevent="handleSubmit">
      <!-- Other form fields -->
      <div class="form-group">
        <label>Assign Users:</label>
        <div v-for="user in users" :key="user.userID" class="form-check">
          <input type="checkbox" class="form-check-input" :id="'userCheckbox' + user.userID" :value="user.userID" v-model="selectedUsers" />
          <label class="form-check-label" :for="'userCheckbox' + user.userID">
            {{ user.username }} ({{ user.roleName.substring(5) }})
          </label>
        </div>
      </div>
      <!-- Submit and Cancel buttons -->
    </form>
  </div>
</template>

<script>
import axios from 'axios';

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
      users: [],
      selectedUsers: [],
      testCaseNameExists: false,
      deadlineInvalid: false,
    };
  },
  methods: {
    handleSubmit() {
      this.validateForm();

      if (!this.testCaseNameExists && !this.deadlineInvalid) {
        axios.post('http://localhost:8000/testcases', {
          ...this.testCase,
          users: this.selectedUsers,
        })
        .then(response => {
          if (response.data.testCaseExists) {
            this.testCaseNameExists = true;
          } else {
            this.$router.push('/manageTestCases');
          }
        })
        .catch(error => {
          console.error('Error creating test case:', error);
        });
      }
    },
    validateForm() {
      this.testCaseNameExists = this.checkIfTestCaseNameExists(this.testCase.testCaseName);
      this.deadlineInvalid = new Date(this.testCase.deadline) <= new Date(this.testCase.dateCreated);
    },
    checkIfTestCaseNameExists(name) {
      // Replace with actual logic to check if the test case name exists
      const existingTestCaseNames = ['existingTest1', 'existingTest2'];
      return existingTestCaseNames.includes(name);
    },
    cancelCreate() {
      this.$router.push('/manageTestCases');
    },
    fetchUsers() {
      axios.get('http://localhost:8000/users')
        .then(response => {
          this.users = response.data.map(user => ({
            userID: user.userID,
            username: user.username,
            roleName: `ROLE_${user.roleID === 1 ? 'ADMIN' : 'USER'}`
          }));
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>

<template>
  <div class="container p-3 mt-3 mb-3 border border-secondary rounded">
    <form @submit.prevent="submitForm">
      <input type="hidden" v-model="user.userID" />
      <p>
        <label class="col-3" for="editEmail">Email:</label>
        <input type="email" id="editEmail" v-model="user.email" class="form-control" required />
      </p>
      <div v-if="emailExists" class="alert alert-danger" role="alert">
        Email already exists! Please choose a different email.
      </div>
      <p>
        <label class="col-3" for="editUsername">Username:</label>
        <input type="text" id="editUsername" v-model="user.username" class="form-control" required />
      </p>
      <div v-if="usernameExists" class="alert alert-danger" role="alert">
        Username already exists! Please choose a different username.
      </div>
      <p>
        <label class="col-3" for="editRole">Role:</label>
        <select id="editRole" v-model="user.roleID" class="form-control" required>
          <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
        </select>
      </p>
      <div class="form-group d-flex justify-content-start">
        <div class="d-flex justify-content-between">
          <button type="submit" class="btn btn-success">Update User</button>
        </div>
        <div class="ml-3">
          <button type="button" class="btn btn-danger" @click="cancelEdit">Cancel</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        userID: '',
        email: '',
        username: '',
        roleID: ''
      },
      emailExists: false,
      usernameExists: false,
      roles: [],
    };
  },
  methods: {
    async fetchRoles() {
      try {
        const response = await axios.get('http://localhost:8000/roles');
        this.roles = response.data;
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    },
    async submitForm() {
      try {
        await axios.put(`http://localhost:8000/users/${this.user.userID}`, this.user);
        this.$router.push('/manageuser');
      } catch (error) {
        console.error('Error updating user:', error);
        if (error.response && error.response.data) {
          if (error.response.data.error.includes('email')) {
            this.emailExists = true;
          } else if (error.response.data.error.includes('username')) {
            this.usernameExists = true;
          }
        } else if (error.code === 'ERR_NETWORK') {
          alert('Network error: Cannot reach the API endpoint');
        }
      }
    },
    cancelEdit() {
      this.$router.push('/manageuser');
    }
  },
  async created() {
    const userId = this.$route.params.id;
    try {
      const [userResponse, rolesResponse] = await Promise.all([
        axios.get(`http://localhost:8000/users/${userId}`),
        axios.get('http://localhost:8000/roles')
      ]);
      this.user = userResponse.data;
      this.roles = rolesResponse.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
};
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>

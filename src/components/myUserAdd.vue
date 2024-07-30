<template>
  <div class="container p-3 mt-3 mb-3 border border-secondary rounded">
    <form @submit.prevent="handleSubmit">
      <div class="mb-3 d-flex justify-content-center">
        <h3>Add New User</h3>
      </div>
      <div class="mb-3">
        <label class="form-label" for="username">Username:</label>
        <input type="text" v-model="newUser.username" id="username" class="form-control" placeholder="Enter username" required />
      </div>
      <div v-if="usernameExists" class="alert alert-danger" role="alert">
        Username already exists! Please choose a different username.
      </div>
      <div class="mb-3">
        <label class="form-label" for="email">Email:</label>
        <input type="email" v-model="newUser.email" id="email" class="form-control" placeholder="Enter email" required />
      </div>
      <div v-if="emailExists" class="alert alert-danger" role="alert">
        Email already exists!
      </div>
      <div class="mb-3">
        <label class="form-label" for="password">Password:</label>
        <input type="text" :value="maskedPassword" id="password" class="form-control" readonly />
      </div>
      <div class="mb-3">
        <label class="form-label" for="role">Role:</label>
        <select v-model="newUser.role" id="role" class="form-control" required>
          <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
        </select>
      </div>
      <div class="d-flex justify-content-start">
        <button type="submit" class="btn btn-success">
          Save User <i class="bi bi-plus"></i>
        </button>
        <button type="button" class="btn btn-danger ms-3" @click="cancelCreate">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newUser: {
        username: '',
        email: '',
        password: '',
        role: ''
      },
      usernameExists: false,
      emailExists: false,
      roles: [
        { id: 1, name: 'Admin' },
        { id: 2, name: 'Tester' },
      ]
    };
  },
  created() {
    this.newUser.password = this.generatePassword();
  },
  computed: {
    maskedPassword() {
      return this.newUser.password ? '******' : '';
    }
  },
  methods: {
    generatePassword() {
      const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let password = '';
      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
      }
      return password;
    },
    async handleSubmit() {
      try {
        const response = await axios.post('http://localhost:8000/users', this.newUser);
        if (response.data.usernameExists) {
          this.usernameExists = true;
        } else if (response.data.emailExists) {
          this.emailExists = true;
        } else {
          this.usernameExists = false;
          this.emailExists = false;
          this.$router.push('/manageuser');
        }
      } catch (error) {
        console.error('Error creating user:', error);
        if (error.response && error.response.data) {
          if (error.response.data.error.includes('username')) {
            this.usernameExists = true;
          } else if (error.response.data.error.includes('email')) {
            this.emailExists = true;
          }
        } else if (error.code === 'ERR_NETWORK') {
          alert('Network error: Cannot reach the API endpoint');
        }
      }
    },
    cancelCreate() {
      this.$router.push('/manageuser');
    }
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>

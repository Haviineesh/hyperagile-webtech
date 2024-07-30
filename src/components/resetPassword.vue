<template>
    <div class="container-wrapper">
      <div class="container">
        <div class="text-center">
          <a href="/" class="go-back-icon">
            <i class="bi bi-arrow-left"></i>
          </a>
          <h3>
            <i class="fa fa-lock fa-4x"></i>
          </h3>
          <h2 class="text-center">Reset Password</h2>
          <p>Enter your new password below.</p>
  
          <form @submit.prevent="handleSubmit">
            <div class="input-group mb-3">
              <span class="input-group-text">
                <i class="bi bi-lock"></i>
              </span>
              <input
                type="password"
                class="form-control"
                id="newPassword"
                v-model="newPassword"
                placeholder="Enter new password"
                required
                :class="{ 'is-invalid': passwordInvalid }"
              />
              <div v-if="passwordInvalid" class="invalid-feedback">
                Password must be at least 6 characters long.
              </div>
            </div>
  
            <button type="submit" class="btn btn-block" :disabled="loading">
              <span v-if="loading">Resetting...</span>
              <span v-else>Reset Password</span>
            </button>
          </form>
  
          <div v-if="successMessage" class="alert alert-success mt-3" role="alert">
            <p>{{ successMessage }}</p>
          </div>
          <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
            <p>{{ errorMessage }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newPassword: '',
        successMessage: '',
        errorMessage: '',
        loading: false,
        passwordInvalid: false
      };
    },
    methods: {
      async handleSubmit() {
        this.passwordInvalid = !this.validatePassword(this.newPassword);
        if (this.passwordInvalid) return;
  
        this.loading = true;
        const token = this.$route.query.token; // Extract token from query parameters
        try {
          const response = await fetch('/api/resetpassword', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token, newPassword: this.newPassword })
          });
  
          if (!response.ok) {
            throw new Error('Error resetting password');
          }
  
          const data = await response.json();
  
          if (data.success) {
            this.successMessage = 'Password successfully reset. You can now log in with your new password.';
            this.errorMessage = '';
          } else {
            this.errorMessage = 'Error resetting password';
            this.successMessage = '';
          }
        } catch (error) {
          console.error('Error:', error);
          this.errorMessage = 'An error occurred while resetting the password';
          this.successMessage = '';
        } finally {
          this.loading = false;
        }
      },
      validatePassword(password) {
        return password.length >= 6;
      }
    }
  };
  </script>
  
  <style scoped>
  body {
    background-color: white;
    margin: 0;
    padding: 0;
  }
  
  .container-wrapper {
    display: flex;
    justify-content: center;
    position: relative;
  }
  
  .container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-top: 100px;
    max-width: 40%;
  }
  
  .form-control {
    border-radius: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }
  
  .btn {
    background-color: #df20cc;
    color: white;
    border: none;
    width: 100%;
  }
  
  .go-back-icon {
    font-size: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  
  .invalid-feedback {
    display: block;
  }
  </style>
  
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
          <h2 class="text-center">Forgot Password?</h2>
          <p>You can reset your password here.</p>
  
          <form @submit.prevent="handleSubmit">
            <div class="input-group mb-3">
              <span class="input-group-text">
                <i class="bi bi-envelope"></i>
              </span>
              <input
                type="email"
                class="form-control"
                id="userEmail"
                v-model="userEmail"
                placeholder="Enter your email"
                required
              />
            </div>
  
            <button type="submit" class="btn btn-block">Reset Password</button>
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
        userEmail: '',
        successMessage: '',
        errorMessage: ''
      };
    },
    methods: {
      async handleSubmit() {
        try {
          const response = await fetch('/api/forgotpassword', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userEmail: this.userEmail })
          });
  
          if (!response.ok) {
            throw new Error('Error resetting password');
          }
  
          const data = await response.json();
  
          if (data.success) {
            this.successMessage = 'Password reset link sent to your email';
            this.errorMessage = '';
          } else {
            this.errorMessage = 'Error resetting password';
            this.successMessage = '';
          }
        } catch (error) {
          console.error('Error:', error);
          this.errorMessage = 'An error occurred while resetting the password';
          this.successMessage = '';
        }
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
    justify-content: space-between;
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
  </style>
  
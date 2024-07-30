<template>
  <div class="container login-container">
    <h2>Login</h2>
    <div v-if="errorMessage" class="alert alert-danger justify-content-center p-2 rounded">
      {{ errorMessage }}
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          id="username"
          v-model="username"
          placeholder="Username"
          required
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="password"
          placeholder="Password"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary btn-block">Login</button>
      <br />
      <a href="/forgotpassword" class="forgot-password">Forgot Password?</a>
    </form>
    <div class="svg-container">
      <!-- Vector 2 -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 1440 111"
        style="position: absolute; bottom: 0; z-index: 2"
      >
        <path
          fill="#D689E9"
          fill-opacity=".83"
          fill-rule="evenodd"
          d="m0 44.4 48 8.88c48 8.88 144 26.64 240 22.2 96-4.44 192-31.08 288-48.84C672 8.88 768 0 864 0s192 8.88 288 24.42c96 15.54 192 37.74 240 48.84l48 11.1V111H0V44.4Z"
          clip-rule="evenodd"
        />
      </svg>
      <!-- Vector 1 -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 1440 111"
        style="position: absolute; bottom: 0; z-index: 1"
      >
        <path
          fill="#DF20CC"
          fill-rule="evenodd"
          d="m0 0 59.625 4.17c60.75 4.171 180 12.512 300.375 26.628 120.375 14.436 239.625 34.968 360 39.138 120.375 4.17 239.625-8.34 360-12.19 120.38-4.17 239.62 0 300.38 1.924l59.62 1.925V111H0V0Z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await fetch('http://localhost:8000/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const users = await response.json();
        const user = users.find(
          (user) => user.username === this.username && user.password === this.password
        );

        if (user) {
          window.location.href = 'http://localhost:8080/login';
        } else {
          this.errorMessage = 'Incorrect Username or Password!';
        }
      } catch (error) {
        console.error('Error:', error);
        this.errorMessage = 'An error occurred during login';
      }
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
  overflow-x: hidden;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1rem;
}

.form-control {
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.1);
}

.btn {
  background: #df20cc;
  color: white;
  padding: 10px;
  border-radius: 5px;
  border: none;
  width: 100%;
}

.forgot-password {
  display: block;
  text-align: center;
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.svg-container {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1;
}

svg {
  width: 100%;
  height: auto;
}
</style>

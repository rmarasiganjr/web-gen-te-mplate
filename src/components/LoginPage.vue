<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header text-primary text-center">
            <h3>Login</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit" class="mt-3">
              <div class="form-group">
                <label for="email">Email:</label>
                <input
                  id="email"
                  type="email"
                  v-model="email"
                  class="form-control"
                  placeholder="Email"
                  required
                />
                <div v-if="emailError" class="text-danger">
                  {{ emailError }}
                </div>
              </div>
              <div class="form-group mt-3">
                <label for="password">Password:</label>
                <input
                  id="password"
                  type="password"
                  v-model="password"
                  class="form-control"
                  placeholder="Password"
                  required
                />
                <div v-if="passwordError" class="text-danger">
                  {{ passwordError }}
                </div>
              </div>
              <div class="form-group mt-3">
                <button type="submit" class="btn btn-primary w-100">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    };
  },
  methods: {
    validateForm() {
      let isValid = true;

      // Validate email
      const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
      if (!emailRegex.test(this.email)) {
        this.emailError = 'Please enter a valid email address';
        isValid = false;
      } else {
        this.emailError = '';
      }

      // Validate password
      if (this.password.trim() === '') {
        this.passwordError = 'Password cannot be empty';
        isValid = false;
      } else {
        this.passwordError = '';
      }

      return isValid;
    },
    async handleSubmit() {
      if (!this.validateForm()) {
        return;
      }

      try {
        const response = await axios.post('your_api_endpoint', {
          email: this.email,
          password: this.password,
        });

        // Save the token in localStorage or use Vuex state management
        localStorage.setItem('authToken', response.data.token);

        // Redirect to the dashboard
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
  },
};
</script>

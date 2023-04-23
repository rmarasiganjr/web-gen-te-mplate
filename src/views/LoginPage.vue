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
                <div v-if="loginError" class="text-danger mt-3">
                  {{ loginError }}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

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
  computed: {
    loginError() {
      return this.$store.state.loginError;
    },
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
        await this.login({ email: this.email, password: this.password }); // Call the login action
        await this.initializeStore(); // Call the initializeStore action
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
    ...mapActions(['login', 'initializeStore']), // Add the login and initializeStore actions
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <router-link class="navbar-brand" to="/">My Web App</router-link>
      <ul class="navbar-nav ms-auto">
        <li class="nav-item" v-if="!loggedIn">
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
        <li class="nav-item" v-if="loggedIn">
          <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
        </li>
        <li class="nav-item" v-if="loggedIn">
          <button class="btn btn-link nav-link" @click="logout">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  computed: {
    loggedIn() {
      return localStorage.getItem('authToken');
    },
  },
  methods: {
    logout() {
      localStorage.removeItem('authToken');
      this.$router.push('/login');
    },
  },
};
</script>

<style>
.navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
}
</style>

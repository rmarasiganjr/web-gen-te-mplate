// src/store/index.js
import { createStore } from 'vuex';
import axios from 'axios';
import Cookies from 'js-cookie';

import router from '../router';

export default createStore({
  state: {
    authToken: null,
    loginError: null,
  },
  mutations: {
    setAuthToken(state, token) {
      state.authToken = token;
      Cookies.set('authToken', token); // Use Cookies.set() to set the token in cookies
    },
    removeAuthToken(state) {
      state.authToken = null;
      Cookies.remove('authToken'); // Use Cookies.remove() to remove the token from cookies
    },
    setLoginError(state, error) {
      state.loginError = error;
    },
    clearLoginError(state) {
      state.loginError = null;
    },
  },
  actions: {
    async login(context, credentials) {
      const url = 'http://localhost:5000/api/auth/login';
      try {
        const response = await axios.post(url, credentials);

        const token = response.data.token;

        context.commit('setAuthToken', token);
        context.commit('clearLoginError');
        router.push('/dashboard');
      } catch (error) {
        if (error.response && error.response.status === 401) {
          context.commit('setLoginError', 'Invalid username or password');
        } else {
          context.commit('setLoginError', 'An error occurred while logging in');
        }
      }
    },
    initializeStore(context) {
      try {
        const token = Cookies.get('authToken'); // Use Cookies.get() to get the token from cookies
        if (token) {
          context.commit('setAuthToken', token);
        }
      } catch (error) {
        console.error('Error getting auth token from cookies:', error);
      }
    },
  },
});

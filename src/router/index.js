import { createRouter, createWebHistory } from 'vue-router';

// Import your components here
import LandingPage from '../components/LandingPage.vue';
import Login from '../components/LoginPage.vue';
import Dashboard from '../components/DashBoard.vue';

const routes = [
  { path: '/', component: LandingPage },
  { path: '/login', component: Login },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Route guard to check authentication
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('authToken');

  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;

<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <Navbar />
    <div class="flex-grow-1">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/NavBar';
import Footer from './components/AppFooter';

export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>

<!-- Keep the global styles from the previous example -->

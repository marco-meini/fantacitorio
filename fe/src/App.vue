<template>
  <div class="container">
    <img src="@/assets/header.jpg" class="img-fluid" alt="..." />
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link
                :class="{ active: activePage === 'home' }"
                class="nav-link"
                to="/"
                >Home</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                :class="{ active: activePage === 'about' }"
                class="nav-link"
                to="/about"
                >About</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container p-5 text-bg-light">
      <RouterView />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    activePage() {
      return this.$route.name;
    },
  },
};
</script>
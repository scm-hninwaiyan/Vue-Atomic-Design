<template>
  <main>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand" href="#"
          >Bulletin Board</router-link
        >
        <div class="collapse navbar-collapse">
          <div class="navbar-nav">
            <router-link
              exact-active-class="active"
              to="/"
              class="nav-item nav-link"
              >Home</router-link
            >
            <router-link
              v-if="isLoggedIn"
              exact-active-class="active"
              to="/posts"
              class="nav-item nav-link"
              >Posts</router-link
            >
            <router-link
              v-if="isLoggedIn"
              exact-active-class="active"
              to="/users"
              class="nav-item nav-link"
              >Users</router-link
            >
          </div>

          <div class="ml-auto">
            <ul class="nav navbar-nav">
              <router-link
                v-if="!isLoggedIn"
                class="nav-item nav-link"
                :to="{ name: 'login' }"
                >Login</router-link
              >
              <a
                class="nav-item nav-link"
                v-if="isLoggedIn"
                href="#"
                >{{ this.$store.state.auth.user.name }}</a
              >
              <a
                class="nav-item nav-link"
                v-if="isLoggedIn"
                @click.prevent="logout"
                href="#"
                >Logout</a
              >
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <div class="container mt-5">
      <router-view></router-view>
    </div>
  </main>
</template>
 
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },

  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$store.commit("LOGIN", false);
      this.$router.push({ name: "login" });
    },
  },
};
</script>
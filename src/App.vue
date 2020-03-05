<template>
  <div id="app">
    <login v-if="notLoggedIn" />
    <main_component v-else />
  </div>
</template>

<script>
import main_component from "./components/main_component.vue";
import login from "./components/login.vue";
import normalize from "normalize.css"
import { getCookie } from "./helpers.js";

export default {
  name: "app",
  components: {
    main_component,
    login
  },
  data: function() {
    return {
      notLoggedIn: true
    };
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      const access_token = getCookie("access-token");
      access_token != ""
        ? (this.notLoggedIn = false)
        : (this.notLoggedIn = true);
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Fira+Sans&display=swap");

html, body {
  width: 100%;
  height: 100%;
  background: #667db6; /* fallback for old browsers */
  background: -webkit-linear-gradient(115deg, rgb(4, 80, 134), rgb(0, 42, 72));
  background: linear-gradient(115deg, rgb(4, 80, 134), rgb(0, 42, 72));
}

#app {
  font-family: "Fira Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
h1,h2,h3,h4,h5,h6 {
    font-weight: 500;
}
</style>

<template>
  <div id="app">
    <login v-if="notLoggedIn" />
    <main_component v-else />
  </div>
</template>

<script>
import main_component from "./components/main_component.vue";
import login from "./components/login.vue";
import {getCookie} from "./helpers.js";

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
        let access_token = getCookie("access-token");
        access_token != "" ? this.notLoggedIn = false : this.notLoggedIn = true;
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Fira+Sans&display=swap");

#app {
  font-family: "Fira Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  justify-content: center;
}
</style>

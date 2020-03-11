<template>
  <div id="app">
    <login v-if="notLoggedIn" />
    <main_component v-else />
  </div>
</template>

<script>
import main_component from "./components/main_component.vue";
import login from "./components/login.vue";
import normalize from "normalize.css";
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
      this.$forceUpdate();
      const access_token = getCookie("access-token");
      access_token != ""
        ? (this.notLoggedIn = false)
        : (this.notLoggedIn = true);
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,600&display=swap");

body {
  margin: 0;
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
*, ::after, ::before {
    box-sizing: border-box;
}
* {
    outline: none;
}
#app {
  color: #12263f;
  width: 100%;
}



</style>

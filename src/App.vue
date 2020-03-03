<template>
  <div id="app">
    <login v-if="loggedIn" />
    <main_component v-else />
  </div>
</template>

<script>
import main_component from "./components/main_component.vue";
import login from "./components/login.vue";

export default {
  name: "app",
  components: {
    main_component,
    login
  },
  data: function() {
    return {
		loggedIn: false,
    };
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
    	let access_token = this.getCookie("access-token");
     	access_token = (access_token != "") ? this.notLoggedIn = true : this.notLoggedIn = false;
    },
    getCookie(cookie_name) {
      let token_string = cookie_name + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(token_string) == 0) {
          console.log(c.substring(token_string.length, c.length));
          return c.substring(token_string.length, c.length);
        }
      }
      return "";
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  justify-content: center;
}
</style>

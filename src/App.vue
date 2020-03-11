<template>
  <div id="app">
    <login v-if="notLoggedIn" />
    <main_component v-else />
  </div>
</template>

<script>
import main_component from "./components/main_component.vue";
import login from "./components/login.vue";
import { getCookie } from "./helpers.js";
import normalize from "normalize.css";

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
@font-face {
  font-family: "Cerebri Sans";
  src: url(../fonts/Cerebri-Sans/CerebriSans-Light.eot);
  src: url(../fonts/Cerebri-Sans/CerebriSans-Light.ttf);
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: "Cerebri Sans";
  src: url(../fonts/Cerebri-Sans/CerebriSans-Regular.eot);
  src: url(../fonts/Cerebri-Sans/CerebriSans-Regular.ttf);
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: "Cerebri Sans";
  src: url(../fonts/Cerebri-Sans/CerebriSans-Bold.eot);
  src: url(../fonts/Cerebri-Sans/CerebriSans-Bold.ttf);
  font-weight: 700;
  font-style: normal;
}

body {
  margin: 0;
}
body,
* {
  font-family: "Cerebri Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
*,
::after,
::before {
  box-sizing: border-box;
}
* {
  outline: none;
}
#app {
  color: var(--primary-text);
}
h1, h2, h3, h4, h5, h6 {
    font-weight: 500;
}
:root {
    --blue: #2C7BE5;
    --indigo: #727cf5;
    --purple: #6b5eae;
    --pink: #ff679b;
    --red: #E63757;
    --orange: #fd7e14;
    --yellow: #F6C343;
    --green: #00D97E;
    --teal: #02a8b5;
    --cyan: #39afd1;
    --white: #FFFFFF;
    --gray: #95AAC9;
    --gray-dark: #3B506C;
    --primary: #2C7BE5;
    --secondary: #6E84A3;
    --success: #00D97E;
    --info: #39afd1;
    --warning: #F6C343;
    --danger: #E63757;
    --light: #EDF2F9;
    --dark: #12263F;
    --primary-text: #12263f;
    --font-family-sans-serif: "Cerebri Sans",sans-serif;
    --font-family-monospace: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
}

</style>

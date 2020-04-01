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
      const access_token = getCookie("access-token");
      access_token != "" ? (this.notLoggedIn = false) : (this.notLoggedIn = true);
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
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 500;
}
:root {
  --blue: #2c7be5;
  --indigo: #727cf5;
  --purple: #6b5eae;
  --pink: #ff679b;
  --red: #e63757;
  --orange: #fd7e14;
  --yellow: #f6c343;
  --green: #00d97e;
  --teal: #02a8b5;
  --cyan: #39afd1;
  --white: #ffffff;
  --gray: #95aac9;
  --gray-dark: #3b506c;
  --primary: #2c7be5;
  --secondary: #6e84a3;
  --success: #00d97e;
  --info: #39afd1;
  --warning: #f6c343;
  --danger: #e63757;
  --light: #edf2f9;
  --dark: #12263f;
  --primary-text: #12263f;
  --font-family-sans-serif: "Cerebri Sans", sans-serif;
}
</style>

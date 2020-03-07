<template>
  <div class="image-container">
      <a
        v-bind:href="`http://www.strava.com/oauth/authorize?client_id=${clientID}&response_type=code&redirect_uri=http://localhost:8080/exchange_token&approval_prompt=force&scope=profile:read_all,activity:read_all`"
      >
        <button class="btn">Login with Strava</button>
      </a>
  </div>
</template>

<script>
import axios from "axios";
import { getCookie } from "../helpers.js";
import { setCookie } from "../helpers.js";

const queryString = require("query-string");
const authorizationCodeFromUrl = queryString.parse(location.search);

export default {
  name: "login",
  data: function() {
    return {
      clientID: process.env.VUE_APP_CLIENT_ID,
      clientSecret: process.env.VUE_APP_CLIENT_SECRET,
      authCode: authorizationCodeFromUrl.code
    };
  },
  mounted() {
    const access_token = getCookie("access-token");
    if (access_token == "") {
      this.getAccessToken();
    }
  },
  methods: {
    getAccessToken() {
      if (authorizationCodeFromUrl.code) {
        axios
          .post(
            `https://www.strava.com/oauth/token?client_id=${this.clientID}&client_secret=${this.clientSecret}&code=${this.authCode}&grant_type=authorization_code`
          )
          .then(response => {
            setCookie(
              response.data.access_token,
              response.data.refresh_token,
              response.data.expires_at,
              response.data.athlete.id
            );
          })
          .catch(error => {
            this.errored = true;
            return error;
          })
          .finally(() => (this.loading = false));
      }
    },

  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600&display=swap');

.btn {
  border: 1px solid #f52443;
  color: #fff;
  text-align: center;
  line-height: 1.5;
  width: 170px;
  padding: 14px;
  transition: all 0.3s;
  background-color: #f52443;
  cursor: pointer;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  border-radius: 3px;
  white-space: nowrap;
}
.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-image: url("../images/login_background.jpg");
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
}
</style>

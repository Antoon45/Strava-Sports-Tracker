<template>
  <div class="container">
    <div class="login-container">
      <a
        v-bind:href="`http://www.strava.com/oauth/authorize?client_id=${clientID}&response_type=code&redirect_uri=http://localhost:8080/exchange_token&approval_prompt=force&scope=profile:read_all,activity:read_all`"
      >
        <button class="btn">Login with Strava</button>
      </a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
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
    this.getAthlete();
  },
  methods: {
    getAthlete() {
      if (authorizationCodeFromUrl.code) {
        axios
          .post(
            `https://www.strava.com/oauth/token?client_id=${this.clientID}&client_secret=${this.clientSecret}&code=${this.authCode}&grant_type=authorization_code`
          )
          .then(response => {
            this.setCookie(response.data.access_token, response.data.refresh_token, response.data.expires_at);
          })
          .catch(error => {
            this.errored = true;
            return error;
          })
          .finally(() => (this.loading = false));
      }
    },
    setCookie(access_token, refresh_token, expires_at) {
      document.cookie = "access-token" + "=" + access_token + "; expires=" + expires_at;
      document.cookie = "refresh-token" + "=" + refresh_token;
    }
  }
};
</script>

<style scoped>
.btn {
  display: inline-block;
  border: 1px solid #f32c52;
  color: #f32c52;
  text-align: center;
  font-size: 13px;
  line-height: 1.3;
  width: 145px;
  padding: 10px;
  background-color: #fff;
  transition: all 0.3s;
  cursor: pointer;
  font-family: "Open Sans", sans-serif;
  border-radius: 4px;
  white-space: nowrap;
}
.btn:hover {
  background-color: #f32c52;
  color: #fff;
}
.container {
  display: flex;
  align-content: center;
  justify-content: center;
  height: 1100px;
  max-width: 1100px;
}
</style>

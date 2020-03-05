<template>
  <div class="container">
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
            console.log(response.data.athlete);
            this.setCookie(
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
    setCookie(access_token, refresh_token, expires_at, athlete_id) {
      document.cookie =
        "access-token" + "=" + access_token + "; expires=" + expires_at;
      document.cookie = "refresh-token" + "=" + refresh_token;
      document.cookie = "user-id" + "=" + athlete_id;
    }
  }
};
</script>

<style scoped>
.btn {
  border: 1px solid #fff;
  color: #fff;
  text-align: center;
  line-height: 1.5;
  width: 170px;
  padding: 10px;
  transition: all 0.3s;
  background: transparent;
  cursor: pointer;
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
  font-size: 13px;
  border-radius: 4px;
  white-space: nowrap;
  z-index: 1;
}
.btn:hover {
  background: rgba(255, 255, 255, 0.178);
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>

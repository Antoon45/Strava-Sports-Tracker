<template>
  <div class="activity-container">
    <a href="google.com">
      <h3 class="activity-title">Morning run</h3>
      <p>
        <span>3.46km</span>
        <span>6:20/km</span>
        <span>21min 59sec</span>
      </p>
    </a>
  </div>
</template>

<script>
import axios from "axios";
import { getCookie } from "../helpers.js";

export default {
  name: "activities",
  mounted() {
    this.getActivities();
  },
  methods: {
    getActivities() {
      const access_token = getCookie("access-token");
      if (access_token != "") {
        axios
          .get(
            `https://www.strava.com/api/v3/athlete/activities?before=&after=&page=&per_page=" "Authorization: Bearer ${access_token}"`
          )
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            this.errored = true;
            return error;
          })
          .finally(() => (this.loading = false));
      }
    }
  }
};
</script>

<style scoped>
.activity-container {
  width: 100%;
  height: auto;
  padding-left: 5px;
  margin-bottom: 20px;
  border: 1px solid #c1c7d0;
  border-radius: 3px;
}
span {
  padding: 0px 5px 0px 5px;
}
a {
  text-decoration: none;
  color: #2c3e50;
}
a:hover {
    text-decoration: underline;
}
.activity-title {
  letter-spacing: -0.5px;
}
</style>

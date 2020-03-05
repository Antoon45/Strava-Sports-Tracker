<template>
  <div class="container">
    <section class="activities">
      <h1>My activities</h1>
    </section>
    <section class="overview">
      <p>Activity overview</p>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import {getCookie} from "../helpers.js";

export default {
  name: "main_component",
  data: function() {
    return {};
  },
  mounted() {
    this.getAthleteInformation();
  },
  methods: {
    getAthleteInformation() {
      let access_token = getCookie("access-token");
      console.log(access_token);
      if (access_token != "") {
        axios
          .get(
            `https://www.strava.com/api/v3/athlete -H "Authorization: Bearer ${access_token}"`
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
.container {
  display: grid;
  grid-template-columns: 7fr 3fr;
  padding: 5px;
  width: 100%;
  max-width: 1100px;
  border: 0.5px solid rgba(0, 0, 0, 0.37);
}
</style>

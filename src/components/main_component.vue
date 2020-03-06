<template>
  <div class="container">
    <section class="activities">
      <p>{{ athleteInfo.firstname }}</p>
      <h1>Activities</h1>
      <activities />
    </section>
    <section class="overview">
      <p>Activity overview</p>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import activities from "./activities.vue";
import { getCookie } from "../helpers.js";

export default {
  name: "main_component",
  components: {
    activities
  },
  data: function() {
    return {
      athleteInfo: "",
      athleteStats: ""
    };
  },
  mounted() {
    this.getAthleteStats();
    this.getAthleteInfo();
  },
  methods: {
    getAthleteStats() {
      const access_token = getCookie("access-token");
      const athlete_id = getCookie("athlete-id");
      if (access_token != "") {
        axios
          .get(`https://www.strava.com/api/v3/athletes/${athlete_id}/stats`, {
            headers: { Authorization: `Bearer ${access_token}` }
          })
          .then(response => {
            this.athleteStats = response.data;
            //console.log(response.data);
          })
          .catch(error => {
            this.errored = true;
            return error;
          })
          .finally(() => (this.loading = false));
      }
    },
    getAthleteInfo() {
      const access_token = getCookie("access-token");
      const athlete_id = getCookie("athlete-id");
      if (access_token != "") {
        axios
          .get(`https://www.strava.com/api/v3/athlete`, {
            headers: { Authorization: `Bearer ${access_token}` }
          })
          .then(response => {
            this.athleteInfo = response.data;
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
  grid-template-columns: 7fr 4fr;
  padding: 5px;
  height: 100%;
  width: 100%;
  max-width: 1100px;
  background-color: #fff;
}
</style>

<template>
  <div id="profile-section">
    <div class="upper-section">
      <div class="profile-image">
        <img
          src="https://dgalywyr863hv.cloudfront.net/pictures/athletes/47781692/13759841/1/large.jpg "
          alt
        />
      </div>
      <div class="profile-info">
        <h3>
          <b>
            {{ athleteInfo.firstname }}
            {{ athleteInfo.lastname }}
          </b>
        </h3>
        <p>
          {{ athleteInfo.follower_count }} |
          {{ athleteInfo.friend_count }}
        </p>
        <p>{{ athleteInfo.city }}, {{ athleteInfo.state }}, {{ athleteInfo.country }}</p>
        <p>Shoes: {{ athleteInfo.shoes[{name}] }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getCookie } from "../helpers.js";

export default {
  name: "profile",
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
</style>

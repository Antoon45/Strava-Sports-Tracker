<template>
  <div class="upper-section">

      <img :src="athleteInfo.profile" alt="profile_picture" />
    <h2 class="card-title">
      <span class="left-border"></span>
      {{ athleteInfo.firstname }}
      {{ athleteInfo.lastname }}
    </h2>
    <div class="profile-information">
      <p>
        {{ athleteInfo.follower_count }} |
        {{ athleteInfo.friend_count }}
      </p>
      <p>{{ athleteInfo.city }}, {{ athleteInfo.state }}, {{ athleteInfo.country }}</p>
      <p>Shoes: {{ athleteInfo.shoes[0] ? athleteInfo.shoes[0].name : 'No shoes' }}</p>
      <p>Weight: {{ athleteInfo.weight }}</p>
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

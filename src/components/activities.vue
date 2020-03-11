<template>
  <div class="activity-container">
    <div v-for="activity in activityList" :key="activity.id" class="activity">
      <h3>{{ activity.name }}</h3>
      <p v-if="activity.type === 'Run'">
        <span>{{ getDistance(activity.distance) }} km</span>
        <span>{{ Math.floor(activity.elapsed_time / 60) }}min</span>
        <span>{{ getSpeedPerKilometer(activity.average_speed) }}/km</span>
      </p>
      <p v-if="activity.type === 'Workout'">
        <span>{{ Math.floor(activity.elapsed_time / 60) }}min</span>
        <span>{{ activity.calories }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {
  getCookie,
  calcDistance,
  calcMinutesPerKilometer
} from "../helpers.js";

export default {
  name: "activities",
  data: function() {
    return {
      activityList: ""
    };
  },
  mounted() {
    this.getActivities();
  },
  methods: {
    getDistance(distance) {
      return calcDistance(distance);
    },
    getSpeedPerKilometer(speedPerKilometer) {
      return calcMinutesPerKilometer(speedPerKilometer);
    },
    getActivities() {
      const access_token = getCookie("access-token");
      const athlete_id = getCookie("athlete-id");
      if (access_token != "") {
        axios
          .get(`https://www.strava.com/api/v3/athlete/activities`, {
            headers: { Authorization: `Bearer ${access_token}` }
          })
          .then(response => {
            this.activityList = response.data;
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
  overflow: scroll;
  overflow-x: hidden;
  height: 100vh;
    flex: 1 1 auto;
  padding: 1.25rem;
}

.activity {
  flex: 1 1 auto;
  padding: 1.25rem;
  height: auto;
  margin-bottom: 20px;
  border: 1px solid #e3ebf6;
}
h3 {
  font-weight: 600;
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
</style>

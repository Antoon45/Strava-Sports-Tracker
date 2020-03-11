<template>
  <div>
      <div v-for="activity in activityList" :key="activity.id" class="activity-container">
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
  width: 85%;
  height: 60%;
  padding-left: 10px;
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.0625);
  border-radius: 3px;
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
.activity-title {
  letter-spacing: -0.5px;
}
</style>

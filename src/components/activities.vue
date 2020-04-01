<template>
  <div class="activity-container">
    <div v-for="activity in activityList" :key="activity.id" class="activity">
      <h3>{{ activity.name }}</h3>
      <p v-if="activity.type === 'Run'">
        <span>{{ getDistance(activity.distance) }} km</span>
        <span>{{ Math.floor(activity.elapsed_time / 60) }}min</span>
        <span>{{ getSpeedPerKilometer(activity.moving_time, activity.distance) }}/km</span>
        <span>Average {{ activity.average_heartrate }}bpm</span>
      </p>
      <p v-if="activity.type === 'Workout'">
        <span>{{ Math.floor(activity.elapsed_time / 60) }}min</span>
        <span>Max {{ activity.max_heartrate }}bpm</span>
        <span>Average {{ activity.average_heartrate }}bpm</span>
      </p>
      <textarea id="test" cols="30" rows="10" v-html="JSON.stringify(activity, null, 2)"></textarea>
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
    getSpeedPerKilometer(time, distance) {
      return calcMinutesPerKilometer(time, distance);
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
  height: 60vh;
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
span:first-child {
    border-right: 1px solid gray;

}
span:last-child {
    border-left: 1px solid gray;

}
a {
  text-decoration: none;
  color: #2c3e50;
}
a:hover {
  text-decoration: underline;
}
</style>

<template>
  <div>
    <div v-for="activity in activityList" :key="activity" class="activity-container">
      <h3>{{ activity.name }}</h3>
      <p v-if="activity.type === 'Run'">
        <span>{{ Math.round((activity.distance / 1000) * 100) / 100 }} km</span>
        <span>{{ Math.floor(activity.elapsed_time / 60) }}min</span>
        <span>{{ Math.round(Math.pow(activity.average_speed, 2) * 100) / 100 }}/km</span>
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
import { getCookie } from "../helpers.js";

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

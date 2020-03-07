<template>
  <div class="container">
    <section class="profile">
        <profile />
    </section>
    <section class="activities">
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
import profile from "./profile.vue";
import { getCookie } from "../helpers.js";

export default {
  name: "main_component",
  components: {
    profile,
    activities
  }
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 4fr 4fr;
  height: 100%;
  width: 100%;
  background-color: #f9fafb;
}
section {
  overflow: hidden;
}
.profile {
    background-color: #fff;
    border-right: 1px solid rgba(0, 0, 0, 0.0625);
}
</style>

<template>
  <div class="container">
    <div class="container-wrap">
      <div class="row">
        <div class="title">Username</div>
      </div>
      <div class="row">
        <div class="column stats">
          <div class="card">
            <div class="card-body">
              <div class="flex">test</div>
            </div>
          </div>
        </div>
        <div class="column stats">
          <div class="card">
            <div class="card-body">
              <div class="flex">test</div>
            </div>
          </div>
        </div>
        <div class="column stats">
          <div class="card">
            <div class="card-body">
              <div class="flex">test</div>
            </div>
          </div>
        </div>
        <div class="column stats">
          <div class="card">
            <div class="card-body">
              <div class="flex">test</div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="column activities">
          <div class="card">
            <div class="card-body">
              <div class="d-flex">
                <h2 class="card-title">
                  <span class="left-border"></span>
                  Workouts
                </h2>
              </div>
            </div>
            <activities />
          </div>
        </div>
        <div class="column profile">
          <div class="card">
            <div class="card-body">
              <profile />
            </div>
          </div>
        </div>
      </div>
    </div>
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

<style>
.container {
  padding-top: 125px;
  background: #f4f6f9;
  position: relative;
  min-height: 1290px;
}
.title {
  margin-bottom: 20px;
  padding-left: 15px;
}
.activities {
  flex: 0 0 75%;
  max-width: 75%;
  height: 100%;
}
.profile,
.stats {
  flex: 0 0 25%;
  max-width: 25%;
}
.container-wrap {
  padding: 25px 15px;
  max-width: 1280px;
  margin: 0 auto;
  position: relative;
}
.d-flex {
  display: -ms-flexbox !important;
  display: flex !important;
}
.card-title {
  margin-bottom: 5px;
  position: relative;
}
.left-border {
  width: 2px;
  background: var(--primary);
  height: 30px;
  margin-left: -20px;
  margin-right: 18px;
  display: inline-block;
  vertical-align: middle;
}
.row {
  display: flex;
  flex-wrap: wrap;
  padding-right: -15px;
  padding-left: -15px;
}
.column {
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
}
.card {
  position: relative;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid #edf2f9;
}
.card-body {
  flex: 1 1 auto;
  padding: 1.25rem;
}
</style>

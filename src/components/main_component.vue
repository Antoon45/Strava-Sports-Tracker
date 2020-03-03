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
export default {
  name: "main_component"
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

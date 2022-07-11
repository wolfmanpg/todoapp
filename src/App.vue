<template>
  <the-navigation></the-navigation>
  <main class="p-5 lg:p-10">
    <div class="mt-7">
      <router-view></router-view>
    </div>
  </main>
</template>

<script>
import TheNavigation from "./components/TheNavigation.vue";

export default {
  components: {
    TheNavigation,
  },
  name: "App",
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300&family=Nunito&family=Poppins:wght@300&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Montserrat", sans-serif;
  font-family: "Nunito", sans-serif;
  font-family: "Poppins", sans-serif;
}
</style>

<template>
  <div>
    <Navbar/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  name: "app",
  components: {
    Navbar
  }
};
</script>

<style>
* {
  font-family: "Open Sans", sans-serif;
}
body {
  background-color: #f1f1f1;
}
</style>

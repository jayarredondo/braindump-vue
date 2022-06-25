<script setup>
import NavBar from "./components/layout/NavBar.vue";
</script>

<template>
  <NavBar />
  <div class="container is-max-desktop px-2 py-4">
    <router-view></router-view>
  </div>
</template>
<style>
@import "bulma/css/bulma.min.css";
</style>
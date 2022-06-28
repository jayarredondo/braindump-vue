<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "./stores/authStore";
import NavBar from "./components/layout/NavBar.vue";
const authStore = useAuthStore();

// mounted
onMounted(() => {
  authStore.init();
})

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
<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useAuthStore } from "../../stores/authStore";

const authStore = useAuthStore();
const navBarMenuRef = ref(null);
const showMobileNav = ref(false);
const navbarBurger = ref(null);

// https://vueuse.org/core/onClickOutside/
onClickOutside(
  navBarMenuRef,
  (event) => {
    showMobileNav.value = false;
  },
  { ignore: [navbarBurger] }
);

const logout = () => {
  showMobileNav.value = false;
  authStore.logoutUser();
}

</script>
<template>
  <nav class="navbar is-success" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop px-2">
      <div class="navbar-brand">
        <div class="navbar-item is-size-4 is-family-monospace">BrainDump</div>

        <a
          role="button"
          @click.prevent="showMobileNav = !showMobileNav"
          class="navbar-burger"
          :class="{ 'is-active': showMobileNav }"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          ref="navbarBurger"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        id="navbarBasicExample"
        ref="navBarMenuRef"
        class="navbar-menu"
        :class="{ 'is-active': showMobileNav }"
      >
        <div class="navbar-start">
          <button
            v-if="authStore.user.id"
            class="button is-small is-info mt-3 ml-3"
            @click="logout"
          >
            Logout {{authStore.user.email}}
          </button>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <router-link
              @click="showMobileNav = false"
              class="navbar-item"
              active-class="is-active"
              to="/"
              >Notes</router-link
            >
            <router-link
              @click="showMobileNav = false"
              class="navbar-item"
              active-class="is-active"
              to="/stats"
              >Stats</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<style>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>
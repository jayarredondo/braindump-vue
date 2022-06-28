import { createRouter, createWebHashHistory } from "vue-router";

import ViewAuth from '../views/ViewAuth.vue';
import ViewNotes from "../views/ViewNotes.vue";
import ViewStats from "../views/ViewStats.vue";
import ViewEditNotes from '../views/ViewEditNotes.vue';
import {useAuthStore} from '../stores/authStore.js';
const routes = [
  {
    path: "/",
    name: "notes",
    component: ViewNotes,
  },
  {
    path: "/stats",
    name: "stats",
    component: ViewStats,
  },
  {
    path: "/edit/notes/:id",
    name: "edit-note",
    component: ViewEditNotes,
  },
  {
    path: "/auth",
    name: "auth",
    component: ViewAuth
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// Navigation Guards
router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  if (!authStore.user.id && to.name !== 'auth') {
    return { name: 'auth' }
  }
  if(authStore.user.id && to.name === 'auth') {
    // to prevent the user from leaving the page they're on.
    // in our case, we prevent users from visiting the auth page from the current page they're on.
    return false;
  }
})

export default router;

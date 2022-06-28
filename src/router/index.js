import { createRouter, createWebHashHistory } from "vue-router";

import ViewAuth from '../views/ViewAuth.vue';
import ViewNotes from "../views/ViewNotes.vue";
import ViewStats from "../views/ViewStats.vue";
import ViewEditNotes from '../views/ViewEditNotes.vue';

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

export default router;

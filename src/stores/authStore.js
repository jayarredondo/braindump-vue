import { defineStore } from "pinia";
import { auth } from "../js/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";
import { useNotesStore } from "./notesStore";

export const useAuthStore = defineStore("authStore", {
  state: () => {
    return {
      // state
      user: {}
    };
  },
  actions: {
    // actions
    registerUser(credsObj) {
      // https://firebase.google.com/docs/auth/web/start?hl=en&authuser=0#sign_up_new_users
      createUserWithEmailAndPassword(auth, credsObj.email, credsObj.password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((err) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    },
    logoutUser() {
      signOut(auth).then(() => {
        console.log("User signed out");
      });
    },
    loginUser(credsObj) {
      signInWithEmailAndPassword(auth, credsObj.email, credsObj.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User has logged in: ", user);
        })
        .catch((err) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    },
    init() {
      const notesStore = useNotesStore();
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              this.user.id = user.uid;
              this.user.email = user.email;
              this.router.push("/");
              notesStore.init();
            } else {
              // User is signed out
              this.user = {};
              // .replace(URL);
              // users history get's replaced so they can't go back
              this.router.replace("/auth")
              notesStore.clearNotes();
            }
          });
    }
  },
  getters: {
    // getters
  },
});

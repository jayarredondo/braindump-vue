<script setup>
import { ref } from "@vue/reactivity";
import Note from "../components/Notes/Note.vue";
const newNote = ref("");
const newNoteRef = ref(null);
const notes = ref([
  {
    id: 1,
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa saepe reprehenderit impedit fugiat provident id soluta consequatur deserunt quam libero.",
  },
  {
    id: 2,
    content: "This is a shorter note for demo purposes.",
  },
]);

const addNote = () => {
  const id = new Date().getTime().toString();
  const note = {
    id,
    content: newNote.value,
  };
  notes.value.unshift(note);
  newNote.value = "";
  newNoteRef.value.focus();
};
</script>
<template>
  <div class="notes">
    <div class="card has-background-success-dark p-4 mb-5">
      <div class="field">
        <div class="control">
          <textarea
            class="textarea"
            placeholder="Add a new note"
            v-model="newNote"
            ref="newNoteRef"
          ></textarea>
        </div>
      </div>
      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button
            class="button is-link has-background-success"
            :disabled="!newNote"
            @click="addNote"
          >
            Add New Note
          </button>
        </div>
      </div>
    </div>
    <Note v-for="note in notes" :key="note.id" :note="note" />
  </div>
</template>
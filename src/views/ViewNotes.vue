<script setup>
import { ref } from "@vue/reactivity";
import Note from "../components/Notes/SingleNote.vue";
import AddEditNoteVue from "../components/Notes/AddEditNote.vue";
import { useNotesStore } from "../stores/notesStore.js";

const newNote = ref("");
const addEditNoteRef = ref(null)
const notesStore = useNotesStore();

const addNote = () => {
  notesStore.addNote(newNote.value);
  newNote.value = "";
  addEditNoteRef.value.focusTextarea()
};
</script>
<template>
  <div class="notes">
    <AddEditNoteVue v-model="newNote" ref="addEditNoteRef" placeholder="Add a new note">
      <template #buttons>
        <button
          class="button is-link has-background-success"
          :disabled="!newNote"
          @click="addNote"
        >
          Add New Note
        </button>
      </template>
    </AddEditNoteVue>
    <Note v-for="note in notesStore.notes" :key="note.id" :note="note" />
  </div>
</template>
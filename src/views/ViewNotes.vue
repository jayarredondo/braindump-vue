<script setup>
import { ref } from "vue";
import Note from "../components/Notes/SingleNote.vue";
import AddEditNote from "../components/Notes/AddEditNote.vue";
import { useNotesStore } from "../stores/notesStore.js";
import { useWatchCharacters } from "../use/useWatchCharacters.js";
const newNote = ref("");
const addEditNoteRef = ref(null);
const notesStore = useNotesStore();

const addNote = () => {
  notesStore.addNote(newNote.value);
  newNote.value = "";
  addEditNoteRef.value.focusTextarea();
};

useWatchCharacters(newNote, 150);
</script>
<template>
  <div class="notes">
    <AddEditNote
      v-model="newNote"
      ref="addEditNoteRef"
      placeholder="Add a new note"
    >
      <template #buttons>
        <button
          class="button is-link has-background-success"
          :disabled="!newNote"
          @click="addNote"
        >
          Add New Note
        </button>
      </template>
    </AddEditNote>
    <progress
      v-if="!notesStore.notesLoaded"
      class="progress is-large is-info"
      max="100"
    />
    <template v-else>
      <Note v-for="note in notesStore.notes" :key="note.id" :note="note" />
    </template>
  </div>
</template>
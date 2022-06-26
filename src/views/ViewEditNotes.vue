<script setup>
import { ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import AddEditNote from "../components/Notes/AddEditNote.vue";
import { useNotesStore } from "../stores/notesStore";

const notesStore = useNotesStore();
const route = useRoute();
const router = useRouter();
const noteContent = ref("");

noteContent.value = notesStore.getNoteContent(route.params.id);


const handleSaveClicked = () => {
    notesStore.updateNote(route.params.id, noteContent.value);
    router.push('/')
}


</script>
<template>
  <div class="edit-note">
    <AddEditNote
      v-model="noteContent"
      ref="addEditNoteRef"
      bgColor="link"
      placeholder="Edit note here..."
      label="Edit Note"
    >
      <template #buttons>
        <button @click="$router.back()" class="button is-link is-light mr-2">
          Cancel
        </button>
        <button
          class="button is-link has-background-link"
          :disabled="!noteContent"
          @click="handleSaveClicked"
        >
          Save Note
        </button>
      </template>
    </AddEditNote>
  </div>
</template>
<script setup>
import { defineProps, computed, reactive } from "vue";
import { useNotesStore } from "../../stores/notesStore.js";

import ModalDeleteNote from "./ModalDeleteNote.vue";

const notesStore = useNotesStore();

const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

const charCount = computed(() => {
  let length = props.note.content.length;
  let description = length > 1 ? "characters" : "character";
  return `${length} ${description}`;
});

// MODALS
/* using reactive object because there may be
 multiple modals on the page that we can manage. */
const modals = reactive({
  deleteNote: false,
});

</script>
<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
      </div>
      <div class="has-text-right has-text-grey-light mt-2">
        <small>{{ charCount }}</small>
      </div>
    </div>
    <footer class="card-footer">
      <router-link :to="`/edit/notes/${note.id}`" class="card-footer-item"
        >Edit</router-link
      >
      <a href="#" class="card-footer-item" @click.prevent="modals.deleteNote = true"
        >Delete</a
      >
    </footer>
    <ModalDeleteNote :noteId="note.id" v-model="modals.deleteNote" v-if="modals.deleteNote" />
  </div>
</template>
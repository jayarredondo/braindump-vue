<script setup>
import { defineProps, computed, reactive } from "vue";
import { useDateFormat } from "@vueuse/core";
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

// formatted date
const dateFormatted = computed(() => {
  let date = new Date(parseInt(props.note.date));
  return useDateFormat(date, 'MM-DD-YYYY @ HH:mm:ss').value
})

</script>
<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
      </div>
      <div class=" columns is-mobile has-text-grey-light mt-2">
        <small class="column">{{dateFormatted}}</small>
        <small class="column has-text-right">{{ charCount }}</small>
      </div>
    </div>
    <footer class="card-footer">
      <router-link :to="`/edit/notes/${note.id}`" class="card-footer-item"
        >Edit</router-link
      >
      <a
        href="#"
        class="card-footer-item"
        @click.prevent="modals.deleteNote = true"
        >Delete</a
      >
    </footer>
    <ModalDeleteNote
      :noteId="note.id"
      v-model="modals.deleteNote"
      v-if="modals.deleteNote"
    />
  </div>
</template>
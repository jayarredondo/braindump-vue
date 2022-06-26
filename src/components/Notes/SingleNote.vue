<script setup>
import { defineProps, computed } from 'vue';
import { useNotesStore } from '../../stores/notesStore.js';
const notesStore = useNotesStore();

const { deleteNote } = notesStore;

const props = defineProps({
    note: {
        type: Object,
        required: true
    }
});


const charCount = computed(() => {
  let length = props.note.content.length
  let description = length > 1 ? 'characters' : 'character';
  return `${length} ${description}`;
})



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
      <router-link :to="`/edit/notes/${note.id}`" class="card-footer-item">Edit</router-link>
      <a href="#" class="card-footer-item" @click.prevent="deleteNote(note.id)">Delete</a>
    </footer>
  </div>
</template>
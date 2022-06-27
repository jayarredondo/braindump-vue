<script setup>
import { ref } from 'vue';
import { useNotesStore } from '../stores/notesStore';
import { vAutofocus } from '../directives/vAutofocus';
import { useWatchCharacters } from '../use/useWatchCharacters';
const notesStore = useNotesStore();
const input = ref('');
useWatchCharacters(input, 50)

</script>
<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of Notes</td>
          <td>{{notesStore.totalNotesCount}}</td>
        </tr>
        <tr>
          <td>Number of Characters (of all notes)</td>
          <td>{{notesStore.totalCharactersCount}}</td>
        </tr>
      </tbody>
    </table>
    <input v-autofocus type="text" maxlength="50" class="input" placeholder="Type something..." v-model="input">
  </div>
</template>
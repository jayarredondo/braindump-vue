<script setup>
import { defineProps, computed } from 'vue';
const props = defineProps({
    note: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['deleteClicked'])

const charCount = computed(() => {
  let length = props.note.content.length
  let description = length > 1 ? 'characters' : 'character';
  return `${length} ${description}`;
})

const handleDeleteClicked = () => {
  emit('deleteClicked', props.note.id);
}
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
      <a href="#" class="card-footer-item">Edit</a>
      <a href="#" class="card-footer-item" @click.prevent="handleDeleteClicked">Delete</a>
    </footer>
  </div>
</template>
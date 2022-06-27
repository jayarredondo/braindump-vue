<script setup>
import { onClickOutside } from "@vueuse/core";
import { ref, onMounted, onUnmounted } from "vue";
import { useNotesStore } from "../../stores/notesStore";

const notesStore = useNotesStore();

const modalWindow = ref(null);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  noteId: {
    type: String,
    required: true
  }
});

// emits
const emit = defineEmits(["update:modelValue"]);

// close modal
const closeModal = () => {
  emit("update:modelValue", false);
};

onClickOutside(modalWindow, closeModal);

// keyboard control

const keyboardHandler = (event) => {
   if (event.key === "Escape") {
    closeModal();
  }
};

onMounted(() => {
  document.addEventListener("keyup", keyboardHandler);
});

onUnmounted(() => {
  document.removeEventListener("keyup", keyboardHandler);
});

</script>
<template>
  <div class="modal is-active p-5">
    <div class="modal-background"></div>
    <div class="modal-card" ref="modalWindow">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Note?</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        Are you sure you want to delete this note?
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button class="button" @click="closeModal">Cancel</button>
        <button class="button is-danger" @click="notesStore.deleteNote(noteId)">Delete</button>
      </footer>
    </div>
  </div>
</template>
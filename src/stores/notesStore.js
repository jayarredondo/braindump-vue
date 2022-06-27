import { defineStore } from "pinia";
import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../js/firebase";

const notesCollection = collection(db, "notes");
const notesCollectionQuery = query(notesCollection, orderBy("date", "desc"));

export const useNotesStore = defineStore("notesStore", {
  state: () => {
    return {
      notes: [],
      notesLoaded: false
    };
  },
  actions: {
    async getNotes() {
      // real-time-updates
      this.notesLoaded = false
      onSnapshot(notesCollectionQuery, (querySnapshot) => {
        let notes = [];
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date
          };
          notes.push(note);
        });
        this.notes = notes;
        this.notesLoaded = true
      });
    },
    async addNote(newNoteContent) {
      const date = new Date().getTime().toString();

      await addDoc(notesCollection, {
        content: newNoteContent,
        date,
      });
    },
    async deleteNote(idToDelete) {
      await deleteDoc(doc(notesCollection, idToDelete));
    },
    async updateNote(id, content) {
      await updateDoc(doc(notesCollection, id), {
        content,
      });
    },
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.filter((note) => note.id === id)[0].content;
      };
    },
    totalNotesCount: (state) => {
      return state.notes.length;
    },
    totalCharactersCount: (state) => {
      let count = 0;
      state.notes.forEach((note) => (count += note.content.length));
      return count;
    },
  },
});

import { defineStore } from 'pinia';

export const useNotesStore = defineStore('notesStore', {
    state: () => {
        return {
            notes: [
                {
                  id: 'id1',
                  content:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa saepe reprehenderit impedit fugiat provident id soluta consequatur deserunt quam libero.",
                },
                {
                  id: 'id2',
                  content: "This is a shorter note for demo purposes.",
                },
              ]
        }
    },
    actions: {
        addNote(newNoteContent) {
            const id = new Date().getTime().toString();
            const note = {
              id,
              content: newNoteContent,
            };
            this.notes.unshift(note);
        },
        deleteNote(idToDelete) {
            this.notes = this.notes.filter(note => note.id !== idToDelete);
        },
        updateNote(id, content) {
            console.log(id)
            let index = this.notes.findIndex(note => note.id === id);
            this.notes[index].content = content;
        }
    },
    getters: {
        getNoteContent: (state) => {
            return (id) => {
                return state.notes.filter(note => note.id === id)[0].content
            }
        },
        totalNotesCount: (state) => {
            return state.notes.length
        },
        totalCharactersCount: (state) => {
            let count = 0;
            state.notes.forEach(note => count += note.content.length);
            return count;
        }
    }
})
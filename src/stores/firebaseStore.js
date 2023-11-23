// src/store/firebaseStore.js
import { defineStore } from 'pinia'
import { setNote } from '@/lib/FirebaseConfig'

export const useFirebaseStore = defineStore({
  id: 'firebase',
  state: () => ({
    notes: []
  }),
  actions: {
    async addNoteToDB(note) {
      try {
        // Access the 'user-notes' node in the database
        setNote(note)

        // Push the note to the "notes" node in the database
        await this.notes.push(note)

        // Update local state
        this.notes.push(note)

        console.log('Note added to DB:', note)
      } catch (error) {
        console.error('Error adding note to DB:', error)
      }
    }
  }
})

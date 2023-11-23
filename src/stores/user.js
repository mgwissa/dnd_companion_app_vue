import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuth } from '../lib/GoogleAuthProvider'
// import { setNote } from '@/lib/FirebaseConfig'
import { push, onValue, ref as fbRef } from 'firebase/database'
import { database } from '@/lib/FirebaseConfig'

const auth = useAuth()

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false)
  const accessToken = ref('')
  const email = ref('')
  const userId = ref('')
  const logIn = async () => {
    const user = await auth.loginWithGoogle()
    accessToken.value = user.accessToken
    email.value = user.email
    userId.value = user.uid
    isLoggedIn.value = true
    notes.value = await getNotes()
  }
  const logOut = () => {
    console.log('logOut')
    isLoggedIn.value = false
    accessToken.value = ''
    email.value = ''
    userId.value = ''
    notes.value = []
  }
  const notes = ref([])
  const addNote = async (note) => {
    try {
      // Access the 'user-notes' node in the database
      await addNoteToDB(note)

      notes.value = await getNotes()

      console.log('Note added to DB:', note)
    } catch (error) {
      console.error('Error adding note to DB:', error)
    }
  }
  const addNoteToDB = (note) => {
    push(fbRef(database, 'user-notes/' + userId.value), {
      id: note.id,
      body: note.body,
      date: note.date
    })
  }
  const getNotes = async () => {
    try {
      const dbNotes = []
      const notesRef = fbRef(database, 'user-notes/' + userId.value)

      // Use a promise to wait for the asynchronous onValue operation
      await new Promise((resolve, reject) => {
        onValue(
          notesRef,
          (snapshot) => {
            const data = snapshot.val()
            dbNotes.push(...Object.values(data))
            resolve() // Resolve the promise once data is retrieved
          },
          (error) => {
            reject(error) // Reject the promise if there's an error
          }
        )
      })

      console.log('dbNotes:', dbNotes)
      return dbNotes
    } catch (error) {
      console.error('Error fetching notes:', error)
      throw error // Rethrow the error to handle it at the calling site if needed
    }
  }

  return { accessToken, email, isLoggedIn, logIn, logOut, notes, addNote }
})

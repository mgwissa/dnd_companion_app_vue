import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuth } from '../lib/GoogleAuthProvider'
// import { setNote } from '@/lib/FirebaseConfig'
import { push, onValue, ref as fbRef, set } from 'firebase/database'
import { database } from '@/lib/FirebaseConfig'

const auth = useAuth()

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false)
  const accessToken = ref('')
  const email = ref('')
  const userId = ref('')
  const userClass = ref('')
  const logIn = async () => {
    const user = await auth.loginWithGoogle()
    accessToken.value = user.accessToken
    email.value = user.email
    userId.value = user.uid
    isLoggedIn.value = true
    notes.value = await getNotes()
    userClass.value = await getUserClass()
  }
  const logOut = () => {
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

      return dbNotes
    } catch (error) {
      console.error('Error fetching notes:', error)
      throw error // Rethrow the error to handle it at the calling site if needed
    }
  }

  const getUserClass = async () => {
    try {
      let dndClass
      const classRef = fbRef(database, 'user-class/' + userId.value)

      // Use a promise to wait for the asynchronous onValue operation
      await new Promise((resolve, reject) => {
        onValue(
          classRef,
          (snapshot) => {
            const data = snapshot.val()
            dndClass = data.url
            resolve() // Resolve the promise once data is retrieved
          },
          (error) => {
            reject(error) // Reject the promise if there's an error
          }
        )
      })

      return dndClass
    } catch (error) {
      console.error('Error fetching notes:', error)
      throw error // Rethrow the error to handle it at the calling site if needed
    }
  }

  const addUserClassToDB = (url) => {
    set(fbRef(database, 'user-class/' + userId.value), {
      url
    })
  }

  const setUserClass = async (url) => {
    try {
      // Access the 'user-notes' node in the database
      await addUserClassToDB(url)

      notes.value = await getNotes()

      console.log('Url added to DB:', url)
    } catch (error) {
      console.error('Error adding url to DB:', error)
    }
    userClass.value = url
  }

  return { accessToken, addNote, email, isLoggedIn, logIn, logOut, notes, userClass, setUserClass }
})

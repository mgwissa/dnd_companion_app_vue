// import firebase from 'firebase/app'
import { Firestore } from 'firebase/firestore'

const db = Firestore()
const notesCollection = db.collection('notes')

export const addNoteToDatabase = (note) => {
  notesCollection.add(note)
}

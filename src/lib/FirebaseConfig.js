import { initializeApp } from 'firebase/app'
import 'firebase/firestore'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyAUi1tqyQddmkwSQ60U6dFAoazaDlZzbrU',
  authDomain: 'dnd-app-vue.firebaseapp.com',
  projectId: 'dnd-app-vue',
  storageBucket: 'dnd-app-vue.appspot.com',
  messagingSenderId: '30561022629',
  appId: '1:30561022629:web:b58ef081e5d80dd11a534c',
  measurementId: 'G-56PEYZGH3M',
  databaseURL: 'https://dnd-app-vue-default-rtdb.firebaseio.com/'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const setupFirebase = () => {
  initializeApp(firebaseConfig)
}

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app)

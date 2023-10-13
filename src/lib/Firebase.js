// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAUi1tqyQddmkwSQ60U6dFAoazaDlZzbrU',
  authDomain: 'dnd-app-vue.firebaseapp.com',
  projectId: 'dnd-app-vue',
  storageBucket: 'dnd-app-vue.appspot.com',
  messagingSenderId: '30561022629',
  appId: '1:30561022629:web:b58ef081e5d80dd11a534c',
  measurementId: 'G-56PEYZGH3M'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

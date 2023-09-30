import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false)
  function logIn() {
    console.log('logIn')
    isLoggedIn.value = true
  }
  const logOut = () => {
    console.log('logOut')
    isLoggedIn.value = false
  }

  return { isLoggedIn, logIn, logOut }
})

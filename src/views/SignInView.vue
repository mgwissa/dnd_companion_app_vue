<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const { isLoggedIn } = storeToRefs(userStore)

// const handleLogin = (response) => {
//   userStore.logIn()
//   console.log('userStore :', userStore)
//   console.log('Handle the response', response)
// }

const handleLogout = (response) => {
  userStore.logOut()
  console.log('userStore :', userStore)
  console.log('Handle the response', response)
}
</script>
<template>
  <template v-if="isLoggedIn">
    <h1>You're logged in!</h1>
    <p>Go wild baby!</p>
    <button @click="handleLogout">Sign out</button>
  </template>
  <template v-else> <button @click="userStore.logIn">Sign in</button></template>
</template>

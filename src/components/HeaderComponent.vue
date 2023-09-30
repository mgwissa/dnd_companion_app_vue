<script setup>
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const { isLoggedIn, logIn } = storeToRefs(userStore)
</script>

<template>
  <header>
    <nav>
      <div>{{ isLoggedIn }}</div>
      <RouterLink to="/" class="logo">
        <img src="/DnD-Symbol.png" alt="D&D" width="100" height="100" />
      </RouterLink>
      <template v-if="isLoggedIn">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/contact">Character Sheet</RouterLink>
        <RouterLink to="/contact">Class</RouterLink>
        <RouterLink to="/">Backstory</RouterLink>
      </template>
      <template v-else>
        <RouterLink to="/notes">Notes</RouterLink>
        <button @click="logIn">Login</button>
      </template>
    </nav>
  </header>
</template>

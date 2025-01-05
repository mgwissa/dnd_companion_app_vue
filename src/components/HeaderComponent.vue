<script setup>
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const { isLoggedIn } = storeToRefs(userStore)
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/" class="logo">
        <img src="/DnD-Symbol.png" alt="D&D" width="100" />
      </RouterLink>
      <div class="nav-links" v-if="isLoggedIn">
        <div>
          <RouterLink class="nav-link" to="/">Home</RouterLink>
        </div>
        <div>
          <RouterLink class="nav-link" to="/notes">Notes</RouterLink>
        </div>
        <div>
          <a class="nav-link" href="/backstory_sandstone.pdf">Backstory</a>
        </div>
        <div>
          <RouterLink class="nav-link" to="/character-sheet">Character Sheet</RouterLink>
        </div>
        <div>
          <!-- <a class="nav-link" href="https://www.dndbeyond.com" target="_blank">Class</a> -->
          <RouterLink class="nav-link" to="/class">Class</RouterLink>
        </div>
        <a class="nav-link" @click="userStore.logOut">Logout</a>
      </div>
      <template v-else>
        <!-- <a class="nav-link" @click="userStore.logIn">Login</a> -->
        <RouterLink class="nav-link" to="/sign-in">Sign In</RouterLink>
      </template>
    </nav>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  background-color: #333;
  color: #fff;
  width: 100%;
}
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1220px;

  .nav-link {
    color: #fff;
    cursor: pointer;
    padding: 0 1rem;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    &.active {
      text-decoration: underline;
    }

    &:visited {
      color: #fff;
    }
  }

  a {
    color: #fff;
    padding: 0 1rem;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    &.active {
      text-decoration: underline;
    }

    &:visited {
      color: #fff;
    }
  }
}

.nav-links {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
</style>

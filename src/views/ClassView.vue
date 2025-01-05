<script setup>
// import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()

const { userClass } = storeToRefs(userStore)

const setClass = () => {
  userStore.setUserClass(document.querySelector('#newClassUrl').value)
}
</script>

<template>
  <div class="user-class">
    <h1>Class Page</h1>
    <p>
      Looks like you haven't set your class yet, enter the
      <a href="https://www.dndbeyond.com/sources/basic-rules/classes" target="_blank">D&D Beyond</a>
      url for your class below.
    </p>
    <p>
      {{ userClass }}
    </p>
    <p>
      For example, if you are a fighter, you would enter
      <code>https://www.dndbeyond.com/classes/fighter</code>
    </p>
    <label for="classUrl">Class URL</label>
    <input type="text" id="newClassUrl" />
    <button @click="setClass">Set Class</button>
  </div>
</template>

<style scoped>
.user-class {
  width: 100%;
  max-width: 1220px;
  margin: 0 auto;
}
</style>

<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue'
</script>

<template>
  <div class="app-wrapper">
    <HeaderComponent />
    <RouterView />
  </div>
</template>

<style scoped>
.app-wrapper {
  color: #000;
  background: linear-gradient(to right, #d7d2cc 0%, #304352 100%);
  min-height: 100vh;
}
</style>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainNav from './components/navigation/MainNav.vue';
import FullPageSpinner from './components/loading/FullPageSpinner.vue'
import Toast from './components/alerts/Toast.vue';
</script>

<template>
  <Toast />
  <FullPageSpinner />
  <header v-if="!$route.meta.hideNavbar" class="self-start py-3 header">
<MainNav/>
    
  </header>
<main class="main">

  <RouterView />
</main>
</template>



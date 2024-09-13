<script setup lang="ts">
import { RouterView } from 'vue-router';
import MainNav from './components/navigation/MainNav.vue';
import FullPageSpinner from './components/loading/FullPageSpinner.vue';
import Toast from './components/alerts/Toast.vue';
import { onMounted } from "vue";

onMounted(async () => {
});
</script>

<template>
  <!-- TODO layout -->
  <Toast />
  <FullPageSpinner />
  <header v-if="!$route.meta.hideNavbar" class="self-start py-3 header">
<MainNav/>
    
  </header>
<main class="main">

  <RouterView />
</main>
</template>



<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainNav from './components/navigation/MainNav.vue';
</script>

<template>
  <header>
<MainNav/>
    
  </header>

  <RouterView />
</template>


